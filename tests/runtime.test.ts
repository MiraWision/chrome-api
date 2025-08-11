import { Runtime } from '../src/runtime';

describe('Runtime', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (chrome.runtime as any).lastError = null;
  });

  describe('sendMessage', () => {
    it('should send a message and receive response', async () => {
      const message = { type: 'test', data: 'test-data' };
      const response = { success: true };

      chrome.runtime.sendMessage.mockImplementation((msg, callback) => callback(response));

      const result = await Runtime.sendMessage(message);
      expect(result).toEqual(response);
      expect(chrome.runtime.sendMessage).toHaveBeenCalledWith(message, expect.any(Function));
    });
  });

  describe('addMessageListener', () => {
    it('should add and remove message listener', () => {
      const callback = jest.fn();
      const removeListener = Runtime.addMessageListener(callback);

      expect(chrome.runtime.onMessage.addListener).toHaveBeenCalledWith(callback);
      removeListener();
      expect(chrome.runtime.onMessage.removeListener).toHaveBeenCalledWith(callback);
    });

    it('should handle messages', () => {
      const callback = jest.fn();
      const sendResponse = jest.fn();
      Runtime.addMessageListener(callback);

      // Simulate message
      const message = { type: 'test', data: 'test-data' };
      const sender = { id: 'test-extension' };

      const [registeredCallback] = (chrome.runtime.onMessage.addListener as jest.Mock).mock.calls[0];
      registeredCallback(message, sender, sendResponse);

      expect(callback).toHaveBeenCalledWith(message, sender, sendResponse);
    });
  });

  describe('addExternalMessageListener', () => {
    it('should add and remove external message listener', () => {
      const callback = jest.fn();
      const removeListener = Runtime.addExternalMessageListener(callback);

      expect(chrome.runtime.onMessageExternal.addListener).toHaveBeenCalledWith(callback);
      removeListener();
      expect(chrome.runtime.onMessageExternal.removeListener).toHaveBeenCalledWith(callback);
    });

    it('should handle external messages', () => {
      const callback = jest.fn();
      const sendResponse = jest.fn();
      Runtime.addExternalMessageListener(callback);

      // Simulate external message
      const message = { type: 'external', data: 'external-data' };
      const sender = { id: 'external-extension' };

      const [registeredCallback] = (chrome.runtime.onMessageExternal.addListener as jest.Mock).mock.calls[0];
      registeredCallback(message, sender, sendResponse);

      expect(callback).toHaveBeenCalledWith(message, sender, sendResponse);
    });
  });

  describe('getManifest', () => {
    it('should get extension manifest', async () => {
      const manifest = {
        manifest_version: 2,
        name: 'Test Extension',
        version: '1.0.0',
      };

      chrome.runtime.getManifest.mockReturnValue(manifest);

      const result = await Runtime.getManifest();
      expect(result).toEqual(manifest);
      expect(chrome.runtime.getManifest).toHaveBeenCalled();
    });
  });
});