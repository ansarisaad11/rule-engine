import { forwardRef } from "react";
import { Button, Input, Select } from "antd";
import type { SelectProps, InputProps, ButtonProps } from "antd";

// Button Component
export const ButtonWrapper: React.FC<ButtonProps> = forwardRef(
  ({ children, className, ...props }, ref) => {
    return (
      <Button ref={ref} className={`px-4 py-2 ${className}`} {...props}>
        {children}
      </Button>
    );
  }
);

// Select Component
export const SelectWrapper: React.FC<SelectProps> = forwardRef(
  ({ children, className, value, onChange, ...props }, ref) => (
    <Select
      ref={ref}
      value={value}
      onChange={onChange}
      className={`border ml-2 rounded-md ${className}`}
      {...props}
    >
      {children}
    </Select>
  )
);

// Input Component
export const InputWrapper: React.FC<InputProps> = forwardRef(
  ({ className, placeholder, ...props }, ref) => (
    <Input
      ref={ref}
      placeholder={placeholder}
      className={`border p-2 rounded-md w-full ${className}`}
      {...props}
    />
  )
);
