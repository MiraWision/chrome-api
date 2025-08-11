/**
 * A class that provides a type-safe wrapper around Chrome's commands API.
 * This class allows you to retrieve registered commands and listen for command triggers.
 * Commands are keyboard shortcuts that can be used to trigger actions in your extension.
 */
class Commands {
  /**
   * Retrieves all registered commands for the extension.
   * @returns A promise that resolves to an array of Command objects
   * @throws {Error} If there's an error retrieving the commands
   */
  public static async getAll(): Promise<chrome.commands.Command[]> {
    return new Promise((resolve, reject) => {
      chrome.commands.getAll((commands) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(commands);
        }
      });
    });
  }

  /**
   * Adds a listener for command events.
   * @param callback - Function called when a command is triggered via keyboard shortcut
   * @returns A function that removes the listener when called
   */
  public static addCommandListener(callback: (command: string) => void): () => void {
    chrome.commands.onCommand.addListener(callback);
    return () => chrome.commands.onCommand.removeListener(callback);
  }
}

export { Commands };