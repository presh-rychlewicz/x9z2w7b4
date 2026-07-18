import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useMemo, useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { DevPage } from "./components/DevPage";
import { Navbar } from "./components/Navbar";
import { StoryReader } from "./components/StoryReader";
import { stories } from "./storiesData";

function App() {
  const isDevelopment = import.meta.env.DEV;
  const [themeMode, setThemeMode] = useState<"light" | "dark">("dark");
  const [activePage, setActivePage] = useState<"main" | "dev">("main");
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);
  const [completedStoryIds, setCompletedStoryIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("completedStoryIds");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleToggleCompleteStory = (storyId: string) => {
    setCompletedStoryIds((prev) => {
      const next = prev.includes(storyId)
        ? prev.filter((id) => id !== storyId)
        : [...prev, storyId];
      try {
        localStorage.setItem("completedStoryIds", JSON.stringify(next));
      } catch (err) {
        console.error("Failed to save progress", err);
      }
      return next;
    });
  };

  // Theme setup
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
          primary: {
            main: "#aa3bff", // Purple accent
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
      }),
    [themeMode],
  );

  const activeStory = useMemo(() => {
    return stories.find((s) => s.id === selectedStoryId) || null;
  }, [selectedStoryId]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Navbar
        themeMode={themeMode}
        onToggleTheme={() =>
          setThemeMode((prev) => (prev === "light" ? "dark" : "light"))
        }
        showDevButton={isDevelopment}
        onOpenDevPage={() => setActivePage("dev")}
      />

      <Container maxWidth="lg" sx={{ py: 4, px: { xs: 2, md: 3 } }}>
        {activePage === "dev" ? (
          <DevPage onBack={() => setActivePage("main")} />
        ) : !activeStory ? (
          <Dashboard
            stories={stories}
            onSelectStory={setSelectedStoryId}
            completedStoryIds={completedStoryIds}
          />
        ) : (
          <StoryReader
            story={activeStory}
            onBack={() => setSelectedStoryId(null)}
            isCompleted={completedStoryIds.includes(activeStory.id)}
            onToggleComplete={() => handleToggleCompleteStory(activeStory.id)}
          />
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
