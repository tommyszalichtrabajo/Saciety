import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';

function HomePage() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Bienvenido, {user?.username}
        </h1>
        <p className="text-gray-500 mb-6">Estás logueado correctamente</p>
        <Button onClick={handleLogout} variant="secondary">
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
}

export default HomePage;
