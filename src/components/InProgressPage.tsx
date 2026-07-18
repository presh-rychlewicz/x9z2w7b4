import { Box, Paper, Typography } from "@mui/material";
import { useMemo } from "react";
import { uiText } from "../constants/uiText";
import type { Story } from "../types/story";
import AppButton from "./AppButton";
import StoryCard from "./StoryCard";
import Translatable from "./Translatable";

interface InProgressPageProps {
  stories: Story[];
  storyProgressById: Record<string, number>;
  onSelectStory: (id: string) => void;
  onOpenMainList: () => void;
}

export function InProgressPage({
  stories,
  storyProgressById,
  onSelectStory,
  onOpenMainList,
}: InProgressPageProps) {
  const difficultyRank: Record<Story["difficulty"], number> = {
    Beginner: 0,
    Intermediate: 1,
    Advanced: 2,
  };

  const inProgressStories = useMemo(() => {
    return stories
      .filter((story) => {
        const totalSentences = story.sentences.length;
        const completedSentences = Math.min(
          storyProgressById[story.id] ?? 0,
          totalSentences,
        );
        const isCompleted = completedSentences >= totalSentences;
        return completedSentences > 0 && !isCompleted;
      })
      .sort((a, b) => {
        const rankDiff =
          difficultyRank[a.difficulty] - difficultyRank[b.difficulty];
        if (rankDiff !== 0) return rankDiff;
        return a.title.localeCompare(b.title, undefined, {
          sensitivity: "base",
        });
      });
  }, [stories, storyProgressById, difficultyRank]);

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "800",
          fontFamily: "Inter, system-ui, sans-serif",
          mb: 0.5,
        }}
      >
        <Translatable>{uiText.inProgressPage.title}</Translatable>
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontFamily: "Inter, system-ui, sans-serif", mb: 3 }}
      >
        <Translatable>{uiText.inProgressPage.subtitle}</Translatable>
      </Typography>

      {inProgressStories.length === 0 ? (
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
