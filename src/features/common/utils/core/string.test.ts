import {
  doesIncludeCaseInsensitive,
  getDomainToLevel,
  HEXColorToHEXNumber,
  HEXColorToRGBString,
  HEXToDecimal,
  HEXToRGBChannels,
  joinNonEmpty,
  makeAbbreviature,
  numberDeclension,
  removeWordsFromString,
  toBeautifiedNumber,
} from './string';

describe('core.string', () => {
  describe('makeAbbreviature', () => {
    it('should make abbreviature from strings array', () => {
      const words = ['Some', 'string'];
      expect(makeAbbreviature(words)).toBe('SS');
    });

    it('should filter undefined', () => {
      const words = ['Some', undefined, 'string'];
      expect(makeAbbreviature(words)).toBe('SS');
    });
  });

  describe('getDomainToLevel', () => {
    const domain = 'third-level.second-level.first-level';

    describe.each([
      {
        domain,
        level: 0,
        result: '',
      },
      {
        domain,
        level: 1,
        result: 'first-level',
      },
      {
        domain,
        level: 2,
        result: 'second-level.first-level',
      },
      {
        domain,
        level: 3,
        result: 'third-level.second-level.first-level',
      },
      {
        domain,
        level: 4,
        result: 'third-level.second-level.first-level',
      },
    ])('should return domain to given level', ({ domain, level, result }) => {
      it(`result: ${result}, domain: ${domain}, level: ${level}`, () => {
        expect(getDomainToLevel(domain, level)).toBe(result);
      });
    });

    it('should throw error when level less 0', () => {
      expect(() => getDomainToLevel(domain, -1)).toThrow('Level should be non less 0, -1 given');
    });
  });

  describe('numberDeclension', () => {
    describe.each([
      {
        word: 'apple',
        amount: 1,
        ending: 's',
        result: 'apple',
      },
      {
        word: 'apple',
        amount: 2,
        ending: 's',
        result: 'apples',
      },
    ])('should add ending when amount greater 1', ({ word, amount, ending, result }) => {
      it(`word: ${word}, amount: ${amount}, ending: ${ending}, result: ${result}`, () => {
        expect(numberDeclension(word, amount, ending)).toBe(result);
      });
    });
  });

  describe('joinNonEmpty', () => {
    describe.each([
      {
        words: ['Hello', 'World'],
        separator: ' ',
        result: 'Hello World',
      },
      {
        words: ['Hello', '', 'World'],
        separator: undefined,
        result: 'HelloWorld',
      },
      {
        words: ['Hello', '', 'World'],
        separator: ' ',
        result: 'Hello World',
      },
      {
        words: ['Hello', null, 'World'],
        separator: ' ',
        result: 'Hello World',
      },
      {
        words: ['Hello', undefined, 'World'],
        separator: ' ',
        result: 'Hello World',
      },
    ])('should join non empty strings with given separator', ({ words, separator, result }) => {
      it(`words: ${JSON.stringify(words)}, separator: "${String(separator)}", result: ${result}`, () => {
        expect(joinNonEmpty(words, separator)).toBe(result);
      });
    });
  });

  describe('HEXColorToHEXNumber', () => {
    it('should convert css color to HEX string', () => {
      expect(HEXColorToHEXNumber('#FFF')).toBe('FFF');
    });
  });

  describe('HEXToDecimal', () => {
    it('should convert string with hex number to decimal number', () => {
      expect(HEXToDecimal('FFF')).toBe(4095);
    });
  });

  describe.each([
    {
      hex: 'ff',
      result: [255, NaN, NaN],
    },
    {
      hex: 'fff',
      result: [255, 255, 255],
    },
    {
      hex: '0f0f0f',
      result: [15, 15, 15],
    },
    {
      hex: '0f0f0f0',
      result: [15, 15, 15],
    },
  ])('HEXToRGBChannels', ({ hex, result }) => {
    describe('should convert string with hex number to RGB channels', () => {
      const stringifiedResult = JSON.stringify(result);
      it(`hex: ${hex}, result: ${stringifiedResult}`, () => {
        expect(JSON.stringify(HEXToRGBChannels(hex))).toBe(stringifiedResult);
      });
    });
  });

  describe.each([
    {
      hex: '#ff',
      result: '255,NaN,NaN',
    },
    {
      hex: '#fff',
      result: '255,255,255',
    },
    {
      hex: '#0f0f0f',
      result: '15,15,15',
    },
    {
      hex: '#0f0f0f0',
      result: '15,15,15',
    },
  ])('HEXColorToRGBString', ({ hex, result }) => {
    describe('should convert string with css color to RGB channels string', () => {
      it(`hex: ${hex}, result: ${result}`, () => {
        expect(HEXColorToRGBString(hex)).toBe(result);
      });
    });
  });

  describe.each([
    {
      string: 'word1 word2 word3 word1',
      words: ['word'],
      separators: [' '],
      result: 'word1 word2 word3 word1',
    },
    {
      string: 'word1 word2 word3 word1',
      words: ['word1'],
      separators: [' '],
      result: 'word2 word3',
    },
    {
      string: 'word1 word2 word3 word1',
      words: ['word2', 'word3'],
      separators: [' '],
      result: 'word1 word1',
    },
    {
      string: 'word1,word2,word3,word1',
      words: ['word1'],
      separators: [','],
      result: 'word2,word3',
    },
  ])('removeWordsFromString', ({ string, words, separators, result }) => {
    describe('should remove given words from string divided by given separators', () => {
      it(`string: ${string}, words: ${JSON.stringify(words)}, separators: ${JSON.stringify(
        separators,
      )}, result: ${result}`, () => {
        expect(removeWordsFromString(string, words, separators)).toBe(result);
      });
    });
  });

  describe('doesIncludeCaseInsensitive', () => {
    describe.each([
      {
        string: 'include',
        part: 'include',
        result: true,
      },
      {
        string: 'include',
        part: 'Include',
        result: true,
      },
      {
        string: 'include',
        part: 'in',
        result: true,
      },
      {
        string: 'include',
        part: "doesn't include",
        result: false,
      },
    ])('should return true when part is substr of string', ({ string, part, result }) => {
      it(`string: ${string}, part: ${part}, result: ${String(result)}`, () => {
        expect(doesIncludeCaseInsensitive(string, part)).toBe(result);
      });
    });
  });

  describe('toBeautifiedNumber', () => {
    describe.each([
      {
        number: 'asdf',
        devider: undefined,
        invalid: undefined,
        result: '-',
      },
      {
        number: 'asdf',
        devider: undefined,
        invalid: 'Invalid',
        result: 'Invalid',
      },
      {
        number: '100',
        devider: undefined,
        invalid: undefined,
        result: '100',
      },
      {
        number: '1000',
        devider: undefined,
        invalid: undefined,
        result: '1 000',
      },
      {
        number: '1000',
        devider: ',',
        invalid: undefined,
        result: '1,000',
      },
    ])('should beautify number in string', ({ number, devider, invalid, result }) => {
      it(`number: ${number}, devider: "${devider}", invalid: "${invalid}", result: ${result}`, () => {
        expect(toBeautifiedNumber(number, devider, invalid)).toBe(result);
      });
    });
  });
});
