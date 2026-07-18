import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { DevPage } from "./components/DevPage";
import { InProgressPage } from "./components/InProgressPage";
import { Navbar } from "./components/Navbar";
import { StoryReader } from "./components/StoryReader";
import { stories } from "./storiesData";

function App() {
  const isDevelopment = import.meta.env.DEV;
  const STORY_PROGRESS_KEY = "storySentenceProgress";
  const THEME_MODE_KEY = "themeMode";
  const STORY_TRANSLATIONS_MODE_KEY = "storyTranslationsMode";
  const [themeMode, setThemeMode] = useState<"light" | "dark">(() => {
    try {
      const saved = localStorage.getItem(THEME_MODE_KEY);
      return saved === "light" || saved === "dark" ? saved : "dark";
    } catch {
      return "dark";
    }
  });
  const [activePage, setActivePage] = useState<"main" | "dev" | "inProgress">(
    "inProgress",
  );
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);
  const [storyReturnPage, setStoryReturnPage] = useState<
    "main" | "dev" | "inProgress"
  >("inProgress");
  const [startStoryFromCover, setStartStoryFromCover] = useState(false);
  const [showStoryTranslations, setShowStoryTranslations] = useState(() => {
    try {
      return localStorage.getItem(STORY_TRANSLATIONS_MODE_KEY) === "on";
    } catch {
      return false;
    }
  });
  const [storyProgressById, setStoryProgressById] = useState<
    Record<string, number>
  >(() => {
    try {
      const saved = localStorage.getItem(STORY_PROGRESS_KEY);
      return saved ? (JSON.parse(saved) as Record<string, number>) : {};
    } catch {
      return {};
    }
  });

  const handleStoryProgressChange = useCallback(
    (storyId: string, completedSentences: number) => {
      setStoryProgressById((prev) => {
        const normalized = Math.max(0, Math.floor(completedSentences));
        if ((prev[storyId] ?? 0) === normalized) {
          return prev;
        }

        const next = {
          ...prev,
          [storyId]: normalized,
        };

        try {
          localStorage.setItem(STORY_PROGRESS_KEY, JSON.stringify(next));
        } catch (err) {
          console.error("Failed to save story sentence progress", err);
        }

        return next;
      });
    },
    [],
  );

  const handleOpenStory = useCallback(
    (storyId: string, options?: { startFromCover?: boolean }) => {
      setStoryReturnPage(activePage);
      setStartStoryFromCover(Boolean(options?.startFromCover));
      setSelectedStoryId(storyId);
    },
    [activePage],
  );

  const handleCloseStory = useCallback(() => {
    setSelectedStoryId(null);
    setStartStoryFromCover(false);
    setActivePage(storyReturnPage);
  }, [storyReturnPage]);

  const handleToggleTheme = () => {
    setThemeMode((prev) => {
      const next = prev === "light" ? "dark" : "light";

      try {
        localStorage.setItem(THEME_MODE_KEY, next);
      } catch (err) {
        console.error("Failed to save theme mode", err);
      }

      return next;
    });
  };

  const handleToggleStoryTranslations = useCallback(() => {
    setShowStoryTranslations((prev) => {
      const next = !prev;

      try {
        localStorage.setItem(STORY_TRANSLATIONS_MODE_KEY, next ? "on" : "off");
      } catch (err) {
        console.error("Failed to save story translations mode", err);
      }

      return next;
    });
  }, []);

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

  const handleActiveStoryProgressChange = useCallback(
    (completedSentences: number) => {
      if (!activeStory) return;
      handleStoryProgressChange(activeStory.id, completedSentences);
    },
    [activeStory, handleStoryProgressChange],
  );

  const handleCoverNext = useCallback(() => {
    if (!activeStory) return;

    const totalSentences = activeStory.sentences.length;
    const completedSentences = Math.min(
      storyProgressById[activeStory.id] ?? 0,
      totalSentences,
    );

    // Only completed stories should reset when Next is pressed on the cover.
    if (completedSentences >= totalSentences) {
      handleStoryProgressChange(activeStory.id, 0);
    }
  }, [activeStory, storyProgressById, handleStoryProgressChange]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Navbar
        themeMode={themeMode}
        onToggleTheme={handleToggleTheme}
        onOpenMainList={() => {
          setSelectedStoryId(null);
          setActivePage("main");
        }}
        showDevButton={isDevelopment}
        onOpenDevPage={() => {
          setSelectedStoryId(null);
          setActivePage("dev");
        }}
      />

      <Container maxWidth="lg" sx={{ py: 4, px: { xs: 2, md: 3 } }}>
        {activePage === "dev" ? (
          <DevPage onBack={() => setActivePage("inProgress")} />
        ) : activeStory ? (
          <StoryReader
            story={activeStory}
            onBack={handleCloseStory}
            initialCompletedSentences={storyProgressById[activeStory.id] ?? 0}
            onProgressChange={handleActiveStoryProgressChange}
            startFromCover={startStoryFromCover}
            onCoverNext={handleCoverNext}
            showStoryTranslations={showStoryTranslations}
            onToggleStoryTranslations={handleToggleStoryTranslations}
          />
        ) : activePage === "inProgress" ? (
          <InProgressPage
            stories={stories}
            storyProgressById={storyProgressById}
            onSelectStory={handleOpenStory}
            onOpenMainList={() => setActivePage("main")}
          />
        ) : (
          <Dashboard
            stories={stories}
            onSelectStory={handleOpenStory}
            storyProgressById={storyProgressById}
            onBackToInProgress={() => setActivePage("inProgress")}
          />
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
