import { SearchAreaContext } from "./SearchAreaContext";
import {  SearchValues } from "./SearchArea.types";
export interface SearchAreaProps<T extends SearchValues> {
  children: React.ReactNode;
  initialValues?: Partial<T>;
  onSearch?: (values: T) => void;
}

"use client";
import React, { createContext, forwardRef, useImperativeHandle, useState } from "react";
const SearchArea = forwardRef((props,ref) => {
  const [values, setValues] = useState({});
  const setValue = (name,value) => {
    setValues((prev) => ({
      ...prev,
      [name]: value
    }))
  };
  useImperativeHandle(ref,() => ({
    getValues: () => values,
    setValues,
    reset: () => {
      setValues({})
    }
  }));
  return (
    <SearchAreaContext.Provider value={{ values, setValue,}}>
      {props.children}
    </SearchAreaContext.Provider>
  )
});