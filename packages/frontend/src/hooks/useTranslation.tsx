// import { TFunctionResult, TOptions } from "i18next";
import { useTranslation as useHook } from 'react-i18next';
import { ResourceNS } from 'src/types/i18n';

export const useTranslation = (ns?: ResourceNS) => {
  const { t, i18n, ready } = useHook<ResourceNS>(ns);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return { t, i18n, changeLanguage, ready };
};
