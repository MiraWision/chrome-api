import { Notifications } from '../src/notifications';

describe('Notifications', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (chrome.runtime as any).lastError = null;
  });

  describe('create', () => {
    it('should create a notification', async () => {
      const notificationId = 'test-notification';
      chrome.notifications.create.mockImplementation((_, callback) => callback(notificationId));

      const options = {
        type: 'basic',
        title: 'Test Title',
        message: 'Test Message',
        iconUrl: 'test-icon.png',
      };

      const result = await Notifications.create(options);
      expect(result).toBe(notificationId);
      expect(chrome.notifications.create).toHaveBeenCalledWith(options, expect.any(Function));
    });

    it('should handle errors', async () => {
      (chrome.runtime as any).lastError = { message: 'Error' };
      chrome.notifications.create.mockImplementation((_, callback) => callback(''));

      const options = {
        type: 'basic',
        title: 'Test Title',
        message: 'Test Message',
        iconUrl: 'test-icon.png',
      };

      await expect(Notifications.create(options)).rejects.toEqual({ message: 'Error' });
    });
  });

  describe('update', () => {
    it('should update a notification', async () => {
      chrome.notifications.update.mockImplementation((_, __, callback) => callback(true));

      const options = {
        title: 'Updated Title',
        message: 'Updated Message',
      };

      const result = await Notifications.update('test-notification', options);
      expect(result).toBe(true);
      expect(chrome.notifications.update).toHaveBeenCalledWith(
        'test-notification',
        options,
        expect.any(Function)
      );
    });
  });

  describe('clear', () => {
    it('should clear a notification', async () => {
      chrome.notifications.clear.mockImplementation((_, callback) => callback(true));

      const result = await Notifications.clear('test-notification');
      expect(result).toBe(true);
      expect(chrome.notifications.clear).toHaveBeenCalledWith(
        'test-notification',
        expect.any(Function)
      );
    });
  });

  describe('getAll', () => {
    it('should get all notifications', async () => {
      const notifications = {
        'notification-1': { title: 'Title 1' },
        'notification-2': { title: 'Title 2' },
      };
      chrome.notifications.getAll.mockImplementation(callback => callback(notifications));

      const result = await Notifications.getAll();
      expect(result).toEqual(['notification-1', 'notification-2']);
      expect(chrome.notifications.getAll).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  describe('getPermissionLevel', () => {
    it('should get permission level', async () => {
      chrome.notifications.getPermissionLevel.mockImplementation(callback => callback('granted'));

      const result = await Notifications.getPermissionLevel();
      expect(result).toBe('granted');
      expect(chrome.notifications.getPermissionLevel).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  describe('event listeners', () => {
    it('should add and remove clicked listener', () => {
      const callback = jest.fn();
      const removeListener = Notifications.addClickedListener(callback);

      expect(chrome.notifications.onClicked.addListener).toHaveBeenCalledWith(callback);
      removeListener();
      expect(chrome.notifications.onClicked.removeListener).toHaveBeenCalledWith(callback);
    });

    it('should add and remove button clicked listener', () => {
      const callback = jest.fn();
      const removeListener = Notifications.addButtonClickedListener(callback);

      expect(chrome.notifications.onButtonClicked.addListener).toHaveBeenCalledWith(callback);
      removeListener();
      expect(chrome.notifications.onButtonClicked.removeListener).toHaveBeenCalledWith(callback);
    });

    it('should add and remove closed listener', () => {
      const callback = jest.fn();
      const removeListener = Notifications.addClosedListener(callback);

      expect(chrome.notifications.onClosed.addListener).toHaveBeenCalledWith(callback);
      removeListener();
      expect(chrome.notifications.onClosed.removeListener).toHaveBeenCalledWith(callback);
    });

    it('should handle notification events', () => {
      const clickCallback = jest.fn();
      const buttonClickCallback = jest.fn();
      const closeCallback = jest.fn();

      Notifications.addClickedListener(clickCallback);
      Notifications.addButtonClickedListener(buttonClickCallback);
      Notifications.addClosedListener(closeCallback);

      // Simulate events
      const notificationId = 'test-notification';
      const buttonIndex = 0;

      const [clickCb] = (chrome.notifications.onClicked.addListener as jest.Mock).mock.calls[0];
      const [buttonClickCb] = (chrome.notifications.onButtonClicked.addListener as jest.Mock).mock.calls[0];
      const [closeCb] = (chrome.notifications.onClosed.addListener as jest.Mock).mock.calls[0];

      clickCb(notificationId);
      buttonClickCb(notificationId, buttonIndex);
      closeCb(notificationId);

      expect(clickCallback).toHaveBeenCalledWith(notificationId);
      expect(buttonClickCallback).toHaveBeenCalledWith(notificationId, buttonIndex);
      expect(closeCallback).toHaveBeenCalledWith(notificationId);
    });
  });
});