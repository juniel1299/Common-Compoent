"use client";

import { createContext } from "react";

interface FieldMeta {
  required?: boolean;
  label?: string;
}

interface SearchAreaContextValue {
  values: Record<string, unknown>;

  setValue: (
    name: string,
    value: unknown
  ) => void;

  registerField: (
    name: string,
    meta: FieldMeta
  ) => void;
}

export const SearchAreaContext =
  createContext<SearchAreaContextValue | null>(null);