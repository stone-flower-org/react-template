import { getColorFromTheme, getSelectedColorFromTheme } from './theme';

const color = 'red';

describe('utils.theme', () => {
  describe('getColorFromTheme', () => {
    it('should return given color when theme has no such PaletteColor', () => {
      expect(getColorFromTheme({ palette: {} } as any, color)).toBe(color);
      expect(getColorFromTheme({ palette: { red: {} } } as any, color)).toBe(color);
    });

    it('should return PaletteColor color by given color name', () => {
      const colorVal = '#f00';
      expect(getColorFromTheme({ palette: { red: { main: colorVal } } } as any, color)).toBe(colorVal);
    });
  });

  describe('getSelectedColorFromTheme', () => {
    const color = 'red';

    it('should return dark color from palette if palette exists', () => {
      const darkColor = '#000';
      expect(
        getSelectedColorFromTheme(
          {
            palette: {
              red: {
                dark: darkColor,
              },
            },
          } as any,
          color,
        ),
      ).toBe(darkColor);
    });

    it('should return text primary color from palette if it exists and color is text', () => {
      const textColor = '#000';
      expect(
        getSelectedColorFromTheme(
          {
            palette: {
              text: {
                primary: textColor,
              },
            },
          } as any,
          'text',
        ),
      ).toBe(textColor);
    });

    it('should return given color by default', () => {
      expect(
        getSelectedColorFromTheme(
          {
            palette: {},
          } as any,
          color,
        ),
      ).toBe(color);
    });
  });
});
