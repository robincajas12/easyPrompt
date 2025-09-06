/**
 * Crea un fragmento de prompt que especifica el formato de la salida.
 * @param format La descripción del formato de salida (ej: "JSON", "una lista de viñetas").
 * @returns El string del fragmento del prompt.
 */
export function withOutputFormat(format: string): string {
  return `La respuesta debe estar únicamente en formato de ${format}.`;
}
