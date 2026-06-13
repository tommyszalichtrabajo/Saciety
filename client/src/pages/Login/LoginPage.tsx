import { useForm } from 'react-hook-form'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'

type LoginFormData = {
  email: string
  password: string
}

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>()

  function onSubmit(data: LoginFormData) {
    console.log(data)
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Iniciar sesión
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            label="Email"
            placeholder="tu@email.com"
            type="email"
            error={errors.email?.message}
            registration={register('email', {
              required: 'El email es obligatorio',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'El email no es válido'
              }
            })}
          />
          <Input
            label="Contraseña"
            placeholder="Tu contraseña"
            type="password"
            error={errors.password?.message}
            registration={register('password', {
              required: 'La contraseña es obligatoria',
              minLength: {
                value: 6,
                message: 'La contraseña debe tener al menos 6 caracteres'
              }
            })}
          />
          <Button type="submit">
            Ingresar
          </Button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage