interface SearchAreaContextValue {
  values: Record<string, unknown>;
  setValues: (name: string, value: unknown) => void;
}

export const SearchAreaContext = createContext<SearchAreaContextValue | null>(null);