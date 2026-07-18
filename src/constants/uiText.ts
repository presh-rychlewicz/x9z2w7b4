export const uiText = {
  common: {
    minReadSuffix: "min read",
    wordsSuffix: "words",
    vocabWordsSuffix: "vocab words",
  },
  navbar: {
    brandName: "FableRead",
    tagline: "• Kids' Stories for English Learners",
    devButton: "Dev",
  },
  devPage: {
    title: "Developer Page",
    description: "This page is intentionally empty for now.",
    backToApp: "Back to App",
    uiSectionTitle: "UI",
    uiStringsLabel: "UI strings",
    uiMissingTranslationsLabel: "Strings with missing translations",
    storiesSectionTitle: "Stories",
    storyStringsLabel: "Story strings",
    storyMissingTranslationsLabel: "Story strings with missing translations",
    missingWordsLabel: "Words with missing translations",
    copyMissingWords: "Copy missing words",
    noMissingWords: "none",
  },
  dashboard: {
    badge: "ENGLISH LEARNING COMPANION",
    title: "Kids' Stories for English Learners",
    subtitle:
      "Practice reading simple, engaging fables. Track your progress and master new vocabulary terms.",
    searchLabel: "Search",
    searchPlaceholder: "Search fables...",
    levelLabel: "Level",
    progressLabel: "Progress",
    difficultyAriaLabel: "difficulty filter",
    progressAriaLabel: "progress filter",
    difficultyAll: "All Levels",
    difficultyBeginner: "Beginner",
    difficultyIntermediate: "Intermediate",
    progressAll: "All Stories",
    progressUnread: "Unread",
    progressCompleted: "Completed",
    cardCompleted: "Completed",
    cardUnread: "Unread",
    ctaReadAgain: "Read Again",
    ctaStartReading: "Start Reading",
    emptyTitle: "No stories match your criteria",
    emptyDescription:
      "Try modifying your search text, changing the level, or altering progress filters.",
    resetFilters: "Reset Filters",
  },
  storyReader: {
    backToStories: "Back to Stories",
    decreaseFontSizeAriaLabel: "decrease font size",
    increaseFontSizeAriaLabel: "increase font size",
    previousSentence: "Previous",
    nextSentence: "Next",
    sentenceProgressLabel: "Sentence",
    sentenceProgressOf: "of",
    markAsUnread: "Mark as Unread",
    markAsCompleted: "Mark as Completed",
  },
  glossary: {
    title: "Key Vocabulary",
    description:
      "Here are useful words used in this story with definitions and examples to help build your English vocabulary.",
    definitionLabel: "Definition:",
    exampleLabel: "Example:",
  },
  translatable: {
    missingTranslation: "Brak tłumaczenia",
  },
};

export const uiLabel = {
  minRead: (minutes: number) => `${minutes} ${uiText.common.minReadSuffix}`,
  wordCount: (count: number) => `${count} ${uiText.common.wordsSuffix}`,
  vocabWordCount: (count: number) =>
    `${count} ${uiText.common.vocabWordsSuffix}`,
};
