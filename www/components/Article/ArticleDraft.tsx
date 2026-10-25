import Link from "@/components/Link/Link";

export default function ArticleDraft() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "24rem",
      }}
    >
      <p
        style={{
          fontWeight: 100,
          fontSize: "0.875rem",
          lineHeight: "1.25rem",
        }}
      >
        L&rsquo;article est en cours de rédaction...
      </p>
      <Link
        style={{
          fontWeight: 100,
          fontSize: "0.875rem",
          lineHeight: "1.25rem",
          color: "rgb(31 41 55 / 1)",
          textDecorationLine: "underline",
          padding: "2rem 0",
        }}
        href={"/map"}
      >
        retour à la carte
      </Link>
    </div>
  );
}
