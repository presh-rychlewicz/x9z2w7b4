import {
  Add,
  ArrowBack,
  NavigateBefore,
  NavigateNext,
  Remove,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { Box, Divider, LinearProgress, Paper, Typography } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { uiLabel, uiText } from "../constants/uiText";
import type { Story } from "../types/story";
import AppButton from "./AppButton";
import LevelPill from "./LevelPill";
import Translatable, { translatePlainText } from "./Translatable";

interface StoryReaderProps {
  story: Story;
  onBack: () => void;
  onGoHome: () => void;
  initialCompletedSentences: number;
  onProgressChange: (completedSentences: number) => void;
  startFromCover?: boolean;
  onCoverNext?: () => void;
  showStoryTranslations: boolean;
  onToggleStoryTranslations: () => void;
}

export function StoryReader({
  story,
  onBack,
  onGoHome,
  initialCompletedSentences,
  onProgressChange,
  startFromCover = false,
  onCoverNext,
  showStoryTranslations,
  onToggleStoryTranslations,
}: StoryReaderProps) {
  const MIN_FONT_SIZE = 16;
  const MAX_FONT_SIZE = 28;
  const FONT_SIZE_STEP = 2;
  const [fontSize, setFontSize] = useState<number>(20);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(() => {
    if (startFromCover) return -1;

    const initial = Math.max(
      0,
      Math.min(initialCompletedSentences, story.sentences.length),
    );
    return initial - 1;
  });
  const onProgressChangeRef = useRef(onProgressChange);
  const lastReportedProgressRef = useRef<number | null>(null);

  const sentences = useMemo(() => story.sentences, [story.sentences]);

  useEffect(() => {
    onProgressChangeRef.current = onProgressChange;
  }, [onProgressChange]);

  useEffect(() => {
    if (startFromCover) {
      setCurrentSentenceIndex((prev) => (prev === -1 ? prev : -1));
      return;
    }

    const maxCompletedSentences = Math.max(
      0,
      Math.min(initialCompletedSentences, sentences.length),
    );
    const nextSentenceIndex = maxCompletedSentences - 1;
    setCurrentSentenceIndex((prev) =>
      prev === nextSentenceIndex ? prev : nextSentenceIndex,
    );
  }, [story.id, sentences.length, startFromCover, initialCompletedSentences]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const totalSentences = Math.max(sentences.length, 1);
  const completedSentences = Math.max(currentSentenceIndex + 1, 0);
  const activeSentence =
    currentSentenceIndex >= 0 ? (sentences[currentSentenceIndex] ?? "") : "";
  const activeSentenceTranslation = useMemo(() => {
    if (!activeSentence) return "";
    return translatePlainText(activeSentence);
  }, [activeSentence]);
  const progressPercent = (completedSentences / totalSentences) * 100;
  const isIntroStep = currentSentenceIndex < 0;
  const isFirstStep = currentSentenceIndex <= -1;
  const isLastSentence = currentSentenceIndex >= totalSentences - 1;

  useEffect(() => {
    if (startFromCover && isIntroStep) {
      return;
    }

    if (lastReportedProgressRef.current === completedSentences) {
      return;
    }

    lastReportedProgressRef.current = completedSentences;
    onProgressChangeRef.current(completedSentences);
  }, [completedSentences, startFromCover, isIntroStep]);

  return (
    <Box
      sx={{
        height: "calc(100vh - 132px)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header controls */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
          mb: 2,
          flexWrap: "nowrap",
        }}
      >
        <AppButton
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={onBack}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontFamily: "Inter, system-ui, sans-serif",
            fontWeight: "600",
          }}
        >
          {uiText.storyReader.backToStories}
        </AppButton>

        {!isIntroStep ? (
          /* Reading Settings */
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1,
              alignItems: "center",
              width: "auto",
              flexShrink: 0,
            }}
          >
            {/* Font Size Selectors */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 1,
                alignItems: "center",
              }}
            >
              <AppButton
                variant="outlined"
                color="primary"
                aria-label={uiText.storyReader.decreaseFontSizeAriaLabel}
                onClick={() =>
                  setFontSize((prev) =>
                    Math.max(MIN_FONT_SIZE, prev - FONT_SIZE_STEP),
                  )
                }
                disabled={fontSize <= MIN_FONT_SIZE}
                sx={{
                  minHeight: 44,
                  minWidth: 44,
                  borderRadius: 2,
                  fontWeight: "700",
                }}
              >
                <Remove fontSize="small" />
              </AppButton>

              <AppButton
                variant="outlined"
                color="primary"
                aria-label={uiText.storyReader.increaseFontSizeAriaLabel}
                onClick={() =>
                  setFontSize((prev) =>
                    Math.min(MAX_FONT_SIZE, prev + FONT_SIZE_STEP),
                  )
                }
                disabled={fontSize >= MAX_FONT_SIZE}
                sx={{
                  minHeight: 44,
                  minWidth: 44,
                  borderRadius: 2,
                  fontWeight: "700",
                }}
              >
                <Add fontSize="small" />
              </AppButton>

              <AppButton
                variant={showStoryTranslations ? "contained" : "outlined"}
                color="primary"
                aria-label={
                  showStoryTranslations
                    ? uiText.storyReader.hideTranslationsAriaLabel
                    : uiText.storyReader.showTranslationsAriaLabel
                }
                onClick={onToggleStoryTranslations}
                sx={{
                  minHeight: 44,
                  minWidth: 44,
                  borderRadius: 2,
                }}
              >
                {showStoryTranslations ? (
                  <VisibilityOff fontSize="small" />
                ) : (
                  <Visibility fontSize="small" />
                )}
              </AppButton>
            </Box>
          </Box>
        ) : null}
      </Box>

      {/* Layout Grid */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 0,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            display: "flex",
            flexDirection: "column",
            flex: 1,
            minHeight: 0,
            overflow: "hidden",
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 1,
              fontFamily: "Inter, system-ui, sans-serif",
              fontWeight: 600,
            }}
          >
            <Translatable>
              {`${uiText.dashboard.storyProgressLabel} ${uiLabel.storyProgress(completedSentences, totalSentences)}`}
            </Translatable>
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progressPercent}
            sx={{ mb: 3, height: 8, borderRadius: 999 }}
          />

          <Divider sx={{ mb: 3 }} />

          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              px: { xs: 0.5, md: 2 },
              minHeight: 0,
            }}
          >
            {isIntroStep ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    fontWeight: "700",
                    mb: 2,
                    fontFamily: "Inter, system-ui, sans-serif",
                  }}
                >
                  <Translatable>{story.title}</Translatable>
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <LevelPill difficulty={story.difficulty} />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontFamily: "Inter, system-ui, sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    <Translatable>
                      {uiLabel.wordCount(story.wordCount)}
                    </Translatable>
                  </Typography>
                </Box>
              </Box>
            ) : (
              <>
                <Typography
                  component="p"
                  sx={{
                    fontSize: `${fontSize}px`,
                    lineHeight: 1.9,
                    color: "text.primary",
                    textAlign: "center",
                    fontWeight: 500,
                    maxWidth: 900,
                  }}
                >
                  {activeSentence ? (
                    <Translatable enableTooltips={!showStoryTranslations}>
                      {activeSentence}
                    </Translatable>
                  ) : null}
                </Typography>

                {showStoryTranslations && activeSentence ? (
                  <Typography
                    component="p"
                    color="text.secondary"
                    sx={{
                      mt: 2,
                      fontSize: `${Math.max(fontSize - 4, 14)}px`,
                      lineHeight: 1.7,
                      textAlign: "center",
                      maxWidth: 900,
                    }}
                  >
                    {activeSentenceTranslation}
                  </Typography>
                ) : null}
              </>
            )}
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "stretch", md: "center" },
              justifyContent: "flex-start",
              gap: 1.5,
            }}
          >
            <Box sx={{ display: "flex", gap: 1, width: "100%" }}>
              <AppButton
                variant="outlined"
                startIcon={<NavigateBefore />}
                onClick={() =>
                  setCurrentSentenceIndex((prev) => Math.max(prev - 1, -1))
                }
                disabled={isFirstStep}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  flex: 1,
                  minWidth: 0,
                }}
              >
                {uiText.storyReader.previousSentence}
              </AppButton>

              <AppButton
                variant="contained"
                endIcon={<NavigateNext />}
                onClick={() => {
                  if (isLastSentence) {
                    onGoHome();
                    return;
                  }

                  if (isIntroStep) {
                    onCoverNext?.();
                  }

                  setCurrentSentenceIndex((prev) =>
                    Math.min(prev + 1, totalSentences - 1),
                  );
                }}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  flex: 1,
                  minWidth: 0,
                }}
              >
                {isLastSentence
                  ? uiText.storyReader.endStory
                  : uiText.storyReader.nextSentence}
              </AppButton>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
