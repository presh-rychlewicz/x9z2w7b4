import { Box, Paper, Typography } from "@mui/material";
import { useMemo } from "react";
import { uiText } from "../constants/uiText";
import type { Story } from "../types/story";
import AppButton from "./AppButton";
import StoryCard from "./StoryCard";
import Translatable from "./Translatable";

interface HomePageProps {
  stories: Story[];
  storyProgressById: Record<string, number>;
  onSelectStory: (id: string) => void;
}

export function HomePage({
  stories,
  storyProgressById,
  onSelectStory,
}: HomePageProps) {
  const inProgressStories = useMemo(() => {
    return stories.filter((story) => {
      const totalSentences = story.sentences.length;
      const completedSentences = Math.min(
        storyProgressById[story.id] ?? 0,
        totalSentences,
      );
      const isCompleted = completedSentences >= totalSentences;
      return completedSentences > 0 && !isCompleted;
    });
  }, [stories, storyProgressById]);

  const suggestedStories = useMemo(() => {
    return stories.filter((story) => {
      const totalSentences = story.sentences.length;
      const completedSentences = Math.min(
        storyProgressById[story.id] ?? 0,
        totalSentences,
      );
      const isCompleted = completedSentences >= totalSentences;
      const isInProgress = completedSentences > 0 && !isCompleted;

      return !isInProgress && !isCompleted;
    });
  }, [stories, storyProgressById]);

  const suggestedStory =
    suggestedStories.length > 0 ? suggestedStories[0] : null;
  const activeInProgressStory =
    inProgressStories.length > 0 ? inProgressStories[0] : null;

  return (
    <Box>
      {inProgressStories.length === 0 ? (
        suggestedStory ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "calc(100vh - 180px)",
            }}
          >
            <Box
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "flex-start",
              }}
            >
              <StoryCard
                story={suggestedStory}
                isCompleted={false}
                completedSentences={0}
                onSelectStory={onSelectStory}
                scrollToTopOnSelect={false}
                showActionButton={false}
              />
            </Box>

            <Box
              sx={{
                mt: 2.5,
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 1.5,
              }}
            >
              <AppButton
                variant="contained"
                onClick={() => onSelectStory(suggestedStory.id)}
                sx={{ textTransform: "none", fontWeight: "700" }}
              >
                {uiText.dashboard.ctaStartReading}
              </AppButton>
            </Box>
          </Box>
        ) : (
          <Paper
            elevation={0}
            sx={{
              py: 6,
              px: 3,
              textAlign: "center",
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "700",
                fontFamily: "Inter, system-ui, sans-serif",
                mb: 1,
              }}
            >
              <Translatable>{uiText.inProgressPage.emptyTitle}</Translatable>
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontFamily: "Inter, system-ui, sans-serif", mb: 2 }}
            >
              <Translatable>
                {uiText.inProgressPage.emptyDescription}
              </Translatable>
            </Typography>
          </Paper>
        )
      ) : activeInProgressStory ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "calc(100vh - 180px)",
          }}
        >
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <StoryCard
              story={activeInProgressStory}
              isCompleted={false}
              completedSentences={Math.min(
                storyProgressById[activeInProgressStory.id] ?? 0,
                activeInProgressStory.sentences.length,
              )}
              onSelectStory={onSelectStory}
              ctaMode="continue"
              scrollToTopOnSelect={false}
              showActionButton={false}
            />
          </Box>

          <Box
            sx={{
              mt: 2.5,
              display: "flex",
            }}
          >
            <AppButton
              variant="contained"
              fullWidth
              onClick={() => onSelectStory(activeInProgressStory.id)}
              sx={{ textTransform: "none", fontWeight: "700" }}
            >
              {uiText.inProgressPage.continueReading}
            </AppButton>
          </Box>
        </Box>
      ) : null}
    </Box>
  );
}
