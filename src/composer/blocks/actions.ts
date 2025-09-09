/**
 * Generates a prompt fragment to summarize a text.
 * @param format The desired format for the summary (e.g., "in a paragraph", "in 3 key points").
 * @returns The prompt fragment string.
 */
export function asSummarization(format: string = 'a concise paragraph'): string {
  return `Summarize the provided text in ${format} format.`;
}

/**
 * Generates a prompt fragment to translate a text.
 * @param language The language to which the text should be translated.
 * @returns The prompt fragment string.
 */
export function asTranslation(language: string): string {
  return `Translate the provided text to the following language: ${language}.`;
}

/**
 * Generates a prompt fragment to correct the grammar and style of a text.
 * @returns The prompt fragment string.
 */
export function asCorrection(): string {
  return 'Correct the grammar and spelling of the provided text. Maintain the original meaning but improve fluency and clarity.';
}


/**
 * Generates a prompt fragment to create a list from provided items.
 * @param items An array of strings to be included in the list.
 * @param format The desired format for the list (e.g., "bullet points", "numbered list").
 * @returns The prompt fragment string.
 */
export function generateList(items: string[], format: string = 'bullet points'): string {
  return `Generate a ${format} from the following items: ${items.join(', ')}.`;
}

/**
 * Generates a prompt fragment to rephrase a given text.
 * @param text The text to be rephrased.
 * @param style The desired style for rephrasing (e.g., "more formal", "more concise").
 * @returns The prompt fragment string.
 */
export function rephrase(text: string, style: string = 'more formal'): string {
  return `Rephrase the following text in a ${style} style: """${text}""".`;
}