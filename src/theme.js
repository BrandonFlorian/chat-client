import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#212121',
      light: "#484848",
      dark: "#000000"
    },
    secondary: {
      main: "#ff9bbc",
      light: "#ffcdee",
      dark: "#ca6b8c"
    },
  },
});

export default theme;
