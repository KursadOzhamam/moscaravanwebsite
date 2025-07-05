# Mös Karavan Website

This is a modern, responsive website for Mös Karavan, built with Next.js 14 and Tailwind CSS.

## Features

- Responsive design that works on all devices
- Modern UI with smooth animations
- Interactive components
- Contact form with validation
- Image gallery with lightbox
- Testimonials slider
- SEO optimized

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React Hooks
- Responsive Design

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd mos-karavan
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
project-root/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   └── sections/
│   │       ├── Hero.tsx
│   │       ├── About.tsx
│   │       ├── Services.tsx
│   │       ├── Gallery.tsx
│   │       ├── Testimonials.tsx
│   │       └── ContactForm.tsx
│   └── styles/
│       └── globals.css
├── public/
│   └── images/
├── tailwind.config.ts
└── package.json
```

## Development

- The project uses TypeScript for type safety
- Tailwind CSS for styling
- Components are organized by feature and common elements
- All images should be placed in the `public/images` directory

## Building for Production

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
