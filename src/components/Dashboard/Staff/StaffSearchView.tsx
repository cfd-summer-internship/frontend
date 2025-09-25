"use client";

export default function StaffSearchView({ref, handleSubmit}) {
  return (
    <>
      <form ref={ref} onSubmit={handleSubmit}>
        <div className="flex flex-col text-center justify-center text-stone-300">
          <span className="font-bold text-2xl pt-8">Search Records</span>
          <span className="text-md pb-2">
            <p className="pb-4">Provide an email to access configuration details and exportable result files.</p>
          </span>
        </div>
        <div className="pt-4">
          <input
            name="email"
            placeholder="Email Address..."
            className="bg-stone-700 text-stone-200 px-8 py-2 rounded-lg placeholder:text-stone-500 focus:outline-none"
          ></input>
          <button
            className="bg-emerald-700 text-stone-300 py-2 px-4 mx-3 rounded-lg"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
    </>
  );
}
