export type WalineCommentSorting = 'latest' | 'oldest' | 'hottest';

export type WalineEmojiPresets =
  | `//${string}`
  | `http://${string}`
  | `https://${string}`;

export interface WalineEmojiInfo {
  /**
   * 选项卡上的 Emoji 名称
   *
   * Emoji name show on tab
   */
  name: string;
  /**
   * 所在文件夹链接
   *
   * Current folder link
   */
  folder?: string;
  /**
   * Emoji 通用路径前缀
   *
   * Common prefix of Emoji icons
   */
  prefix?: string;
  /**
   * Emoji 图片的类型，会作为文件扩展名使用
   *
   * Type of Emoji icons, will be regarded as file extension
   */
  type?: string;
  /**
   * 选项卡显示的 Emoji 图标
   *
   * Emoji icon show on tab
   */
  icon: string;
  /**
   * Emoji 图片列表
   *
   * Emoji image list
   */
  items: string[];
}

export type WalineEmojiMaps = Record<string, string>;

export type WalineLoginStatus = 'enable' | 'disable' | 'force';

export interface WalineSearchImageData extends Record<string, unknown> {
  /**
   * 图片链接
   *
   * Image link
   */
  src: string;

  /**
   * 图片标题
   *
   * @description 用于图片的 alt 属性
   *
   * Image title
   *
   * @description Used for alt attribute of image
   */
  title?: string;

  /**
   * 图片缩略图
   *
   * @description 为了更好的加载性能，我们会优先在列表中使用此缩略图
   *
   * Image preview link
   *
   * @description For better loading performance, we will use this thumbnail first in the list
   *
   * @default src
   */
  preview?: string;
}

export type WalineMeta = 'nick' | 'mail' | 'link';

export type WalineImageUploader = (image: File) => Promise<string>;

export type WalineHighlighter = (code: string, lang: string) => string;

export type WalineTeXRenderer = (blockMode: boolean, tex: string) => string;
