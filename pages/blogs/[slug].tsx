import { GraphQLClient } from "graphql-request";
import Link from "next/link";
import { NextSeo } from 'next-seo';

const graphcms = new GraphQLClient('https://api-eu-central-1.graphcms.com/v2/ckf9qiikt05f801wf5ksydmqz/master');

export async function getStaticProps({ params }) {
    const { post } = await graphcms.request(
      `
      query Post($slug: String!) {
        post(where: { slug: $slug }) {
          id
          title
          content{
            text
          }
          slug
          coverImage {
            id
            url
          }
          author {
            id
            name
          }
          date
        }
      }
    `,
      {
        slug: params.slug,
      }
    );
  
    return {
      props: {
        post,
      },
    };
  }

  export async function getStaticPaths() {
    const { posts } = await graphcms.request(`
      {
        posts {
          id
          title
          content{
            text
          }
          slug
          coverImage {
            id
            url
          }
          author {
            id
            name
          }
          date
        }
      }
    `);
  
    return {
      paths: posts.map(({ slug }) => ({
        params: { slug },
      })),
      fallback: false,
    };
  }

  const SEO = {
    title:"Test work",
    description:"test work description",
    openGraph:{
    title: 'Open Graph Article Title',
    description: 'Description of open graph article',
    url: 'https://www.example.com/articles/article-title',
    type: 'article',
    article: {
        publishedTime: '2017-06-21T23:04:13Z',
        modifiedTime: '2018-01-21T18:04:43Z',
        expirationTime: '2022-12-21T22:04:11Z',
        section: 'Section II',
        authors: [
        'https://www.example.com/authors/@firstnameA-lastnameA',
        'https://www.example.com/authors/@firstnameB-lastnameB',
        ],
        tags: ['Tag A', 'Tag B', 'Tag C'],
    },
    images: [
        {
        url: 'https://www.test.ie/images/cover.jpg',
        width: 850,
        height: 650,
        alt: 'Photo of text',
        },
    ],
    }
}
  export default ({ post }) => {
    return (
      <>
      <NextSeo {...SEO}/>
      <div className="py-16 bg-gray-100 min-h-screen">
        <div className="max-w-lg shadow-lg rounded-lg mx-auto mb-16">
          <div
            className="h-48 rounded-t flex-none bg-cover text-center overflow-hidden"
            style={{ backgroundImage: `url(${post.coverImage.url})` }}
            title={post.title}
          />
          <div className="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div className="mb-8">
              <div className="text-gray-900 font-bold text-xl mb-2">
                {post.title}
              </div>
              <p className="text-gray-700 text-base">{post.content.text}</p>
            </div>
            <div className="flex items-center">
              <div className="text-sm">
                <p className="text-gray-900 leading-none">{post.author.name}</p>
                <p className="text-gray-600">{post.date}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-lg mx-auto">
          <Link href="/">
            <a>Back to all posts</a>
          </Link>
        </div>
      </div>
      </>
    );
  }; 