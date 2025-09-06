/**
 * Especifica el tono de la respuesta deseada.
 * @param tone El tono a utilizar (ej: "profesional", "amigable", "sarcástico").
 * @returns El string del fragmento del prompt.
 */
export function withTone(tone: string): string {
  return `El tono de la respuesta debe ser estrictamente ${tone}.`;
}

/**
 * Especifica la longitud deseada para la respuesta.
 * @param length Una descripción de la longitud (ej: "3 párrafos", "unas 100 palabras").
 * @returns El string del fragmento del prompt.
 */
export function withLength(length: string): string {
  return `La longitud de la respuesta debe ser de aproximadamente ${length}.`;
}
