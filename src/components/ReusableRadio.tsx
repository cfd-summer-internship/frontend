import React from 'react'

// Reusable Radio Button component with props
const ReusableRadio = ({name, id, value, onChange, checked, text}: {
    name: string;
    id: string;
    value: string;
    onChange: () => void;
    checked: boolean;
    text: string;
}) => {
  return (
    <label htmlFor={id} className="radio-label">
      <input
        className="mr-1"
        type="radio"
        name={name}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      <span className="text-stone-300 text-md" />
      {text}
    </label>
  )  
};

export default ReusableRadio