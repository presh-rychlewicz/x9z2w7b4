export const DifficultyFilter = {
  All: "All",
  Beginner: "Beginner",
  Intermediate: "Intermediate",
} as const;

export type DifficultyFilter =
  (typeof DifficultyFilter)[keyof typeof DifficultyFilter];

export const ProgressFilter = {
  All: "All",
  Unread: "Unread",
  Completed: "Completed",
} as const;

export type ProgressFilter =
  (typeof ProgressFilter)[keyof typeof ProgressFilter];
