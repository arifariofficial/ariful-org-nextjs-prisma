import React, { useEffect, useState } from "react";
import {
  createTheme,
  PaletteMode,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material";
import { useTheme as useNextTheme } from "next-themes";

const MUIThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme: nextTheme, systemTheme } = useNextTheme();
  const [muiTheme, setMuiTheme] = useState(createDefaultTheme());

  function createDefaultTheme(mode: PaletteMode = "light") {
    return responsiveFontSizes(
      createTheme({
        palette: {
          mode,
          primary: {
            main: "hsl(180deg 9.36% 39.8%)",
            light:
              mode === "dark"
                ? "var(--background-dark)"
                : "var(--background-light)",
            dark:
              mode === "dark"
                ? "var(--background-dark)"
                : "var(--background-light)",
          },
        },
        components: {
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor:
                    mode === "dark"
                      ? "var(--border-dark)"
                      : "var(--border-light)",
                  opacity: 0.5,
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor:
                    mode === "dark"
                      ? "var(--border-dark)"
                      : "var(--border-light)",
                  opacity: 0.4,
                },
                "& .MuiInputBase-input:-webkit-autofill": {
                  borderColor:
                    mode === "dark"
                      ? "var(--border-dark)"
                      : "var(--border-light)",
                  WebkitBoxShadow: `0 0 0 100px ${mode === "dark" ? "#1f1f1f" : "#ffffff"} inset`,
                  WebkitTextFillColor:
                    mode === "dark"
                      ? "var(--foreground-dark)"
                      : "var(--foreground-light)",
                },
              },
            },
          },
          MuiInputLabel: {
            styleOverrides: {
              root: {
                "&.Mui-focused": {
                  color:
                    mode === "dark"
                      ? "var(--foreground-dark)"
                      : "var(--foreground-light)",
                },
              },
            },
          },
          MuiSelect: {
            styleOverrides: {
              select: {
                "&:focus": {
                  backgroundColor:
                    mode === "dark"
                      ? "var(--background-dark)"
                      : "var(--background-light)",
                },
              },
              icon: {
                color:
                  mode === "dark"
                    ? "var(--foreground-dark)"
                    : "var(--foreground-light)",
              },
            },
          },
        },
      }),
    );
  }

  // Update MUI theme when Next.js theme changes
  useEffect(() => {
    const effectiveTheme = nextTheme === "system" ? systemTheme : nextTheme;
    const isDarkMode = effectiveTheme === "dark";
    setMuiTheme(createDefaultTheme(isDarkMode ? "dark" : "light"));
  }, [nextTheme, systemTheme]);

  return <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>;
};

export default MUIThemeProvider;
