type ButtonProps = {
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary'
  isLoading?: boolean
  onClick?: () => void
}

function Button({ children, type = 'button', variant = 'primary', isLoading = false, onClick }: ButtonProps) {
  const baseStyles = 'w-full py-2 px-4 rounded-lg font-semibold transition-colors duration-200'
  
  const variants = {
    primary: 'bg-orange-500 hover:bg-orange-600 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800'
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className={`${baseStyles} ${variants[variant]}`}
    >
      {isLoading ? 'Cargando...' : children}
    </button>
  )
}

export default Button 