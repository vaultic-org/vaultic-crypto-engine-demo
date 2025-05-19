import { createFileRoute } from '@tanstack/react-router';
import EncryptionGame from '@/components/games/EncryptionGame';
import useTranslation from '@/hooks/useTranslation';

// Secret game page (index route)
export const Route = createFileRoute('/secret-game/')({
  component: SecretGamePage,
});

function SecretGamePage() {
  const { t } = useTranslation(['game']);
  
  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-white mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            {t('secretPageTitle')}
          </span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          {t('secretPageDescription')}
        </p>
      </div>
      
      <EncryptionGame />
    </>
  );
}

export default SecretGamePage; 