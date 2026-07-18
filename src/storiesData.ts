import type { Story, StorySeed } from "./types/story";
import { calculateReadingTimeMin, countWords } from "./utils/storyMetrics";

interface StorySeedJson {
  id: string;
  title: string;
  difficulty: string;
  category?: string;
  synopsis: string;
  sentences: string[];
}

const ALLOWED_DIFFICULTIES = new Set<Story["difficulty"]>([
  "Beginner",
  "Intermediate",
  "Advanced",
]);

function toStorySeed(raw: {
  id: string;
  title: string;
  difficulty: string;
  category?: string;
  synopsis: string;
  sentences: string[];
}): StorySeed {
  const difficulty: Story["difficulty"] = ALLOWED_DIFFICULTIES.has(
    raw.difficulty as Story["difficulty"],
  )
    ? (raw.difficulty as Story["difficulty"])
    : "Beginner";

  return {
    id: raw.id,
    title: raw.title,
    difficulty,
    category: raw.category?.trim() || "General",
    synopsis: raw.synopsis,
    sentences: raw.sentences,
  };
}

const storyModules = import.meta.glob<{ default: StorySeedJson }>(
  "./assets/stories/*.json",
  { eager: true },
);

const storySeeds: StorySeed[] = Object.entries(storyModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, module]) => toStorySeed(module.default));

export const stories: Story[] = storySeeds.map((story) => {
  const wordCount = countWords(story.sentences);

  return {
    ...story,
    wordCount,
    readingTimeMin: calculateReadingTimeMin(wordCount),
  };
});
