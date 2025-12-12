import React from 'react';
import { Language, Translation } from '../types';

interface SettingsProps {
  lang: Language;
  onUpdate: (texts: Translation) => void;
}

const Settings: React.FC<SettingsProps> = ({ lang }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        {lang === 'fr' ? 'Paramètres' : 'الإعدادات'}
      </h2>

      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500 text-center py-8">
          {lang === 'fr' ? 'Paramètres de l\'application' : 'إعدادات التطبيق'}
        </p>
      </div>
    </div>
  );
};

export default Settings;
