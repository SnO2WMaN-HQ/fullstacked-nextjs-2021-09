import React from 'react';

export type TemplateProps = {
  user: {id: string; alias: string; displayName: string};
};
export const Template: React.VFC<TemplateProps> = ({user}) => {
  return (
    <main>
      <h1>{user.alias}</h1>
      <h2>{user.displayName}</h2>
    </main>
  );
};
