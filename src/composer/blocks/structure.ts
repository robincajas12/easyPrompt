/**
 * Crea un fragmento de prompt que define el rol o persona del modelo.
 * @param role El rol que debe adoptar el modelo (ej: "un programador experto").
 * @returns El string del fragmento del prompt.
 */
export function withRole(role: string): string {
  return `Actúa como ${role}.`;
}

/**
 * Crea un fragmento de prompt que define la tarea principal.
 * @param taskDescription La descripción de la tarea a realizar.
 * @returns The prompt fragment string.
 */
export function withTask(taskDescription: string): string {
  return `Tu tarea principal es ${taskDescription}.`;
}

/**
 * Especifica el tema central del contenido a generar.
 * @param topic El tema sobre el que debe tratar la respuesta.
 * @returns El string del fragmento del prompt.
 */
export function withTopic(topic: string): string {
  return `El tema principal es: ${topic}.`;
}