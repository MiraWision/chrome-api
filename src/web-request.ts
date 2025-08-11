interface RequestFilter {
  urls: string[];
  types?: chrome.webRequest.ResourceType[];
  tabId?: number;
  windowId?: number;
}

interface BlockingResponse {
  cancel?: boolean;
  redirectUrl?: string;
  requestHeaders?: chrome.webRequest.HttpHeader[];
  responseHeaders?: chrome.webRequest.HttpHeader[];
  authCredentials?: { username: string; password: string };
  upgradeToSecure?: boolean;
}

interface UploadData {
  bytes?: ArrayBuffer;
  file?: string;
}

class WebRequest {
  public static addBeforeRequestListener(
    filter: RequestFilter,
    callback: (details: chrome.webRequest.WebRequestBodyDetails) => BlockingResponse | undefined,
    extraInfoSpec?: ('blocking' | 'requestBody' | 'extraHeaders')[]
  ): void {
    chrome.webRequest.onBeforeRequest.addListener(
      callback,
      filter,
      extraInfoSpec
    );
  }

  public static addBeforeSendHeadersListener(
    filter: RequestFilter,
    callback: (details: chrome.webRequest.WebRequestHeadersDetails) => BlockingResponse | undefined,
    extraInfoSpec?: ('blocking' | 'requestHeaders' | 'extraHeaders')[]
  ): void {
    chrome.webRequest.onBeforeSendHeaders.addListener(
      callback,
      filter,
      extraInfoSpec
    );
  }

  public static addSendHeadersListener(
    filter: RequestFilter,
    callback: (details: chrome.webRequest.WebRequestHeadersDetails) => void,
    extraInfoSpec?: ('requestHeaders' | 'extraHeaders')[]
  ): void {
    chrome.webRequest.onSendHeaders.addListener(
      callback,
      filter,
      extraInfoSpec
    );
  }

  public static addHeadersReceivedListener(
    filter: RequestFilter,
    callback: (details: chrome.webRequest.WebResponseHeadersDetails) => BlockingResponse | undefined,
    extraInfoSpec?: ('blocking' | 'responseHeaders' | 'extraHeaders')[]
  ): void {
    chrome.webRequest.onHeadersReceived.addListener(
      callback,
      filter,
      extraInfoSpec
    );
  }

  public static addAuthRequiredListener(
    filter: RequestFilter,
    callback: (details: chrome.webRequest.WebAuthenticationChallengeDetails, callback?: (response: BlockingResponse) => void) => BlockingResponse | undefined,
    extraInfoSpec?: ('blocking' | 'asyncBlocking' | 'responseHeaders' | 'extraHeaders')[]
  ): void {
    chrome.webRequest.onAuthRequired.addListener(
      callback,
      filter,
      extraInfoSpec
    );
  }

  public static addResponseStartedListener(
    filter: RequestFilter,
    callback: (details: chrome.webRequest.WebResponseCacheDetails) => void,
    extraInfoSpec?: ('responseHeaders' | 'extraHeaders')[]
  ): void {
    chrome.webRequest.onResponseStarted.addListener(
      callback,
      filter,
      extraInfoSpec
    );
  }

  public static addBeforeRedirectListener(
    filter: RequestFilter,
    callback: (details: chrome.webRequest.WebRedirectionResponseDetails) => void,
    extraInfoSpec?: ('responseHeaders' | 'extraHeaders')[]
  ): void {
    chrome.webRequest.onBeforeRedirect.addListener(
      callback,
      filter,
      extraInfoSpec
    );
  }

  public static addCompletedListener(
    filter: RequestFilter,
    callback: (details: chrome.webRequest.WebResponseCacheDetails) => void,
    extraInfoSpec?: ('responseHeaders' | 'extraHeaders')[]
  ): void {
    chrome.webRequest.onCompleted.addListener(
      callback,
      filter,
      extraInfoSpec
    );
  }

  public static addErrorOccurredListener(
    filter: RequestFilter,
    callback: (details: chrome.webRequest.WebResponseErrorDetails) => void
  ): void {
    chrome.webRequest.onErrorOccurred.addListener(
      callback,
      filter
    );
  }

  public static removeBeforeRequestListener(
    callback: (details: chrome.webRequest.WebRequestBodyDetails) => BlockingResponse | undefined
  ): void {
    chrome.webRequest.onBeforeRequest.removeListener(callback);
  }

  public static removeBeforeSendHeadersListener(
    callback: (details: chrome.webRequest.WebRequestHeadersDetails) => BlockingResponse | undefined
  ): void {
    chrome.webRequest.onBeforeSendHeaders.removeListener(callback);
  }

  public static removeSendHeadersListener(
    callback: (details: chrome.webRequest.WebRequestHeadersDetails) => void
  ): void {
    chrome.webRequest.onSendHeaders.removeListener(callback);
  }

  public static removeHeadersReceivedListener(
    callback: (details: chrome.webRequest.WebResponseHeadersDetails) => BlockingResponse | undefined
  ): void {
    chrome.webRequest.onHeadersReceived.removeListener(callback);
  }

  public static removeAuthRequiredListener(
    callback: (details: chrome.webRequest.WebAuthenticationChallengeDetails, callback?: (response: BlockingResponse) => void) => BlockingResponse | undefined
  ): void {
    chrome.webRequest.onAuthRequired.removeListener(callback);
  }

  public static removeResponseStartedListener(
    callback: (details: chrome.webRequest.WebResponseCacheDetails) => void
  ): void {
    chrome.webRequest.onResponseStarted.removeListener(callback);
  }

  public static removeBeforeRedirectListener(
    callback: (details: chrome.webRequest.WebRedirectionResponseDetails) => void
  ): void {
    chrome.webRequest.onBeforeRedirect.removeListener(callback);
  }

  public static removeCompletedListener(
    callback: (details: chrome.webRequest.WebResponseCacheDetails) => void
  ): void {
    chrome.webRequest.onCompleted.removeListener(callback);
  }

  public static removeErrorOccurredListener(
    callback: (details: chrome.webRequest.WebResponseErrorDetails) => void
  ): void {
    chrome.webRequest.onErrorOccurred.removeListener(callback);
  }

  public static handlerBehaviorChanged(): Promise<void> {
    return new Promise((resolve, reject) => {
      chrome.webRequest.handlerBehaviorChanged(() => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    });
  }
}

export { WebRequest, RequestFilter, BlockingResponse, UploadData };