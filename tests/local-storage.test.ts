import { LocalStorage } from '../src/local-storage';

describe('LocalStorage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (chrome.runtime as any).lastError = null;
  });

  describe('get', () => {
    it('should get a value by key', async () => {
      const mockData = { testKey: 'testValue' };
      chrome.storage.local.get.mockImplementation((_, callback) => callback(mockData));

      const result = await LocalStorage.get('testKey');
      expect(result).toEqual(mockData);
      expect(chrome.storage.local.get).toHaveBeenCalledWith(['testKey'], expect.any(Function));
    });

    it('should handle errors', async () => {
      (chrome.runtime as any).lastError = { message: 'Error' };
      chrome.storage.local.get.mockImplementation((_, callback) => callback({}));

      await expect(LocalStorage.get('testKey')).rejects.toEqual({ message: 'Error' });
    });
  });

  describe('getAll', () => {
    it('should get all stored values', async () => {
      const mockData = {
        key1: 'value1',
        key2: 'value2',
      };
      chrome.storage.local.get.mockImplementation((_, callback) => callback(mockData));

      const result = await LocalStorage.getAll();
      expect(result).toEqual(mockData);
      expect(chrome.storage.local.get).toHaveBeenCalledWith(null, expect.any(Function));
    });
  });

  describe('set', () => {
    it('should set a value', async () => {
      chrome.storage.local.set.mockImplementation((_, callback) => callback());

      await LocalStorage.set('testKey', 'testValue');
      expect(chrome.storage.local.set).toHaveBeenCalledWith(
        { testKey: 'testValue' },
        expect.any(Function)
      );
    });

    it('should handle errors', async () => {
      (chrome.runtime as any).lastError = { message: 'Error' };
      chrome.storage.local.set.mockImplementation((_, callback) => callback());

      await expect(LocalStorage.set('testKey', 'testValue'))
        .rejects.toEqual({ message: 'Error' });
    });
  });

  describe('setBulk', () => {
    it('should set multiple values', async () => {
      const mockData = {
        key1: 'value1',
        key2: 'value2',
      };
      chrome.storage.local.set.mockImplementation((_, callback) => callback());

      await LocalStorage.setBulk(mockData);
      expect(chrome.storage.local.set).toHaveBeenCalledWith(mockData, expect.any(Function));
    });
  });

  describe('remove', () => {
    it('should remove a value', async () => {
      chrome.storage.local.remove.mockImplementation((_, callback) => callback());

      await LocalStorage.remove('testKey');
      expect(chrome.storage.local.remove).toHaveBeenCalledWith(['testKey'], expect.any(Function));
    });

    it('should handle errors', async () => {
      (chrome.runtime as any).lastError = { message: 'Error' };
      chrome.storage.local.remove.mockImplementation((_, callback) => callback());

      await expect(LocalStorage.remove('testKey')).rejects.toEqual({ message: 'Error' });
    });
  });

  describe('clear', () => {
    it('should clear all values', async () => {
      chrome.storage.local.clear.mockImplementation(callback => callback());

      await LocalStorage.clear();
      expect(chrome.storage.local.clear).toHaveBeenCalledWith(expect.any(Function));
    });

    it('should handle errors', async () => {
      (chrome.runtime as any).lastError = { message: 'Error' };
      chrome.storage.local.clear.mockImplementation(callback => callback());

      await expect(LocalStorage.clear()).rejects.toEqual({ message: 'Error' });
    });
  });
});