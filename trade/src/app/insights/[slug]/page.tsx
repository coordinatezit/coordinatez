import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { JsonLd } from "@/components/shared/json-ld";
import { buildMetadata, articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { insights, type InsightBlock } from "@/data/insights";

export function generateStaticParams() {
  return insights.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = insights.find((entry) => entry.slug === slug);
  if (!post) {
    return buildMetadata({
      title: "Article Not Found",
      description: "The article you are looking for could not be found.",
      path: `/insights/${slug}`,
      noIndex: true,
    });
  }
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/insights/${slug}`,
  });
}

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

function BlockRenderer({ block, isLede }: { block: InsightBlock; isLede: boolean }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-10 text-balance font-display text-2xl font-medium">{block.text}</h2>
      );
    case "ul":
      return (
        <ul className="mt-6 space-y-3">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 leading-relaxed text-muted-foreground">
              <span aria-hidden className="mt-[0.75rem] h-px w-4 shrink-0 bg-brand-sky" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "p":
    default:
      return isLede ? (
        <p className="mt-8 text-pretty text-lg leading-relaxed sm:text-xl">{block.text}</p>
      ) : (
        <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">{block.text}</p>
      );
  }
}

export default async function InsightArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = insights.find((entry) => entry.slug === slug);
  if (!post) notFound();

  const accent = post.category === "Global Trade" ? "text-brand-copper" : "text-brand-sky";
  const firstParagraphIndex = post.body.findIndex((block) => block.type === "p");

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/insights" },
            { name: post.title, path: `/insights/${post.slug}` },
          ]),
          articleJsonLd({
            title: post.title,
            description: post.excerpt,
            datePublished: post.date,
            path: `/insights/${post.slug}`,
          }),
        ]}
      />

      <article className="section-y">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-royal transition-colors hover:text-brand-sky dark:text-brand-sky"
            >
              <ArrowLeft className="size-4" />
              All insights
            </Link>

            <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
              <span>{dateFormat.format(new Date(post.date))}</span>
              <span aria-hidden className="text-border">·</span>
              <span className={accent}>{post.category}</span>
              <span aria-hidden className="text-border">·</span>
              <span>{post.readMinutes} min read</span>
            </div>

            <h1 className="mt-5 text-balance font-display text-3xl font-medium leading-[1.12] sm:text-4xl lg:text-[2.75rem]">
              {post.title}
            </h1>

            <div className="mt-2 border-b pb-10 sm:pb-12">
              {post.body.map((block, index) => (
                <BlockRenderer
                  key={index}
                  block={block}
                  isLede={index === firstParagraphIndex}
                />
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 rounded-lg border bg-card p-8">
              <p className="eyebrow">Keep the conversation going</p>
              <h2 className="mt-3 text-balance font-display text-xl font-medium sm:text-2xl">
                Working through a problem like this one?
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Whether it&apos;s material to move or a requirement to fill, our trading desk will
                give you an honest read within one business day.
              </p>
              <Button asChild className="mt-6 rounded-full px-6">
                <Link href="/contact">
                  Talk to Coordinatez
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </article>
    </>
  );
}
