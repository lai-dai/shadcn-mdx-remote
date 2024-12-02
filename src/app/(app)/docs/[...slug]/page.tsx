import { type Metadata } from "next"
import { notFound } from "next/navigation"
import { Mdx } from "~/components/mdx-components"
import { DashboardTableOfContents } from "~/components/toc"
import { siteConfig } from "~/config/site"
import { GetAllPostSlugs, GetPostBySlug } from "~/lib/docs"
import { mdxSerialize } from "~/lib/mdx-serialize"
import { getTableOfContents } from "~/lib/toc"

interface PostPageProps {
  params: Promise<{
    slug: string[]
  }>
}

export async function generateStaticParams() {
  const slugs = GetAllPostSlugs()
  return slugs.map(slug => ({ params: { slug } }))
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = GetPostBySlug(slug[0]!)
  const description = post.content
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/\n/g, " ")
    .replace(/\s\s+/g, " ")
    .slice(0, 150)

  return {
    title: post.data.title,
    description: description,
    openGraph: {
      title: post.data.title,
      description: description,
      url: `${siteConfig.url}/${slug[0]}`,
      siteName: "Next.js with next-mdx-remote Blog",
      images: [
        {
          url: `/post/${slug[0]}/${slug[0]}.webp`,
          width: 1200,
          height: 630,
          alt: "Next.js with next-mdx-remote Blog",
        },
      ],
      locale: "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: post.data.title,
      description: description,
      images: [`${siteConfig.url}/post/${slug[0]}/${slug[0]}.webp`],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params

  if (!slug.length) {
    notFound()
  }

  const { content } = GetPostBySlug(slug[0]!)

  const [mdxSource, toc] = await Promise.all([
    mdxSerialize(content),
    getTableOfContents(content),
  ])

  return (
    <div
      className={
        "container relative mx-auto py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]"
      }>
      <div className={"mx-auto w-full min-w-0 max-w-3xl"}>
        <Mdx mdxSource={mdxSource} />
      </div>

      <div className={"hidden text-sm xl:block"}>
        <div className={"sticky top-20 -mt-6 h-[calc(100vh-3.5rem)] pt-4"}>
          <div className={"no-scrollbar h-full overflow-auto pb-10"}>
            <DashboardTableOfContents toc={toc} />
          </div>
        </div>
      </div>
    </div>
  )
}