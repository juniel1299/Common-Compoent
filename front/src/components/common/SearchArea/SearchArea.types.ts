export type SearchValues = Record<string, unknown>;

export interface SearchAreaRef<T extends SearchValues> {
  getValues: () => T;
  setValues: <K extends keyof T>(
    name: K,
    value: T[K]
  ) => void;
  reset: () => void;
}