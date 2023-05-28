type StoreInLocalStorage = <T>(key: string, item: T) => void;
type GetValueForKeyInLocalStorage = <T>(key: string) => T | null;
type RemoveFromLocalStorage = (key: string) => void;
type ClearLocalStorage = () => void;

export const storeInLocalStorage: StoreInLocalStorage = (key, item) => {
  localStorage.setItem(key, typeof item === 'string' ? item : JSON.stringify(item));
};

export const getValueForKeyInLocalStorage: GetValueForKeyInLocalStorage = (key) => {
  const item = localStorage.getItem(key);

  if (!!item) {
    try {
      return JSON.parse(item);
    } catch (_) {
      return item;
    }
  }

  return null;
};

export const removeFromLocalStorage: RemoveFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export const clearLocalStorage: ClearLocalStorage = () => {
  localStorage.clear();
};
