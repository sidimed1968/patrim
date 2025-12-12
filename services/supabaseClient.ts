import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          username: string;
          full_name: string;
          role: string;
          ministry_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          username: string;
          full_name: string;
          role: string;
          ministry_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          full_name?: string;
          role?: string;
          ministry_id?: string | null;
          created_at?: string;
        };
      };
      ministry_contacts: {
        Row: {
          id: string;
          name_fr: string;
          name_ar: string;
          representative: string;
          role_fr: string;
          role_ar: string;
          phone: string;
          email: string;
          department_fr: string;
          department_ar: string;
          compliance_status: string;
          last_submission: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name_fr: string;
          name_ar: string;
          representative: string;
          role_fr: string;
          role_ar: string;
          phone: string;
          email: string;
          department_fr: string;
          department_ar: string;
          compliance_status?: string;
          last_submission?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name_fr?: string;
          name_ar?: string;
          representative?: string;
          role_fr?: string;
          role_ar?: string;
          phone?: string;
          email?: string;
          department_fr?: string;
          department_ar?: string;
          compliance_status?: string;
          last_submission?: string | null;
          created_at?: string;
        };
      };
      asset_declarations: {
        Row: {
          id: string;
          reference: string;
          ministry_id: string;
          sub_entity: string | null;
          asset_type: string;
          condition: string;
          description: string;
          acquisition_date: string;
          value: number;
          current_value: number | null;
          wilaya: string;
          location_details: string;
          coordinates: any | null;
          documents: any;
          specific_details: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          reference: string;
          ministry_id: string;
          sub_entity?: string | null;
          asset_type: string;
          condition: string;
          description: string;
          acquisition_date: string;
          value: number;
          current_value?: number | null;
          wilaya: string;
          location_details: string;
          coordinates?: any | null;
          documents?: any;
          specific_details?: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          reference?: string;
          ministry_id?: string;
          sub_entity?: string | null;
          asset_type?: string;
          condition?: string;
          description?: string;
          acquisition_date?: string;
          value?: number;
          current_value?: number | null;
          wilaya?: string;
          location_details?: string;
          coordinates?: any | null;
          documents?: any;
          specific_details?: any;
          created_at?: string;
          updated_at?: string;
        };
      };
      work_groups: {
        Row: {
          id: string;
          name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          created_at?: string;
        };
      };
      work_group_members: {
        Row: {
          id: string;
          group_id: string;
          contact_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          group_id: string;
          contact_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          group_id?: string;
          contact_id?: string;
          created_at?: string;
        };
      };
    };
  };
}
