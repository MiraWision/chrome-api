import { NotificationOptions, NotificationCallback, ButtonClickCallback, PermissionLevel } from './types';

/**
 * A class that provides a type-safe wrapper around Chrome's notifications API.
 * This class allows you to create, update, and manage system notifications,
 * as well as handle user interactions with notifications.
 */
class Notifications {
  /**
   * Creates a new notification.
   * @param options - The notification options including type, title, message, etc.
   * @returns A promise that resolves to the notification ID
   * @throws {Error} If there's an error creating the notification
   */
  public static async create(options: NotificationOptions): Promise<string> {
    return new Promise((resolve, reject) => {
      chrome.notifications.create(options, (notificationId) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(notificationId);
        }
      });
    });
  }

  /**
   * Updates an existing notification.
   * @param notificationId - The ID of the notification to update
   * @param options - The new notification options
   * @returns A promise that resolves to true if the notification was updated
   * @throws {Error} If there's an error updating the notification
   */
  public static async update(notificationId: string, options: NotificationOptions): Promise<boolean> {
    return new Promise((resolve, reject) => {
      chrome.notifications.update(notificationId, options, (wasUpdated) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(wasUpdated);
        }
      });
    });
  }

  /**
   * Clears an existing notification.
   * @param notificationId - The ID of the notification to clear
   * @returns A promise that resolves to true if the notification was cleared
   * @throws {Error} If there's an error clearing the notification
   */
  public static async clear(notificationId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      chrome.notifications.clear(notificationId, (wasCleared) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(wasCleared);
        }
      });
    });
  }

  /**
   * Retrieves all active notifications.
   * @returns A promise that resolves to an array of notification IDs
   * @throws {Error} If there's an error retrieving the notifications
   */
  public static async getAll(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      chrome.notifications.getAll((notifications) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(Object.keys(notifications));
        }
      });
    });
  }

  /**
   * Gets the current permission level for notifications.
   * @returns A promise that resolves to the permission level
   * @throws {Error} If there's an error retrieving the permission level
   */
  public static async getPermissionLevel(): Promise<PermissionLevel> {
    return new Promise((resolve, reject) => {
      chrome.notifications.getPermissionLevel((level) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(level);
        }
      });
    });
  }

  /**
   * Adds a listener for notification click events.
   * @param callback - Function called when a notification is clicked
   * @returns A function that removes the listener when called
   */
  public static addClickedListener(callback: NotificationCallback): () => void {
    chrome.notifications.onClicked.addListener(callback);
    return () => chrome.notifications.onClicked.removeListener(callback);
  }

  /**
   * Adds a listener for notification button click events.
   * @param callback - Function called when a notification button is clicked
   * @returns A function that removes the listener when called
   */
  public static addButtonClickedListener(callback: ButtonClickCallback): () => void {
    chrome.notifications.onButtonClicked.addListener(callback);
    return () => chrome.notifications.onButtonClicked.removeListener(callback);
  }

  /**
   * Adds a listener for notification close events.
   * @param callback - Function called when a notification is closed
   * @returns A function that removes the listener when called
   */
  public static addClosedListener(callback: NotificationCallback): () => void {
    chrome.notifications.onClosed.addListener(callback);
    return () => chrome.notifications.onClosed.removeListener(callback);
  }
}

export { Notifications };