interface NavigationFilter {
  url: chrome.events.UrlFilter[];
}

class WebNavigation {
  public static async getAllFrames(details: { tabId: number }): Promise<chrome.webNavigation.GetAllFrameResultDetails[] | null> {
    return new Promise((resolve, reject) => {
      chrome.webNavigation.getAllFrames(details, (frames) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(frames);
        }
      });
    });
  }

  public static async getFrame(details: chrome.webNavigation.GetFrameDetails): Promise<chrome.webNavigation.GetFrameResultDetails | null> {
    return new Promise((resolve, reject) => {
      chrome.webNavigation.getFrame(details, (frame) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(frame);
        }
      });
    });
  }

  public static addBeforeNavigateListener(
    callback: (details: chrome.webNavigation.WebNavigationParentedCallbackDetails) => void,
    filters?: NavigationFilter
  ): void {
    if (filters) {
      chrome.webNavigation.onBeforeNavigate.addListener(callback, filters);
    } else {
      chrome.webNavigation.onBeforeNavigate.addListener(callback);
    }
  }

  public static addCommittedListener(
    callback: (details: chrome.webNavigation.WebNavigationTransitionCallbackDetails) => void,
    filters?: NavigationFilter
  ): void {
    if (filters) {
      chrome.webNavigation.onCommitted.addListener(callback, filters);
    } else {
      chrome.webNavigation.onCommitted.addListener(callback);
    }
  }

  public static addCompletedListener(
    callback: (details: chrome.webNavigation.WebNavigationFramedCallbackDetails) => void,
    filters?: NavigationFilter
  ): void {
    if (filters) {
      chrome.webNavigation.onCompleted.addListener(callback, filters);
    } else {
      chrome.webNavigation.onCompleted.addListener(callback);
    }
  }

  public static addDOMContentLoadedListener(
    callback: (details: chrome.webNavigation.WebNavigationFramedCallbackDetails) => void,
    filters?: NavigationFilter
  ): void {
    if (filters) {
      chrome.webNavigation.onDOMContentLoaded.addListener(callback, filters);
    } else {
      chrome.webNavigation.onDOMContentLoaded.addListener(callback);
    }
  }

  public static addErrorOccurredListener(
    callback: (details: chrome.webNavigation.WebNavigationFramedErrorCallbackDetails) => void,
    filters?: NavigationFilter
  ): void {
    if (filters) {
      chrome.webNavigation.onErrorOccurred.addListener(callback, filters);
    } else {
      chrome.webNavigation.onErrorOccurred.addListener(callback);
    }
  }

  public static addHistoryStateUpdatedListener(
    callback: (details: chrome.webNavigation.WebNavigationTransitionCallbackDetails) => void,
    filters?: NavigationFilter
  ): void {
    if (filters) {
      chrome.webNavigation.onHistoryStateUpdated.addListener(callback, filters);
    } else {
      chrome.webNavigation.onHistoryStateUpdated.addListener(callback);
    }
  }

  public static addReferenceFragmentUpdatedListener(
    callback: (details: chrome.webNavigation.WebNavigationTransitionCallbackDetails) => void,
    filters?: NavigationFilter
  ): void {
    if (filters) {
      chrome.webNavigation.onReferenceFragmentUpdated.addListener(callback, filters);
    } else {
      chrome.webNavigation.onReferenceFragmentUpdated.addListener(callback);
    }
  }

  public static addTabReplacedListener(
    callback: (details: chrome.webNavigation.WebNavigationReplacementCallbackDetails) => void
  ): void {
    chrome.webNavigation.onTabReplaced.addListener(callback);
  }

  public static removeBeforeNavigateListener(
    callback: (details: chrome.webNavigation.WebNavigationParentedCallbackDetails) => void
  ): void {
    chrome.webNavigation.onBeforeNavigate.removeListener(callback);
  }

  public static removeCommittedListener(
    callback: (details: chrome.webNavigation.WebNavigationTransitionCallbackDetails) => void
  ): void {
    chrome.webNavigation.onCommitted.removeListener(callback);
  }

  public static removeCompletedListener(
    callback: (details: chrome.webNavigation.WebNavigationFramedCallbackDetails) => void
  ): void {
    chrome.webNavigation.onCompleted.removeListener(callback);
  }

  public static removeDOMContentLoadedListener(
    callback: (details: chrome.webNavigation.WebNavigationFramedCallbackDetails) => void
  ): void {
    chrome.webNavigation.onDOMContentLoaded.removeListener(callback);
  }

  public static removeErrorOccurredListener(
    callback: (details: chrome.webNavigation.WebNavigationFramedErrorCallbackDetails) => void
  ): void {
    chrome.webNavigation.onErrorOccurred.removeListener(callback);
  }

  public static removeHistoryStateUpdatedListener(
    callback: (details: chrome.webNavigation.WebNavigationTransitionCallbackDetails) => void
  ): void {
    chrome.webNavigation.onHistoryStateUpdated.removeListener(callback);
  }

  public static removeReferenceFragmentUpdatedListener(
    callback: (details: chrome.webNavigation.WebNavigationTransitionCallbackDetails) => void
  ): void {
    chrome.webNavigation.onReferenceFragmentUpdated.removeListener(callback);
  }

  public static removeTabReplacedListener(
    callback: (details: chrome.webNavigation.WebNavigationReplacementCallbackDetails) => void
  ): void {
    chrome.webNavigation.onTabReplaced.removeListener(callback);
  }
}

export { WebNavigation, NavigationFilter };