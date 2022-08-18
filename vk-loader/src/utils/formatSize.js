export const formatFileSize = (bytes) => {
  if (bytes === 0) {
    return bytes + " B";
  }
  const sufixes = ["B", "kB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sufixes[i]}`;
};
