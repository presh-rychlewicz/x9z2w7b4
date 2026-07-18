import {
  AccessTime,
  ArrowBack,
  CheckCircle,
  ChevronRight,
  ExpandLess,
  ExpandMore,
  FilterList,
  Layers,
  LocalOffer,
  MenuBook,
  RadioButtonUnchecked,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  Chip,
  Collapse,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { DifficultyFilter, ProgressFilter } from "../constants/filters";
import { uiLabel, uiText } from "../constants/uiText";
import type { Story } from "../types/story";
import AppButton from "./AppButton";
import Translatable from "./Translatable";

interface StoryListProps {
  stories: Story[];
  onSelectStory: (id: string, options?: { startFromCover?: boolean }) => void;
  storyProgressById: Record<string, number>;
  onBackToInProgress?: () => void;
}

export function StoryList({
  stories,
  onSelectStory,
  storyProgressById,
  onBackToInProgress,
}: StoryListProps) {
  const difficultyRank: Record<Story["difficulty"], number> = {
    Beginner: 0,
    Intermediate: 1,
    Advanced: 2,
  };
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<DifficultyFilter>(DifficultyFilter.All);
  const [selectedProgress, setSelectedProgress] = useState<ProgressFilter>(
    ProgressFilter.Unread,
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [areFiltersCollapsed, setAreFiltersCollapsed] = useState(true);

  const categoryOptions = useMemo(() => {
    const categories = Array.from(
      new Set(stories.map((story) => story.category)),
    );
    categories.sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: "base" }),
    );
    return ["All", ...categories];
  }, [stories]);

  const filteredStories = useMemo(() => {
    return stories
      .filter((story) => {
        const matchesDifficulty =
          selectedDifficulty === DifficultyFilter.All ||
          story.difficulty === selectedDifficulty;
        const matchesCategory =
          selectedCategory === "All" || story.category === selectedCategory;

        const totalSentences = story.sentences.length;
        const completedSentences = Math.min(
          storyProgressById[story.id] ?? 0,
          totalSentences,
        );
        const isCompleted = completedSentences >= totalSentences;
        const isInProgress = completedSentences > 0 && !isCompleted;
        const matchesProgress =
          selectedProgress === ProgressFilter.All ||
          (selectedProgress === ProgressFilter.Completed && isCompleted) ||
          (selectedProgress === ProgressFilter.InProgress && isInProgress) ||
          (selectedProgress === ProgressFilter.Unread && !isCompleted);

        return matchesDifficulty && matchesCategory && matchesProgress;
      })
      .sort((a, b) => {
        const rankDiff =
          difficultyRank[a.difficulty] - difficultyRank[b.difficulty];
        if (rankDiff !== 0) return rankDiff;
        return a.title.localeCompare(b.title, undefined, {
          sensitivity: "base",
        });
      });
  }, [
    stories,
    selectedDifficulty,
    selectedCategory,
    selectedProgress,
    storyProgressById,
    difficultyRank,
  ]);

  const getDifficultyStyle = (diff: string) => {
    if (diff === "Beginner")
      return {
        bg: "rgba(46,125,50,0.1)",
        color: "#2e7d32",
        border: "rgba(46,125,50,0.3)",
      };
    if (diff === "Intermediate")
      return {
        bg: "rgba(237,108,2,0.1)",
        color: "#ed6c02",
        border: "rgba(237,108,2,0.3)",
      };
    return {
      bg: "rgba(156,39,176,0.1)",
      color: "#9c27b0",
      border: "rgba(156,39,176,0.3)",
    };
  };

  const filterButtonSx = {
    justifyContent: "flex-start",
    borderRadius: 2,
    px: 2,
    py: 0.7,
    textTransform: "none",
    fontWeight: "600",
    fontFamily: "Inter, system-ui, sans-serif",
  } as const;

  return (
    <Box>
      {onBackToInProgress ? (
        <AppButton
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={onBackToInProgress}
          sx={{ mb: 2, textTransform: "none", fontWeight: "600" }}
        >
          {uiText.dashboard.backToInProgress}
        </AppButton>
      ) : null}

      <AppButton
        variant="outlined"
        fullWidth
        onClick={() => setAreFiltersCollapsed((prev) => !prev)}
        endIcon={areFiltersCollapsed ? <ExpandMore /> : <ExpandLess />}
        sx={{
          mb: 2,
          borderRadius: 2,
          textTransform: "none",
          fontWeight: "700",
          fontFamily: "Inter, system-ui, sans-serif",
          justifyContent: "space-between",
        }}
      >
        {areFiltersCollapsed
          ? uiText.dashboard.showFilters
          : uiText.dashboard.hideFilters}
      </AppButton>

      <Collapse in={!areFiltersCollapsed}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              <FilterList color="action" sx={{ flexShrink: 0 }} />
              <Typography
                variant="body2"
                sx={{ fontWeight: "600", fontFamily: "Inter, sans-serif" }}
              >
                <Translatable>{uiText.dashboard.levelLabel}</Translatable>
              </Typography>
            </Box>

            <Box
              role="group"
              aria-label={uiText.dashboard.difficultyAriaLabel}
              sx={{ display: "flex", flexDirection: "column", gap: 1 }}
            >
              {[DifficultyFilter.All, DifficultyFilter.Beginner].map(
                (value) => (
                  <AppButton
                    key={value}
                    variant={
                      selectedDifficulty === value ? "contained" : "outlined"
                    }
                    size="small"
                    alignLabelLeft
                    aria-pressed={selectedDifficulty === value}
                    onClick={() => setSelectedDifficulty(value)}
                    sx={filterButtonSx}
                  >
                    {value === DifficultyFilter.All
                      ? uiText.dashboard.difficultyAll
                      : uiText.dashboard.difficultyBeginner}
                  </AppButton>
                ),
              )}
            </Box>
          </Box>

          <Divider />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              <LocalOffer color="action" sx={{ flexShrink: 0 }} />
              <Typography
                variant="body2"
                sx={{ fontWeight: "600", fontFamily: "Inter, sans-serif" }}
              >
                <Translatable>{uiText.dashboard.categoryLabel}</Translatable>
              </Typography>
            </Box>

            <Box
              role="group"
              aria-label={uiText.dashboard.categoryAriaLabel}
              sx={{ display: "flex", flexDirection: "column", gap: 1 }}
            >
              {categoryOptions.map((category) => (
                <AppButton
                  key={category}
                  variant={
                    selectedCategory === category ? "contained" : "outlined"
                  }
                  size="small"
                  alignLabelLeft
                  aria-pressed={selectedCategory === category}
                  onClick={() => setSelectedCategory(category)}
                  sx={filterButtonSx}
                >
                  {category}
                </AppButton>
              ))}
            </Box>
          </Box>

          <Divider />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              <CheckCircle color="action" sx={{ flexShrink: 0 }} />
              <Typography
                variant="body2"
                sx={{ fontWeight: "600", fontFamily: "Inter, sans-serif" }}
              >
                <Translatable>{uiText.dashboard.progressLabel}</Translatable>
              </Typography>
            </Box>

            <Box
              role="group"
              aria-label={uiText.dashboard.progressAriaLabel}
              sx={{ display: "flex", flexDirection: "column", gap: 1 }}
            >
              {[
                ProgressFilter.All,
                ProgressFilter.Unread,
                ProgressFilter.InProgress,
                ProgressFilter.Completed,
              ].map((value) => (
                <AppButton
                  key={value}
                  variant={
                    selectedProgress === value ? "contained" : "outlined"
                  }
                  size="small"
                  alignLabelLeft
                  aria-pressed={selectedProgress === value}
                  onClick={() => setSelectedProgress(value)}
                  sx={filterButtonSx}
                >
                  {value === ProgressFilter.All
                    ? uiText.dashboard.progressAll
                    : value === ProgressFilter.Unread
                      ? uiText.dashboard.progressUnread
                      : value === ProgressFilter.InProgress
                        ? uiText.dashboard.progressInProgress
                        : uiText.dashboard.progressCompleted}
                </AppButton>
              ))}
            </Box>
          </Box>
        </Paper>
      </Collapse>

      {filteredStories.length > 0 ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          {filteredStories.map((story) => {
            const diffStyle = getDifficultyStyle(story.difficulty);
            const totalSentences = story.sentences.length;
            const completedSentences = Math.min(
              storyProgressById[story.id] ?? 0,
              totalSentences,
            );
            const isCompleted = completedSentences >= totalSentences;
            const isInProgress = completedSentences > 0 && !isCompleted;
            return (
              <Card
                key={story.id}
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

                      <Chip
                        label={<Translatable>{story.difficulty}</Translatable>}
                        size="small"
                        sx={{
                          fontWeight: "700",
                          fontSize: "0.75rem",
                          fontFamily: "Inter, system-ui, sans-serif",
                          bgcolor: diffStyle.bg,
                          color: diffStyle.color,
                          border: "1px solid",
                          borderColor: diffStyle.border,
                        }}
                      />

                      {isCompleted ? (
                        <Chip
                          icon={
                            <CheckCircle
                              style={{ fontSize: 14, color: "#666" }}
                            />
                          }
                          label={
                            <Translatable>
                              {uiText.dashboard.cardCompleted}
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
                      ) : isInProgress ? (
                        <Chip
                          icon={
                            <AccessTime
                              style={{ fontSize: 14, color: "#666" }}
                            />
                          }
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
                            <Translatable>
                              {uiText.dashboard.cardUnread}
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
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        gap: 2.5,
                      }}
                    >
                      {[
                        {
                          icon: <AccessTime sx={{ fontSize: 16 }} />,
                          label: uiLabel.minRead(story.readingTimeMin),
                        },
                        {
                          icon: <Layers sx={{ fontSize: 16 }} />,
                          label: uiLabel.wordCount(story.wordCount),
                        },
                        {
                          icon: <LocalOffer sx={{ fontSize: 16 }} />,
                          label: story.category,
                        },
                        {
                          icon: <CheckCircle sx={{ fontSize: 16 }} />,
                          label: `${uiText.dashboard.storyProgressLabel} ${uiLabel.storyProgress(completedSentences, totalSentences)}`,
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
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      onSelectStory(story.id, {
                        startFromCover: isCompleted,
                      });
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
                    {isCompleted
                      ? uiText.dashboard.ctaReadAgain
                      : isInProgress
                        ? uiText.dashboard.ctaContinueReading
                        : uiText.dashboard.ctaStartReading}
                  </AppButton>
                </Box>
              </Card>
            );
          })}
        </Box>
      ) : (
        <Paper
          elevation={0}
          sx={{
            py: 8,
            px: 4,
            textAlign: "center",
            borderRadius: 4,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <MenuBook color="disabled" sx={{ fontSize: 48, mb: 2 }} />
          <Typography
            variant="h6"
            sx={{
              fontWeight: "700",
              fontFamily: "Inter, system-ui, sans-serif",
              mb: 1,
            }}
          >
            <Translatable>{uiText.dashboard.emptyTitle}</Translatable>
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontFamily: "Inter, system-ui, sans-serif", mb: 3 }}
          >
            <Translatable>{uiText.dashboard.emptyDescription}</Translatable>
          </Typography>
          <AppButton
            variant="outlined"
            onClick={() => {
              setSelectedDifficulty(DifficultyFilter.All);
              setSelectedCategory("All");
              setSelectedProgress(ProgressFilter.All);
            }}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontFamily: "Inter, system-ui, sans-serif",
              fontWeight: "600",
            }}
          >
            {uiText.dashboard.resetFilters}
          </AppButton>
        </Paper>
      )}
    </Box>
  );
}
