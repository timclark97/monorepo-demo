import React from "react";
export const Input = ({
  name,
  label,
  ...props
}: {
  name: string;
  label: string;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) => (
  <div>
    <label htmlFor={name} className="block">
      {label}
    </label>
    <input
      id={name}
      name={name}
      {...props}
      className="border outline-none border-gray-500 block px-2 py-1.5 w-full rounded focus:border-green-700 focus:ring-1 focus:ring-green-700"
    />
  </div>
);
