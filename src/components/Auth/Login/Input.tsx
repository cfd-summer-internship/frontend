"use client";

export default function Input({ inputName, placeholder, type }) {
  return (
    <div className="mb-4">
        <input
          name={inputName}
          placeholder={placeholder}
          className="bg-stone-800 outline outline-stone-700 text-stone-300 my-1 w-80 rounded-sm py-2 px-2"
          autoComplete="off"
          type={type}
        ></input>
      </div>
  );
}