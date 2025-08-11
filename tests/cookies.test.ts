import { Cookies } from '../src/cookies';

describe('Cookies', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (chrome.runtime as any).lastError = null;
  });

  describe('get', () => {
    it('should get a cookie by details', async () => {
      const mockCookie = { name: 'test', value: 'value', domain: 'example.com' };
      chrome.cookies.get.mockImplementation((_, callback) => callback(mockCookie));

      const result = await Cookies.get({ url: 'https://example.com', name: 'test' });
      expect(result).toEqual(mockCookie);
      expect(chrome.cookies.get).toHaveBeenCalledWith(
        { url: 'https://example.com', name: 'test' },
        expect.any(Function)
      );
    });

    it('should handle errors', async () => {
      (chrome.runtime as any).lastError = { message: 'Error' };
      chrome.cookies.get.mockImplementation((_, callback) => callback(null));

      await expect(Cookies.get({ url: 'https://example.com', name: 'test' }))
        .rejects.toEqual({ message: 'Error' });
    });
  });

  describe('getAll', () => {
    it('should get all cookies matching query', async () => {
      const mockCookies = [
        { name: 'test1', value: 'value1', domain: 'example.com' },
        { name: 'test2', value: 'value2', domain: 'example.com' },
      ];
      chrome.cookies.getAll.mockImplementation((_, callback) => callback(mockCookies));

      const result = await Cookies.getAll({ domain: 'example.com' });
      expect(result).toEqual(mockCookies);
      expect(chrome.cookies.getAll).toHaveBeenCalledWith(
        { domain: 'example.com' },
        expect.any(Function)
      );
    });
  });

  describe('set', () => {
    it('should set a cookie', async () => {
      const mockCookie = { name: 'test', value: 'value', domain: 'example.com' };
      chrome.cookies.set.mockImplementation((_, callback) => callback(mockCookie));

      const result = await Cookies.set({
        url: 'https://example.com',
        name: 'test',
        value: 'value',
      });
      expect(result).toEqual(mockCookie);
      expect(chrome.cookies.set).toHaveBeenCalledWith(
        { url: 'https://example.com', name: 'test', value: 'value' },
        expect.any(Function)
      );
    });
  });

  describe('remove', () => {
    it('should remove a cookie', async () => {
      const details = { url: 'https://example.com', name: 'test' };
      chrome.cookies.remove.mockImplementation((_, callback) => callback(details));

      const result = await Cookies.remove(details);
      expect(result).toEqual(details);
      expect(chrome.cookies.remove).toHaveBeenCalledWith(details, expect.any(Function));
    });
  });

  describe('getAllCookieStores', () => {
    it('should get all cookie stores', async () => {
      const mockStores = [
        { id: '1', tabIds: [1, 2] },
        { id: '2', tabIds: [3, 4] },
      ];
      chrome.cookies.getAllCookieStores.mockImplementation(callback => callback(mockStores));

      const result = await Cookies.getAllCookieStores();
      expect(result).toEqual(mockStores);
      expect(chrome.cookies.getAllCookieStores).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  describe('addChangedListener', () => {
    it('should add and remove change listener', () => {
      const callback = jest.fn();
      const removeListener = Cookies.addChangedListener(callback);

      expect(chrome.cookies.onChanged.addListener).toHaveBeenCalledWith(callback);
      removeListener();
      expect(chrome.cookies.onChanged.removeListener).toHaveBeenCalledWith(callback);
    });

    it('should handle cookie change events', () => {
      const callback = jest.fn();
      Cookies.addChangedListener(callback);

      // Simulate cookie change event
      const mockChangeInfo = {
        removed: false,
        cookie: { name: 'test', value: 'value', domain: 'example.com' },
        cause: 'explicit',
      };

      const [registeredCallback] = (chrome.cookies.onChanged.addListener as jest.Mock).mock.calls[0];
      registeredCallback(mockChangeInfo);

      expect(callback).toHaveBeenCalledWith(mockChangeInfo);
    });
  });
});