export default function LoginButton({ text }) {
  return (
    <div className="align-center flex">
      <button
        type="submit"
        className="bg-emerald-700 text-white hover:bg-emerald-600 hover:cursor-pointer px-20 py-3 mb-2 rounded-lg transition-colors duration-300"
      >
        {text}
      </button>
    </div>
  );
}