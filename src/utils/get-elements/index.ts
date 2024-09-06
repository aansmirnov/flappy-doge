export function getElements(key: string | string[]) {
  const keys = typeof key === 'string' ? [key] : key;

  return keys.map((it) => {
    const element = document.getElementById(it);

    if (!element) throw new Error('Element not found!');

    return element;
  });
}
