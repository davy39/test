import Link from 'next/link'
import GitHubCard from '@/components/GitHubCard'
import NextJS from '/components/icons/nextjs.svg'
import TailWindCSS from '/components/icons/tailwindcss.svg'
import { genPageMetadata } from '../seo'

export const metadata = genPageMetadata({ title: 'A propos' })

export default function About() {
  return (
    <>
      <div className="prose max-w-none dark:prose-dark lg:prose-lg">
        <h1>A propos</h1>
        <p>
          Ce blog est avant tout un moyen de garder une trace de la configuration de différents
          outils que je rencontre dans mes pérégrinations dans le monde du logiciel libre.
        </p>

        <h2>Mes projets</h2>
        <b>Pour le Lycée Expérimental</b>
        <p>
          J'essaie de développer quelques outils pour le Lycée Expérimental de Saint-Nazaire.
          <br />
          Leur code source est accessible sur la page {` `}
          <Link href="https;//github.com/lycee-experimental/">Github</Link> du Lycée.
        </p>

        <h2>A propos de ce site</h2>
        <div>
          <GitHubCard repo="davy39/blognote" />
          <div>
            Le blog est hébergé par <a href="https://vercel.com">Vercel</a> and built with{' '}
            <a href="https://nextjs.org">
              <i className="inline-block">
                <NextJS className="h-6 w-6" />
              </i>
            </a>{' '}
            and{' '}
            <a href="https://tailwindcss.com">
              <i className="inline-block">
                <TailWindCSS className="h-6 w-6" />
              </i>
            </a>
            <br />I started it with my previous{' '}
            <a href="https://github.com/acsoto/soto-blog-gatsby">Gatsby version</a> and{' '}
            <a href="https://github.com/timlrx/tailwind-nextjs-starter-blog">
              Tailwind Nextjs Starter Blog
            </a>
            .
            <br />
            If you are finding inspiration, you can see my these 2 posts about this site.
            <ul>
              <li>
                <Link href="posts/202301/front-end-learning-and-gatsby">About Gatsby</Link>
              </li>
              <li>
                <Link href="posts/202301/moving-to-nextjs">About NextJS</Link>
              </li>
            </ul>
          </div>
        </div>

        {/*<h2>Podcast</h2>*/}
        {/*<div className="lg:flex lg:flex-row">*/}
        {/*  <Image*/}
        {/*    className="rounded lg:basis-1/4"*/}
        {/*    src={PodcastCover}*/}
        {/*    alt="Podcast"*/}
        {/*    width="256"*/}
        {/*    height="256"*/}
        {/*    quality="100"*/}
        {/*    placeholder="blur"*/}
        {/*  />*/}
        {/*  <div className="lg:basis-3/4 lg:p-8">*/}
        {/*    I and my friends have a mandarin conversation podcast talking about books and movies.*/}
        {/*    <br />*/}
        {/*    You can access it with{' '}*/}
        {/*    <a href="https://podcasts.apple.com/us/podcast/就是奇谈/id1670887501">Apple Podcast</a>*/}
        {/*    {` `}and{` `}*/}
        {/*    <a href="https://open.spotify.com/show/7L3SZKRRb0LgBm90PgY6Xd">Spotify</a>.<br />*/}
        {/*    RSS feed:{` `}*/}
        {/*    <a href="https://feed.xyzfm.space/f8fvn3qbq4y3">小宇宙</a>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </>
  )
}
