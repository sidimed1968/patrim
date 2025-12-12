import { Translation } from '../types';
import { TEXTS } from '../constants';

const SETTINGS_KEY = 'app_custom_texts';

export const getAppTexts = (): Translation => {
  try {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (saved) {
      return { ...TEXTS, ...JSON.parse(saved) };
    }
  } catch (error) {
    console.error('Error loading custom texts:', error);
  }
  return TEXTS;
};

export const saveAppTexts = (texts: Translation): void => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(texts));
  } catch (error) {
    console.error('Error saving custom texts:', error);
  }
};
