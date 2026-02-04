import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { CollectionTag, EntryTag } from "@/utils/contentful";
import env from "@/utils/env";

export async function POST(req: NextRequest) {
  console.log(`[Operation]`, req.method, req.url);
  try {
    const signature = req.headers.get(env().CONTENTFUL_WEBHOOK_HEADER_KEY);

    if (signature !== env().CONTENTFUL_WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const topic = req.headers.get("x-contentful-topic");
    console.log(`[Webhook] received contentful topic: ${topic}`);

    const payload = (await req.json()) as unknown & {
      sys: {
        type: ({} & string) | "Entry";
        id: string;
        contentType: {
          sys: {
            id: ({} & string) | "article";
          };
        };
      };
    };

    if (payload.sys.contentType.sys.id === "article") {
      revalidateTag(`article-${payload.sys.id}` satisfies EntryTag, "max");
      const revalidatedTags = [`article-${payload.sys.id}`];

      if (["publish", "unpublish", "delete"].includes(topic?.split(".").at(-1) ?? "")) {
        revalidateTag(`articleCollection` satisfies CollectionTag, "max");
        revalidatedTags.push("articleCollection");
      }

      console.log(`[Caching] updated tags: ${revalidatedTags.join(", ")}`);
    }
    return NextResponse.json(
      { message: "webhook has been received" },
      { status: 200 }
    );
  } catch (error) {
    console.log(
      `[Error]`,
      req.nextUrl.toString(),
      (error as Error)?.message ?? error
    );
    return NextResponse.json(
      { error: (error as Error)?.message ?? "unknown error" },
      { status: 500 }
    );
  }
}
