import { GraphQLClient } from "graphql-request";
import Link from "next/link";
import { NextSeo } from 'next-seo';

const graphcms = new GraphQLClient('https://api-eu-central-1.graphcms.com/v2/ckf9qiikt05f801wf5ksydmqz/master');

export async function getStaticProps({ params }) {
    const { work } = await graphcms.request(
        `
      query work($slug: String!) {
        work(where: { slug: $slug }) {
          id
          title
          slug
        }
      }
    `,
        {
            slug: params.slug,
        }
    );

    return {
        props: {
            work,
        },
    };
}

export async function getStaticPaths() {
    const { works } = await graphcms.request(`
      {
        works {
          id
          title
          slug
        }
      }
    `);

    return {
        paths: works.map(({ slug }) => ({
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

export default function WorkDetail ({ work }) {
    return (
        <>
        <NextSeo {...SEO}/>
            <div className="py-16 bg-gray-100 min-h-screen">
                <div className="text-gray-900 font-bold text-xl mb-2">
                    {work.title}
                </div>
                <div className="max-w-lg mx-auto">
                    <Link href="/">
                        <a>Back to all works</a>
                    </Link>
                </div>
            </div>
        </>
    );
}; 