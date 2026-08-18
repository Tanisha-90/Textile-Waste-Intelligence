// InputField.jsx

// Reusable input component.
// Instead of writing the same input code multiple times,
// we can use this component everywhere.

function InputField({
  label,
  type,
  placeholder,
  value,
  onChange
}) {
  return (
      <div className="mb-5">
          {/* Display input label */}
          <label className="block mb-2 text-gray-700 font-medium">
              {label}
          </label>

          {/* User input */}
          <input
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:outline-none"
          />
      </div>
  );
}

export default InputField;