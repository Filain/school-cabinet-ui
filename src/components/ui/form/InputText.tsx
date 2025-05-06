"use client";

import React, { forwardRef, HTMLProps, Ref } from "react";

interface InputProps extends HTMLProps<HTMLInputElement> {
  label?: string;
}

const InputText = forwardRef((props: InputProps, ref: Ref<HTMLInputElement>) => {
  const { label, ...inputProps } = props;
  return (
    <div className="flex flex-col flex-1">
      {label && <label>{label}</label>}
      <input
        type="text"
        placeholder={label}
        {...inputProps}
        ref={ref}
        className="border p-2 rounded w-full  h-10 bg-gray-100 border-none focus:outline-green-500"
      />
    </div>
  );
});

InputText.displayName = "InputText";

export default InputText;
