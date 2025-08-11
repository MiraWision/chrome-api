export interface CreateData {
  url?: string | string[];
  tabId?: number;
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  focused?: boolean;
  incognito?: boolean;
  type?: 'normal' | 'popup' | 'panel';
  state?: chrome.windows.WindowState;
}

export interface UpdateInfo {
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  focused?: boolean;
  drawAttention?: boolean;
  state?: chrome.windows.WindowState;
}

export interface QueryOptions {
  windowTypes?: chrome.windows.WindowType[];
  populate?: boolean;
  windowId?: number;
}