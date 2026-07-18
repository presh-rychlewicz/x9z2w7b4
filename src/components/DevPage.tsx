import { ArrowBack, DeleteSweep } from "@mui/icons-material";
import { Box, Paper, Typography } from "@mui/material";
import { useMemo } from "react";
import { uiText } from "../constants/uiText";
import uiTranslations from "../i18n/uiTranslations";
import { stories } from "../storiesData";
import AppButton from "./AppButton";
import { DevStatsCard } from "./DevStatsCard";

interface DevPageProps {
  onBack: () => void;
}

function collectStrings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value))
    return value.flatMap((item) => collectStrings(item));
  if (value && typeof value === "object") {
    return Object.entries(value)
      .filter(([key]) => key !== "translatable")
      .flatMap(([, nestedValue]) => collectStrings(nestedValue));
  }
  return [];
}

function normalizeWord(word: string) {
  return word.toLowerCase().replace(/^[^a-zA-Z']+|[^a-zA-Z']+$/g, "");
}

function hasMissingTranslation(text: string) {
  const tokens = text.split(/(\s+)/).map((token) => normalizeWord(token));
  return tokens.some((token) => token && !(token in uiTranslations));
}

function collectMissingWords(strings: string[]) {
  const missingWords = new Set<string>();

  for (const text of strings) {
    const tokens = text.split(/(\s+)/).map((token) => normalizeWord(token));

    for (const token of tokens) {
      if (token && !(token in uiTranslations)) {
        missingWords.add(token);
      }
    }
  }

  return Array.from(missingWords).sort((a, b) => a.localeCompare(b));
}

function collectStoryStrings() {
  return stories.flatMap((story) => {
    return [story.title, story.difficulty, story.synopsis, ...story.sentences];
  });
}

async function copyTextToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  }
}

export function DevPage({ onBack }: DevPageProps) {
  const handleClearLocalData = () => {
    const confirmed = window.confirm(uiText.devPage.clearLocalDataConfirm);
    if (!confirmed) return;

    localStorage.clear();
    window.location.reload();
  };

  const uiStringStats = useMemo(() => {
    const allUiStrings = collectStrings(uiText);
    const missingTranslationsCount = allUiStrings.filter((text) =>
      hasMissingTranslation(text),
    ).length;

    return {
      totalUiStrings: allUiStrings.length,
      missingTranslationsCount,
    };
  }, []);

  const storyStringStats = useMemo(() => {
    const allStoryStrings = collectStoryStrings();
    const missingTranslationsCount = allStoryStrings.filter((text) =>
      hasMissingTranslation(text),
    ).length;

    return {
      totalStoryStrings: allStoryStrings.length,
      missingTranslationsCount,
    };
  }, []);

  const missingUiWordsCsv = useMemo(() => {
    const allUiStrings = collectStrings(uiText);
    const missingWords = collectMissingWords(allUiStrings);

    return missingWords.length > 0
      ? missingWords.join(", ")
      : uiText.devPage.noMissingWords;
  }, []);

  const missingStoryWordsCsv = useMemo(() => {
    const allStoryStrings = collectStoryStrings();
    const missingWords = collectMissingWords(allStoryStrings);

    return missingWords.length > 0
      ? missingWords.join(", ")
      : uiText.devPage.noMissingWords;
  }, []);

  const missingUiWordsCopyText = useMemo(() => {
    if (missingUiWordsCsv === uiText.devPage.noMissingWords) {
      return missingUiWordsCsv;
    }

    return `${uiText.devPage.copyMissingWordsPrompt} ${missingUiWordsCsv}`;
  }, [missingUiWordsCsv]);

  const missingStoryWordsCopyText = useMemo(() => {
    if (missingStoryWordsCsv === uiText.devPage.noMissingWords) {
      return missingStoryWordsCsv;
    }

    return `${uiText.devPage.copyMissingWordsPrompt} ${missingStoryWordsCsv}`;
  }, [missingStoryWordsCsv]);

  return (
    <Box
      sx={{
        minHeight: "60vh",
      }}
    >
      <AppButton
        variant="outlined"
        startIcon={<ArrowBack />}
        onClick={onBack}
        sx={{
          mb: 3,
          borderRadius: 2,
          textTransform: "none",
          fontFamily: "Inter, system-ui, sans-serif",
          fontWeight: "600",
        }}
      >
        {uiText.storyReader.backToStories}
      </AppButton>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        <DevStatsCard
          title={uiText.devPage.uiSectionTitle}
          rows={[
            {
              label: uiText.devPage.stringsLabel,
              value: uiStringStats.totalUiStrings,
            },
            {
              label: uiText.devPage.missingTranslationsLabel,
              value: uiStringStats.missingTranslationsCount,
              highlight: true,
            },
          ]}
          footerText={
            uiStringStats.missingTranslationsCount > 0
              ? missingUiWordsCsv
              : undefined
          }
          onCopyFooter={
            uiStringStats.missingTranslationsCount > 0
              ? () => void copyTextToClipboard(missingUiWordsCopyText)
              : undefined
          }
          copyFooterLabel={
            uiStringStats.missingTranslationsCount > 0
              ? uiText.devPage.copyMissingWords
              : undefined
          }
        />

        <DevStatsCard
          title={uiText.devPage.storiesSectionTitle}
          rows={[
            {
              label: uiText.devPage.stringsLabel,
              value: storyStringStats.totalStoryStrings,
            },
            {
              label: uiText.devPage.missingTranslationsLabel,
              value: storyStringStats.missingTranslationsCount,
              highlight: true,
            },
          ]}
          footerText={
            storyStringStats.missingTranslationsCount > 0
              ? missingStoryWordsCsv
              : undefined
          }
          onCopyFooter={
            storyStringStats.missingTranslationsCount > 0
              ? () => void copyTextToClipboard(missingStoryWordsCopyText)
              : undefined
          }
          copyFooterLabel={
            storyStringStats.missingTranslationsCount > 0
              ? uiText.devPage.copyMissingWords
              : undefined
          }
        />

        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, md: 3 },
            borderRadius: 2.5,
            border: "1px solid",
            borderColor: "warning.light",
            bgcolor: "warning.50",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              mb: 0.5,
              fontWeight: 700,
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            {uiText.devPage.clearLocalData}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2, fontFamily: "Inter, system-ui, sans-serif" }}
          >
            {uiText.devPage.clearLocalDataDescription}
          </Typography>

          <AppButton
            fullWidth
            variant="outlined"
            color="warning"
            startIcon={<DeleteSweep />}
            onClick={handleClearLocalData}
            sx={{ textTransform: "none", fontWeight: "700" }}
          >
            {uiText.devPage.clearLocalData}
          </AppButton>
        </Paper>
      </Box>
    </Box>
  );
}
