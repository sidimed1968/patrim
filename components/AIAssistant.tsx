import React, { useState } from 'react';
import { Language } from '../types';

interface AIAssistantProps {
  lang: Language;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ lang }) => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setTimeout(() => {
      setResponse(lang === 'fr'
        ? 'Réponse IA simulée...'
        : 'استجابة الذكاء الاصطناعي المحاكاة...');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        {lang === 'fr' ? 'Assistant IA' : 'المساعد الذكي'}
      </h2>

      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={lang === 'fr' ? 'Posez votre question...' : 'اطرح سؤالك...'}
          className="w-full px-4 py-3 border rounded-lg h-32"
        />

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-gov-700 text-white px-6 py-2 rounded-lg hover:bg-gov-800 disabled:opacity-50"
        >
          {loading ? (lang === 'fr' ? 'Génération...' : 'جاري الإنشاء...') : (lang === 'fr' ? 'Générer' : 'إنشاء')}
        </button>

        {response && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">{lang === 'fr' ? 'Réponse:' : 'الإجابة:'}</h3>
            <p className="text-gray-700">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;
