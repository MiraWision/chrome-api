# @mirawision/chrome-api

A comprehensive TypeScript library for Chrome Extension API, providing type-safe wrappers and utilities for various Chrome Extension functionalities. This library makes it easier to work with Chrome Extension APIs by providing a well-typed, intuitive interface.

## Features

### Bookmarks
- Create, modify, and delete bookmarks
- Search and retrieve bookmark information
- Organize bookmarks in folders
- Watch for bookmark changes

### Commands
- Register keyboard commands
- Handle command triggers
- Manage command shortcuts

### Context Menu
- Create and manage context menu items
- Handle context menu clicks
- Dynamic menu updates based on context

### Cookies
- Read and write cookies
- Monitor cookie changes
- Set cookie properties
- Remove cookies

### Downloads
- Initiate and manage downloads
- Track download progress
- Search download history
- Cancel or pause downloads

### Local Storage
- Store and retrieve data
- Watch for storage changes
- Clear storage data
- Get storage usage information

### Notifications
- Create and display notifications
- Handle notification interactions
- Update existing notifications
- Clear notifications

### Runtime
- Message passing between extension components
- Handle extension lifecycle events
- Manage extension state
- Connect with native applications

### Scripting
- Execute scripts in web pages
- Inject CSS into web pages
- Register content scripts
- Handle script execution results

### Side Panel
- Create and manage side panel
- Update side panel content
- Handle side panel interactions

### Storage Sync
- Sync data across devices
- Handle sync conflicts
- Monitor sync status
- Manage sync quotas

## Installation

```bash
npm install @mirawision/chrome-api
```

or 

```bash
yarn add @mirawision/chrome-api
```

## Usage

Here's a quick overview of how to use some of the core functionalities:

### Bookmarks Example

```typescript
import { createBookmark, getBookmark } from '@mirawision/chrome-api/bookmarks';

// Create a new bookmark
await createBookmark({
  title: 'My Bookmark',
  url: 'https://example.com'
});

// Get bookmark by ID
const bookmark = await getBookmark('1');
console.log(bookmark.title); // 'My Bookmark'
```

### Notifications Example

```typescript
import { createNotification } from '@mirawision/chrome-api/notifications';

// Create a notification
await createNotification('notification-id', {
  type: 'basic',
  title: 'Hello',
  message: 'This is a notification',
  iconUrl: 'icon.png'
});
```

### Storage Example

```typescript
import { setItem, getItem } from '@mirawision/chrome-api/local-storage';

// Store data
await setItem('user', { name: 'John', age: 30 });

// Retrieve data
const user = await getItem('user');
console.log(user.name); // 'John'
```

### Context Menu Example

```typescript
import { createContextMenuItem } from '@mirawision/chrome-api/context-menu';

// Create a context menu item
createContextMenuItem({
  id: 'searchText',
  title: 'Search for "%s"',
  contexts: ['selection']
});
```

### Downloads Example

```typescript
import { downloadFile, getDownload } from '@mirawision/chrome-api/downloads';

// Start a download
const downloadId = await downloadFile({
  url: 'https://example.com/file.pdf',
  filename: 'document.pdf'
});

// Get download info
const download = await getDownload(downloadId);
console.log(download.state); // 'in_progress' | 'complete' | 'interrupted'
```

## Contributing

Contributions are always welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License.