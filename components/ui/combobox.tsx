import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { cn } from "@/lib/utils";

type ComboBoxOption = {
  label: string;
  value: string;
};

type Props = {
  type: string;
  options: ComboBoxOption[];
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
} & React.HTMLAttributes<HTMLSelectElement>;

export const ComboBox = ({
  type,
  options,
  className,
  open,
  setOpen,
  value,
  setValue,
}: Props) => {
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className={cn(className, "justify-between")}
          variant="outline"
          role="combobox"
          aria-expanded={open}
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : `Select ${type}...`}
          {open ? (
            <ChevronUp className="opacity-50" />
          ) : (
            <ChevronDown className="opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn(className, "p-0")}>
        <Command>
          <CommandInput
            placeholder={`Search ${type}...`}
            className="h-9 border-0 ring-0 outline-none focus:outline-none focus:ring-0"
          />
          <CommandList>
            <CommandEmpty>{`No ${type} found.`}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
