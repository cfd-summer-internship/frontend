import React from 'react'

// Reusable Radio Button component with props
const Radio = ({name, id, value, onChange, text}: {
    name: string;
    id: string;
    value: string;
    onChange: () => void;
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
      />
      <span className="text-stone-300 text-md" />
      {text}
    </label>
  )  
};

export default Radio