import Head from "next/head";

export default function HomePage() {
  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <Head>
        <title>Curso Dev - Home</title>
      </Head>

      <main>
        <h1
          style={{
            fontSize: "2rem",
            marginBottom: "1rem",
          }}
        >
          Bem-vindo ao Curso Dev! 🚀
        </h1>

        <div
          style={{
            background: "#f4f4f4",
            padding: "1rem",
            borderRadius: "8px",
            marginTop: "1rem",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              marginBottom: "0.5rem",
            }}
          >
            Links Úteis:
          </h2>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
            }}
          >
            <li
              style={{
                marginBottom: "0.5rem",
              }}
            >
              <a
                href="/api/v1/status"
                style={{
                  color: "#0070f3",
                  textDecoration: "none",
                }}
              >
                → Status da API (/api/v1/status)
              </a>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
