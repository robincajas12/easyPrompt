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
 * Generates a prompt fragment to extract specific information from a text.
 * @param items An array of strings describing the data to extract.
 * @returns The prompt fragment string.
 */
export function extract(items: string[]): string {
  if (items.length === 0) return 'Extract key information from the text.';
  return `From the provided text, specifically extract the following information: ${items.join(', ')}.`;
}

/**
 * Generates a prompt fragment to classify a text into one of several categories.
 * @param categories An array of possible categories.
 * @returns The prompt fragment string.
 */
export function classifyInto(categories: string[]): string {
  return `Classify the provided text into one of the following categories: ${categories.join(', ')}. Respond only with the category name.`;
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

/**
 * Generates a prompt fragment to answer a question based on provided context.
 * @param question The question to be answered.
 * @param context The context from which to answer the question.
 * @returns The prompt fragment string.
 */
export function answerQuestion(question: string, context: string): string {
  return `Answer the question: "${question}" based on the following context: """${context}""".`;
}