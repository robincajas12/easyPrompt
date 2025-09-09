/**
 * Get the current date in a prompt-friendly format. DD/MM/YYYY.
 * @returns The prompt fragment string.
 */
export function getDate(): string {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0'); 
  const year = now.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * 
 * @returns The current time in HH:MM format.
 */
export function getTime(): string {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
} 


