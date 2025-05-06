"use client";

import React, { forwardRef, HTMLProps, Ref } from "react";

interface InputProps extends HTMLProps<HTMLInputElement> {
  label?: string;
}

const InputNumber = forwardRef((props: InputProps, ref: Ref<HTMLInputElement>) => {
  const { label, ...inputProps } = props;
  return (
    <div className="flex flex-col flex-1">
      {label && <label className="">{label}</label>}
      <input
        type="number"
        placeholder={label}
        {...inputProps}
        ref={ref}
        className=" p-2 rounded w-full  h-10 bg-gray-100 focus:outline-green-500"
      />
    </div>
  );
});

InputNumber.displayName = "InputNumber";

export default InputNumber;
