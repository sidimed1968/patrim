import React, { useState } from 'react';
import { Language, MinistryContact, AssetDeclaration, User } from '../types';
import { WILAYAS, ASSET_CATEGORIES } from '../constants';

interface AssetDeclarationFormProps {
  lang: Language;
  contacts: MinistryContact[];
  onSaveAsset: (asset: AssetDeclaration) => void;
  onAddContacts: (contacts: MinistryContact[]) => void;
  editingAsset: AssetDeclaration | null;
  currentUser: User;
  onCancelEdit: () => void;
  assets: AssetDeclaration[];
  onDeleteAsset: (id: string) => void;
}

const AssetDeclarationForm: React.FC<AssetDeclarationFormProps> = ({
  lang,
  contacts,
  onSaveAsset,
  editingAsset,
  onCancelEdit
}) => {
  const [formData, setFormData] = useState<Partial<AssetDeclaration>>({
    reference: '',
    ministryId: contacts[0]?.id || '',
    type: 'Vehicle',
    condition: 'Good',
    description: '',
    acquisitionDate: new Date().toISOString().split('T')[0],
    value: 0,
    wilaya: 'Nouakchott Nord',
    locationDetails: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const asset: AssetDeclaration = {
      id: editingAsset?.id || `asset-${Date.now()}`,
      reference: formData.reference || '',
      ministryId: formData.ministryId || '',
      type: formData.type as any,
      condition: formData.condition as any,
      description: formData.description || '',
      acquisitionDate: formData.acquisitionDate || '',
      value: formData.value || 0,
      wilaya: formData.wilaya as any,
      locationDetails: formData.locationDetails || '',
    };
    onSaveAsset(asset);
    setFormData({
      reference: '',
      ministryId: contacts[0]?.id || '',
      type: 'Vehicle',
      condition: 'Good',
      description: '',
      acquisitionDate: new Date().toISOString().split('T')[0],
      value: 0,
      wilaya: 'Nouakchott Nord',
      locationDetails: '',
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        {lang === 'fr' ? 'Déclaration de bien' : 'التصريح بالممتلكات'}
      </h2>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'fr' ? 'Référence' : 'المرجع'}
            </label>
            <input
              type="text"
              value={formData.reference}
              onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'fr' ? 'Ministère' : 'الوزارة'}
            </label>
            <select
              value={formData.ministryId}
              onChange={(e) => setFormData({ ...formData, ministryId: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              required
            >
              {contacts.map(c => (
                <option key={c.id} value={c.id}>{c.name[lang]}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'fr' ? 'Type' : 'النوع'}
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
              className="w-full px-4 py-2 border rounded-lg"
              required
            >
              {ASSET_CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.label[lang]}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'fr' ? 'État' : 'الحالة'}
            </label>
            <select
              value={formData.condition}
              onChange={(e) => setFormData({ ...formData, condition: e.target.value as any })}
              className="w-full px-4 py-2 border rounded-lg"
              required
            >
              <option value="New">{lang === 'fr' ? 'Neuf' : 'جديد'}</option>
              <option value="Good">{lang === 'fr' ? 'Bon' : 'جيد'}</option>
              <option value="NeedsRepair">{lang === 'fr' ? 'Réparation' : 'يحتاج إصلاح'}</option>
              <option value="Damaged">{lang === 'fr' ? 'Endommagé' : 'تالف'}</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'fr' ? 'Description' : 'الوصف'}
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'fr' ? 'Date acquisition' : 'تاريخ الاقتناء'}
            </label>
            <input
              type="date"
              value={formData.acquisitionDate}
              onChange={(e) => setFormData({ ...formData, acquisitionDate: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'fr' ? 'Valeur (MRU)' : 'القيمة (أوقية)'}
            </label>
            <input
              type="number"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'fr' ? 'Wilaya' : 'الولاية'}
            </label>
            <select
              value={formData.wilaya}
              onChange={(e) => setFormData({ ...formData, wilaya: e.target.value as any })}
              className="w-full px-4 py-2 border rounded-lg"
              required
            >
              {WILAYAS.map(w => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'fr' ? 'Localisation' : 'الموقع'}
            </label>
            <input
              type="text"
              value={formData.locationDetails}
              onChange={(e) => setFormData({ ...formData, locationDetails: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-gov-700 text-white py-2 rounded-lg hover:bg-gov-800"
          >
            {lang === 'fr' ? 'Enregistrer' : 'حفظ'}
          </button>
          {editingAsset && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              {lang === 'fr' ? 'Annuler' : 'إلغاء'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AssetDeclarationForm;
