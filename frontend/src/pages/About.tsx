export default function About() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>About</h1>
      <p style={{ maxWidth: "800px", margin: "0 auto", lineHeight: "1.6" }}>
        This project is made for learning purpose and is a simple full-stack application that allows users to manage their game collection.
      </p>

      <p style={{ maxWidth: "800px", margin: "20px auto", lineHeight: "1.6" }}>
        The application is built with React, TypeScript and NestJS, using Prisma
        for database management. The goal is to provide a clean,
        modern interface that is easy to extend.
      </p>

      <p style={{ fontStyle: "italic", color: "var(--accent)" }}>
        Created by George Fâțan
      </p>
    </div>
  );
}
