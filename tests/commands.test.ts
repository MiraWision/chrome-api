import { Commands } from '../src/commands';

describe('Commands', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (chrome.runtime as any).lastError = null;
  });

  describe('getAll', () => {
    it('should get all commands', async () => {
      const mockCommands = [
        { name: 'toggle-feature', shortcut: 'Ctrl+Shift+Y', description: 'Toggle feature' },
        { name: 'open-popup', shortcut: 'Ctrl+Shift+P', description: 'Open popup' },
      ];
      chrome.commands.getAll.mockImplementation(callback => callback(mockCommands));

      const result = await Commands.getAll();
      expect(result).toEqual(mockCommands);
      expect(chrome.commands.getAll).toHaveBeenCalledWith(expect.any(Function));
    });

    it('should handle errors', async () => {
      (chrome.runtime as any).lastError = { message: 'Error' };
      chrome.commands.getAll.mockImplementation(callback => callback([]));

      await expect(Commands.getAll()).rejects.toEqual({ message: 'Error' });
    });
  });

  describe('addCommandListener', () => {
    it('should add and remove command listener', () => {
      const callback = jest.fn();
      const removeListener = Commands.addCommandListener(callback);

      expect(chrome.commands.onCommand.addListener).toHaveBeenCalledWith(callback);
      removeListener();
      expect(chrome.commands.onCommand.removeListener).toHaveBeenCalledWith(callback);
    });

    it('should handle command triggers', () => {
      const callback = jest.fn();
      Commands.addCommandListener(callback);

      // Simulate command trigger
      const mockCommand = 'toggle-feature';
      const [registeredCallback] = (chrome.commands.onCommand.addListener as jest.Mock).mock.calls[0];
      registeredCallback(mockCommand);

      expect(callback).toHaveBeenCalledWith(mockCommand);
    });
  });
});