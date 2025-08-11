import { Bookmarks } from '../src/bookmarks';

describe('Bookmarks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (chrome.runtime as any).lastError = null;
  });

  describe('get', () => {
    it('should get bookmarks by ID', async () => {
      const mockBookmark = { id: '1', title: 'Test' };
      chrome.bookmarks.get.mockImplementation((_, callback) => callback([mockBookmark]));

      const result = await Bookmarks.get('1');
      expect(result).toEqual([mockBookmark]);
      expect(chrome.bookmarks.get).toHaveBeenCalledWith('1', expect.any(Function));
    });

    it('should handle errors', async () => {
      (chrome.runtime as any).lastError = { message: 'Error' };
      chrome.bookmarks.get.mockImplementation((_, callback) => callback([]));

      await expect(Bookmarks.get('1')).rejects.toEqual({ message: 'Error' });
    });
  });

  describe('getChildren', () => {
    it('should get bookmark children', async () => {
      const mockChildren = [{ id: '2', title: 'Child' }];
      chrome.bookmarks.getChildren.mockImplementation((_, callback) => callback(mockChildren));

      const result = await Bookmarks.getChildren('1');
      expect(result).toEqual(mockChildren);
      expect(chrome.bookmarks.getChildren).toHaveBeenCalledWith('1', expect.any(Function));
    });
  });

  describe('getTree', () => {
    it('should get bookmark tree', async () => {
      const mockTree = [{ id: '0', title: 'Root' }];
      chrome.bookmarks.getTree.mockImplementation(callback => callback(mockTree));

      const result = await Bookmarks.getTree();
      expect(result).toEqual(mockTree);
      expect(chrome.bookmarks.getTree).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  describe('search', () => {
    it('should search bookmarks', async () => {
      const mockResults = [{ id: '1', title: 'Test' }];
      chrome.bookmarks.search.mockImplementation((_, callback) => callback(mockResults));

      const result = await Bookmarks.search('test');
      expect(result).toEqual(mockResults);
      expect(chrome.bookmarks.search).toHaveBeenCalledWith('test', expect.any(Function));
    });
  });

  describe('create', () => {
    it('should create a bookmark', async () => {
      const mockBookmark = { id: '1', title: 'New', url: 'https://example.com' };
      chrome.bookmarks.create.mockImplementation((_, callback) => callback(mockBookmark));

      const result = await Bookmarks.create({ title: 'New', url: 'https://example.com' });
      expect(result).toEqual(mockBookmark);
      expect(chrome.bookmarks.create).toHaveBeenCalledWith(
        { title: 'New', url: 'https://example.com' },
        expect.any(Function)
      );
    });
  });

  describe('move', () => {
    it('should move a bookmark', async () => {
      const mockBookmark = { id: '1', title: 'Moved' };
      chrome.bookmarks.move.mockImplementation((_, __, callback) => callback(mockBookmark));

      const result = await Bookmarks.move('1', { parentId: '2' });
      expect(result).toEqual(mockBookmark);
      expect(chrome.bookmarks.move).toHaveBeenCalledWith('1', { parentId: '2' }, expect.any(Function));
    });
  });

  describe('update', () => {
    it('should update a bookmark', async () => {
      const mockBookmark = { id: '1', title: 'Updated' };
      chrome.bookmarks.update.mockImplementation((_, __, callback) => callback(mockBookmark));

      const result = await Bookmarks.update('1', { title: 'Updated' });
      expect(result).toEqual(mockBookmark);
      expect(chrome.bookmarks.update).toHaveBeenCalledWith('1', { title: 'Updated' }, expect.any(Function));
    });
  });

  describe('remove', () => {
    it('should remove a bookmark', async () => {
      chrome.bookmarks.remove.mockImplementation((_, callback) => callback());

      await Bookmarks.remove('1');
      expect(chrome.bookmarks.remove).toHaveBeenCalledWith('1', expect.any(Function));
    });
  });

  describe('removeTree', () => {
    it('should remove a bookmark tree', async () => {
      chrome.bookmarks.removeTree.mockImplementation((_, callback) => callback());

      await Bookmarks.removeTree('1');
      expect(chrome.bookmarks.removeTree).toHaveBeenCalledWith('1', expect.any(Function));
    });
  });

  describe('event listeners', () => {
    it('should add and remove created listener', () => {
      const callback = jest.fn();
      const removeListener = Bookmarks.addCreatedListener(callback);

      expect(chrome.bookmarks.onCreated.addListener).toHaveBeenCalledWith(callback);
      removeListener();
      expect(chrome.bookmarks.onCreated.removeListener).toHaveBeenCalledWith(callback);
    });

    it('should add and remove removed listener', () => {
      const callback = jest.fn();
      const removeListener = Bookmarks.addRemovedListener(callback);

      expect(chrome.bookmarks.onRemoved.addListener).toHaveBeenCalledWith(callback);
      removeListener();
      expect(chrome.bookmarks.onRemoved.removeListener).toHaveBeenCalledWith(callback);
    });

    it('should add and remove changed listener', () => {
      const callback = jest.fn();
      const removeListener = Bookmarks.addChangedListener(callback);

      expect(chrome.bookmarks.onChanged.addListener).toHaveBeenCalledWith(callback);
      removeListener();
      expect(chrome.bookmarks.onChanged.removeListener).toHaveBeenCalledWith(callback);
    });

    it('should add and remove moved listener', () => {
      const callback = jest.fn();
      const removeListener = Bookmarks.addMovedListener(callback);

      expect(chrome.bookmarks.onMoved.addListener).toHaveBeenCalledWith(callback);
      removeListener();
      expect(chrome.bookmarks.onMoved.removeListener).toHaveBeenCalledWith(callback);
    });
  });
});