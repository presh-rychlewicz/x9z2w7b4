import {
  Brightness4,
  Brightness7,
  ConstructionRounded,
  MenuBook,
  School,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { uiText } from "../constants/uiText";
import Translatable from "./Translatable";

interface NavbarProps {
  themeMode: "light" | "dark";
  onToggleTheme: () => void;
  onOpenMainList: () => void;
  showDevButton: boolean;
  onOpenDevPage: () => void;
}

export function Navbar({
  themeMode,
  onToggleTheme,
  onOpenMainList,
  showDevButton,
  onOpenDevPage,
}: NavbarProps) {
  const storiesButtonLabel = uiText.navbar.allStoriesButton;

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={1}
      sx={{ borderBottom: "1px solid", borderColor: "divider" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
          }}
        >
          <School color="primary" />
          <Typography
            variant="h6"
            sx={{
              fontWeight: "700",
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            <Translatable>{uiText.navbar.brandName}</Translatable>
          </Typography>
          <Typography
            variant="caption"
            sx={{
              display: { xs: "none", sm: "block" },
              fontFamily: "Inter, system-ui, sans-serif",
              color: "text.secondary",
            }}
          >
            <Translatable>{uiText.navbar.tagline}</Translatable>
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.25 }}>
          <Tooltip title={storiesButtonLabel}>
            <IconButton
              size="small"
              color="inherit"
              aria-label={storiesButtonLabel}
              onClick={onOpenMainList}
            >
              <MenuBook fontSize="small" />
            </IconButton>
          </Tooltip>

          {showDevButton && (
            <Tooltip title={uiText.navbar.devButton}>
              <IconButton
                size="small"
                color="inherit"
                aria-label={uiText.navbar.devButton}
                onClick={onOpenDevPage}
              >
                <ConstructionRounded fontSize="small" />
              </IconButton>
            </Tooltip>
          )}

          <IconButton onClick={onToggleTheme} color="inherit">
            {themeMode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
