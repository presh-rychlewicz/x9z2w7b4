import { createTheme } from "@mui/material";

export type AppThemeMode = "light" | "dark";

export function createAppTheme(themeMode: AppThemeMode) {
  return createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: "#aa3bff",
      },
      background: {
        default: themeMode === "dark" ? "#121214" : "#f8f9fa",
        paper: themeMode === "dark" ? "#1a1a1e" : "#ffffff",
      },
    },
    typography: {
      fontFamily:
        "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          "*, *::before, *::after": {
            boxSizing: "border-box",
            userSelect: "none",
            WebkitUserSelect: "none",
          },
          html: {
            maxWidth: "100%",
            overflowX: "hidden",
            boxSizing: "border-box",
            userSelect: "none",
            WebkitUserSelect: "none",
          },
          body: {
            maxWidth: "100%",
            overflowX: "hidden",
            boxSizing: "border-box",
            margin: 0,
            padding: 0,
            userSelect: "none",
            WebkitUserSelect: "none",
          },
          "#root": {
            maxWidth: "100%",
            overflowX: "hidden",
            userSelect: "none",
            WebkitUserSelect: "none",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            minHeight: 44,
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 16,
            paddingRight: 16,
          },
          sizeSmall: {
            minHeight: 40,
            paddingTop: 8,
            paddingBottom: 8,
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            minWidth: 44,
            minHeight: 44,
            padding: 10,
          },
          sizeSmall: {
            minWidth: 40,
            minHeight: 40,
            padding: 8,
          },
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            minHeight: 44,
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 14,
            paddingRight: 14,
          },
          sizeSmall: {
            minHeight: 40,
            paddingTop: 8,
            paddingBottom: 8,
          },
        },
      },
    },
  });
}
