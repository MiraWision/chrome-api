export interface RequestFilter {
  urls: string[];
  types?: chrome.webRequest.ResourceType[];
  tabId?: number;
  windowId?: number;
}

export interface BlockingResponse {
  cancel?: boolean;
  redirectUrl?: string;
  requestHeaders?: chrome.webRequest.HttpHeaders;
  responseHeaders?: chrome.webRequest.HttpHeaders;
  authCredentials?: chrome.webRequest.BlockingResponse.AuthCredentials;
  upgradeToSecure?: boolean;
}

export interface UploadData {
  bytes?: ArrayBuffer;
  file?: string;
}