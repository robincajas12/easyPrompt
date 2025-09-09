document.addEventListener('DOMContentLoaded', () => {
    const functionsList = document.getElementById('functionsList');
    const saveButton = document.getElementById('saveFunction');
    const functionNameInput = document.getElementById('functionName') as HTMLInputElement;
    const functionDescriptionInput = document.getElementById('functionDescription') as HTMLInputElement;
    const functionParamsInput = document.getElementById('functionParams') as HTMLInputElement;
    const functionBodyInput = document.getElementById('functionBody') as HTMLTextAreaElement;

    const addFunctionModal = document.getElementById('addFunctionModal');
    const addFunctionBtn = document.getElementById('addFunctionBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');

    interface CustomFunctionParam {
        name: string;
        type: string;
    }

    interface CustomFunction {
        name: string;
        description?: string;
        parameters: CustomFunctionParam[];
        body: string;
    }

    function openModal() {
        if (addFunctionModal) addFunctionModal.style.display = 'block';
    }

    function closeModal() {
        if (addFunctionModal) addFunctionModal.style.display = 'none';
        clearForm();
    }

    function clearForm() {
        functionNameInput.value = '';
        functionDescriptionInput.value = '';
        functionParamsInput.value = '';
        functionBodyInput.value = '';
    }

    addFunctionBtn?.addEventListener('click', openModal);
    closeModalBtn?.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target == addFunctionModal) {
            closeModal();
        }
    });

    // Load functions
    function loadFunctions() {
        chrome.storage.local.get(['customFunctions'], (result) => {
            const customFunctions: { [key: string]: CustomFunction } = result.customFunctions || {};
            functionsList!.innerHTML = '';
            if (Object.keys(customFunctions).length === 0) {
                functionsList!.innerHTML = '<p>No custom functions defined yet.</p>';
                return;
            }
            for (const name in customFunctions) {
                const func = customFunctions[name];
                const item = document.createElement('div');
                item.className = 'function-item';
                item.innerHTML = `
                    <h3>${func.name}</h3>
                    <p>Description: ${func.description || 'N/A'}</p>
                    <p>Parameters: ${func.parameters.map((p: CustomFunctionParam) => `${p.name}:${p.type}`).join(', ') || 'None'}</p>
                    <p>Body: <code>${func.body}</code></p>
                    <button data-name="${func.name}">Delete</button>
                `;
                functionsList!.appendChild(item);
            }
        });
    }

    // Save function
    saveButton!.addEventListener('click', () => {
        const name = functionNameInput.value.trim();
        const description = functionDescriptionInput.value.trim();
        const paramsStr = functionParamsInput.value.trim();
        const body = functionBodyInput.value;

        if (!name || !body) {
            alert('Function Name and Body are required.');
            return;
        }

        let parameters: CustomFunctionParam[] = [];
        if (paramsStr) {
            parameters = paramsStr.split(',').map(p => {
                const parts = p.trim().split(':');
                return { name: parts[0], type: parts[1] || 'string' };
            });
        }

        chrome.storage.local.get(['customFunctions'], (result) => {
            const customFunctions: { [key: string]: CustomFunction } = result.customFunctions || {};
            customFunctions[name] = {
                name,
                description,
                parameters,
                body
            };
            chrome.storage.local.set({ customFunctions }, () => {
                alert('Function saved!');
                closeModal();
                loadFunctions();
            });
        });
    });

    // Delete function
    functionsList!.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        if (target.tagName === 'BUTTON' && target.dataset.name) {
            const nameToDelete = target.dataset.name;
            if (confirm(`Are you sure you want to delete function '${nameToDelete}'?`)) {
                chrome.storage.local.get(['customFunctions'], (result) => {
                    const customFunctions: { [key: string]: CustomFunction } = result.customFunctions || {};
                    delete customFunctions[nameToDelete];
                    chrome.storage.local.set({ customFunctions }, () => {
                        alert('Function deleted!');
                        loadFunctions();
                    });
                });
            }
        }
    });

    loadFunctions();
});