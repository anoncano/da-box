# Da Box

This project is a Next.js web application with Firebase integration. It provides an admin interface for controlling ESP32 devices and includes a small Express API deployed with Firebase Functions.

## Getting Started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Backend Functions

The `function` directory contains an Express app used as a Firebase Function. Build it with:

```bash
cd function
npm install
npm run build
```

## License

This project is released under the MIT License. See [LICENSE](LICENSE) for details.
