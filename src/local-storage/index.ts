import { Storage } from './types';

/**
 * A class that provides a type-safe wrapper around Chrome's local storage API.
 * This class allows you to store, retrieve, and manage data in the browser's local storage.
 * Local storage is persistent and can store larger amounts of data compared to session storage.
 */
class LocalStorage {
  /**
   * Retrieves a value from local storage by key.
   * @param key - The key to retrieve
   * @returns A promise that resolves to the stored data
   * @throws {Error} If there's an error retrieving the data
   */
  public static async get(key: string): Promise<Storage> {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get([key], (result) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(result as Storage);
        }
      });
    });
  }

  /**
   * Retrieves all data from local storage.
   * @returns A promise that resolves to all stored data
   * @throws {Error} If there's an error retrieving the data
   */
  public static async getAll(): Promise<Storage> {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(null, (result) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(result as Storage);
        }
      });
    });
  }

  /**
   * Stores a value in local storage.
   * @param key - The key under which to store the value
   * @param value - The value to store
   * @returns A promise that resolves when the value is stored
   * @throws {Error} If there's an error storing the data
   */
  public static async set(key: string, value: any): Promise<void> {
    return new Promise((resolve, reject) => {
      chrome.storage.local.set({ [key]: value }, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    });
  }

  /**
   * Stores multiple key-value pairs in local storage.
   * @param data - An object containing the key-value pairs to store
   * @returns A promise that resolves when all values are stored
   * @throws {Error} If there's an error storing the data
   */
  public static async setBulk(data: Storage): Promise<void> {
    return new Promise((resolve, reject) => {
      chrome.storage.local.set(data, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    });
  }

  /**
   * Removes a value from local storage.
   * @param key - The key to remove
   * @returns A promise that resolves when the value is removed
   * @throws {Error} If there's an error removing the data
   */
  public static async remove(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      chrome.storage.local.remove([key], () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    });
  }

  /**
   * Removes all data from local storage.
   * @returns A promise that resolves when all data is cleared
   * @throws {Error} If there's an error clearing the data
   */
  public static async clear(): Promise<void> {
    return new Promise((resolve, reject) => {
      chrome.storage.local.clear(() => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    });
  }
}

export { LocalStorage };
