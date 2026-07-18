import { Chip } from "@mui/material";
import type { Story } from "../types/story";
import Translatable from "./Translatable";

interface LevelPillProps {
  difficulty: Story["difficulty"];
}

function getDifficultyStyle(diff: Story["difficulty"]) {
  if (diff === "Beginner") {
    return {
      bg: "rgba(46,125,50,0.1)",
      color: "#2e7d32",
      border: "rgba(46,125,50,0.3)",
    };
  }

  if (diff === "Intermediate") {
    return {
      bg: "rgba(237,108,2,0.1)",
      color: "#ed6c02",
      border: "rgba(237,108,2,0.3)",
    };
  }

  return {
    bg: "rgba(156,39,176,0.1)",
    color: "#9c27b0",
    border: "rgba(156,39,176,0.3)",
  };
}

export function LevelPill({ difficulty }: LevelPillProps) {
  const diffStyle = getDifficultyStyle(difficulty);

  return (
    <Chip
      label={<Translatable>{difficulty}</Translatable>}
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
  );
}

export default LevelPill;
