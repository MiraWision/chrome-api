import { ISyncStorage } from './types';

/**
 * A class that provides a type-safe wrapper around Chrome's sync storage API.
 * This class allows you to store and retrieve data that is synced across devices
 * where the user is signed into Chrome. It's useful for storing user preferences
 * and other small pieces of data that should persist across devices.
 */
class StorageSync {
  /**
   * Retrieves a value from sync storage by key.
   * @param key - The key to retrieve
   * @returns A promise that resolves to the stored data
   * @throws {Error} If there's an error retrieving the data
   */
  public static async get(key: string): Promise<ISyncStorage> {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get([key], (result) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(result as ISyncStorage);
        }
      });
    });
  }

  /**
   * Retrieves all data from sync storage.
   * @returns A promise that resolves to all stored data
   * @throws {Error} If there's an error retrieving the data
   */
  public static async getAll(): Promise<ISyncStorage> {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(null, (result) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(result as ISyncStorage);
        }
      });
    });
  }

  /**
   * Stores a value in sync storage.
   * @param key - The key under which to store the value
   * @param value - The value to store
   * @returns A promise that resolves when the value is stored
   * @throws {Error} If there's an error storing the data
   */
  public static async set(key: string, value: any): Promise<void> {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.set({ [key]: value }, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    });
  }

  /**
   * Stores multiple key-value pairs in sync storage.
   * @param data - An object containing the key-value pairs to store
   * @returns A promise that resolves when all values are stored
   * @throws {Error} If there's an error storing the data
   */
  public static async setBulk(data: ISyncStorage): Promise<void> {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.set(data, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    });
  }

  /**
   * Removes a value from sync storage.
   * @param key - The key to remove
   * @returns A promise that resolves when the value is removed
   * @throws {Error} If there's an error removing the data
   */
  public static async remove(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.remove([key], () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    });
  }

  /**
   * Removes all data from sync storage.
   * @returns A promise that resolves when all data is cleared
   * @throws {Error} If there's an error clearing the data
   */
  public static async clear(): Promise<void> {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.clear(() => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    });
  }

  /**
   * Adds a listener for storage change events.
   * @param callback - Function called when storage data changes
   * @returns A function that removes the listener when called
   */
  public static addChangedListener(callback: (changes: { [key: string]: chrome.storage.StorageChange }, areaName: string) => void): () => void {
    chrome.storage.onChanged.addListener(callback);
    return () => chrome.storage.onChanged.removeListener(callback);
  }
}

export { StorageSync };