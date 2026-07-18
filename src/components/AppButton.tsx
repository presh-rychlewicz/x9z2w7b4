import type { ButtonProps, TypographyProps } from "@mui/material";
import { Box, Button, Typography } from "@mui/material";
import { useMemo } from "react";
import uiTranslations from "../i18n/uiTranslations";

function normalizeWord(word: string) {
  return word.toLowerCase().replace(/^[^a-zA-Z']+|[^a-zA-Z']+$/g, "");
}

function translateLabel(label: string) {
  const exact = uiTranslations[label.toLowerCase()];
  if (exact) return exact;

  let translatedCount = 0;

  const translated = label
    .split(/(\s+)/)
    .map((token) => {
      if (!token.trim()) return token;

      const direct = uiTranslations[token.toLowerCase()];
      if (direct) {
        translatedCount += 1;
        return direct;
      }

      const match = token.match(/^([^a-zA-Z']*)([a-zA-Z']+)([^a-zA-Z']*)$/);
      if (!match) return token;

      const [, prefix, core, suffix] = match;
      const normalized = normalizeWord(core);
      const mapped = uiTranslations[normalized];
      if (!mapped) return token;

      translatedCount += 1;
      return `${prefix}${mapped}${suffix}`;
    })
    .join("");

  return translatedCount > 0 ? translated : null;
}

export interface AppButtonProps extends ButtonProps {
  caption?: React.ReactNode;
  showAutoCaption?: boolean;
  captionTypographyProps?: TypographyProps<"span">;
}

export function AppButton({
  children,
  caption,
  showAutoCaption = true,
  captionTypographyProps,
  ...buttonProps
}: AppButtonProps) {
  const autoCaption = useMemo(() => {
    if (!showAutoCaption) return null;
    if (typeof children !== "string") return null;
    return translateLabel(children);
  }, [children, showAutoCaption]);

  const resolvedCaption = caption ?? autoCaption;

  return (
    <Button {...buttonProps}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          lineHeight: 1.15,
        }}
      >
        <Box component="span">{children}</Box>

        {resolvedCaption ? (
          <Typography
            component="span"
            variant="caption"
            sx={{
              mt: 0.2,
              opacity: 0.8,
              fontSize: "0.68rem",
              lineHeight: 1.05,
            }}
            {...captionTypographyProps}
          >
            {resolvedCaption}
          </Typography>
        ) : null}
      </Box>
    </Button>
  );
}

export default AppButton;
