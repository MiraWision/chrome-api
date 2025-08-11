import { Scripting } from '../src/scripting';

describe('Scripting', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (chrome.runtime as any).lastError = null;
    // Spy on console methods
    jest.spyOn(console, 'log').mockImplementation();
    jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('executeFunction', () => {
    it('should execute a function in a tab', async () => {
      const mockResult = { result: 'test result' };
      chrome.scripting.executeScript.mockResolvedValue([mockResult]);

      const testFunc = (arg1: string, arg2: number) => `${arg1} ${arg2}`;
      const result = await Scripting.executeFunction(123, testFunc, 'test', 42);

      expect(result).toBe(mockResult.result);
      expect(chrome.scripting.executeScript).toHaveBeenCalledWith({
        target: { tabId: 123 },
        func: testFunc,
        args: ['test', 42],
        world: 'MAIN',
      });

      // Verify logging
      expect(console.log).toHaveBeenCalledWith(
        'Executing function in tab 123:',
        'testFunc'
      );
      expect(console.log).toHaveBeenCalledWith('Arguments:', ['test', 42]);
      expect(console.log).toHaveBeenCalledWith('Injection result:', mockResult);
    });

    it('should handle anonymous functions', async () => {
      const mockResult = { result: 'test result' };
      chrome.scripting.executeScript.mockResolvedValue([mockResult]);

      const anonymousFunc = function(arg: string) { return arg; };
      await Scripting.executeFunction(123, anonymousFunc, 'test');

      expect(console.log).toHaveBeenCalledWith(
        'Executing function in tab 123:',
        'anonymous function'
      );
    });

    it('should handle execution errors', async () => {
      const error = new Error('Execution failed');
      chrome.scripting.executeScript.mockRejectedValue(error);

      const testFunc = () => 'test';
      await expect(Scripting.executeFunction(123, testFunc))
        .rejects.toThrow('Execution failed');

      expect(console.error).toHaveBeenCalledWith(
        'Error executing function via Scripting API:',
        error
      );
    });

    it('should handle undefined result', async () => {
      chrome.scripting.executeScript.mockResolvedValue([]);

      const testFunc = () => 'test';
      const result = await Scripting.executeFunction(123, testFunc);

      expect(result).toBeUndefined();
    });

    it('should pass multiple arguments correctly', async () => {
      const mockResult = { result: 'test result' };
      chrome.scripting.executeScript.mockResolvedValue([mockResult]);

      const testFunc = (a: number, b: string, c: boolean) => `${a} ${b} ${c}`;
      await Scripting.executeFunction(123, testFunc, 1, 'two', true);

      expect(chrome.scripting.executeScript).toHaveBeenCalledWith({
        target: { tabId: 123 },
        func: testFunc,
        args: [1, 'two', true],
        world: 'MAIN',
      });
    });
  });
});