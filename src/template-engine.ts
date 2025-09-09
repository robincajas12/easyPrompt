import * as composer from './composer';

// Interfaces para los metadatos de las funciones
interface Parameter {
  name: string;
  type: string;
  optional?: boolean;
  defaultValue?: string;
  description?: string;
}

export interface FunctionMetadata {
  name: string;
  description: string;
  parameters: Parameter[];
}

// Interfaces para funciones personalizadas almacenadas
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

// Un mapa para acceder a las funciones del compositor por su nombre
const functionMap: { [key: string]: (...args: any[]) => string } = {
  // Actions
  asSummarization: composer.asSummarization,
  asTranslation: composer.asTranslation,
  asCorrection: composer.asCorrection,
  generateList: composer.generateList, // Nueva
  rephrase: composer.rephrase, // Nueva
  //Context
  getDate: composer.getDate,
  getTime: composer.getTime,
  // Constraints
  withConstraint: composer.withConstraint,
  // Format
  withOutputFormat: composer.withOutputFormat,
  // Structure
  withRole: composer.withRole,
  withTask: composer.withTask,
  withTopic: composer.withTopic,
  // Style
  withTone: composer.withTone,
  withLength: composer.withLength,

};

// Mapa de metadatos de las funciones integradas
const builtInFunctionMetadataMap: { [key: string]: FunctionMetadata } = {
  asSummarization: {
    name: 'asSummarization',
    description: 'Instructs the model to summarize the input text.',
    parameters: [{ name: 'format', type: 'string', optional: true, defaultValue: "'a concise paragraph'" }],
  },
  asTranslation: {
    name: 'asTranslation',
    description: 'Instructs the model to translate the input text.',
    parameters: [{ name: 'language', type: 'string' }],
  },
  asCorrection: {
    name: 'asCorrection',
    description: 'Instructs the model to correct the grammar and style of the text.',
    parameters: [],
  },
  generateList: {
    name: 'generateList',
    description: 'Generates a list from provided items.',
    parameters: [
      { name: 'items', type: 'string[]' },
      { name: 'format', type: 'string', optional: true, defaultValue: "'bullet points'" }
    ],
  },
  rephrase: {
    name: 'rephrase',
    description: 'Rephrases a given text in a specified style.',
    parameters: [
      { name: 'text', type: 'string' },
      { name: 'style', type: 'string', optional: true, defaultValue: "'more formal'" }
    ],
  },
  withConstraint: {
    name: 'withConstraint',
    description: 'Creates a prompt fragment that adds a constraint or rule.',
    parameters: [{ name: 'constraint', type: 'string' }],
  },
  withOutputFormat: {
    name: 'withOutputFormat',
    description: 'Creates a prompt fragment that specifies the output format.',
    parameters: [{ name: 'format', type: 'string' }],
  },
  withRole: {
    name: 'withRole',
    description: "Creates a prompt fragment that defines the model's role or persona.",
    parameters: [{ name: 'role', type: 'string' }],
  },
  withTask: {
    name: 'withTask',
    description: 'Creates a prompt fragment that defines the main task.',
    parameters: [{ name: 'taskDescription', type: 'string' }],
  },
  withTopic: {
    name: 'withTopic',
    description: 'Specifies the central topic of the content to be generated.',
    parameters: [{ name: 'topic', type: 'string' }],
  },
  withTone: {
    name: 'withTone',
    description: 'Specifies the desired tone for the response.',
    parameters: [{ name: 'tone', type: 'string' }],
  },
  withLength: {
    name: 'withLength',
    description: 'Specifies the desired length for the response.',
    parameters: [{ name: 'length', type: 'string' }],
  },
  getDate: {
    name: 'getDate',
    description: 'Returns the current date in a readable format.',
    parameters: [],
  },
  getTime: {
    name: 'getTime',
    description: 'Returns the current time in a readable format.',
    parameters: [],
  },
};


/**
 * Devuelve una lista de los metadatos de las funciones de plantilla disponibles (integradas y personalizadas).
 * @returns Un array de objetos FunctionMetadata con los nombres y parámetros de las funciones.
 */
export async function getAvailableFunctions(): Promise<FunctionMetadata[]> {
  const builtInFunctions = Object.values(builtInFunctionMetadataMap);

  const result = await chrome.storage.local.get(['customFunctions']);
  const customFunctions: { [key: string]: CustomFunction } = result.customFunctions || {};

  const customFunctionMetadata: FunctionMetadata[] = Object.values(customFunctions).map(cf => ({
    name: cf.name,
    description: cf.description || 'Custom function',
    parameters: cf.parameters.map(p => ({ name: p.name, type: p.type })),
  }));

  return [...builtInFunctions, ...customFunctionMetadata];
}

/**
 * Procesa una plantilla de string (ej: "withTone('profesional')").
 * @param functionName El nombre de la función a llamar (ej: "withTone").
 * @param paramsStr Los parámetros como un string (ej: "'profesional'").
 * @returns El resultado de la función del compositor, o un string vacío si falla.
 */
export async function processTemplate(functionName: string, paramsStr: string): Promise<string> {
  const func = functionMap[functionName];
  
  if (func) {
    // Es una función integrada
    try {
      const args = JSON.parse(`[${paramsStr.replace(/\'/g, '"')}]`);
      return func(...args);
    } catch (error) {
      console.error(`[Prompt Composer] Error al procesar la función integrada ${functionName} con parámetros ${paramsStr}:`, error);
      return '';
    }
  } else {
    // Podría ser una función personalizada
    const result = await chrome.storage.local.get(['customFunctions']);
    const customFunctions: { [key: string]: CustomFunction } = result.customFunctions || {};
    const customFunc = customFunctions[functionName];

    if (customFunc) {
      try {
        const args = JSON.parse(`[${paramsStr.replace(/\'/g, '"')}]`);
        let body = customFunc.body;
        
        // Realizar interpolación de parámetros en el cuerpo de la función personalizada
        customFunc.parameters.forEach((param, index) => {
            const argValue = args[index];
            // Reemplazar {paramName} con el valor del argumento
            body = body.replace(new RegExp(`\\{${param.name}\\}`, 'g'), argValue);
        });
        return body;

      } catch (error) {
        console.error(`[Prompt Composer] Error al procesar la función personalizada ${functionName} con parámetros ${paramsStr}:`, error);
        return '';
      }
    } else {
      console.warn(`[Prompt Composer] Función desconocida: ${functionName}`);
      return '';
    }
  }
}