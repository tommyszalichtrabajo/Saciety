import { useForm } from 'react-hook-form';
import Input from '../../components/ui/Input.tsx';
import Button from '../../components/ui/Button.tsx';
type RegisterFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>();

  const password = watch('password');

  function onSubmit(data: RegisterFormData) {
    if (data.password != data.confirmPassword) {
      console.log('Pone bien la contraseña gil');
    }
    console.log(data);
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Registrarse</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            label="Email"
            type="email"
            placeholder="Ingrese su Email"
            error={errors.email?.message}
            registration={register('email', {
              required: 'el email es obligatorio',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'El email no es válido',
              },
            })}
          ></Input>
          <Input
            label="Password"
            placeholder="Ingrese su contraseña"
            type="password"
            error={errors.password?.message}
            registration={register('password', {
              required: 'La Contraseña es obligatoria',
              minLength: {
                value: 6,
                message: 'Su contraseña debe tener al menos 6 caracteres',
              },
            })}
          ></Input>
          <Input
            label="Confirm Password"
            placeholder="Confirmar contraseña"
            type="password"
            error={errors.confirmPassword?.message}
            registration={register('confirmPassword', {
              required: 'La Contraseña es obligatoria',
              minLength: {
                value: 6,
                message: 'Su contraseña debe tener al menos 6 caracteres',
              },
              validate: (value) =>
                value === password || 'Las contraseñas no coinciden',
            })}
          ></Input>
          <Button type="submit">Ingresar</Button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
