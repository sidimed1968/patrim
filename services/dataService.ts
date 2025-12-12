import { supabase } from './supabaseClient';
import { MinistryContact, AssetDeclaration, WorkGroup } from '../types';

export const dataService = {
  async getContacts(): Promise<MinistryContact[]> {
    const { data, error } = await supabase
      .from('ministry_contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data || []).map(c => ({
      id: c.id,
      name: { fr: c.name_fr, ar: c.name_ar },
      representative: c.representative,
      role: { fr: c.role_fr, ar: c.role_ar },
      phone: c.phone,
      email: c.email,
      department: { fr: c.department_fr, ar: c.department_ar },
      complianceStatus: c.compliance_status as 'compliant' | 'pending' | 'overdue',
      lastSubmission: c.last_submission || undefined,
    }));
  },

  async addContacts(contacts: MinistryContact[]): Promise<MinistryContact[]> {
    const insertData = contacts.map(c => ({
      id: c.id,
      name_fr: c.name.fr,
      name_ar: c.name.ar,
      representative: c.representative,
      role_fr: c.role.fr,
      role_ar: c.role.ar,
      phone: c.phone,
      email: c.email,
      department_fr: c.department.fr,
      department_ar: c.department.ar,
      compliance_status: c.complianceStatus,
      last_submission: c.lastSubmission || null,
    }));

    const { data, error } = await supabase
      .from('ministry_contacts')
      .insert(insertData)
      .select();

    if (error) throw error;

    return (data || []).map(c => ({
      id: c.id,
      name: { fr: c.name_fr, ar: c.name_ar },
      representative: c.representative,
      role: { fr: c.role_fr, ar: c.role_ar },
      phone: c.phone,
      email: c.email,
      department: { fr: c.department_fr, ar: c.department_ar },
      complianceStatus: c.compliance_status as 'compliant' | 'pending' | 'overdue',
      lastSubmission: c.last_submission || undefined,
    }));
  },

  async updateContact(contact: MinistryContact): Promise<MinistryContact> {
    const { data, error } = await supabase
      .from('ministry_contacts')
      .update({
        name_fr: contact.name.fr,
        name_ar: contact.name.ar,
        representative: contact.representative,
        role_fr: contact.role.fr,
        role_ar: contact.role.ar,
        phone: contact.phone,
        email: contact.email,
        department_fr: contact.department.fr,
        department_ar: contact.department.ar,
        compliance_status: contact.complianceStatus,
        last_submission: contact.lastSubmission || null,
      })
      .eq('id', contact.id)
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      name: { fr: data.name_fr, ar: data.name_ar },
      representative: data.representative,
      role: { fr: data.role_fr, ar: data.role_ar },
      phone: data.phone,
      email: data.email,
      department: { fr: data.department_fr, ar: data.department_ar },
      complianceStatus: data.compliance_status as 'compliant' | 'pending' | 'overdue',
      lastSubmission: data.last_submission || undefined,
    };
  },

  async deleteContact(id: string): Promise<void> {
    const { error } = await supabase
      .from('ministry_contacts')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async getAssets(): Promise<AssetDeclaration[]> {
    const { data, error } = await supabase
      .from('asset_declarations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data || []).map(a => ({
      id: a.id,
      reference: a.reference,
      ministryId: a.ministry_id,
      subEntity: a.sub_entity || undefined,
      type: a.asset_type as any,
      condition: a.condition as any,
      description: a.description,
      acquisitionDate: a.acquisition_date,
      value: a.value,
      currentValue: a.current_value || undefined,
      wilaya: a.wilaya as any,
      coordinates: a.coordinates || undefined,
      locationDetails: a.location_details,
      documents: a.documents || [],
      specificDetails: a.specific_details || {},
    }));
  },

  async addAsset(asset: AssetDeclaration): Promise<AssetDeclaration> {
    const { data, error } = await supabase
      .from('asset_declarations')
      .insert({
        id: asset.id,
        reference: asset.reference,
        ministry_id: asset.ministryId,
        sub_entity: asset.subEntity || null,
        asset_type: asset.type,
        condition: asset.condition,
        description: asset.description,
        acquisition_date: asset.acquisitionDate,
        value: asset.value,
        current_value: asset.currentValue || null,
        wilaya: asset.wilaya,
        location_details: asset.locationDetails,
        coordinates: asset.coordinates || null,
        documents: asset.documents || [],
        specific_details: asset.specificDetails || {},
      })
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      reference: data.reference,
      ministryId: data.ministry_id,
      subEntity: data.sub_entity || undefined,
      type: data.asset_type as any,
      condition: data.condition as any,
      description: data.description,
      acquisitionDate: data.acquisition_date,
      value: data.value,
      currentValue: data.current_value || undefined,
      wilaya: data.wilaya as any,
      coordinates: data.coordinates || undefined,
      locationDetails: data.location_details,
      documents: data.documents || [],
      specificDetails: data.specific_details || {},
    };
  },

  async updateAsset(asset: AssetDeclaration): Promise<AssetDeclaration> {
    const { data, error } = await supabase
      .from('asset_declarations')
      .update({
        reference: asset.reference,
        ministry_id: asset.ministryId,
        sub_entity: asset.subEntity || null,
        asset_type: asset.type,
        condition: asset.condition,
        description: asset.description,
        acquisition_date: asset.acquisitionDate,
        value: asset.value,
        current_value: asset.currentValue || null,
        wilaya: asset.wilaya,
        location_details: asset.locationDetails,
        coordinates: asset.coordinates || null,
        documents: asset.documents || [],
        specific_details: asset.specificDetails || {},
      })
      .eq('id', asset.id)
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      reference: data.reference,
      ministryId: data.ministry_id,
      subEntity: data.sub_entity || undefined,
      type: data.asset_type as any,
      condition: data.condition as any,
      description: data.description,
      acquisitionDate: data.acquisition_date,
      value: data.value,
      currentValue: data.current_value || undefined,
      wilaya: data.wilaya as any,
      coordinates: data.coordinates || undefined,
      locationDetails: data.location_details,
      documents: data.documents || [],
      specificDetails: data.specific_details || {},
    };
  },

  async deleteAsset(id: string): Promise<void> {
    const { error } = await supabase
      .from('asset_declarations')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async getWorkGroups(): Promise<WorkGroup[]> {
    const { data: groups, error: groupsError } = await supabase
      .from('work_groups')
      .select('*')
      .order('created_at', { ascending: false });

    if (groupsError) throw groupsError;

    const { data: members, error: membersError } = await supabase
      .from('work_group_members')
      .select('*');

    if (membersError) throw membersError;

    return (groups || []).map(g => ({
      id: g.id,
      name: g.name,
      contactIds: (members || [])
        .filter(m => m.group_id === g.id)
        .map(m => m.contact_id),
    }));
  },

  async createWorkGroup(name: string, contactIds: string[]): Promise<WorkGroup> {
    const { data: group, error: groupError } = await supabase
      .from('work_groups')
      .insert({ name })
      .select()
      .single();

    if (groupError) throw groupError;

    if (contactIds.length > 0) {
      const { error: membersError } = await supabase
        .from('work_group_members')
        .insert(contactIds.map(contactId => ({
          group_id: group.id,
          contact_id: contactId,
        })));

      if (membersError) throw membersError;
    }

    return {
      id: group.id,
      name: group.name,
      contactIds,
    };
  },

  async deleteWorkGroup(id: string): Promise<void> {
    const { error } = await supabase
      .from('work_groups')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};
