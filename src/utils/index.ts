import dayjs from "dayjs";

/**
 * Format date string to Vietnamese-friendly display.
 */
export const formatDate = (date: string, format = "DD/MM/YYYY"): string => {
  return dayjs(date).format(format);
};

export const formatDateTime = (date: string): string => {
  return dayjs(date).format("DD/MM/YYYY HH:mm");
};

/**
 * Download a Blob as a file.
 */
export const downloadBlob = (blob: Blob, filename: string): void => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
};

/**
 * Build query string from object, removing undefined/null.
 */
export const buildParams = (
  obj: Record<string, unknown>,
): Record<string, string | number> => {
  const params: Record<string, string | number> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined && value !== null && value !== "") {
      params[key] = value as string | number;
    }
  }
  return params;
};
