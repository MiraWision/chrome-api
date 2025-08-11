/**
 * A class that provides a type-safe wrapper around Chrome's side panel API.
 * This class allows you to control the browser's side panel functionality,
 * including opening the panel and configuring its options.
 */
class SidePanel {
  /**
   * Opens the side panel for a specific tab.
   * @param tabId - The ID of the tab to open the side panel for
   */
  public static open(tabId: number): void {
    chrome.sidePanel.open({ tabId });
  }

  /**
   * Sets options for the side panel.
   * @param options - The options to configure the side panel with
   */
  public static setOptions(options: chrome.sidePanel.PanelOptions): void {
    chrome.sidePanel.setOptions(options);
  }
}

export { SidePanel };
