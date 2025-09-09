/**
 * Crea un fragmento de prompt que añade una restricción o regla.
 * @param constraint La restricción que el modelo debe seguir.
 * @returns El string del fragmento del prompt.
 */
export function withConstraint(constraint: string): string {
  return `Es crucial que cumplas la siguiente restricción: ${constraint}.`;
}


