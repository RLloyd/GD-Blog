//src/lib/theme-config.ts : used for portfolio-theme.ts

 // Add Styled Components declaration
 declare module 'styled-components' {
   export interface DefaultTheme extends Theme {}
 }

 import {ThemeMode,
   ColorWithShades,
   ColorShades,
   BorderColors,
   // ColorPalette,
   // Typography,
   Theme} from "./portfolio-theme";

type HeadingSizes = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type BodySizes = 'xs' | 'sm' | 'base' | 'lg' | 'xl';

// Base theme configuration
export const baseTheme = {
   typography: {
      heading: {
         fontFamily: '"Libre Baskerville", serif',
         weights: {
            regular: 400,
            medium: 500,
            bold: 700
         },
         sizes: {
            h1: '2.5rem',
            h2: '2rem',
            h3: '1.75rem',
            h4: '1.5rem',
            h5: '1.25rem',
            h6: '1rem'
         }
      },
      body: {
         fontFamily: '"Open Sans", sans-serif',
         weights: {
            regular: 400,
            medium: 500,
            bold: 700
         },
         sizes: {
            xs: '0.75rem',
            sm: '0.875rem',
            base: '1rem',
            lg: '1.125rem',
            xl: '1.25rem'
         }
      }
   }
} as const;

// Color definitions
export const colors = {
   primary: {
      100: '#EBE5F6',
      200: '#D7CCED',
      300: '#C3B2E3',
      400: '#AF99DA',
      500: '#8465C3',
      600: '#6A51C0',
      700: '#503DBD',
      800: '#3629BA',
      900: '#1C15B7'
   },
   secondary: {
      100: '#E6FEFF',
      200: '#CCFEFF',
      300: '#B3FDFF',
      400: '#99FCFF',
      500: '#3AF1F9',
      600: '#2ED8E0',
      700: '#22BFC6',
      800: '#16A6AD',
      900: '#0A8D93'
   },
   accent: {
      100: '#FFE9E3',
      200: '#FFD3C8',
      300: '#FFBDAC',
      400: '#FFA791',
      500: '#F46A47',
      600: '#DB503D',
      700: '#C23633',
      800: '#A91C29',
      900: '#90021F'
   },
   success: {
      100: '#F0F7E6',
      200: '#E1EFCC',
      300: '#D2E7B3',
      400: '#C3DF99',
      500: '#A2C465',
      600: '#88AB4B',
      700: '#6F9231',
      800: '#557917',
      900: '#3C5F00'
   },
   warning: {
      100: '#FFF5EB',
      200: '#FFEBD7',
      300: '#FFE1C3',
      400: '#FFD7AF',
      500: '#FAD8B4',
      600: '#E1BF9A',
      700: '#C8A680',
      800: '#AF8D66',
      900: '#96744C'
   },
   danger: {
      100: '#FFE5E8',
      200: '#FFCCD1',
      300: '#FFB2BA',
      400: '#FF99A3',
      500: '#F5536A',
      600: '#DC3950',
      700: '#C21F36',
      800: '#A9051C',
      900: '#900002'
   },
   gray: {
      100: '#F7F7F7',
      200: '#E6E6E6',
      300: '#D5D5D5',
      400: '#C4C4C4',
      500: '#676767',
      600: '#525252',
      700: '#3D3D3D',
      800: '#282828',
      900: '#131313'
   },
   // Add border configuration
   border: {
      light: {
        primary: '#0F66AF'
      },
      dark: {
        primary: '#0D94A0'
      }
    }
};

// Theme definitions
export const lightTheme: Theme = {
   isDarkTheme: false,
   colors: {
      ...colors,
      backgrounds: {  // Changed from 'background' to 'backgrounds'
         light: '#EBE5F6',
         dark: '#121212',
         nav: 'rgba(255, 255, 255, 0.8)' // Add nav background here
      },
      text: {
         light: {
            primary: '#3629BA',
            secondary: '#F6F2C3CC',
            accent: 'magenta',
            disabled: '#CCCCCC',
            svgColor1: "red",
            svgColor2: "blue",
            svgColor3: "magenta",
            svgColor4: "cyan",
            svgColor5: "green",
         },
         dark: {
            primary: '#FFFFFF',
            secondary: '#3AF1F9',
            accent: '',
            svgColor1: "",
            svgColor2: "",
            svgColor3: "",
            svgColor4: "",
            svgColor5: "",
            disabled: ''
         }
      },
      border: colors.border  // Add this
   },
   typography: baseTheme.typography,
   sizes: {
      navHeight: '80px'
   },
   navBackground: 'rgba(255, 255, 255, 0.8)',
   textSecondary: '#8F8F8F',
   border: '#E5E7EB',  // Add this
   error: '#DC2626'
};

export const darkTheme: Theme = {
   isDarkTheme: true,
   colors: {
      ...colors,
      backgrounds: {  // Changed from 'background' to 'backgrounds'
         light: '#121212',
         dark: '#000000',
         // nav: 'rgba(18, 18, 18, 0.8)' // Add nav background here
         nav: "#C21F36" // Add nav background here
      },
      text: {
         light: {
            primary: '#F46A47',
            secondary: '#99FCFF91',
            accent: '',
            svgColor1: "",
            svgColor2: "",
            svgColor3: "",
            svgColor4: "",
            svgColor5: "",
            disabled: ''
         },
         dark: {
            primary: '#AF99DA',
            secondary: '#0d94a0cc',
            accent: 'yellowgreen',
            disabled: '#6E6E6E',
            svgColor1: "#C4C4C4",
            svgColor2: "#900002",
            svgColor3: "#6F9231",
            svgColor4: "orange",
            svgColor5: "green",
         }
      },
      border: colors.border  // Add this
   },
   typography: baseTheme.typography,
   sizes: {
      navHeight: '80px'
   },
   navBackground: "#FAD8B4", // 'rgba(18, 18, 18, 0.8)',
   textSecondary: '#E0E0E0',
   border: '#374151',  // Add this
   error: '#EF4444'
};

// Default theme for utilities
export const theme = lightTheme;

// Utility functions
// export const getColor = (colorName: keyof Omit<ColorPalette, "background" | "text">, shade: keyof ColorShades = 500): string => {
//   return theme.colors[colorName][shade];
// };
// Update the getColor function with proper type checking
// export const getColor = (
export const getColor = (
   colorName: ColorWithShades,
   shade: keyof ColorShades = 500
): string => {
   const color = theme.colors[colorName];

   if (!isColorShades(color)) {
      throw new Error(`Color ${colorName} does not have shades`);
   }
   return color[shade];
};

// Type guard to check if a color has shades
// const isColorShades = (color: any): color is ColorShades => {
//    return color && typeof color === 'object' && '500' in color;
// };
const isColorShades = (color: unknown): color is ColorShades => {
   return typeof color === 'object' &&
          color !== null &&
          '500' in color;
};

// export const getBackgroundColor = (mode: ThemeMode): string => {
//    //   return theme.colors.backgrounds[mode];
//    return theme.colors.backgrounds.light;
// };
export const getBackgroundColor = (
   mode: ThemeMode,
   type: 'default' | 'nav' = 'default'
 ): string => {
   if (type === 'nav') {
     return theme.colors.backgrounds.nav;
   }
   return theme.colors.backgrounds[mode];
 };

export const getTextColor = (
   mode: ThemeMode,
   variant: "primary" | "secondary" | "disabled"
): string => {
   return theme.colors.text[mode][variant];
};

export const getBorderColor = (mode: ThemeMode, variant: keyof BorderColors): string => {
   return theme.colors.border[mode][variant];
 };

export const getFontFamily = (
   type: "heading" | "body"
): string => {
   return theme.typography[type].fontFamily;
};

export const getFontWeight = (
   type: "heading" | "body",
   weight: "regular" | "medium" | "bold"
): number => {
   return theme.typography[type].weights[weight];
};

export const getFontSize = (
   type: "heading" | "body",
   size: HeadingSizes | BodySizes
): string => {
   if (type === "heading" && isHeadingSize(size)) {
      return theme.typography.heading.sizes[size];
   }
   if (type === "body" && isBodySize(size)) {
      return theme.typography.body.sizes[size];
   }
   throw new Error(`Invalid size ${size} for type ${type}`);
};

// Type guards
const isHeadingSize = (size: HeadingSizes | BodySizes): size is HeadingSizes => {
   return ["h1", "h2", "h3", "h4", "h5", "h6"].includes(size);
};

const isBodySize = (size: HeadingSizes | BodySizes): size is BodySizes => {
   return ["xs", "sm", "base", "lg", "xl"].includes(size);
};

// CSS helper
export const applyFontStyle = (type: "heading" | "body", weight: "regular" | "medium" | "bold", size: HeadingSizes | BodySizes): string => {
   return `
    font-family: ${getFontFamily(type)};
    font-weight: ${getFontWeight(type, weight)};
    font-size: ${getFontSize(type, size)};
  `;
};
