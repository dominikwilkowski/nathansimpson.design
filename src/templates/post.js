/** @jsx jsx */
import { jsx } from '@emotion/core';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import Layout from '../components/src/layout';
import { Header } from '../components';
import { colors, fontsizes } from '../theme';

export default ({ data }) => {
  const post = data.markdownRemark;

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{post.frontmatter.title} - Nathan Simpson's blog</title>
      </Helmet>
      <Header />
      <div css={{ maxWidth: 800, margin: '0 auto' }}>
        <div
          css={{
            borderBottom: `1px solid ${colors.slate['50']}`
          }}
        >
          <h1>{post.frontmatter.title}</h1>
          <div
            css={{
              display: 'flex',
              alignItems: 'center',
              margin: '12px 0px',
              fontSize: fontsizes.xsmall
            }}
          >
            Posted on {post.frontmatter.date}.
            {post.frontmatter.updated &&
              ` Updated on ${post.frontmatter.updated}`}
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  );
};

export const query = graphql`
  query PostsByPath($path: String) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
        path
        date(formatString: "MMMM DD YYYY")
        updated(formatString: "MMMM DD YYYY")
        type
      }
    }
  }
`;
