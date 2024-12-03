import { notFound } from "next/navigation";
import { Mdx } from "~/components/mdx-components";
import { DashboardTableOfContents } from "~/components/toc";
import { getContents } from "~/lib/content";
import { mdxSerialize } from "~/lib/mdx-serialize";
import { getTableOfContents } from "~/lib/toc";

export default async function HomePage() {
  const doc = getContents("").find(
    project => project.slug.toLowerCase() === 'home',
  )

  if (!doc) {
    notFound()
  }

  const [mdxSource, toc] = await Promise.all([
    mdxSerialize(doc.content),
    getTableOfContents(doc.content),
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
