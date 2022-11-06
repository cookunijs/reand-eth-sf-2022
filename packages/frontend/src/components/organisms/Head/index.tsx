import React from 'react';
import { NextSeo, DefaultSeo } from 'next-seo';

export interface HeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  twitter?: {
    cardType: 'summary_large_image' | 'summary';
  };
  noindex?: boolean;
  defaultSeo?: boolean;
}

const defaultSeoData = {
  defaultTitle: 'Sample',
  canonical: 'https://sample.com',
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'sample',
    },
    {
      name: 'description',
      content: 'description',
    },
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Sample',
    description: 'description',
    url: 'https://sample.com',
    site_name: 'Sample',
    images: [
      {
        url: '',
        width: 800,
        height: 600,
        alt: 'Sample',
      },
    ],
  },
  twitter: {
    handle: '@sample',
    site: '@sample',
    cardType: 'summary_large_image',
  },
};

export const Head: React.FC<HeadProps> = ({
  title,
  description,
  image,
  url,
  twitter,
  noindex,
  defaultSeo,
}) => {
  return (
    <>
      {defaultSeo || !title || !description || !image || !url ? (
        <>
          <DefaultSeo {...defaultSeoData} />
        </>
      ) : (
        <>
          <NextSeo
            title={title}
            defaultTitle={defaultSeoData.defaultTitle}
            titleTemplate={`%s | Sample`}
            description={description}
            canonical={url}
            noindex={noindex}
            openGraph={{
              type: defaultSeoData.openGraph.type,
              locale: defaultSeoData.openGraph.locale,
              url: url,
              title: title,
              description: description,
              images: [
                {
                  url: image,
                  width: 800,
                  height: 600,
                  alt: defaultSeoData.defaultTitle,
                },
                {
                  url: image,
                  width: 900,
                  height: 800,
                  alt: defaultSeoData.defaultTitle,
                },
                { url: image },
                { url: image },
              ],
              site_name: defaultSeoData.openGraph.site_name,
            }}
            twitter={
              twitter
                ? {
                    ...defaultSeoData.twitter,
                    cardType: twitter.cardType,
                  }
                : defaultSeoData.twitter
            }
          />
        </>
      )}
    </>
  );
};
