import fetch from 'isomorphic-unfetch';
import Layout from '../components/Layout';
import Post from '../components/Post';

import { BlogPost } from '../interfaces/blog-post';
import { isAfter } from 'date-fns';
import Unsplash, { toJson } from 'unsplash-js';

const WEEK = 60 * 60 * 24 * 7;

const IndexPage = ({
  posts,
  backgroundImage,
}: {
  posts: BlogPost[];
  backgroundImage: string;
}) => (
  <Layout title="Home | Colum Ferry" backgroundImage={backgroundImage}>
    {posts.map((post) => (
      <Post post={post} key={post.title}></Post>
    ))}
  </Layout>
);

export default IndexPage;

export async function getStaticProps() {
  const articles = await (
    await fetch('https://dev.to/api/articles?username=coly010')
  ).json();
  let posts: BlogPost[] = articles.map((article: any) => ({
    title: article.title,
    coverImage: article.cover_image,
    published: article.readable_publish_date,
    publishedAt: article.published_at,
    tags: article.tag_list,
    url: article.url,
    comments: article.comments_count,
    reactions: article.public_reactions_count,
  }));

  posts = posts.sort((a: BlogPost, b: BlogPost) =>
    isAfter(new Date(a.publishedAt), new Date(b.publishedAt)) ? -1 : 1
  );

  const unsplash = new Unsplash({
    accessKey: 'v0CJRN5VbUtFushspX2-uPGpKnMLUn_r-S8lXs7Ex6g',
  });

  const photoJson = await unsplash.photos
    .getRandomPhoto({
      query: 'landscape',
      collections: ['477172', '1918356'],
    })
    .then(toJson);
  const backgroundImage = photoJson.urls.raw + '&w=1920';

  return {
    props: { posts, backgroundImage },
    unstable_revalidate: WEEK,
  };
}
