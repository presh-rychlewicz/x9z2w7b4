export const uiText = {
  common: {
    minReadSuffix: "min read",
    wordsSuffix: "words",
  },
  navbar: {
    brandName: "FableRead",
    tagline: "• Kids' Stories for English Learners",
    homeButton: "Home",
    allStoriesButton: "All Stories",
    devButton: "Dev",
  },
  inProgressPage: {
    title: "In Progress Stories",
    subtitle: "Continue where you left off.",
    continueReading: "Continue Reading",
    emptyTitle: "No in-progress stories yet",
    emptyDescription: "Start reading a story to see it appear in this list.",
    tryOneMoreTime: "Try one more time",
  },
  devPage: {
    backToApp: "Back to App",
    clearLocalData: "Clear Local Data",
    clearLocalDataDescription:
      "Remove all app data saved in this browser, including reading progress and preferences.",
    clearLocalDataConfirm:
      "This will clear all local data for this app in this browser. Continue?",
    uiSectionTitle: "UI",
    uiStringsLabel: "UI strings",
    uiMissingTranslationsLabel: "Strings with missing translations",
    storiesSectionTitle: "Stories",
    storyStringsLabel: "Story strings",
    storyMissingTranslationsLabel: "Story strings with missing translations",
    copyMissingWords: "Copy missing words",
    noMissingWords: "none",
  },
  dashboard: {
    showFilters: "Show Filters",
    hideFilters: "Hide Filters",
    levelLabel: "Level",
    categoryLabel: "Category",
    progressLabel: "Progress",
    difficultyAriaLabel: "difficulty filter",
    categoryAriaLabel: "category filter",
    progressAriaLabel: "progress filter",
    difficultyAll: "All Levels",
    difficultyBeginner: "Beginner",
    difficultyIntermediate: "Intermediate",
    progressAll: "All Stories",
    progressUnread: "Unread",
    progressInProgress: "In Progress",
    progressCompleted: "Completed",
    storyProgressLabel: "Progress",
    cardCompleted: "Completed",
    cardUnread: "Unread",
    ctaContinueReading: "Continue",
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
    showTranslationsAriaLabel: "show sentence translation",
    hideTranslationsAriaLabel: "hide sentence translation",
    previousSentence: "Previous",
    nextSentence: "Next",
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
  storyProgress: (completed: number, total: number) => `${completed}/${total}`,
};
