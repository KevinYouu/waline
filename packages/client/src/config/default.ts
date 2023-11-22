import { type WalineEmojiPresets, type WalineMeta } from '../typings/index.js';

const AVAILABLE_META: WalineMeta[] = ['nick', 'mail', 'link'];

export const getMeta = (meta: WalineMeta[]): WalineMeta[] =>
  meta.filter((item) => AVAILABLE_META.includes(item));

export const DEFAULT_EMOJI: WalineEmojiPresets[] = [];

export const DEFAULT_LANG = 'en-US';

export const defaultUploadImage = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    if (file.size > 128 * 1000)
      return reject(new Error('File too large! File size limit 128KB'));

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = (): void => resolve(reader.result?.toString() || '');
    reader.onerror = reject;
  });

export const defaultTeXRenderer = (blockMode: boolean): string =>
  blockMode === true
    ? '<p class="wl-tex">TeX is not available in preview</p>'
    : '<span class="wl-tex">TeX is not available in preview</span>';
