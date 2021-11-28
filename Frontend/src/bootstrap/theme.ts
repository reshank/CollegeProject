import { extendTheme, theme } from "@chakra-ui/react";

//https://smart-swatch.netlify.app/

const Theme = extendTheme({
  ...theme,
  colors: {
    ...theme.colors,
    primary: {
      50: '#ebe8ff',
      100: '#c2bdf9',
      200: '#9990ef',
      300: '#7064e7',
      400: '#4838df',
      500: '#6356e5',
      600: '#24189b',
      700: '#181170',
      800: '#0d0945',
      900: '#05021c',
    },
  },
  fonts: {
    body: "Nunito",
    heading: "Nunito",
    mono: "Nunito",
  },
});

export default Theme;
