/**
 * A class that provides a type-safe wrapper around Chrome's context menu API.
 * This class allows you to create context menu items and handle their click events.
 * Context menus appear when users right-click in your extension's allowed contexts.
 */
class ContextMenu {
  /**
   * Creates a new context menu item.
   * @param id - Unique identifier for the menu item
   * @param title - Text to be displayed in the menu
   * @param contexts - Array of contexts where the menu item will appear (defaults to ['page'])
   */
  public static create(id: string, title: string, contexts: chrome.contextMenus.CreateProperties['contexts'] = ['page']) {
    chrome.contextMenus.create({ id, title, contexts });
  }

  /**
   * Adds a listener for context menu item clicks.
   * @param callback - Function called when a menu item is clicked
   * @returns A function that removes the listener when called
   */
  public static addClickListener(callback: (info: chrome.contextMenus.OnClickData, tab?: chrome.tabs.Tab) => void): () => void {
    chrome.contextMenus.onClicked.addListener(callback);
    return () => chrome.contextMenus.onClicked.removeListener(callback);
  }
}

export { ContextMenu };
