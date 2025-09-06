/**
 * Añade un bloque de contexto o datos de entrada al prompt.
 * @param text El texto principal o datos a procesar.
 * @param label Una etiqueta para el bloque de contexto (ej: "TEXTO A ANALIZAR").
 * @returns El string del fragmento del prompt.
 */
export function withContext(text: string, label: string = 'CONTEXTO'): string {
  return `${label.toUpperCase()}:\n"""\n${text}\n"""`;
}

/**
 * Formatea uno o más ejemplos (few-shot) para guiar al modelo.
 * @param examples Un array de objetos con pares de 'input' y 'output'.
 * @returns Una cadena de texto con todos los ejemplos formateados.
 */
export function withExamples(examples: Array<{ input: string; output: string }>): string {
  const formattedExamples = examples
    .map(ex => `Ejemplo:\nInput: ${ex.input}\nOutput: ${ex.output}`)
    .join('\n\n');
  return `A continuación se muestran algunos ejemplos:\n${formattedExamples}`;
}

/**
 * Asegura que ciertas palabras clave se incluyan en la respuesta.
 * @param keywords Un array de palabras o frases a incluir.
 * @returns El string del fragmento del prompt.
 */
export function withKeywords(keywords: string[]): string {
  if (keywords.length === 0) return '';
  return `Asegúrate de incluir y dar importancia a las siguientes palabras clave: ${keywords.join(', ')}.`;
}
