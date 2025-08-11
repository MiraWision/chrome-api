import { StorageSync } from '../src/storage-sync';

describe('StorageSync', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (chrome.runtime as any).lastError = null;
  });

  describe('get', () => {
    it('should get a value by key', async () => {
      const mockData = { testKey: 'testValue' };
      chrome.storage.sync.get.mockImplementation((_, callback) => callback(mockData));

      const result = await StorageSync.get('testKey');
      expect(result).toEqual(mockData);
      expect(chrome.storage.sync.get).toHaveBeenCalledWith(['testKey'], expect.any(Function));
    });

    it('should handle errors', async () => {
      (chrome.runtime as any).lastError = { message: 'Error' };
      chrome.storage.sync.get.mockImplementation((_, callback) => callback({}));

      await expect(StorageSync.get('testKey')).rejects.toEqual({ message: 'Error' });
    });
  });

  describe('getAll', () => {
    it('should get all stored values', async () => {
      const mockData = {
        key1: 'value1',
        key2: 'value2',
      };
      chrome.storage.sync.get.mockImplementation((_, callback) => callback(mockData));

      const result = await StorageSync.getAll();
      expect(result).toEqual(mockData);
      expect(chrome.storage.sync.get).toHaveBeenCalledWith(null, expect.any(Function));
    });
  });

  describe('set', () => {
    it('should set a value', async () => {
      chrome.storage.sync.set.mockImplementation((_, callback) => callback());

      await StorageSync.set('testKey', 'testValue');
      expect(chrome.storage.sync.set).toHaveBeenCalledWith(
        { testKey: 'testValue' },
        expect.any(Function)
      );
    });

    it('should handle errors', async () => {
      (chrome.runtime as any).lastError = { message: 'Error' };
      chrome.storage.sync.set.mockImplementation((_, callback) => callback());

      await expect(StorageSync.set('testKey', 'testValue'))
        .rejects.toEqual({ message: 'Error' });
    });
  });

  describe('setBulk', () => {
    it('should set multiple values', async () => {
      const mockData = {
        key1: 'value1',
        key2: 'value2',
      };
      chrome.storage.sync.set.mockImplementation((_, callback) => callback());

      await StorageSync.setBulk(mockData);
      expect(chrome.storage.sync.set).toHaveBeenCalledWith(mockData, expect.any(Function));
    });
  });

  describe('remove', () => {
    it('should remove a value', async () => {
      chrome.storage.sync.remove.mockImplementation((_, callback) => callback());

      await StorageSync.remove('testKey');
      expect(chrome.storage.sync.remove).toHaveBeenCalledWith(['testKey'], expect.any(Function));
    });

    it('should handle errors', async () => {
      (chrome.runtime as any).lastError = { message: 'Error' };
      chrome.storage.sync.remove.mockImplementation((_, callback) => callback());

      await expect(StorageSync.remove('testKey')).rejects.toEqual({ message: 'Error' });
    });
  });

  describe('clear', () => {
    it('should clear all values', async () => {
      chrome.storage.sync.clear.mockImplementation(callback => callback());

      await StorageSync.clear();
      expect(chrome.storage.sync.clear).toHaveBeenCalledWith(expect.any(Function));
    });

    it('should handle errors', async () => {
      (chrome.runtime as any).lastError = { message: 'Error' };
      chrome.storage.sync.clear.mockImplementation(callback => callback());

      await expect(StorageSync.clear()).rejects.toEqual({ message: 'Error' });
    });
  });

  describe('addChangedListener', () => {
    it('should add and remove change listener', () => {
      const callback = jest.fn();
      const removeListener = StorageSync.addChangedListener(callback);

      expect(chrome.storage.onChanged.addListener).toHaveBeenCalledWith(callback);
      removeListener();
      expect(chrome.storage.onChanged.removeListener).toHaveBeenCalledWith(callback);
    });

    it('should handle storage changes', () => {
      const callback = jest.fn();
      StorageSync.addChangedListener(callback);

      // Simulate storage change
      const changes = {
        key1: { oldValue: 'old', newValue: 'new' },
      };
      const areaName = 'sync';

      const [registeredCallback] = (chrome.storage.onChanged.addListener as jest.Mock).mock.calls[0];
      registeredCallback(changes, areaName);

      expect(callback).toHaveBeenCalledWith(changes, areaName);
    });
  });
});