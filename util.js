export function prepareArray(array) {
    array.sort((a, b) => a - b);
    const set = new Set (array);
    return Array.from(set);
}