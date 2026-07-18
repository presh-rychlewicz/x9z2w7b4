import { Box, Paper, Typography } from "@mui/material";
import AppButton from "./AppButton";

interface StatRow {
  label: string;
  value: number;
  highlight?: boolean;
}

interface DevStatsCardProps {
  title: string;
  rows: StatRow[];
  footerText?: string;
  onCopyFooter?: () => void;
  copyFooterLabel?: string;
}

export function DevStatsCard({
  title,
  rows,
  footerText,
  onCopyFooter,
  copyFooterLabel,
}: DevStatsCardProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: 2.5,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 1.5,
          fontWeight: 700,
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        {title}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {rows.map((row) => (
          <Typography
            key={row.label}
            variant="body2"
            color={row.highlight ? "warning.main" : undefined}
            sx={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontWeight: row.highlight ? 600 : 400,
            }}
          >
            {row.label}: {row.value}
          </Typography>
        ))}

        {footerText ? (
          <Box sx={{ display: "flex", gap: 1, mt: 0.5 }}>
            <AppButton
              variant="outlined"
              size="small"
              onClick={onCopyFooter}
              sx={{ textTransform: "none" }}
            >
              {copyFooterLabel}
            </AppButton>
          </Box>
        ) : null}
      </Box>
    </Paper>
  );
}
