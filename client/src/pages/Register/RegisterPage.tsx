import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { registerService } from '../../services/auth.service';
import { useAuthStore } from '../../store/authStore';

type RegisterFormData = {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
};

function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>();
  const password = watch('password');
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  async function onSubmit(data: RegisterFormData) {
    try {
      setError(null);
      const result = await registerService({
        email: data.email,
        password: data.password,
        username: data.username,
      });
      login(result.user, result.token);
      navigate('/');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Registrarse</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            label="Username"
            placeholder="Tu nombre de usuario"
            error={errors.username?.message}
            registration={register('username', {
              required: 'El username es obligatorio',
            })}
          />
          <Input
            label="Email"
            type="email"
            placeholder="tu@email.com"
            error={errors.email?.message}
            registration={register('email', {
              required: 'El email es obligatorio',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'El email no es válido',
              },
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
                message: 'La contraseña debe tener al menos 6 caracteres',
              },
            })}
          />
          <Input
            label="Confirmar contraseña"
            placeholder="Repetí tu contraseña"
            type="password"
            error={errors.confirmPassword?.message}
            registration={register('confirmPassword', {
              required: 'La contraseña es obligatoria',
              validate: (value) =>
                value === password || 'Las contraseñas no coinciden',
            })}
          />
          <Button type="submit">Registrarse</Button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
