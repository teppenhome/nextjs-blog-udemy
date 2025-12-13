import Layout, { siteTitle } from "@/components/Layout";
import utilStyle from "../styles/utils.module.css";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { getPostsData } from "../lib/post"
import Head from "next/head";

//SSGの場合
export async function getStaticProps() {
  const allPostsData = getPostsData(); //id, title, date, thumbnail
  console.log(allPostsData);

  return {
    props: {
      allPostsData,
    },
  };
}

//SSRの場合 (外部からデータを持ってくるときに使う)
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       //コンポーネントに渡すためのprops
//     },
//   };
// }

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyle.headingMd}>
        <p>
          私はNext.jsエンジニアです/好きなフレームワークはNext.jsです
        </p>
      </section>

      <section>
        <h2>📝エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img
                  className={styles.thumbnailImage}
                  src={`${thumbnail}`}
                  alt="サムネイル"
                />
              </Link>
              <Link className={utilStyle.boldText} href={`/posts/${id}`}>
                {title}
              </Link>
              <br />
              <small className={utilStyle.lightText}>{date}</small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
