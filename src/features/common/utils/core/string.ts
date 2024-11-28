import { range } from './array';
import { beautifyNumber } from './number';

export const makeAbbreviature = (words: (string | undefined | null)[]) =>
  words.reduce<string>((result, word) => (result += word?.at(0) ?? '').toUpperCase(), '');

export const joinNonEmpty = (words: (string | undefined | null)[], separator = '') =>
  words.filter((word) => word).join(separator);

export const numberDeclension = (word: string, amount: number, ending = 's'): string =>
  amount < 2 ? word : `${word}${ending}`;

export const getDomainToLevel = (domain: string, level: number) => {
  const domainParts = domain.split('.');
  if (level < 0) throw new Error(`Level should be non less 0, ${level} given`);
  if (level > domainParts.length) return domain;
  return domainParts.slice(domainParts.length - level, domainParts.length).join('.');
};

export const HEXColorToHEXNumber = (color: string) => color.replace('#', '');

export const HEXToDecimal = (hex: string) => parseInt(hex, 16);

export const HEXToRGBChannels = (hex: string): [number, number, number] => {
  if (hex.length === 3)
    return range(0, 2, (i) => {
      const char = hex.slice(i, i + 1);
      return HEXToDecimal(char + char);
    }) as [number, number, number];
  return range(0, 2, (i) => HEXToDecimal(hex.slice(i * 2, i * 2 + 2))) as [number, number, number];
};

export const HEXColorToRGBString = (color: string): string => HEXToRGBChannels(HEXColorToHEXNumber(color)).join(',');

export const removeWordsFromString = (string: string, words: string[], separators: string[] = [' ']) => {
  const separator = separators.join('|');
  return string.replaceAll(
    new RegExp(words.map((word) => `(${word}(${separator})|(${separator})?${word}$)`).join('|'), 'g'),
    '',
  );
};

export const doesIncludeCaseInsensitive = (string: string, part: string) =>
  string.toUpperCase().includes(part.toUpperCase());

export const toBeautifiedNumber = (number: string, devider = ' ', invalid = '-') => {
  const num = Number(number);
  if (isNaN(num)) return invalid;
  return beautifyNumber(num, devider);
};
