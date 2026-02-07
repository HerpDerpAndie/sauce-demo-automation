export function extractNumber(text: string): number {
    const match = text.match(/\d+(\.\d+)?/);
    return match ? parseFloat(match[0]) : 0;
}
