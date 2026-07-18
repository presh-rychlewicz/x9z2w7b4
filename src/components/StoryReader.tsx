import {
  Add,
  ArrowBack,
  CheckCircle,
  FormatSize,
  NavigateBefore,
  NavigateNext,
  RadioButtonUnchecked,
  Remove,
} from "@mui/icons-material";
import {
  Box,
  Chip,
  Divider,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { uiLabel, uiText } from "../constants/uiText";
import type { Story } from "../types/story";
import AppButton from "./AppButton";
import Translatable from "./Translatable";

interface StoryReaderProps {
  story: Story;
  onBack: () => void;
  isCompleted: boolean;
  onToggleComplete: () => void;
}

export function StoryReader({
  story,
  onBack,
  isCompleted,
  onToggleComplete,
}: StoryReaderProps) {
  const MIN_FONT_SIZE = 16;
  const MAX_FONT_SIZE = 28;
  const FONT_SIZE_STEP = 2;
  const [fontSize, setFontSize] = useState<number>(20);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(-1);

  const sentences = useMemo(() => story.sentences, [story.sentences]);

  useEffect(() => {
    setCurrentSentenceIndex(-1);
  }, [story.id]);

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
  const progressPercent = (completedSentences / totalSentences) * 100;
  const isIntroStep = currentSentenceIndex < 0;
  const isFirstStep = currentSentenceIndex <= -1;
  const isLastSentence = currentSentenceIndex >= totalSentences - 1;

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

        {/* Reading Settings */}
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
            <FormatSize color="action" />
            <AppButton
              variant="outlined"
              color="primary"
              size="small"
              aria-label={uiText.storyReader.decreaseFontSizeAriaLabel}
              onClick={() =>
                setFontSize((prev) =>
                  Math.max(MIN_FONT_SIZE, prev - FONT_SIZE_STEP),
                )
              }
              disabled={fontSize <= MIN_FONT_SIZE}
              sx={{ minWidth: 38, px: 0.5, borderRadius: 2, fontWeight: "700" }}
            >
              <Remove fontSize="small" />
            </AppButton>

            <AppButton
              variant="outlined"
              color="primary"
              size="small"
              aria-label={uiText.storyReader.increaseFontSizeAriaLabel}
              onClick={() =>
                setFontSize((prev) =>
                  Math.min(MAX_FONT_SIZE, prev + FONT_SIZE_STEP),
                )
              }
              disabled={fontSize >= MAX_FONT_SIZE}
              sx={{ minWidth: 38, px: 0.5, borderRadius: 2, fontWeight: "700" }}
            >
              <Add fontSize="small" />
            </AppButton>
          </Box>
        </Box>
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
            {uiText.storyReader.sentenceProgressLabel} {completedSentences}{" "}
            {uiText.storyReader.sentenceProgressOf} {totalSentences}
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

                <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                  <Chip
                    label={<Translatable>{story.difficulty}</Translatable>}
                    color={
                      story.difficulty === "Beginner" ? "success" : "warning"
                    }
                    size="small"
                  />
                  <Chip
                    label={
                      <Translatable>
                        {uiLabel.minRead(story.readingTimeMin)}
                      </Translatable>
                    }
                    variant="outlined"
                    size="small"
                  />
                </Box>
              </Box>
            ) : (
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
                  <Translatable>{activeSentence}</Translatable>
                ) : null}
              </Typography>
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

              {isLastSentence ? (
                <AppButton
                  variant="contained"
                  color={isCompleted ? "success" : "primary"}
                  startIcon={
                    isCompleted ? <CheckCircle /> : <RadioButtonUnchecked />
                  }
                  onClick={onToggleComplete}
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  {isCompleted
                    ? uiText.storyReader.markAsUnread
                    : uiText.storyReader.markAsCompleted}
                </AppButton>
              ) : (
                <AppButton
                  variant="contained"
                  endIcon={<NavigateNext />}
                  onClick={() =>
                    setCurrentSentenceIndex((prev) =>
                      Math.min(prev + 1, totalSentences - 1),
                    )
                  }
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  {uiText.storyReader.nextSentence}
                </AppButton>
              )}
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
