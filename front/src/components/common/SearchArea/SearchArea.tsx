"use client";

import React, { useCallback, useState } from "react";
import { Button, Space, message } from "antd";

import { SearchAreaContext } from "./SearchAreaContext";
import type { SearchValues } from "./SearchArea.types";

interface FieldMeta {
  required?: boolean;
  label?: string;
}

export interface SearchAreaProps<T extends SearchValues> {
  children: React.ReactNode;
  initialValues?: Partial<T>;
  onSearch?: (values: T) => void;
}

const SearchArea = ({
  children,
  initialValues,
  onSearch,
}: SearchAreaProps<SearchValues>) => {
  const [values, setValues] = useState<SearchValues>(
    initialValues ?? {}
  );

  const [fields, setFields] = useState<
    Record<string, FieldMeta>
  >({});

  const setValue = useCallback(
    (name: string, value: unknown) => {
      setValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const registerField = useCallback(
    (name: string, meta: FieldMeta) => {
      setFields((prev) => {
        const current = prev[name];

        if (
          current?.label === meta.label &&
          current?.required === meta.required
        ) {
          return prev;
        }

        return {
          ...prev,
          [name]: meta,
        };
      });
    },
    []
  );

  const validate = () => {
    for (const [name, meta] of Object.entries(fields)) {
      if (!meta.required) continue;

      const value = values[name];

      const isEmpty =
        value === undefined ||
        value === null ||
        value === "" ||
        (Array.isArray(value) && value.length === 0);

      if (isEmpty) {
        message.warning(
          `${meta.label ?? name} 항목은 필수입니다.`
        );

        return false;
      }
    }

    return true;
  };

  const handleSearch = () => {
    if (!validate()) return;

    onSearch?.(values);
  };

  const handleReset = () => {
    setValues(initialValues ?? {});
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    handleSearch();
  };

  return (
    <SearchAreaContext.Provider
      value={{
        values,
        setValue,
        registerField,
      }}
    >
      <form onSubmit={handleSubmit}>
        <Space wrap>
          {children}

          <Button
            type="primary"
            htmlType="submit"
          >
            조회
          </Button>

          <Button
            htmlType="button"
            onClick={handleReset}
          >
            초기화
          </Button>
        </Space>
      </form>
    </SearchAreaContext.Provider>
  );
};

export default SearchArea;