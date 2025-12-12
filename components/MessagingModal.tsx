import React from 'react';
import { Language, WorkGroup, MinistryContact } from '../types';

interface MessagingModalProps {
  group: WorkGroup;
  contacts: MinistryContact[];
  lang: Language;
  onClose: () => void;
}

const MessagingModal: React.FC<MessagingModalProps> = ({ group, lang, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-xl font-bold mb-4">
          {lang === 'fr' ? 'Envoyer un message' : 'إرسال رسالة'}
        </h3>

        <p className="mb-4 text-gray-600">
          {lang === 'fr' ? `Groupe: ${group.name}` : `المجموعة: ${group.name}`}
        </p>

        <textarea
          className="w-full px-4 py-2 border rounded-lg h-32 mb-4"
          placeholder={lang === 'fr' ? 'Votre message...' : 'رسالتك...'}
        />

        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            {lang === 'fr' ? 'Annuler' : 'إلغاء'}
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gov-700 text-white px-4 py-2 rounded-lg hover:bg-gov-800"
          >
            {lang === 'fr' ? 'Envoyer' : 'إرسال'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessagingModal;
