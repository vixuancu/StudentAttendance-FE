import { Input, Flex, type InputProps } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { ReactNode } from "react";

interface SearchFilterProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  /** Additional filter controls to the right */
  extra?: ReactNode;
  inputProps?: InputProps;
}

/**
 * SearchFilter – thanh tìm kiếm dùng chung cho list pages.
 */
const SearchFilter = ({
  placeholder = "Tìm kiếm...",
  onSearch,
  extra,
  inputProps,
}: SearchFilterProps) => {
  return (
    <Flex gap={12} wrap="wrap" style={{ marginBottom: 16 }}>
      <Input.Search
        prefix={<SearchOutlined />}
        placeholder={placeholder}
        allowClear
        onSearch={onSearch}
        style={{ maxWidth: 360 }}
        enterButton
        {...inputProps}
      />
      {extra}
    </Flex>
  );
};

export default SearchFilter;
