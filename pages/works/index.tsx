import { GraphQLClient } from "graphql-request";
import Link from "next/link";
import { NextSeo } from 'next-seo';

const graphcms = new GraphQLClient('https://api-eu-central-1.graphcms.com/v2/ckf9qiikt05f801wf5ksydmqz/master');

export async function getStaticProps() {
  const { works } = await graphcms.request(
    `
    query works() {
      works {
        id
        title
        slug
      }
    }
  `
  );

  return {
    props: {
      works,
    },
  };
}

export default function workList({works}) {
  return (
      <>
        <NextSeo
          title="Simple Usage Example"
          description="A short description goes here."
        />
        {works.map((work) => {
          return (
            <Link key={work.id} as={`/works/${work.slug}`} href="/works/[slug]">
            <div key={work.id}>
              <h2>{work.title}</h2>
            </div>
            </Link>
          );
        })}
      </>
  )
}
