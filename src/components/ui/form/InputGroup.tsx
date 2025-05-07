"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, FocusEvent, forwardRef, Ref, useEffect, useState } from "react";

import Button from "@/components/ui/Button";
import { groupService } from "@/services/groupService";

export interface ISelectOption {
  value: string;
  label: string;
}

interface InputProps {
  label?: string;
  name: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const InputGroup = forwardRef<HTMLInputElement | HTMLSelectElement, InputProps>(
  ({ label, name, value: externalValue, onChange, onBlur }, ref) => {
    const [isAdding, setIsAdding] = useState(false);
    const [inputValue, setInputValue] = useState(externalValue ?? "");
    const queryClient = useQueryClient();
    const { data } = useQuery({ queryKey: ["group"], queryFn: () => groupService.getAll(), retry: false });
    const groupOptions = data?.reduce<ISelectOption[]>((acc, { _id: value, group: label }) => {
      acc.push({ value, label });
      return acc;
    }, []);

    const { mutate } = useMutation({
      mutationFn: (data: { group: string }) => groupService.post(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["group"] });
        setIsAdding(false);
        setInputValue("");
        onChange?.({ target: { name, value: "" } } as ChangeEvent<HTMLInputElement>);
      },
    });

    useEffect(() => {
      setInputValue(externalValue ?? "");
    }, [externalValue]);

    const handleAdd = () => {
      setInputValue("");
      onChange?.({ target: { name, value: "" } } as ChangeEvent<HTMLInputElement>);
      if (isAdding) {
        if (inputValue.trim()) {
          mutate({ group: inputValue });
        }
      } else {
        setIsAdding(true);
      }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      onChange?.(e);
    };

    return (
      <div className="flex flex-col flex-1">
        {label && <label htmlFor={name}>{label}</label>}

        {isAdding ? (
          <input
            type="text"
            name={name}
            ref={ref as Ref<HTMLInputElement>}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={onBlur}
            placeholder={"Enter new group"}
            className="border p-2 rounded w-full h-10 bg-gray-100 border-none focus:outline-green-500"
          />
        ) : (
          <select
            name={name}
            ref={ref as Ref<HTMLSelectElement>}
            value={externalValue}
            onChange={onChange}
            onBlur={onBlur}
            className="border p-2 rounded w-full h-10 bg-gray-100 border-none
              focus:outline-green-500 pr-10 focus:bg-gray-100 focus:ring-green-500"
          >
            <option value="">Select...</option>
            {groupOptions?.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        )}

        <div className="flex flex-row justify-between gap-2">
          <Button className="h-6 text-sm p-0 w-full" type="button" onClick={handleAdd}>
            {isAdding ? "Save" : "Add"}
          </Button>

          <Button className="h-6 text-sm p-0 w-full" type="button" onClick={() => setIsAdding(false)}>
            Select
          </Button>
        </div>
      </div>
    );
  }
);

InputGroup.displayName = "InputGroup";

export default InputGroup;
