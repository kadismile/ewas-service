"use client";
const appStorage = {
  getItem(_key) {
    const oldItem = localStorage.getItem(_key);
    if (!oldItem) {
      return {};
    }
    return JSON.parse(oldItem);
  },
  setItem(_key, value) {
    console.log("Key ----------------> ", _key);
    const oldItem = this.getItem(_key);
    const newValue = { ...oldItem, ...value };
    localStorage.setItem(_key, JSON.stringify(newValue));
  },
  removeItem(_key, fieldToRemove) {
    const oldItem = this.getItem(_key);
    if (oldItem && oldItem[fieldToRemove]) {
      delete oldItem[fieldToRemove];
      localStorage.setItem(_key, JSON.stringify(oldItem));
    }
  },
};

export default appStorage;
