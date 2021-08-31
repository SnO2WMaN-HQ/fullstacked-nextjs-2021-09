import {graphql} from 'msw';

import {getStaticPaths} from './index.page';
import {
  AllUserPagesDocument,
  AllUserPagesQuery,
  AllUserPagesQueryVariables,
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
});
