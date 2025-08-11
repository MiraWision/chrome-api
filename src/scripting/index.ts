/**
 * A class that provides a type-safe wrapper around Chrome's scripting API.
 * This class allows you to execute JavaScript code in the context of web pages
 * loaded in the browser. It's particularly useful for content scripts and
 * page manipulations.
 */
class Scripting {
  /**
   * Executes a function in the context of a web page.
   * @param tabId - The ID of the tab to execute the function in
   * @param func - The function to execute
   * @param args - Arguments to pass to the function
   * @returns A promise that resolves to the result of the function execution
   * @throws {Error} If there's an error executing the function
   */
  public static async executeFunction(
    tabId: number, 
    func: (...args: any[]) => any, 
    ...args: any[]
  ) {
    console.log(`Executing function in tab ${tabId}:`, func.name || 'anonymous function');
    console.log('Arguments:', args);

    try {
      const [injectionResult] = await chrome.scripting.executeScript({
        target: { tabId },
        func,
        args,
        world: 'MAIN',
      });

      console.log('Injection result:', injectionResult);
      return injectionResult?.result;
    } catch (error) {
      console.error('Error executing function via Scripting API:', error);
      throw error;
    }
  }
}

export { Scripting };
