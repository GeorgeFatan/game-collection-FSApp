import "../style/AboutPage.css";

export default function About() {
  return (
    <div className="header">
      <h1>About</h1>
      <p className="paragraf-text-first">
        This project is made for learning purpose and is a simple full-stack
        application that allows users to manage their game collection.
      </p>

      <p className="paragraf-text-second">
        The application is built with React, TypeScript and NestJS, using Prisma
        Schemas for database management. The goal is to provide a clean, modern
        interface that is easy to extend.
      </p>

      <p className="paragraf-credits">
        Created by George Fâțan
      </p>
    </div>
  );
}
