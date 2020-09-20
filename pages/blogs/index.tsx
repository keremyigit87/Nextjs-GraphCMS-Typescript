import { GraphQLClient } from "graphql-request";
import Link from "next/link";
import { NextSeo } from 'next-seo';

const graphcms = new GraphQLClient('https://api-eu-central-1.graphcms.com/v2/ckf9qiikt05f801wf5ksydmqz/master');

export async function getStaticProps() {
  const { posts } = await graphcms.request(
    `
    query Posts() {
      posts {
        id
        title
        excerpt
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
  `
  );

  return {
    props: {
      posts,
    },
  };
}

export default function BlogList({posts}){
  return(
    <>
    <NextSeo
      title="Simple Usage Example"
      description="A short description goes here."
    />
      {posts.map((post) => {
        return (
          <Link key={post.id} as={`/blogs/${post.slug}`} href="/blogs/[slug]">
          <div key={post.id}>
            <img src={post.coverImage.url} alt={post.title} />
            <h2>{post.title}</h2>
            <p>{post.date}</p>
            <p>{post.author.name}</p>
            <p>{post.excerpt}</p>
          </div>
          </Link>
        );
      })}
    </>
  )
}
