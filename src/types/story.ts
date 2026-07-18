export interface GlossaryItem {
  word: string;
  partOfSpeech: string;
  definition: string;
  example: string;
}

export interface Story {
  id: string;
  title: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  synopsis: string;
  sentences: string[];
  glossary: GlossaryItem[];
  wordCount: number;
  readingTimeMin: number;
}

export type StorySeed = Omit<Story, "wordCount" | "readingTimeMin">;
