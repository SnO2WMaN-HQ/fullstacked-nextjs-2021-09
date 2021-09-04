import {graphql} from 'msw';

import {getStaticPaths, getStaticProps, UrlQuery} from './index.page';
import {
  AllUserPagesDocument,
  AllUserPagesQuery,
  AllUserPagesQueryVariables,
  UserPageDocument,
  UserPageQuery,
  UserPageQueryVariables,
} from './index.page.generated';

import {mockServer} from '~/mocks/server';

describe('/users/[alias]', () => {
  describe('getStaticPaths()', () => {
    it('successful', async () => {
      const queryInterceptor = jest.fn();

      mockServer.use(
        graphql.query<AllUserPagesQuery, AllUserPagesQueryVariables>(
          AllUserPagesDocument,
          (req, res, ctx) => {
            queryInterceptor(req.variables);
            return res.once(ctx.data({AllUsers: [{alias: '1'}, {alias: '2'}]}));
          },
        ),
      );
      const staticPaths = await getStaticPaths({});

      expect(staticPaths).toStrictEqual({
        fallback: 'blocking',
        paths: [{params: {alias: '1'}}, {params: {alias: '2'}}],
      });

      expect(queryInterceptor).toHaveBeenCalledWith({});
    });
  });

  describe('getStaticProps()', () => {
    it('return notFound if param is undefined', async () => {
      const staticProps = await getStaticProps({});

      expect(staticProps).toStrictEqual({notFound: true});
    });

    it('return notFound if param.alias is undefined', async () => {
      const staticProps = await getStaticProps({params: {} as UrlQuery});

      expect(staticProps).toStrictEqual({notFound: true});
    });

    it('return notFound if user not found', async () => {
      const queryInterceptor = jest.fn();

      mockServer.use(
        graphql.query<UserPageQuery, UserPageQueryVariables>(
          UserPageDocument,
          (req, res, ctx) => {
            queryInterceptor(req.variables);
            return res.once(ctx.data({FindUser: {user: null}}));
          },
        ),
      );
      const staticProps = await getStaticProps({params: {alias: 'alias'}});

      expect(staticProps).toStrictEqual({notFound: true});
      expect(queryInterceptor).toHaveBeenCalledWith({alias: 'alias'});
    });

    it('return props if user exists', async () => {
      const queryInterceptor = jest.fn();

      mockServer.use(
        graphql.query<UserPageQuery, UserPageQueryVariables>(
          UserPageDocument,
          (req, res, ctx) => {
            queryInterceptor(req.variables);
            return res.once(
              ctx.data({
                FindUser: {
                  user: {id: '1', alias: 'alias', displayName: 'displayName'},
                },
              }),
            );
          },
        ),
      );
      const staticProps = await getStaticProps({params: {alias: 'alias'}});

      expect(staticProps).toStrictEqual({
        props: {user: {id: '1', alias: 'alias', displayName: 'displayName'}},
      });
      expect(queryInterceptor).toHaveBeenCalledWith({alias: 'alias'});
    });
  });
});
