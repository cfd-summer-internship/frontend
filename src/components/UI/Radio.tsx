import React, { useContext } from 'react'
import { RadioContext } from '../UserView/Scoring';

// Reusable Radio Button component with props
const Radio = ({name, id, value, text}: {
    name: string;
    id: string;
    value: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    text: string;
}) => {

  const onChange = useContext(RadioContext);

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