interface DownloadOptions {
  url: string;
  filename?: string;
  conflictAction?: chrome.downloads.FilenameConflictAction;
  saveAs?: boolean;
  method?: 'GET' | 'POST';
  headers?: chrome.downloads.HeaderNameValuePair[];
  body?: string;
}

interface DownloadQuery {
  query?: string[];
  startedBefore?: string;
  startedAfter?: string;
  endedBefore?: string;
  endedAfter?: string;
  totalBytesGreater?: number;
  totalBytesLess?: number;
  filenameRegex?: string;
  urlRegex?: string;
  limit?: number;
  orderBy?: string[];
  id?: number;
  url?: string;
  filename?: string;
  danger?: chrome.downloads.DangerType;
  mime?: string;
  startTime?: string;
  endTime?: string;
  state?: 'in_progress' | 'interrupted' | 'complete';
  paused?: boolean;
  error?: chrome.downloads.InterruptReason;
  bytesReceived?: number;
  totalBytes?: number;
  fileSize?: number;
  exists?: boolean;
}

export { DownloadOptions, DownloadQuery };