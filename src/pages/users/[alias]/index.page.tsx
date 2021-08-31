import {gql} from 'graphql-request';
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import React from 'react';

import {getSdk} from './index.page.generated';

import {graphqlClient} from '~/libs/graphql-request';
import {Template} from '~/templates/User/Template';

const AllUserPagesQuery = gql`
  query AllUserPages {
    AllUsers {
      alias
    }
  }
`;
const UserPageQuery = gql`
  query UserPage($alias: ID!) {
    FindUser(alias: $alias) {
      user {
        id
        alias
        displayName
      }
    }
  }
`;

export type UrlQuery = {alias: string};
export type RenderProps = {
  user: {id: string; alias: string; displayName: string};
};

const graphqlSdk = getSdk(graphqlClient);
export const getStaticPaths: GetStaticPaths<UrlQuery> = async () => {
  return graphqlSdk.AllUserPages().then(({AllUsers}) => ({
    fallback: 'blocking',
    paths: AllUsers.map(({alias}) => ({
      params: {alias},
    })),
  }));
};

export const getStaticProps: GetStaticProps<RenderProps, UrlQuery> = async ({
  params,
}) => {
  if (!params || !params.alias) return {notFound: true};
  const props = await graphqlSdk
    .UserPage({alias: params.alias})
    .then(({FindUser: {user}}) =>
      user
        ? {
            user: {
              id: user.id,
              alias: user.alias,
              displayName: user.displayName,
            },
          }
        : null,
    );

  if (!props) return {notFound: true};
  return {props};
};

export const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  ...props
}) => {
  return <Template {...props} />;
};

export default Page;
