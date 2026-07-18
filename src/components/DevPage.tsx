import { ArrowBack } from "@mui/icons-material";
import { Box } from "@mui/material";
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
    const glossaryStrings = story.glossary.flatMap((item) => [
      item.word,
      item.partOfSpeech,
      item.definition,
      item.example,
    ]);

    return [
      story.title,
      story.difficulty,
      story.synopsis,
      ...story.sentences,
      ...glossaryStrings,
    ];
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
        sx={{ mb: 3, textTransform: "none", fontWeight: "600" }}
      >
        {uiText.devPage.backToApp}
      </AppButton>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        <DevStatsCard
          title={uiText.devPage.uiSectionTitle}
          rows={[
            {
              label: uiText.devPage.uiStringsLabel,
              value: uiStringStats.totalUiStrings,
            },
            {
              label: uiText.devPage.uiMissingTranslationsLabel,
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
              ? () => void copyTextToClipboard(missingUiWordsCsv)
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
              label: uiText.devPage.storyStringsLabel,
              value: storyStringStats.totalStoryStrings,
            },
            {
              label: uiText.devPage.storyMissingTranslationsLabel,
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
              ? () => void copyTextToClipboard(missingStoryWordsCsv)
              : undefined
          }
          copyFooterLabel={
            storyStringStats.missingTranslationsCount > 0
              ? uiText.devPage.copyMissingWords
              : undefined
          }
        />
      </Box>
    </Box>
  );
}
