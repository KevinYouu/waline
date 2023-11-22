import { decodePath, isLinkHttp, removeEndingSplash } from './path.js';
import {
  DEFAULT_EMOJI,
  DEFAULT_LANG,
  DEFAULT_LOCALES,
  defaultUploadImage,
  defaultHighlighter,
  defaultTeXRenderer,
  getMeta,
} from '../config/index.js';
import {
  type WalineEmojiInfo,
  type WalineEmojiMaps,
  type WalineLocale,
  type WalineProps,
} from '../typings/index.js';

export interface WalineEmojiConfig {
  tabs: Pick<WalineEmojiInfo, 'name' | 'icon' | 'items'>[];
  map: WalineEmojiMaps;
}

export interface WalineConfig
  extends Required<
    Omit<
      WalineProps,
      | 'emoji'
      | 'imageUploader'
      | 'highlighter'
      | 'texRenderer'
      | 'wordLimit'
      | 'reaction'
      | 'search'
    >
  > {
  locale: WalineLocale;
  wordLimit: [number, number] | false;
  emoji: Exclude<WalineProps['emoji'], boolean | undefined>;
  highlighter: Exclude<WalineProps['highlighter'], true | undefined>;
  imageUploader: Exclude<WalineProps['imageUploader'], true | undefined>;
  texRenderer: Exclude<WalineProps['texRenderer'], true | undefined>;
}

export const getServerURL = (serverURL: string): string => {
  const result = removeEndingSplash(serverURL);

  return isLinkHttp(result) ? result : `https://${result}`;
};

const getWordLimit = (
  wordLimit: WalineProps['wordLimit'],
): [number, number] | false =>
  Array.isArray(wordLimit) ? wordLimit : wordLimit ? [0, wordLimit] : false;

const fallback = <T = unknown>(
  value: T | boolean | undefined,
  fallback: T,
): T | false =>
  typeof value === 'function' ? value : value === false ? false : fallback;

export const getConfig = ({
  serverURL,

  path = location.pathname,
  lang = typeof navigator === 'undefined' ? 'en-US' : navigator.language,
  locale,
  emoji = DEFAULT_EMOJI,
  meta = ['nick', 'mail', 'link'],
  requiredMeta = [],
  dark = false,
  pageSize = 10,
  wordLimit,
  imageUploader,
  highlighter,
  texRenderer,
  copyright = true,
  login = 'disable',
  recaptchaV3Key = '',
  turnstileKey = '',
  commentSorting = 'latest',
  ...more
}: WalineProps): WalineConfig => ({
  serverURL: getServerURL(serverURL),
  path: decodePath(path),
  locale: {
    ...(DEFAULT_LOCALES[lang] || DEFAULT_LOCALES[DEFAULT_LANG]),
    ...(typeof locale === 'object' ? locale : {}),
  } as WalineLocale,
  wordLimit: getWordLimit(wordLimit),
  meta: getMeta(meta),
  requiredMeta: getMeta(requiredMeta),
  imageUploader: fallback(imageUploader, defaultUploadImage),
  highlighter: fallback(highlighter, defaultHighlighter),
  texRenderer: fallback(texRenderer, defaultTeXRenderer),
  lang: Object.keys(DEFAULT_LOCALES).includes(lang) ? lang : 'en-US',
  dark,
  emoji: typeof emoji === 'boolean' ? (emoji ? DEFAULT_EMOJI : []) : emoji,
  pageSize,
  login,
  copyright,
  recaptchaV3Key,
  turnstileKey,
  commentSorting,
  ...more,
});
