import React from 'react';
import { Language, AssetDeclaration } from '../types';

interface AssetMapProps {
  assets: AssetDeclaration[];
  lang: Language;
}

const AssetMap: React.FC<AssetMapProps> = ({ assets, lang }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        {lang === 'fr' ? 'Cartographie des biens' : 'خريطة الممتلكات'}
      </h2>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="h-96 bg-gray-100 rounded flex items-center justify-center">
          <p className="text-gray-500">
            {lang === 'fr' ? 'Carte interactive (nécessite intégration Leaflet)' : 'خريطة تفاعلية (تتطلب تكامل Leaflet)'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssetMap;
