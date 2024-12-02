export interface BaseInterface {
   someProperty: string;
   // Add at least one property to avoid the empty interface warning
 }

export type ThemeMode = 'light' | 'dark';

// Create a type for color keys that can have shades
export type ColorWithShades = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger' | 'gray';

// Shared type definitions
export interface ColorShades {
   100: string;
   200: string;
   300: string;
   400: string;
   500: string; // Base color
   600: string;
   700: string;
   800: string;
   900: string;
}

export interface BorderColors {
   primary: string;
   // secondary: string;
   // accent: string;
   // disabled: string;
 }

export interface ColorPalette {
   primary: ColorShades;
   secondary: ColorShades;
   accent: ColorShades;
   success: ColorShades;
   warning: ColorShades;
   danger: ColorShades;
   gray: ColorShades;
   backgrounds: {  // Changed from 'background' to 'backgrounds'
      light: string;
      dark: string;
      nav: string; // Add this for navBackground
   };
   text: {
      light: {
         primary: string;
         secondary: string;
         accent: string;
         disabled: string;
         svgColor1: string;
         svgColor2: string;
         svgColor3: string;
         svgColor4: string;
         svgColor5: string;
      };
      dark: {
         primary: string;
         secondary: string;
         accent: string;
         disabled: string;
         svgColor1: string;
         svgColor2: string;
         svgColor3: string;
         svgColor4: string;
         svgColor5: string;
      };
   };
   border: {
      light: BorderColors;
      dark: BorderColors;
    }
}

export interface Typography {
   heading: {
      fontFamily: string;
      weights: {
         regular: number;
         medium: number;
         bold: number;
      };
      sizes: {
         h1: string;
         h2: string;
         h3: string;
         h4: string;
         h5: string;
         h6: string;
      };
   };
   body: {
      fontFamily: string;
      weights: {
         regular: number;
         medium: number;
         bold: number;
      };
      sizes: {
         xs: string;
         sm: string;
         base: string;
         lg: string;
         xl: string;
      };
   };
}

export interface Theme {
   isDarkTheme: boolean;  // Add this property
   colors: ColorPalette;
   // colors: ColorPalette & {
   //    border: {
   //      light: BorderColors;
   //      dark: BorderColors;
   //    };
   //  };
   typography: Typography;
   sizes: {
      navHeight: string;
   };
   navBackground: string;
   textSecondary: string;
   // border: ColorPalette;
   border: string;
   // border: {
   //    light: BorderColors;
   //    dark: BorderColors;
   //  };
   error: string;
   backgroundColor?: string;
   backgroundBlendMode?: string;
}
