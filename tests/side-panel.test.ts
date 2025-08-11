import { SidePanel } from '../src/side-panel';

describe('SidePanel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (chrome.runtime as any).lastError = null;
  });

  describe('open', () => {
    it('should open side panel for a specific tab', () => {
      const tabId = 123;
      SidePanel.open(tabId);

      expect(chrome.sidePanel.open).toHaveBeenCalledWith({ tabId });
    });
  });

  describe('setOptions', () => {
    it('should set side panel options', () => {
      const options = {
        path: 'panel.html',
        enabled: true,
      };
      SidePanel.setOptions(options);

      expect(chrome.sidePanel.setOptions).toHaveBeenCalledWith(options);
    });

    it('should handle complex options', () => {
      const options = {
        path: 'panel.html',
        enabled: true,
        tabId: 123,
        mobile: false,
      };
      SidePanel.setOptions(options);

      expect(chrome.sidePanel.setOptions).toHaveBeenCalledWith(options);
    });
  });
});