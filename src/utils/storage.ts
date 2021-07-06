const setItem = (key: string, val: any) => {
  window.localStorage.setItem(key, val);
};

const getItem = (key: string) => window.localStorage.getItem(key);

const removeItem = (key: string) => {
  window.localStorage.removeItem(key);
};

export default {
  setItem,
  getItem,
  removeItem,
};
