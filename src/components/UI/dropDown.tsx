"use client";

import { useState } from "react";

export default function DropDown({ menuText, onLogout, open, setOpen }) {
  return (
    <div>
      <button
        onClick={() => {
          setOpen((o) => !o);
        }}
      >
        {menuText}
      </button>
      {open && (
        <>
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-10"
          />

          <div
            role="menu"
            className="absolute right-0 mt-2 min-w-[8rem] rounded-lg text-stone-300 bg-stone-700 z-20"
          >
            <button
              role="menuitem"
              className="w-full px-3 py-2 text-center hover:bg-stone-500 rounded-lg"
              onClick={() => {
                setOpen(false);
                onLogout();
              }}
            >
              Log out
            </button>
          </div>
        </>
      )}
    </div>
  );
}
