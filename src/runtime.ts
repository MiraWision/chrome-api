/**
 * A class that provides a type-safe wrapper around Chrome's runtime API.
 * This class allows you to handle message passing between different parts of your extension,
 * manage extension lifecycle events, and access extension information.
 */
class Runtime {
  /**
   * Sends a message to the extension's runtime.
   * @param message - The message to send
   * @returns A promise that resolves to the response from the message handler
   * @template T - The type of the response
   */
  public static async sendMessage<T>(message: any): Promise<T> {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(message, resolve);
    });
  }

  /**
   * Adds a listener for messages from the extension.
   * @param callback - Function called when a message is received
   * @returns A function that removes the listener when called
   */
  public static addMessageListener(callback: (message: any, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void) => void): () => void {
    chrome.runtime.onMessage.addListener(callback);
    return () => chrome.runtime.onMessage.removeListener(callback);
  }

  /**
   * Adds a listener for messages from external extensions or apps.
   * @param callback - Function called when an external message is received
   * @returns A function that removes the listener when called
   */
  public static addExternalMessageListener(callback: (message: any, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void) => void): () => void {
    chrome.runtime.onMessageExternal.addListener(callback);
    return () => chrome.runtime.onMessageExternal.removeListener(callback);
  }

  /**
   * Gets the manifest of the extension.
   * @returns A promise that resolves to the extension's manifest
   */
  public static async getManifest(): Promise<chrome.runtime.Manifest> {
    return chrome.runtime.getManifest();
  }
}

export { Runtime };