import {NextPage} from 'next';
import React from 'react';

export type UrlQuery = Record<string, never>;
export type PageProps = Record<string, never>;
export const Page: NextPage<PageProps> = ({...props}) => {
  return (
    <main>
      <p>Wow</p>
    </main>
  );
};
export default Page;
