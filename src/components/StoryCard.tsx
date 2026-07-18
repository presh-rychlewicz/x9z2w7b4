import {
  AccessTime,
  CheckCircle,
  ChevronRight,
  Layers,
  MenuBook,
  RadioButtonUnchecked,
} from "@mui/icons-material";
import { Avatar, Box, Card, Chip, Typography } from "@mui/material";
import { uiLabel, uiText } from "../constants/uiText";
import type { Story } from "../types/story";
import AppButton from "./AppButton";
import LevelPill from "./LevelPill";
import Translatable from "./Translatable";

interface StoryCardProps {
  story: Story;
  isCompleted: boolean;
  completedSentences: number;
  onSelectStory: (id: string) => void;
  ctaMode?: "auto" | "continue";
  scrollToTopOnSelect?: boolean;
  showActionButton?: boolean;
}

export function StoryCard({
  story,
  isCompleted,
  completedSentences,
  onSelectStory,
  ctaMode = "auto",
  scrollToTopOnSelect = true,
  showActionButton = true,
}: StoryCardProps) {
  const totalSentences = story.sentences.length;
  const safeCompletedSentences = Math.min(
    Math.max(completedSentences, 0),
    totalSentences,
  );
  const isInProgress = safeCompletedSentences > 0 && !isCompleted;

  const ctaLabel =
    ctaMode === "continue"
      ? uiText.inProgressPage.continueReading
      : isCompleted
        ? uiText.dashboard.ctaReadAgain
        : isInProgress
          ? uiText.dashboard.ctaContinueReading
          : uiText.dashboard.ctaStartReading;

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "flex-start", sm: "center" },
        justifyContent: "space-between",
        p: 3,
        border: "1px solid",
        borderColor: isCompleted ? "success.light" : "divider",
        boxShadow: "none",
        borderRadius: 4,
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {isCompleted && (
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 4,
            bgcolor: "success.main",
          }}
        />
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "flex-start", md: "center" },
          gap: 3,
          flex: 1,
        }}
      >
        <Avatar
          sx={{
            width: 56,
            height: 56,
            bgcolor: isCompleted ? "success.light" : "primary.light",
            color: isCompleted ? "success.main" : "primary.main",
            borderRadius: 3.5,
            display: { xs: "none", md: "flex" },
          }}
        >
          <MenuBook />
        </Avatar>

        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 1.5,
              mb: 1,
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontWeight: "700",
                fontFamily: "Inter, system-ui, sans-serif",
                letterSpacing: "-0.01em",
              }}
            >
              <Translatable>{story.title}</Translatable>
            </Typography>

            <LevelPill difficulty={story.difficulty} />

            {isCompleted ? (
              <Chip
                icon={<CheckCircle style={{ fontSize: 14, color: "#666" }} />}
                label={
                  <Translatable>{uiText.dashboard.cardCompleted}</Translatable>
                }
                size="small"
                variant="outlined"
                sx={{
                  fontWeight: "600",
                  fontSize: "0.75rem",
                  fontFamily: "Inter, system-ui, sans-serif",
                }}
              />
            ) : isInProgress ? (
              <Chip
                icon={<AccessTime style={{ fontSize: 14, color: "#666" }} />}
                label={
                  <Translatable>
                    {uiText.dashboard.progressInProgress}
                  </Translatable>
                }
                size="small"
                variant="outlined"
                sx={{
                  fontWeight: "600",
                  fontSize: "0.75rem",
                  fontFamily: "Inter, system-ui, sans-serif",
                }}
              />
            ) : (
              <Chip
                icon={
                  <RadioButtonUnchecked
                    style={{ fontSize: 14, color: "#666" }}
                  />
                }
                label={
                  <Translatable>{uiText.dashboard.cardUnread}</Translatable>
                }
                size="small"
                variant="outlined"
                sx={{
                  fontWeight: "600",
                  fontSize: "0.75rem",
                  fontFamily: "Inter, system-ui, sans-serif",
                }}
              />
            )}
          </Box>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              mb: 2,
              fontFamily: "Inter, system-ui, sans-serif",
              lineHeight: 1.5,
              maxWidth: 800,
            }}
          >
            <Translatable>{story.synopsis}</Translatable>
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 1.5,
            }}
          >
            {[
              {
                icon: <Layers sx={{ fontSize: 16 }} />,
                label: uiLabel.wordCount(story.wordCount),
              },
              {
                icon: <CheckCircle sx={{ fontSize: 16 }} />,
                label: `${uiText.dashboard.storyProgressLabel} ${uiLabel.storyProgress(safeCompletedSentences, totalSentences)}`,
              },
            ].map(({ icon, label }) => (
              <Box
                key={label}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 0.8,
                  color: "text.secondary",
                  minWidth: 0,
                }}
              >
                {icon}
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: "600",
                    fontFamily: "Inter, system-ui, sans-serif",
                  }}
                >
                  <Translatable>{label}</Translatable>
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {showActionButton ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            alignSelf: { xs: "stretch", sm: "center" },
            mt: { xs: 2, sm: 0 },
            pl: { sm: 3 },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <AppButton
            variant="outlined"
            fullWidth
            onClick={() => {
              if (scrollToTopOnSelect) {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
              onSelectStory(story.id);
            }}
            endIcon={<ChevronRight className="chevron-icon" />}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: "700",
              fontFamily: "Inter, system-ui, sans-serif",
              "&:hover": {
                borderColor: "primary.main",
              },
            }}
          >
            {ctaLabel}
          </AppButton>
        </Box>
      ) : null}
    </Card>
  );
}

export default StoryCard;
