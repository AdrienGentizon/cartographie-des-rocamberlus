import { NextRequest, NextResponse } from "next/server";

import searchSimilarArtists from "@/queries/searchSimilarArtists";
import { SearchResult } from "@/utils/types";

export async function GET(req: NextRequest) {
  console.log(`[API] ${req.method} ${req.url}`);

  try {
    const q = req.nextUrl.searchParams.get("q")?.toString();

    if (!q)
      return NextResponse.json(
        { error: "invalid request: q required" },
        { status: 400 }
      );

    return NextResponse.json<SearchResult[]>(await searchSimilarArtists(q));
  } catch (error) {
    console.error("[API] /api/artists unexpected error:", error);
    return NextResponse.json(
      { error: (error as Error)?.message ?? "unknown error" },
      { status: 500 }
    );
  }
}
