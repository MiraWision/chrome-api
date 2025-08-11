import { ContextMenu } from '../src/context-menu';

describe('ContextMenu', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (chrome.runtime as any).lastError = null;
  });

  describe('create', () => {
    it('should create a context menu item with default context', () => {
      ContextMenu.create('test-id', 'Test Menu');
      expect(chrome.contextMenus.create).toHaveBeenCalledWith({
        id: 'test-id',
        title: 'Test Menu',
        contexts: ['page'],
      });
    });

    it('should create a context menu item with custom contexts', () => {
      ContextMenu.create('test-id', 'Test Menu', ['selection', 'link']);
      expect(chrome.contextMenus.create).toHaveBeenCalledWith({
        id: 'test-id',
        title: 'Test Menu',
        contexts: ['selection', 'link'],
      });
    });
  });

  describe('addClickListener', () => {
    it('should add and remove click listener', () => {
      const callback = jest.fn();
      const removeListener = ContextMenu.addClickListener(callback);

      expect(chrome.contextMenus.onClicked.addListener).toHaveBeenCalledWith(callback);
      removeListener();
      expect(chrome.contextMenus.onClicked.removeListener).toHaveBeenCalledWith(callback);
    });

    it('should handle click events', () => {
      const callback = jest.fn();
      ContextMenu.addClickListener(callback);

      // Simulate click event
      const mockInfo = {
        menuItemId: 'test-id',
        pageUrl: 'https://example.com',
        selectionText: 'Selected text',
      };
      const mockTab = {
        id: 1,
        url: 'https://example.com',
      };

      const [registeredCallback] = (chrome.contextMenus.onClicked.addListener as jest.Mock).mock.calls[0];
      registeredCallback(mockInfo, mockTab);

      expect(callback).toHaveBeenCalledWith(mockInfo, mockTab);
    });
  });
});