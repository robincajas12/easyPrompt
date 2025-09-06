/**
 * Crea un fragmento de prompt que añade una restricción o regla.
 * @param constraint La restricción que el modelo debe seguir.
 * @returns El string del fragmento del prompt.
 */
export function withConstraint(constraint: string): string {
  return `Es crucial que cumplas la siguiente restricción: ${constraint}.`;
}

/**
 * Pide al modelo que evite ciertos temas o palabras.
 * @param thingsToAvoid Un array de conceptos o palabras a evitar.
 * @returns El string del fragmento del prompt.
 */
export function avoid(thingsToAvoid: string[]): string {
  if (thingsToAvoid.length === 0) return '';
  return `Bajo ninguna circunstancia menciones lo siguiente: ${thingsToAvoid.join(', ')}.`;
}

/**
 * Instruye al modelo para que piense paso a paso antes de responder.
 * Esto mejora la calidad de los razonamientos complejos.
 * @returns El string del fragmento del prompt.
 */
export function withStepByStepThinking(): string {
  return 'Antes de dar la respuesta final, razona y piensa paso a paso dentro de un bloque <thinking></thinking>. La respuesta final debe estar fuera de ese bloque.';
}