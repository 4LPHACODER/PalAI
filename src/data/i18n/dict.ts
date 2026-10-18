/** [English, Cebuano] pair. English is the complete reference language. */
export type Pair = readonly [en: string, ceb: string];

/** Keeps literal keys so the merged dictionary stays fully typed. */
export function dict<T extends Record<string, Pair>>(d: T): T {
  return d;
}