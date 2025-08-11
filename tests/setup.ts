// Mock Chrome API
global.chrome = {
  bookmarks: {
    get: jest.fn(),
    getChildren: jest.fn(),
    getTree: jest.fn(),
    search: jest.fn(),
    create: jest.fn(),
    move: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    removeTree: jest.fn(),
    onCreated: {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    },
    onRemoved: {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    },
    onChanged: {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    },
    onMoved: {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    },
  },
  sidePanel: {
    open: jest.fn(),
    setOptions: jest.fn(),
  },
  scripting: {
    executeScript: jest.fn(),
  },
  runtime: {
    lastError: null,
    sendMessage: jest.fn(),
    getManifest: jest.fn(),
    onMessage: {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    },
    onMessageExternal: {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    },
  },
  notifications: {
    create: jest.fn(),
    update: jest.fn(),
    clear: jest.fn(),
    getAll: jest.fn(),
    getPermissionLevel: jest.fn(),
    onClicked: {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    },
    onButtonClicked: {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    },
    onClosed: {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    },
  },
  storage: {
    onChanged: {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    },
    sync: {
      get: jest.fn(),
      set: jest.fn(),
      remove: jest.fn(),
      clear: jest.fn(),
    },
    local: {
      get: jest.fn(),
      set: jest.fn(),
      remove: jest.fn(),
      clear: jest.fn(),
    },
  },
  downloads: {
    download: jest.fn(),
    search: jest.fn(),
    pause: jest.fn(),
    resume: jest.fn(),
    cancel: jest.fn(),
    getFileIcon: jest.fn(),
    open: jest.fn(),
    show: jest.fn(),
    showDefaultFolder: jest.fn(),
    erase: jest.fn(),
    removeFile: jest.fn(),
    onCreated: {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    },
    onErased: {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    },
    onChanged: {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    },
    onDeterminingFilename: {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    },
  },
  cookies: {
    get: jest.fn(),
    getAll: jest.fn(),
    set: jest.fn(),
    remove: jest.fn(),
    getAllCookieStores: jest.fn(),
    onChanged: {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    },
  },
  contextMenus: {
    create: jest.fn(),
    onClicked: {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    },
  },
  commands: {
    getAll: jest.fn(),
    onCommand: {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    },
  },
} as any;