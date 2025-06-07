# Next.js + Firebase Starter

This project uses [Next.js](https://nextjs.org) with [Tailwind CSS](https://tailwindcss.com) and is configured for Firebase Hosting and Functions.

## Getting Started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open <http://localhost:3000> to view the app. Edit files under `src/app` and the page will update automatically.

## Firebase

Firestore security rules live in `firestore.rules`. Deploy them with:

```bash
firebase deploy --only firestore
```

A sample Cloud Function is located in `functions/src/index.ts`. Build and deploy functions with:

```bash
cd functions
npm run deploy
```

To deploy the Next.js site to Firebase Hosting run:

```bash
npm run build
firebase deploy --only hosting
```

GitHub Actions are configured to build and deploy automatically on merges to `main`.
