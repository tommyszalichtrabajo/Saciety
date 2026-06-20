import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { loginService } from '../../services/auth.service';
import { useAuthStore } from '../../store/authStore';

type LoginFormData = {
  email: string;
  password: string;
};

function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  async function onSubmit(data: LoginFormData) {
    try {
      setError(null);
      const result = await loginService({
        email: data.email,
        password: data.password,
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
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Iniciar sesión
        </h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
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
          <Button type="submit">Ingresar</Button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
