import { Downloads } from '../src/downloads';

describe('Downloads', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (chrome.runtime as any).lastError = null;
  });

  describe('download', () => {
    it('should initiate a download', async () => {
      const downloadId = 123;
      chrome.downloads.download.mockImplementation((_, callback) => callback(downloadId));

      const result = await Downloads.download({ url: 'https://example.com/file.pdf' });
      expect(result).toBe(downloadId);
      expect(chrome.downloads.download).toHaveBeenCalledWith(
        { url: 'https://example.com/file.pdf' },
        expect.any(Function)
      );
    });

    it('should handle errors', async () => {
      (chrome.runtime as any).lastError = { message: 'Error' };
      chrome.downloads.download.mockImplementation((_, callback) => callback(0));

      await expect(Downloads.download({ url: 'invalid-url' }))
        .rejects.toEqual({ message: 'Error' });
    });
  });

  describe('search', () => {
    it('should search downloads', async () => {
      const mockDownloads = [
        { id: 1, filename: 'file1.pdf' },
        { id: 2, filename: 'file2.pdf' },
      ];
      chrome.downloads.search.mockImplementation((_, callback) => callback(mockDownloads));

      const result = await Downloads.search({ query: ['pdf'] });
      expect(result).toEqual(mockDownloads);
      expect(chrome.downloads.search).toHaveBeenCalledWith(
        { query: ['pdf'] },
        expect.any(Function)
      );
    });
  });

  describe('pause and resume', () => {
    it('should pause a download', async () => {
      chrome.downloads.pause.mockImplementation((_, callback) => callback());

      await Downloads.pause(123);
      expect(chrome.downloads.pause).toHaveBeenCalledWith(123, expect.any(Function));
    });

    it('should resume a download', async () => {
      chrome.downloads.resume.mockImplementation((_, callback) => callback());

      await Downloads.resume(123);
      expect(chrome.downloads.resume).toHaveBeenCalledWith(123, expect.any(Function));
    });
  });

  describe('cancel', () => {
    it('should cancel a download', async () => {
      chrome.downloads.cancel.mockImplementation((_, callback) => callback());

      await Downloads.cancel(123);
      expect(chrome.downloads.cancel).toHaveBeenCalledWith(123, expect.any(Function));
    });
  });

  describe('getFileIcon', () => {
    it('should get file icon', async () => {
      const iconUrl = 'chrome://favicon/icon.png';
      chrome.downloads.getFileIcon.mockImplementation((_, __, callback) => callback(iconUrl));

      const result = await Downloads.getFileIcon(123, { size: 32 });
      expect(result).toBe(iconUrl);
      expect(chrome.downloads.getFileIcon).toHaveBeenCalledWith(
        123,
        { size: 32 },
        expect.any(Function)
      );
    });

    it('should handle missing icon', async () => {
      chrome.downloads.getFileIcon.mockImplementation((_, __, callback) => callback(null));

      await expect(Downloads.getFileIcon(123))
        .rejects.toEqual(new Error('No icon URL returned'));
    });
  });

  describe('file operations', () => {
    it('should open a file', async () => {
      chrome.downloads.open.mockImplementation((_, callback) => callback());

      await Downloads.open(123);
      expect(chrome.downloads.open).toHaveBeenCalledWith(123, expect.any(Function));
    });

    it('should show a file', async () => {
      await Downloads.show(123);
      expect(chrome.downloads.show).toHaveBeenCalledWith(123);
    });

    it('should show default folder', async () => {
      await Downloads.showDefaultFolder();
      expect(chrome.downloads.showDefaultFolder).toHaveBeenCalled();
    });
  });

  describe('history management', () => {
    it('should erase downloads', async () => {
      const erasedIds = [1, 2, 3];
      chrome.downloads.erase.mockImplementation((_, callback) => callback(erasedIds));

      const result = await Downloads.erase({ query: ['pdf'] });
      expect(result).toEqual(erasedIds);
      expect(chrome.downloads.erase).toHaveBeenCalledWith(
        { query: ['pdf'] },
        expect.any(Function)
      );
    });

    it('should remove a file', async () => {
      chrome.downloads.removeFile.mockImplementation((_, callback) => callback());

      await Downloads.removeFile(123);
      expect(chrome.downloads.removeFile).toHaveBeenCalledWith(123, expect.any(Function));
    });
  });

  describe('event listeners', () => {
    it('should add and remove created listener', () => {
      const callback = jest.fn();
      Downloads.addCreatedListener(callback);
      Downloads.removeCreatedListener(callback);

      expect(chrome.downloads.onCreated.addListener).toHaveBeenCalledWith(callback);
      expect(chrome.downloads.onCreated.removeListener).toHaveBeenCalledWith(callback);
    });

    it('should add and remove erased listener', () => {
      const callback = jest.fn();
      Downloads.addErasedListener(callback);
      Downloads.removeErasedListener(callback);

      expect(chrome.downloads.onErased.addListener).toHaveBeenCalledWith(callback);
      expect(chrome.downloads.onErased.removeListener).toHaveBeenCalledWith(callback);
    });

    it('should add and remove changed listener', () => {
      const callback = jest.fn();
      Downloads.addChangedListener(callback);
      Downloads.removeChangedListener(callback);

      expect(chrome.downloads.onChanged.addListener).toHaveBeenCalledWith(callback);
      expect(chrome.downloads.onChanged.removeListener).toHaveBeenCalledWith(callback);
    });

    it('should add and remove determining filename listener', () => {
      const callback = jest.fn();
      Downloads.addDeterminingFilenameListener(callback);
      Downloads.removeDeterminingFilenameListener(callback);

      expect(chrome.downloads.onDeterminingFilename.addListener).toHaveBeenCalledWith(callback);
      expect(chrome.downloads.onDeterminingFilename.removeListener).toHaveBeenCalledWith(callback);
    });

    it('should handle download events', () => {
      const createdCallback = jest.fn();
      const erasedCallback = jest.fn();
      const changedCallback = jest.fn();
      const determiningFilenameCallback = jest.fn();

      Downloads.addCreatedListener(createdCallback);
      Downloads.addErasedListener(erasedCallback);
      Downloads.addChangedListener(changedCallback);
      Downloads.addDeterminingFilenameListener(determiningFilenameCallback);

      // Simulate events
      const mockDownload = { id: 123, filename: 'test.pdf' };
      const mockDelta = { id: 123, state: { current: 'complete' } };
      const mockSuggest = jest.fn();

      const [createdCb] = (chrome.downloads.onCreated.addListener as jest.Mock).mock.calls[0];
      const [erasedCb] = (chrome.downloads.onErased.addListener as jest.Mock).mock.calls[0];
      const [changedCb] = (chrome.downloads.onChanged.addListener as jest.Mock).mock.calls[0];
      const [determiningFilenameCb] = (chrome.downloads.onDeterminingFilename.addListener as jest.Mock).mock.calls[0];

      createdCb(mockDownload);
      erasedCb(123);
      changedCb(mockDelta);
      determiningFilenameCb(mockDownload, mockSuggest);

      expect(createdCallback).toHaveBeenCalledWith(mockDownload);
      expect(erasedCallback).toHaveBeenCalledWith(123);
      expect(changedCallback).toHaveBeenCalledWith(mockDelta);
      expect(determiningFilenameCallback).toHaveBeenCalledWith(mockDownload, mockSuggest);
    });
  });
});