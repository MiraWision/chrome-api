interface BookmarkCreateArg {
  parentId?: string;
  index?: number;
  title?: string;
  url?: string;
}

interface BookmarkDestination {
  parentId?: string;
  index?: number;
}

interface BookmarkChanges {
  title?: string;
  url?: string;
}

interface RemoveInfo {
  parentId: string;
  index: number;
  node: BookmarkTreeNode;
}

interface ChangeInfo {
  title: string;
  url?: string;
}

interface MoveInfo {
  parentId: string;
  index: number;
  oldParentId: string;
  oldIndex: number;
}

type BookmarkTreeNode = chrome.bookmarks.BookmarkTreeNode;
interface BookmarkSearchQuery {
  query?: string;
  url?: string;
  title?: string;
}

export {
  BookmarkCreateArg,
  BookmarkDestination,
  BookmarkChanges,
  RemoveInfo,
  ChangeInfo,
  MoveInfo,
  BookmarkTreeNode,
  BookmarkSearchQuery
};