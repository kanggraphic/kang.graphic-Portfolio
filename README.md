# Newspaper-Style Portfolio Website

A newspaper-inspired portfolio website built with Next.js 14, TypeScript, and Tailwind CSS.

## Design Philosophy

This portfolio website is designed to mimic the visual density and typographic hierarchy of traditional newspaper layouts. The design focuses on:

- **High information density** with tight spacing and compact layouts
- **Strong typographic hierarchy** using Gothic (sans-serif) for headlines and Serif for body text
- **Minimal color palette** with off-white background (#F5F5F0) and near-black text (#0A0A0A)
- **Thin dividing lines** to separate content areas
- **2-3 column layouts** for optimal readability and newspaper-like appearance

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion (minimal usage)

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles
│   ├── archive/
│   │   └── page.tsx        # Project archive grid
│   ├── about/
│   │   └── page.tsx        # About page (2-3 columns)
│   └── article/
│       └── page.tsx        # Article list (magazine TOC style)
├── components/
│   ├── NewspaperHeader.tsx # Site header with navigation
│   ├── MainContent.tsx     # Home page main content
│   └── FadeIn.tsx          # Minimal fade-in animation
└── tailwind.config.ts      # Tailwind configuration
```

## Design System

### Typography

- **Headlines**: Gothic (sans-serif), bold, large sizes
- **Body Text**: Serif font, tight letter-spacing (-0.02em)
- **Captions**: Gothic, small size, gray color

### Layout

- **2-column main structure**: Left meta area (300px) + Right main content
- **Responsive**: Stacks to single column on mobile
- **Grid-based**: Uses CSS Grid for flexible layouts

### Colors

- `newspaper-bg`: #F5F5F0 (off-white background)
- `newspaper-text`: #0A0A0A (near-black text)
- `newspaper-divider`: #D4D4D4 (light gray dividers)
- `newspaper-gray`: #666666 (caption text)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Pages

- **Home** (`/`): Main landing page with featured content
- **Archive** (`/archive`): Grid of all projects
- **About** (`/about`): Profile and career information in newspaper columns
- **Article** (`/article`): Magazine-style table of contents for articles

## Design Credits

Inspired by traditional newspaper layouts with a focus on information density and typographic hierarchy.
