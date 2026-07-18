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
  Button,
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
import type { Story } from "../storiesData";

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
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    "All" | "Beginner" | "Intermediate"
  >("All");
  const [selectedProgress, setSelectedProgress] = useState<
    "All" | "Unread" | "Completed"
  >("All");

  const filteredStories = useMemo(() => {
    return stories.filter((story) => {
      const matchesSearch =
        story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.synopsis.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDifficulty =
        selectedDifficulty === "All" || story.difficulty === selectedDifficulty;

      const isCompleted = completedStoryIds.includes(story.id);
      const matchesProgress =
        selectedProgress === "All" ||
        (selectedProgress === "Completed" && isCompleted) ||
        (selectedProgress === "Unread" && !isCompleted);

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
            ENGLISH LEARNING COMPANION
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
          Kids' Stories for English Learners
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
          Practice reading simple, engaging fables. Track your progress and
          master new vocabulary terms.
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
              Search
            </Typography>
          </Box>

          <TextField
            placeholder="Search fables..."
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
              Level
            </Typography>
          </Box>

          <ToggleButtonGroup
            value={selectedDifficulty}
            exclusive
            onChange={(_, val) => val && setSelectedDifficulty(val)}
            orientation="vertical"
            size="small"
            aria-label="difficulty filter"
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
            <ToggleButton value="All">All Levels</ToggleButton>
            <ToggleButton value="Beginner">Beginner</ToggleButton>
            <ToggleButton value="Intermediate">Intermediate</ToggleButton>
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
              Progress
            </Typography>
          </Box>

          <ToggleButtonGroup
            value={selectedProgress}
            exclusive
            onChange={(_, val) => val && setSelectedProgress(val)}
            orientation="vertical"
            size="small"
            aria-label="progress filter"
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
            <ToggleButton value="All">All Stories</ToggleButton>
            <ToggleButton value="Unread">Unread</ToggleButton>
            <ToggleButton value="Completed">Completed</ToggleButton>
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
                onClick={() => onSelectStory(story.id)}
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
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  transition:
                    "transform 0.2s, border-color 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    borderColor: "primary.main",
                    boxShadow: "0 8px 24px rgba(170, 59, 255, 0.08)",
                    "& .chevron-icon": {
                      transform: "translateX(4px)",
                      color: "primary.main",
                    },
                  },
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
                        {story.title}
                      </Typography>

                      <Chip
                        label={story.difficulty}
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
                          label="Completed"
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
                          label="Unread"
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
                      {story.synopsis}
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
                          label: `${story.readingTimeMin} min read`,
                        },
                        {
                          icon: <Layers sx={{ fontSize: 16 }} />,
                          label: `${story.wordCount} words`,
                        },
                        {
                          icon: <MenuBook sx={{ fontSize: 16 }} />,
                          label: `${story.glossary.length} vocab words`,
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
                            {label}
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
                  <Button
                    variant="text"
                    endIcon={
                      <ChevronRight
                        className="chevron-icon"
                        sx={{ transition: "transform 0.2s, color 0.2s" }}
                      />
                    }
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
                    {isCompleted ? "Read Again" : "Start Reading"}
                  </Button>
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
            No stories match your criteria
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontFamily: "Inter, system-ui, sans-serif", mb: 3 }}
          >
            Try modifying your search text, changing the level, or altering
            progress filters.
          </Typography>
          <Button
            variant="outlined"
            onClick={() => {
              setSearchQuery("");
              setSelectedDifficulty("All");
              setSelectedProgress("All");
            }}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontFamily: "Inter, system-ui, sans-serif",
              fontWeight: "600",
            }}
          >
            Reset Filters
          </Button>
        </Paper>
      )}
    </Box>
  );
}
