export const DifficultyFilter = {
  All: "All",
  Beginner: "Beginner",
} as const;

export type DifficultyFilter =
  (typeof DifficultyFilter)[keyof typeof DifficultyFilter];

export const ProgressFilter = {
  All: "All",
  Unread: "Unread",
  InProgress: "InProgress",
  Completed: "Completed",
} as const;

export type ProgressFilter =
  (typeof ProgressFilter)[keyof typeof ProgressFilter];
