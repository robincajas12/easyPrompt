export * from './blocks/actions';
export * from './blocks/constraints';
export * from './blocks/context';
export * from './blocks/format';
export * from './blocks/structure';
export * from './blocks/style';

/**
 * Une varias partes de un prompt en un único string, separadas por dos saltos de línea.
 * Ignora cualquier parte que sea nula, indefinida o un string vacío.
 * @param parts Los fragmentos de texto que formarán el prompt.
 * @returns El prompt completo como un único string.
 */
export function composePrompt(...parts: (string | null | undefined)[]): string {
  return parts.filter(Boolean).join('\n\n');
}

