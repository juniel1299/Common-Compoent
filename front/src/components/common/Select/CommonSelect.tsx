'use client';
import { Select } from "antd";
import type { SelectProps } from "antd";
import { useContext } from "react";

import { SearchAreaContext } from "../SearchArea/SearchAreaContext";

interface CommonSelectProps extends SelectProps {
  name: string;
}

const CommonSelect = ({
  name,
  ...selectProps
}: CommonSelectProps) => {
  const context = useContext(SearchAreaContext);

  if (!context) {
    throw new Error(
      "CommonSelect must be used inside SearchArea."
    );
  }
  const { values, setValue } = context;
  return (


    <Select
      {...selectProps}
      value={values[name]}
      onChange={(value,option) => {
        setValue(name, value);
        selectProps.onChange?.(value,option);
      }}
    />
  )
};

export default CommonSelect;