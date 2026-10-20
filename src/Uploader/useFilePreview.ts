import { useEffect, useState } from 'react';
import { previewFile } from './utils/previewFile';
import type { FileType } from './Uploader';

export default function useFilePreview(
  file: FileType,
  listType: string,
  maxPreviewFileSize: number
) {
  const { blobFile, url } = file;
  const enabled =
    (listType === 'picture' || listType === 'picture-text') &&
    !!blobFile &&
    blobFile.size <= maxPreviewFileSize;
  const [preview, setPreview] = useState<{ file: File; image: string | null } | null>(null);

  useEffect(() => {
    setPreview(null);
    if (url || !enabled || !blobFile) return;
    let active = true;
    const dispose = previewFile(blobFile, result => {
      if (active && typeof result === 'string') setPreview({ file: blobFile, image: result });
    });
    return () => {
      active = false;
      if (typeof dispose === 'function') dispose();
    };
  }, [blobFile, url, enabled]);

  return url || (enabled && preview?.file === blobFile ? preview.image : null);
}
