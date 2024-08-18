"use client";

import ReactSelect from "react-select";

interface SelectProps {
  label: string;
  value?: Record<string, any>;
  onChange: (value: Record<string, any>) => void;
  options: Record<string, any>[];
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
  disabled,
}) => {
  return (
    <div className="z-[100]">
      <label
        className="
        block
        text-sm
        font-medium
        leading-6
        text-gray-100
      "
      >
        {label}
      </label>
      <div className="mt-2">
        <ReactSelect
          isDisabled={disabled}
          value={value}
          onChange={onChange}
          isMulti
          options={options}
          menuPortalTarget={document.body}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary25: "#323234",
              primary: "#323234",
            },
          })}
          styles={{
            menuPortal: (base) => ({
              ...base,
              zIndex: 9999,
            }),
            control: (styles) => ({ ...styles, backgroundColor: "#29292b", border: "1px solid rgb(71 85 105)", outline: "none" })
          }}
          classNames={{
            menuList: () => "text-sm text-gray-100 bg-[#252527]",
          }}
        />
      </div>
    </div>
  );
};

export default Select;
