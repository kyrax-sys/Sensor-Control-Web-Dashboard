import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#0f4c81" },
    secondary: { main: "#f07b3f" },
    background: { default: "#f6f1ea", paper: "#fffaf4" },
    text: { primary: "#1f2a32", secondary: "#5c6871" },
    error: { main: "#d64541" },
  },
  typography: {
    fontFamily: '"Space Grotesk", system-ui, -apple-system, sans-serif',
    h4: { fontWeight: 700, letterSpacing: -0.3 },
    h5: { fontWeight: 700, letterSpacing: -0.2 },
    h6: { fontWeight: 700 },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
    MuiButton: {
      styleOverrides: { root: { textTransform: "none", fontWeight: 700 } },
    },
  },
});

export default theme;
