import React from 'react';
import { Language, MinistryContact, AssetDeclaration, User, WorkGroup } from '../types';

interface ContactDirectoryProps {
  contacts: MinistryContact[];
  lang: Language;
  assets: AssetDeclaration[];
  currentUser: User;
  onAdd: (contacts: MinistryContact[]) => void;
  onUpdate: (contact: MinistryContact) => void;
  onDelete: (id: string) => void;
  groups: WorkGroup[];
  onCreateGroup: (name: string, contactIds: string[]) => void;
  onDeleteGroup: (id: string) => void;
  onMessageGroup: (group: WorkGroup) => void;
}

const ContactDirectory: React.FC<ContactDirectoryProps> = ({ contacts, lang }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        {lang === 'fr' ? 'Annuaire des Ministères' : 'دليل الوزارات'}
      </h2>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {lang === 'fr' ? 'Ministère' : 'الوزارة'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {lang === 'fr' ? 'Contact' : 'جهة الاتصال'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {lang === 'fr' ? 'Téléphone' : 'الهاتف'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {lang === 'fr' ? 'Email' : 'البريد'}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {contacts.map(contact => (
              <tr key={contact.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium">{contact.name[lang]}</div>
                  <div className="text-sm text-gray-500">{contact.department[lang]}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>{contact.representative}</div>
                  <div className="text-sm text-gray-500">{contact.role[lang]}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {contact.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {contact.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactDirectory;
