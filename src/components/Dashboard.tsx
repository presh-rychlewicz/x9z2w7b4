import {
  AccessTime,
  CheckCircle,
  ChevronRight,
  FilterList,
  Layers,
  MenuBook,
  RadioButtonUnchecked,
  School,
  Search,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  Chip,
  Divider,
  Paper,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { DifficultyFilter, ProgressFilter } from "../constants/filters";
import { uiLabel, uiText } from "../constants/uiText";
import type { Story } from "../types/story";
import AppButton from "./AppButton";
import Translatable from "./Translatable";

interface DashboardProps {
  stories: Story[];
  onSelectStory: (id: string) => void;
  completedStoryIds: string[];
}

export function Dashboard({
  stories,
  onSelectStory,
  completedStoryIds,
}: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<DifficultyFilter>(DifficultyFilter.All);
  const [selectedProgress, setSelectedProgress] = useState<ProgressFilter>(
    ProgressFilter.All,
  );

  const filteredStories = useMemo(() => {
    return stories.filter((story) => {
      const matchesSearch =
        story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.synopsis.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDifficulty =
        selectedDifficulty === DifficultyFilter.All ||
        story.difficulty === selectedDifficulty;

      const isCompleted = completedStoryIds.includes(story.id);
      const matchesProgress =
        selectedProgress === ProgressFilter.All ||
        (selectedProgress === ProgressFilter.Completed && isCompleted) ||
        (selectedProgress === ProgressFilter.Unread && !isCompleted);

      return matchesSearch && matchesDifficulty && matchesProgress;
    });
  }, [
    stories,
    searchQuery,
    selectedDifficulty,
    selectedProgress,
    completedStoryIds,
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

  return (
    <Box>
      {/* Welcome Header */}
      <Box sx={{ mb: 5, textAlign: "center" }}>
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            px: 2,
            py: 0.5,
            borderRadius: 5,
            mb: 2,
            border: "1px solid",
            borderColor: "primary.light",
          }}
        >
          <School color="primary" sx={{ fontSize: 18 }} />
          <Typography
            variant="caption"
            color="primary"
            sx={{
              fontWeight: "700",
              fontFamily: "Inter, system-ui, sans-serif",
              letterSpacing: 1,
            }}
          >
            <Translatable>{uiText.dashboard.badge}</Translatable>
          </Typography>
        </Box>

        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: "800",
            fontFamily: "Inter, system-ui, sans-serif",
            mb: 2,
            letterSpacing: "-0.02em",
            background: "linear-gradient(45deg, #aa3bff 30%, #ff8e53 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          <Translatable>{uiText.dashboard.title}</Translatable>
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            fontFamily: "Inter, system-ui, sans-serif",
            maxWidth: 680,
            mx: "auto",
            fontWeight: "400",
            lineHeight: 1.6,
          }}
        >
          <Translatable>{uiText.dashboard.subtitle}</Translatable>
        </Typography>
      </Box>

      {/* Filter Controls */}
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
        {/* Search */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Search color="action" sx={{ flexShrink: 0 }} />
            <Typography
              variant="body2"
              sx={{ fontWeight: "600", fontFamily: "Inter, sans-serif" }}
            >
              <Translatable>{uiText.dashboard.searchLabel}</Translatable>
            </Typography>
          </Box>

          <TextField
            placeholder={uiText.dashboard.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2.5,
                fontFamily: "Inter, system-ui, sans-serif",
              },
            }}
          />
        </Box>

        <Divider />

        {/* Level filter */}
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

          <ToggleButtonGroup
            value={selectedDifficulty}
            exclusive
            onChange={(_, val) => {
              if (Object.values(DifficultyFilter).includes(val)) {
                setSelectedDifficulty(val as DifficultyFilter);
              }
            }}
            orientation="vertical"
            size="small"
            aria-label={uiText.dashboard.difficultyAriaLabel}
            sx={{
              alignItems: "stretch",
              "& .MuiToggleButtonGroup-grouped": {
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
              },
              "& .MuiToggleButton-root": {
                borderRadius: 2,
                px: 2,
                py: 0.7,
                textTransform: "none",
                fontWeight: "600",
                fontFamily: "Inter, system-ui, sans-serif",
                justifyContent: "flex-start",
              },
              "& .MuiToggleButton-root + .MuiToggleButton-root": {
                mt: 1,
              },
            }}
          >
            <ToggleButton value={DifficultyFilter.All}>
              {uiText.dashboard.difficultyAll}
            </ToggleButton>
            <ToggleButton value={DifficultyFilter.Beginner}>
              {uiText.dashboard.difficultyBeginner}
            </ToggleButton>
            <ToggleButton value={DifficultyFilter.Intermediate}>
              {uiText.dashboard.difficultyIntermediate}
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Divider />

        {/* Progress filter */}
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

          <ToggleButtonGroup
            value={selectedProgress}
            exclusive
            onChange={(_, val) => {
              if (Object.values(ProgressFilter).includes(val)) {
                setSelectedProgress(val as ProgressFilter);
              }
            }}
            orientation="vertical"
            size="small"
            aria-label={uiText.dashboard.progressAriaLabel}
            sx={{
              alignItems: "stretch",
              "& .MuiToggleButtonGroup-grouped": {
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
              },
              "& .MuiToggleButton-root": {
                borderRadius: 2,
                px: 2,
                py: 0.7,
                textTransform: "none",
                fontWeight: "600",
                fontFamily: "Inter, system-ui, sans-serif",
                justifyContent: "flex-start",
              },
              "& .MuiToggleButton-root + .MuiToggleButton-root": {
                mt: 1,
              },
            }}
          >
            <ToggleButton value={ProgressFilter.All}>
              {uiText.dashboard.progressAll}
            </ToggleButton>
            <ToggleButton value={ProgressFilter.Unread}>
              {uiText.dashboard.progressUnread}
            </ToggleButton>
            <ToggleButton value={ProgressFilter.Completed}>
              {uiText.dashboard.progressCompleted}
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Paper>

      {/* Story List */}
      {filteredStories.length > 0 ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          {filteredStories.map((story) => {
            const diffStyle = getDifficultyStyle(story.difficulty);
            const isCompleted = completedStoryIds.includes(story.id);
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
                {/* Completion accent bar */}
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

                {/* Left content */}
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
                    {/* Title + chips */}
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
                              style={{ fontSize: 14, color: "#2e7d32" }}
                            />
                          }
                          label={
                            <Translatable>
                              {uiText.dashboard.cardCompleted}
                            </Translatable>
                          }
                          size="small"
                          color="success"
                          variant="outlined"
                          sx={{
                            fontWeight: "700",
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

                    {/* Metadata row */}
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
                          icon: <MenuBook sx={{ fontSize: 16 }} />,
                          label: uiLabel.vocabWordCount(story.glossary.length),
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

                {/* Right: CTA */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    alignSelf: { xs: "flex-end", sm: "center" },
                    mt: { xs: 2, sm: 0 },
                    pl: { sm: 3 },
                  }}
                >
                  <AppButton
                    variant="text"
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      onSelectStory(story.id);
                    }}
                    endIcon={<ChevronRight className="chevron-icon" />}
                    sx={{
                      textTransform: "none",
                      fontWeight: "700",
                      fontFamily: "Inter, system-ui, sans-serif",
                      color: "text.primary",
                      "&:hover": {
                        bgcolor: "transparent",
                        color: "primary.main",
                      },
                    }}
                  >
                    {isCompleted
                      ? uiText.dashboard.ctaReadAgain
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
              setSearchQuery("");
              setSelectedDifficulty(DifficultyFilter.All);
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
