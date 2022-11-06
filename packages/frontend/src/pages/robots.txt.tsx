import React from 'react';
import { NextPage, GetServerSideProps } from 'next';

const robotsTxt = `User-agent: *
Disallow: /setting
Disallow: /verify
Sitemap: https://sample.com/sitemap/sitemap.xml`;

const RobotsPage: NextPage = () => {
  return <></>;
};

// SOURCE: https://imlc.me/generate-robots-txt-and-sitemap-xml-in-next-js#robots-txt
export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Content-Type', 'text/plain');
  res.write(robotsTxt);
  res.end();
  return {
    props: {
      status: true,
    },
  };
};

export default RobotsPage;
