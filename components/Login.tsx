import React, { useState } from 'react';
import { Language, User, MinistryContact, Translation } from '../types';
import { authenticateUser } from '../services/authService';

interface LoginProps {
  lang: Language;
  onLogin: (user: User) => void;
  appTexts: Translation;
  contacts: MinistryContact[];
  onRegisterNewMinistry: (contacts: MinistryContact[]) => void;
}

const Login: React.FC<LoginProps> = ({ lang, onLogin, appTexts }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = authenticateUser(username, password);
    if (user) {
      onLogin(user);
    } else {
      setError(appTexts.errorLogin[lang]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gov-900 to-gov-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gov-900 mb-2">
          {appTexts.appTitle[lang]}
        </h1>
        <h2 className="text-xl text-center text-gray-600 mb-8">
          {appTexts.loginTitle[lang]}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {appTexts.username[lang]}
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gov-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {appTexts.password[lang]}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gov-500 focus:border-transparent"
              required
            />
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gov-700 text-white py-3 rounded-lg font-medium hover:bg-gov-800 transition-colors"
          >
            {appTexts.loginButton[lang]}
          </button>
        </form>

        <div className="mt-6 text-sm text-gray-600 text-center">
          <p className="font-medium mb-2">
            {lang === 'fr' ? 'Comptes de démonstration:' : 'حسابات تجريبية:'}
          </p>
          <div className="space-y-1 text-xs">
            <p>admin / admin123</p>
            <p>finances / finances123</p>
            <p>sante / sante123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
