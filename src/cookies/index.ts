import { CookieDetails, CookieQuery } from './types';

/**
 * A class that provides a type-safe wrapper around Chrome's cookies API.
 * This class allows you to get, set, remove, and monitor cookies across different domains
 * and cookie stores in the browser.
 */
class Cookies {
  /**
   * Retrieves information about a single cookie.
   * @param details - The details (name, url, storeId) of the cookie to retrieve
   * @returns A promise that resolves to the cookie if found, null otherwise
   * @throws {Error} If there's an error retrieving the cookie
   */
  public static async get(details: CookieDetails): Promise<chrome.cookies.Cookie | null> {
    return new Promise((resolve, reject) => {
      chrome.cookies.get(details, (cookie) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(cookie);
        }
      });
    });
  }

  /**
   * Retrieves all cookies that match the given query.
   * @param details - The query parameters to filter cookies
   * @returns A promise that resolves to an array of matching cookies
   * @throws {Error} If there's an error retrieving the cookies
   */
  public static async getAll(details: CookieQuery): Promise<chrome.cookies.Cookie[]> {
    return new Promise((resolve, reject) => {
      chrome.cookies.getAll(details, (cookies) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(cookies);
        }
      });
    });
  }

  /**
   * Sets a cookie with the given details.
   * @param details - The details of the cookie to set
   * @returns A promise that resolves to the created/updated cookie, or null if setting failed
   * @throws {Error} If there's an error setting the cookie
   */
  public static async set(details: CookieDetails): Promise<chrome.cookies.Cookie | null> {
    return new Promise((resolve, reject) => {
      chrome.cookies.set(details, (cookie) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(cookie);
        }
      });
    });
  }

  /**
   * Removes a cookie matching the given details.
   * @param details - The details of the cookie to remove
   * @returns A promise that resolves to the details of the removed cookie
   * @throws {Error} If there's an error removing the cookie
   */
  public static async remove(details: CookieDetails): Promise<CookieDetails> {
    return new Promise((resolve, reject) => {
      chrome.cookies.remove(details, (details) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(details);
        }
      });
    });
  }

  /**
   * Lists all cookie stores in the browser.
   * @returns A promise that resolves to an array of cookie stores
   * @throws {Error} If there's an error retrieving the cookie stores
   */
  public static async getAllCookieStores(): Promise<chrome.cookies.CookieStore[]> {
    return new Promise((resolve, reject) => {
      chrome.cookies.getAllCookieStores((cookieStores) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(cookieStores);
        }
      });
    });
  }

  /**
   * Adds a listener for cookie change events.
   * @param callback - Function called when a cookie is created, removed or changed
   * @returns A function that removes the listener when called
   */
  public static addChangedListener(callback: (changeInfo: chrome.cookies.CookieChangeInfo) => void): () => void {
    chrome.cookies.onChanged.addListener(callback);
    return () => chrome.cookies.onChanged.removeListener(callback);
  }
}

export { Cookies };