"use client";

import React, { forwardRef, HTMLProps, Ref } from "react";

interface InputProps extends HTMLProps<HTMLInputElement> {
  label: string;
}

const InputCheckBox = forwardRef((props: InputProps, ref: Ref<HTMLInputElement>) => {
  const { label, ...inputProps } = props;
  return (
    <div className="flex flex-row items-center justify-center gap-2  ">
      <input
        type="checkbox"
        {...inputProps}
        ref={ref}
        className="appearance-none w-5 h-5 border border-green-800 bg-white cursor-pointer relative
        checked:bg-green-800 checked:border-green-800 checked:before:content-['✔']
        checked:before:text-white checked:before:text-[16px] checked:before:absolute checked:before:top-[-2px] checked:before:left-[1px] "
      />
      <label className="">{label}</label>
    </div>
  );
});

InputCheckBox.displayName = "InputCheckBox";

export default InputCheckBox;
