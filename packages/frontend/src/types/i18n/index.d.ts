import FooterEN from '@locales/en/footer.json';
import HeaderEN from '@locales/en/header.json';

import HomeEN from '@locales/en/home.json';
import NotFoundEN from '@locales/en/notFound.json';

export type ResourceNS = 'translations' | 'footer' | 'header' | 'home' | 'notFound';

declare module 'react-i18next' {
  interface Resources {
    translations: typeof TranslationsEN;
    footer: typeof FooterEN;
    header: typeof HeaderEN;
    home: typeof HomeEN;
    notFound: typeof NotFoundEN;
  }
}

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'home';
    resources: {
      translations: typeof TranslationsEN;
      footer: typeof FooterEN;
      header: typeof HeaderEN;
      home: typeof HomeEN;
      notFound: typeof NotFoundEN;
    };
  }
}
