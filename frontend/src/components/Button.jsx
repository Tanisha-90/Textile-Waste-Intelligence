// Button.jsx

// Reusable button component.
// We can use this on Login, Register,
// Dashboard actions and Inventory pages.

function Button({
  text,
  type = "button",
  onClick
}) {
  return (
      <button
          type={type}
          onClick={onClick}
          className="w-full bg-cyan-800 hover:bg-cyan-700 text-white py-3 rounded-lg font-semibold duration-300"
      >
          {text}
      </button>
  );
}

export default Button;