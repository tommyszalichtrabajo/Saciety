type InputProps = {
  label: string
  placeholder?: string
  type?: 'text' | 'email' | 'password'
  error?: string
  registration: object
}

function Input({ label, placeholder, type = 'text', error, registration }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        {...registration}
        type={type}
        placeholder={placeholder}
        className={`w-full px-3 py-2 rounded-lg border ${
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-orange-500'
        } focus:outline-none focus:ring-2`}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}

export default Input