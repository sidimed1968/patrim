/*
  # Création du schéma initial pour PatrimoineÉtat Connect
  
  1. Nouvelles Tables
    - `users` - Utilisateurs de l'application (Super Admin, Admin Ministère, Éditeur, Lecteur)
      - `id` (uuid, clé primaire)
      - `username` (text, unique)
      - `full_name` (text)
      - `role` (text)
      - `ministry_id` (uuid, nullable)
      - `created_at` (timestamptz)
      
    - `ministry_contacts` - Contacts des ministères
      - `id` (uuid, clé primaire)
      - `name_fr` (text)
      - `name_ar` (text)
      - `representative` (text)
      - `role_fr` (text)
      - `role_ar` (text)
      - `phone` (text)
      - `email` (text)
      - `department_fr` (text)
      - `department_ar` (text)
      - `compliance_status` (text)
      - `last_submission` (date, nullable)
      - `created_at` (timestamptz)
      
    - `asset_declarations` - Déclarations de biens
      - `id` (uuid, clé primaire)
      - `reference` (text, unique)
      - `ministry_id` (uuid)
      - `sub_entity` (text, nullable)
      - `asset_type` (text)
      - `condition` (text)
      - `description` (text)
      - `acquisition_date` (date)
      - `value` (numeric)
      - `current_value` (numeric, nullable)
      - `wilaya` (text)
      - `location_details` (text)
      - `coordinates` (jsonb, nullable)
      - `documents` (jsonb, default '[]')
      - `specific_details` (jsonb, default '{}')
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      
    - `work_groups` - Groupes de travail
      - `id` (uuid, clé primaire)
      - `name` (text)
      - `created_at` (timestamptz)
      
    - `work_group_members` - Membres des groupes (relation many-to-many)
      - `id` (uuid, clé primaire)
      - `group_id` (uuid)
      - `contact_id` (uuid)
      - `created_at` (timestamptz)
      
  2. Sécurité
    - Activation de RLS sur toutes les tables
    - Politiques d'accès basées sur l'authentification
    - Les Super Admins ont accès complet
    - Les Admins Ministère ont accès aux données de leur ministère
    - Les Éditeurs peuvent modifier les données de leur ministère
    - Les Lecteurs ont accès en lecture seule
*/

-- Extension UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table Users
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  username text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL CHECK (role IN ('SUPER_ADMIN', 'MINISTRY_ADMIN', 'EDITOR', 'VIEWER')),
  ministry_id uuid,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Super admins can view all users"
  ON users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role = 'SUPER_ADMIN'
    )
  );

CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Super admins can manage users"
  ON users FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role = 'SUPER_ADMIN'
    )
  );

-- Table Ministry Contacts
CREATE TABLE IF NOT EXISTS ministry_contacts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_fr text NOT NULL,
  name_ar text NOT NULL,
  representative text NOT NULL,
  role_fr text NOT NULL,
  role_ar text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  department_fr text NOT NULL,
  department_ar text NOT NULL,
  compliance_status text DEFAULT 'pending' CHECK (compliance_status IN ('compliant', 'pending', 'overdue')),
  last_submission date,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE ministry_contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view contacts"
  ON ministry_contacts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage contacts"
  ON ministry_contacts FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users u 
      WHERE u.id = auth.uid() 
      AND u.role IN ('SUPER_ADMIN', 'MINISTRY_ADMIN')
    )
  );

-- Table Asset Declarations
CREATE TABLE IF NOT EXISTS asset_declarations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  reference text UNIQUE NOT NULL,
  ministry_id uuid REFERENCES ministry_contacts(id) ON DELETE CASCADE,
  sub_entity text,
  asset_type text NOT NULL CHECK (asset_type IN ('RealEstate', 'Vehicle', 'Equipment', 'Furniture', 'IT')),
  condition text NOT NULL CHECK (condition IN ('New', 'Good', 'NeedsRepair', 'Damaged', 'Obsolete')),
  description text NOT NULL,
  acquisition_date date NOT NULL,
  value numeric NOT NULL,
  current_value numeric,
  wilaya text NOT NULL,
  location_details text NOT NULL,
  coordinates jsonb,
  documents jsonb DEFAULT '[]',
  specific_details jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE asset_declarations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view assets"
  ON asset_declarations FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Ministry admins can manage their ministry assets"
  ON asset_declarations FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users u 
      WHERE u.id = auth.uid() 
      AND (
        u.role = 'SUPER_ADMIN'
        OR (u.role IN ('MINISTRY_ADMIN', 'EDITOR') AND u.ministry_id::text = ministry_id::text)
      )
    )
  );

-- Table Work Groups
CREATE TABLE IF NOT EXISTS work_groups (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE work_groups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view groups"
  ON work_groups FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage groups"
  ON work_groups FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users u 
      WHERE u.id = auth.uid() 
      AND u.role IN ('SUPER_ADMIN', 'MINISTRY_ADMIN')
    )
  );

-- Table Work Group Members
CREATE TABLE IF NOT EXISTS work_group_members (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id uuid REFERENCES work_groups(id) ON DELETE CASCADE,
  contact_id uuid REFERENCES ministry_contacts(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(group_id, contact_id)
);

ALTER TABLE work_group_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view group members"
  ON work_group_members FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage group members"
  ON work_group_members FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users u 
      WHERE u.id = auth.uid() 
      AND u.role IN ('SUPER_ADMIN', 'MINISTRY_ADMIN')
    )
  );

-- Indexes pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_assets_ministry ON asset_declarations(ministry_id);
CREATE INDEX IF NOT EXISTS idx_assets_type ON asset_declarations(asset_type);
CREATE INDEX IF NOT EXISTS idx_assets_wilaya ON asset_declarations(wilaya);
CREATE INDEX IF NOT EXISTS idx_group_members_group ON work_group_members(group_id);
CREATE INDEX IF NOT EXISTS idx_group_members_contact ON work_group_members(contact_id);

-- Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_asset_declarations_updated_at
  BEFORE UPDATE ON asset_declarations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
