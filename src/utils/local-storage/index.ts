export function getItemFromLocalStorage<T>(key: string) {
  const item = localStorage.getItem(key);

  if (!item) {
    return null;
  }

  const parsedItem = JSON.parse(item) as T;
  return parsedItem;
}

export function setItemToLocalStorage<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}
