export interface Story {
  id: string;
  title: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  synopsis: string;
  sentences: string[];
  wordCount: number;
  readingTimeMin: number;
}

export type StorySeed = Omit<Story, "wordCount" | "readingTimeMin">;
