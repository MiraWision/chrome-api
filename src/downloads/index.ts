import { DownloadOptions, DownloadQuery } from './types';

/**
 * A class that provides a type-safe wrapper around Chrome's downloads API.
 * This class allows you to download files, manage downloads, and monitor download progress.
 * It provides functionality for starting, pausing, resuming, and canceling downloads,
 * as well as managing download history and file system interactions.
 */
class Downloads {
  /**
   * Initiates a download.
   * @param options - The download options including URL and optional filename
   * @returns A promise that resolves to the download ID
   * @throws {Error} If there's an error starting the download
   */
  public static async download(options: DownloadOptions): Promise<number> {
    return new Promise((resolve, reject) => {
      chrome.downloads.download(options, (downloadId) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(downloadId);
        }
      });
    });
  }

  /**
   * Searches for downloads matching the given criteria.
   * @param query - The search criteria
   * @returns A promise that resolves to an array of matching download items
   * @throws {Error} If there's an error performing the search
   */
  public static async search(query: DownloadQuery): Promise<chrome.downloads.DownloadItem[]> {
    return new Promise((resolve, reject) => {
      chrome.downloads.search(query, (results) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(results);
        }
      });
    });
  }

  /**
   * Pauses a download.
   * @param downloadId - The ID of the download to pause
   * @returns A promise that resolves when the download is paused
   * @throws {Error} If there's an error pausing the download
   */
  public static async pause(downloadId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      chrome.downloads.pause(downloadId, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    });
  }

  /**
   * Resumes a paused download.
   * @param downloadId - The ID of the download to resume
   * @returns A promise that resolves when the download is resumed
   * @throws {Error} If there's an error resuming the download
   */
  public static async resume(downloadId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      chrome.downloads.resume(downloadId, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    });
  }

  /**
   * Cancels a download.
   * @param downloadId - The ID of the download to cancel
   * @returns A promise that resolves when the download is cancelled
   * @throws {Error} If there's an error cancelling the download
   */
  public static async cancel(downloadId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      chrome.downloads.cancel(downloadId, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    });
  }

  /**
   * Retrieves the icon for a downloaded file.
   * @param downloadId - The ID of the download
   * @param options - Optional settings for the icon (size: 16 or 32 pixels)
   * @returns A promise that resolves to the icon URL
   * @throws {Error} If there's an error retrieving the icon or if no icon is available
   */
  public static async getFileIcon(downloadId: number, options?: { size?: 16 | 32 }): Promise<string> {
    return new Promise((resolve, reject) => {
      chrome.downloads.getFileIcon(downloadId, options || {}, (iconUrl) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          if (!iconUrl) reject(new Error('No icon URL returned'));
          else resolve(iconUrl);
        }
      });
    });
  }

  /**
   * Opens a downloaded file.
   * @param downloadId - The ID of the download to open
   * @returns A promise that resolves when the file is opened
   * @throws {Error} If there's an error opening the file
   */
  public static async open(downloadId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      chrome.downloads.open(downloadId, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    });
  }

  /**
   * Shows a downloaded file in its folder.
   * @param downloadId - The ID of the download to show
   * @returns A promise that resolves when the file is shown
   */
  public static async show(downloadId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      chrome.downloads.show(downloadId);
      resolve();
    });
  }

  /**
   * Shows the default downloads folder.
   * @returns A promise that resolves when the folder is shown
   */
  public static async showDefaultFolder(): Promise<void> {
    return new Promise((resolve, reject) => {
      chrome.downloads.showDefaultFolder();
      resolve();
    });
  }

  /**
   * Erases matching downloads from history.
   * @param query - The criteria for downloads to erase
   * @returns A promise that resolves to an array of erased download IDs
   * @throws {Error} If there's an error erasing the downloads
   */
  public static async erase(query: DownloadQuery): Promise<number[]> {
    return new Promise((resolve, reject) => {
      chrome.downloads.erase(query, (erasedIds) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(erasedIds);
        }
      });
    });
  }

  /**
   * Removes a downloaded file from disk.
   * @param downloadId - The ID of the download to remove
   * @returns A promise that resolves when the file is removed
   * @throws {Error} If there's an error removing the file
   */
  public static async removeFile(downloadId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      chrome.downloads.removeFile(downloadId, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    });
  }

  /**
   * Adds a listener for download creation events.
   * @param callback - Function called when a new download is created
   */
  public static addCreatedListener(callback: (downloadItem: chrome.downloads.DownloadItem) => void): void {
    chrome.downloads.onCreated.addListener(callback);
  }

  /**
   * Adds a listener for download erasure events.
   * @param callback - Function called when a download is erased from history
   */
  public static addErasedListener(callback: (downloadId: number) => void): void {
    chrome.downloads.onErased.addListener(callback);
  }

  /**
   * Adds a listener for download state change events.
   * @param callback - Function called when a download's state changes
   */
  public static addChangedListener(callback: (downloadDelta: chrome.downloads.DownloadDelta) => void): void {
    chrome.downloads.onChanged.addListener(callback);
  }

  /**
   * Adds a listener for filename determination events.
   * @param callback - Function called when a download's filename is being determined
   */
  public static addDeterminingFilenameListener(
    callback: (downloadItem: chrome.downloads.DownloadItem, suggest: (suggestion?: chrome.downloads.FilenameSuggestion) => void) => void
  ): void {
    chrome.downloads.onDeterminingFilename.addListener(callback);
  }

  /**
   * Removes a listener for download creation events.
   * @param callback - The listener function to remove
   */
  public static removeCreatedListener(callback: (downloadItem: chrome.downloads.DownloadItem) => void): void {
    chrome.downloads.onCreated.removeListener(callback);
  }

  /**
   * Removes a listener for download erasure events.
   * @param callback - The listener function to remove
   */
  public static removeErasedListener(callback: (downloadId: number) => void): void {
    chrome.downloads.onErased.removeListener(callback);
  }

  /**
   * Removes a listener for download state change events.
   * @param callback - The listener function to remove
   */
  public static removeChangedListener(callback: (downloadDelta: chrome.downloads.DownloadDelta) => void): void {
    chrome.downloads.onChanged.removeListener(callback);
  }

  /**
   * Removes a listener for filename determination events.
   * @param callback - The listener function to remove
   */
  public static removeDeterminingFilenameListener(
    callback: (downloadItem: chrome.downloads.DownloadItem, suggest: (suggestion?: chrome.downloads.FilenameSuggestion) => void) => void
  ): void {
    chrome.downloads.onDeterminingFilename.removeListener(callback);
  }
}

export { Downloads };