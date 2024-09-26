export function getElements(key: string | string[]) {
  const keys = typeof key === 'string' ? [key] : key;

  return keys.map((key) => {
    const element = document.getElementById(key);

    if (!element) throw new Error(`Element "${key}" not found!`);

    return element;
  });
}
