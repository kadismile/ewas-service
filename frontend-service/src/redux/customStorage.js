"use client";
const appStorage = {
  getItem(_key) {
    if (typeof window !== 'undefined') {
      const oldItem = localStorage.getItem(_key);
      if (!oldItem) {
        return {};
      }
      return JSON.parse(oldItem);
    }
  },
  setItem(_key, value) {
    if (typeof window !== 'undefined') {
      const oldItem = this.getItem(_key);
      const newValue = { ...oldItem, ...value };
      localStorage.setItem(_key, JSON.stringify(newValue));
    } 
  },
  removeItem(_key, fieldToRemove) {
    if (typeof window !== 'undefined') {
      const oldItem = this.getItem(_key);
      if (oldItem && oldItem[fieldToRemove]) {
        delete oldItem[fieldToRemove];
        localStorage.setItem(_key, JSON.stringify(oldItem));
      }
    }
  },
};

export default appStorage;