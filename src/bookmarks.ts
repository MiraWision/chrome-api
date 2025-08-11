interface BookmarkCreateArg {
  parentId?: string;
  index?: number;
  title?: string;
  url?: string;
}

interface BookmarkDestination {
  parentId?: string;
  index?: number;
}

interface BookmarkChanges {
  title?: string;
  url?: string;
}

interface RemoveInfo {
  parentId: string;
  index: number;
  node: BookmarkTreeNode;
}

interface ChangeInfo {
  title: string;
  url?: string;
}

interface MoveInfo {
  parentId: string;
  index: number;
  oldParentId: string;
  oldIndex: number;
}

type BookmarkTreeNode = chrome.bookmarks.BookmarkTreeNode;
type BookmarkSearchQuery = chrome.bookmarks.BookmarkSearchQuery;

/**
 * A class that provides a type-safe wrapper around Chrome's bookmarks API.
 * This class offers methods to create, read, update, and delete bookmarks,
 * as well as event listeners for bookmark changes.
 */
class Bookmarks {
  /**
   * Retrieves one or more bookmarks by their IDs.
   * @param idOrIdList - A single bookmark ID or an array of bookmark IDs
   * @returns A promise that resolves to an array of bookmark tree nodes
   * @throws {Error} If any of the bookmarks are not found or if there's an error
   */
  public static async get(idOrIdList: string | string[]): Promise<BookmarkTreeNode[]> {
    return new Promise((resolve, reject) => {
      chrome.bookmarks.get(Array.isArray(idOrIdList) ? idOrIdList : [idOrIdList], (results) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(results);
        }
      });
    });
  }

  /**
   * Retrieves the children of a bookmark folder.
   * @param id - The ID of the bookmark folder
   * @returns A promise that resolves to an array of bookmark tree nodes representing the children
   * @throws {Error} If the folder is not found or if there's an error
   */
  public static async getChildren(id: string): Promise<BookmarkTreeNode[]> {
    return new Promise((resolve, reject) => {
      chrome.bookmarks.getChildren(id, (results) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(results);
        }
      });
    });
  }

  /**
   * Retrieves the entire bookmark tree.
   * @returns A promise that resolves to an array of bookmark tree nodes representing the root
   * @throws {Error} If there's an error retrieving the bookmark tree
   */
  public static async getTree(): Promise<BookmarkTreeNode[]> {
    return new Promise((resolve, reject) => {
      chrome.bookmarks.getTree((results) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(results);
        }
      });
    });
  }

  /**
   * Searches for bookmarks matching the given query.
   * @param query - A string to search for in bookmark titles and URLs, or a BookmarkSearchQuery object
   * @returns A promise that resolves to an array of matching bookmark tree nodes
   * @throws {Error} If there's an error performing the search
   */
  public static async search(query: string | BookmarkSearchQuery): Promise<BookmarkTreeNode[]> {
    return new Promise((resolve, reject) => {
      if (typeof query === 'string') {
        chrome.bookmarks.search(query, (results) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(results);
          }
        });
      } else {
        chrome.bookmarks.search(query, (results) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(results);
          }
        });
      }
    });
  }

  /**
   * Creates a new bookmark or folder.
   * @param bookmark - The bookmark creation arguments including title, URL (optional), and parent ID
   * @returns A promise that resolves to the newly created bookmark tree node
   * @throws {Error} If there's an error creating the bookmark
   */
  public static async create(bookmark: BookmarkCreateArg): Promise<BookmarkTreeNode> {
    return new Promise((resolve, reject) => {
      chrome.bookmarks.create(bookmark, (result) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(result);
        }
      });
    });
  }

  /**
   * Moves a bookmark or folder to a different parent folder.
   * @param id - The ID of the bookmark or folder to move
   * @param destination - The destination information including parent ID and optional index
   * @returns A promise that resolves to the moved bookmark tree node
   * @throws {Error} If there's an error moving the bookmark
   */
  public static async move(id: string, destination: BookmarkDestination): Promise<BookmarkTreeNode> {
    return new Promise((resolve, reject) => {
      chrome.bookmarks.move(id, destination, (result) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(result);
        }
      });
    });
  }

  /**
   * Updates the properties of a bookmark or folder.
   * @param id - The ID of the bookmark or folder to update
   * @param changes - The changes to apply to the bookmark (title and/or URL)
   * @returns A promise that resolves to the updated bookmark tree node
   * @throws {Error} If there's an error updating the bookmark
   */
  public static async update(id: string, changes: BookmarkChanges): Promise<BookmarkTreeNode> {
    return new Promise((resolve, reject) => {
      chrome.bookmarks.update(id, changes, (result) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(result);
        }
      });
    });
  }

  /**
   * Removes a bookmark or an empty bookmark folder.
   * @param id - The ID of the bookmark or folder to remove
   * @returns A promise that resolves when the bookmark is removed
   * @throws {Error} If there's an error removing the bookmark or if the folder is not empty
   */
  public static async remove(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      chrome.bookmarks.remove(id, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    });
  }

  /**
   * Removes a bookmark folder and all its contents recursively.
   * @param id - The ID of the bookmark folder to remove
   * @returns A promise that resolves when the folder and its contents are removed
   * @throws {Error} If there's an error removing the folder or its contents
   */
  public static async removeTree(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      chrome.bookmarks.removeTree(id, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    });
  }

  /**
   * Adds a listener for bookmark creation events.
   * @param callback - Function called when a bookmark is created
   * @returns A function that removes the listener when called
   */
  public static addCreatedListener(callback: (id: string, bookmark: BookmarkTreeNode) => void): () => void {
    chrome.bookmarks.onCreated.addListener(callback);
    return () => chrome.bookmarks.onCreated.removeListener(callback);
  }

  /**
   * Adds a listener for bookmark removal events.
   * @param callback - Function called when a bookmark is removed
   * @returns A function that removes the listener when called
   */
  public static addRemovedListener(callback: (id: string, removeInfo: RemoveInfo) => void): () => void {
    chrome.bookmarks.onRemoved.addListener(callback);
    return () => chrome.bookmarks.onRemoved.removeListener(callback);
  }

  /**
   * Adds a listener for bookmark change events.
   * @param callback - Function called when a bookmark is modified
   * @returns A function that removes the listener when called
   */
  public static addChangedListener(callback: (id: string, changeInfo: ChangeInfo) => void): () => void {
    chrome.bookmarks.onChanged.addListener(callback);
    return () => chrome.bookmarks.onChanged.removeListener(callback);
  }

  /**
   * Adds a listener for bookmark move events.
   * @param callback - Function called when a bookmark is moved to a different location
   * @returns A function that removes the listener when called
   */
  public static addMovedListener(callback: (id: string, moveInfo: MoveInfo) => void): () => void {
    chrome.bookmarks.onMoved.addListener(callback);
    return () => chrome.bookmarks.onMoved.removeListener(callback);
  }
}

export {
  Bookmarks,
  BookmarkCreateArg,
  BookmarkDestination,
  BookmarkChanges,
  RemoveInfo,
  ChangeInfo,
  MoveInfo,
  BookmarkTreeNode,
  BookmarkSearchQuery
};