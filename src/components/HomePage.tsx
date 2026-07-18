import { Box, Paper, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { uiText } from "../constants/uiText";
import type { Story } from "../types/story";
import AppButton from "./AppButton";
import StoryCard from "./StoryCard";
import Translatable from "./Translatable";

interface HomePageProps {
  stories: Story[];
  storyProgressById: Record<string, number>;
  onSelectStory: (id: string) => void;
  onOpenMainList: () => void;
}

export function HomePage({
  stories,
  storyProgressById,
  onSelectStory,
  onOpenMainList,
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

  const [suggestedStoryIndex, setSuggestedStoryIndex] = useState(0);

  const suggestedStory =
    suggestedStories.length > 0
      ? suggestedStories[suggestedStoryIndex % suggestedStories.length]
      : null;
  const isLastSuggestedStory =
    suggestedStories.length > 0 &&
    suggestedStoryIndex % suggestedStories.length ===
      suggestedStories.length - 1;

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

              <AppButton
                variant="outlined"
                onClick={() =>
                  setSuggestedStoryIndex((prev) =>
                    suggestedStories.length === 0
                      ? 0
                      : (prev + 1) % suggestedStories.length,
                  )
                }
                disabled={suggestedStories.length < 2}
                sx={{ textTransform: "none", fontWeight: "700" }}
              >
                {isLastSuggestedStory
                  ? uiText.inProgressPage.tryOneMoreTime
                  : uiText.storyReader.nextSentence}
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

            <AppButton
              fullWidth
              variant="outlined"
              onClick={onOpenMainList}
              sx={{ textTransform: "none", fontWeight: "700" }}
            >
              {uiText.navbar.allStoriesButton}
            </AppButton>
          </Paper>
        )
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          {inProgressStories.map((story) => {
            const totalSentences = story.sentences.length;
            const completedSentences = Math.min(
              storyProgressById[story.id] ?? 0,
              totalSentences,
            );

            return (
              <StoryCard
                key={story.id}
                story={story}
                isCompleted={false}
                completedSentences={completedSentences}
                onSelectStory={onSelectStory}
                ctaMode="continue"
                scrollToTopOnSelect={false}
              />
            );
          })}
        </Box>
      )}
    </Box>
  );
}
