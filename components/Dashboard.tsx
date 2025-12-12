import React from 'react';
import { Language, AssetDeclaration, MinistryContact, User, WorkGroup } from '../types';

interface DashboardProps {
  assets: AssetDeclaration[];
  contacts: MinistryContact[];
  groups: WorkGroup[];
  lang: Language;
  currentUser: User;
  onEdit: (asset: AssetDeclaration) => void;
  onDelete: (id: string) => void;
  onMessageGroup: (group: WorkGroup) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ assets, contacts, lang }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        {lang === 'fr' ? 'Tableau de bord' : 'لوحة القيادة'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">
            {lang === 'fr' ? 'Total Biens' : 'إجمالي الممتلكات'}
          </h3>
          <p className="text-3xl font-bold text-gov-700 mt-2">{assets.length}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">
            {lang === 'fr' ? 'Ministères' : 'الوزارات'}
          </h3>
          <p className="text-3xl font-bold text-gov-700 mt-2">{contacts.length}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">
            {lang === 'fr' ? 'Valeur Totale' : 'القيمة الإجمالية'}
          </h3>
          <p className="text-3xl font-bold text-gov-700 mt-2">
            {(assets.reduce((sum, a) => sum + a.value, 0) / 1000000).toFixed(1)}M MRU
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold mb-4">
          {lang === 'fr' ? 'Biens récents' : 'الممتلكات الحديثة'}
        </h3>
        {assets.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            {lang === 'fr' ? 'Aucun bien enregistré' : 'لا توجد ممتلكات مسجلة'}
          </p>
        ) : (
          <div className="space-y-2">
            {assets.slice(0, 5).map(asset => (
              <div key={asset.id} className="border-b pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">{asset.reference}</span>
                    <span className="text-gray-500 mx-2">-</span>
                    <span className="text-gray-600">{asset.description}</span>
                  </div>
                  <span className="text-gov-700 font-medium">
                    {(asset.value / 1000).toFixed(0)}k MRU
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
