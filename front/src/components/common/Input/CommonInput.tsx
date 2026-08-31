"use client";

import { Input } from "antd";
import type { InputProps } from "antd";
import { useContext, useEffect } from "react";

import { SearchAreaContext } from "../SearchArea/SearchAreaContext";

interface CommonInputProps extends InputProps {
  name: string;
  label?: string;
  required?: boolean;
}

const CommonInput = ({
  name,
  label,
  required = false,
  ...inputProps
}: CommonInputProps) => {
  const context = useContext(SearchAreaContext);

  if (!context) {
    throw new Error(
      "CommonInput must be used inside SearchArea."
    );
  }

  const {
    values,
    setValue,
    registerField,
  } = context;

  useEffect(() => {
    registerField(name, {
      label,
      required,
    });
  }, [name, label, required, registerField]);

  const value =
    typeof values[name] === "string"
      ? values[name]
      : "";

  return (
    <Input
      {...inputProps}
      value={value}
      onChange={(event) => {
        setValue(name, event.target.value);
        inputProps.onChange?.(event);
      }}
    />
  );
};

export default CommonInput;