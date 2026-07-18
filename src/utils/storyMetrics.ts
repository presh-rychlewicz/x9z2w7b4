import { WORDS_PER_MINUTE } from "../constants/story";

export function countWords(sentences: string[]) {
  return sentences.join(" ").trim().split(/\s+/).filter(Boolean).length;
}

export function calculateReadingTimeMin(wordCount: number) {
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}
