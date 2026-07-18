import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { DevPage } from "./components/DevPage";
import { InProgressPage } from "./components/InProgressPage";
import { Navbar } from "./components/Navbar";
import { StoryList } from "./components/StoryList";
import { StoryReader } from "./components/StoryReader";
import {
  STORY_PROGRESS_KEY,
  STORY_TRANSLATIONS_MODE_KEY,
  THEME_MODE_KEY,
} from "./constants/storage";
import { stories } from "./storiesData";
import { createAppTheme } from "./theme/appTheme";

const AppPage = {
  Main: "main",
  Dev: "dev",
  InProgress: "inProgress",
} as const;

type AppPage = (typeof AppPage)[keyof typeof AppPage];

function App() {
  const isDevelopment = import.meta.env.DEV;
  const [themeMode, setThemeMode] = useState<"light" | "dark">(() => {
    try {
      const saved = localStorage.getItem(THEME_MODE_KEY);
      return saved === "light" || saved === "dark" ? saved : "dark";
    } catch {
      return "dark";
    }
  });
  const [activePage, setActivePage] = useState<AppPage>(AppPage.InProgress);
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);
  const [storyReturnPage, setStoryReturnPage] = useState<AppPage>(
    AppPage.InProgress,
  );
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

  const theme = useMemo(() => createAppTheme(themeMode), [themeMode]);

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

  const renderPage = () => {
    if (activeStory) {
      return (
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
      );
    }

    switch (activePage) {
      case AppPage.Dev:
        return <DevPage onBack={() => setActivePage(AppPage.InProgress)} />;
      case AppPage.InProgress:
        return (
          <InProgressPage
            stories={stories}
            storyProgressById={storyProgressById}
            onSelectStory={handleOpenStory}
            onOpenMainList={() => setActivePage(AppPage.Main)}
          />
        );
      case AppPage.Main:
      default:
        return (
          <StoryList
            stories={stories}
            onSelectStory={handleOpenStory}
            storyProgressById={storyProgressById}
            onBackToInProgress={() => setActivePage(AppPage.InProgress)}
          />
        );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Navbar
        themeMode={themeMode}
        onToggleTheme={handleToggleTheme}
        onOpenMainList={() => {
          setSelectedStoryId(null);
          setActivePage(AppPage.Main);
        }}
        showDevButton={isDevelopment}
        onOpenDevPage={() => {
          setSelectedStoryId(null);
          setActivePage(AppPage.Dev);
        }}
      />

      <Container maxWidth="lg" sx={{ py: 4, px: { xs: 2, md: 3 } }}>
        {renderPage()}
      </Container>
    </ThemeProvider>
  );
}

export default App;
