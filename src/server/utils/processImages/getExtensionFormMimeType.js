const mimeTypeToExt = {
  'image/gif': 'gif',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/tiff': 'tiff',
  'image/vnd.wap.wbmp': 'wbmp',
  'image/x-icon': 'ico',
  'image/x-jng ': 'jng',
  'image/x-ms-bmp': 'bmp',
  'image/svg+xml': 'svg',
  'image/webp': 'webp',
};

module.exports = function getExtensionFormMimeType(mimeType) {
  const ext = mimeTypeToExt[mimeType];

  if (!ext) {
    throw new Error(`Unsupported image type ${mimeType}`)
  }

  return ext
};