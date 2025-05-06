"use client";

import { forwardRef, HTMLProps, Ref, useState } from "react";

import Icons from "@/components/ui/Icons";

interface InputProps extends HTMLProps<HTMLInputElement> {
  label: string;
}

const InputPassword = forwardRef((props: InputProps, ref: Ref<HTMLInputElement>) => {
  const { label, ...inputProps } = props;

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <>
      <label>{label}</label>
      <div className="relative">
        <input
          {...inputProps}
          type={!showPassword ? "password" : "text"}
          className="border p-2 rounded w-full  h-10 bg-gray-100 border-none focus:outline-green-500 pr-10 focus:bg-gray-100"
          ref={ref}
        />
        {
          <button type="button" onClick={togglePassword} className="absolute inset-y-0 right-2 flex items-center">
            {showPassword ? (
              <Icons name="eye-closed" className="w-8 h-8 fill-green-500 stroke-green-500 stroke-1" />
            ) : (
              <Icons name="eye" className="w-8 h-8 fill-green-500 stroke-green-500  stroke-1" />
            )}
          </button>
        }
      </div>
    </>
  );
});

InputPassword.displayName = "InputPassword";

export default InputPassword;
