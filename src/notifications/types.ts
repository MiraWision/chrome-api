interface Button {
  title: string;
  iconUrl?: string;
}

interface Item {
  title: string;
  message: string;
}

interface NotificationOptions {
  type: chrome.notifications.TemplateType;
  title: string;
  message: string;
  iconUrl?: string;
  buttons?: Button[];
  priority?: number;
  eventTime?: number;
  imageUrl?: string;
  items?: Item[];
  progress?: number;
  requireInteraction?: boolean;
  silent?: boolean;
}

type NotificationCallback = (notificationId: string) => void;
type ButtonClickCallback = (notificationId: string, buttonIndex: number) => void;
type PermissionLevel = 'granted' | 'denied';

export { NotificationOptions, NotificationCallback, ButtonClickCallback, PermissionLevel, Button, Item };