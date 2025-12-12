import React from 'react';
import { Language, MinistryContact } from '../types';

interface UserManagementProps {
  lang: Language;
  contacts: MinistryContact[];
}

const UserManagement: React.FC<UserManagementProps> = ({ lang }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        {lang === 'fr' ? 'Gestion des utilisateurs' : 'إدارة المستخدمين'}
      </h2>

      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500 text-center py-8">
          {lang === 'fr' ? 'Fonctionnalité en développement' : 'الوظيفة قيد التطوير'}
        </p>
      </div>
    </div>
  );
};

export default UserManagement;
