"use client";

import SearchArea from "@/components/common/SearchArea/SearchArea";
import CommonInput from "@/components/common/Input/CommonInput";
import CommonSelect from "@/components/common/Select/CommonSelect";

export default function Page() {
  return (
    <main style={{ padding: 40 }}>
      <SearchArea
        onSearch={(values) => {
          console.log("검색 조건:", values);
        }}
      >
        <CommonInput
          name="keyword"
          label="검색어"
          placeholder="검색어를 입력하세요"
          required
          allowClear
          style={{ width: 300 }}
        />

        <CommonSelect
          name="status"
          placeholder="상태"
          style={{ width: 150 }}
          options={[
            { label: "사용", value: "Y" },
            { label: "미사용", value: "N" },
          ]}
        />
      </SearchArea>
    </main>
  );
}