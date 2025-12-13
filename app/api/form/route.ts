import { NextRequest } from "next/server";

import { ContributionFormFetchBody, Inputs } from "../../../utils/types";

function encode(inputs: ContributionFormFetchBody) {
  return Object.keys(inputs)
    .map(
      (key) =>
        encodeURIComponent(key) +
        "=" +
        encodeURIComponent(inputs[key as keyof Inputs])
    )
    .join("&");
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const res = await fetch("https://www.cartographie-des-rocamberlus.com/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contribution", ...data }),
    });
    return new Response(`${res.status}`);
  } catch (error) {
    throw error;
  }
}
