# Design.md

# Blog Design System

**Project Type:** Blog Website  
**Framework:** React + Tailwind CSS  
**Icon Library:** Lucide React  
**Design Style:** Minimalistic • Clean • Editorial • Reading Focused

---

# Purpose

This document defines the visual language, UI principles, and implementation rules for the project.

The AI Agent **must follow this design system** when generating pages, components, layouts, or UI.

---

# Design Philosophy

The content is the product.

Every design decision should improve readability and reduce distractions.

The interface should feel invisible, allowing users to focus entirely on reading.

### Core Principles

- Content First
- Simplicity
- Spacious Layouts
- Elegant Typography
- Clear Visual Hierarchy
- Accessibility
- Consistency
- Performance
- Responsive Design

---

# Design Personality

The website should feel:

- Minimal
- Calm
- Modern
- Elegant
- Editorial
- Professional
- Timeless
- Lightweight

Avoid designs that feel:

- Busy
- Over-decorated
- Playful
- Heavy
- Overly colorful
- Over-animated

---

# Technology

- React
- Tailwind CSS
- Lucide React

---

# Color Palette

## Primary Accent

International Orange

Used only for:

- Primary CTA
- Links
- Hover States
- Active Navigation
- Reading Progress Bar
- Selected Categories
- Focus Ring

```js
international-orange: {
  50: "#fff6ec",
  100:"#ffebd3",
  200:"#ffd2a5",
  300:"#ffb36d",
  400:"#ff8832",
  500:"#ff660a",
  600:"#ff4f00",
  700:"#cc3602",
  800:"#a12c0b",
  900:"#82260c",
  950:"#461004",
}
```

Preferred Usage

| Purpose | Shade |
|----------|-------|
| CTA | 500 |
| Hover | 600 |
| Active | 700 |
| Focus | 300 |
| Light Background | 50 |

---

## Neutral Colors

Used for typography, borders, and layout.

```js
black: {
  50:"#fafafa",
  100:"#f5f5f5",
  200:"#e6e6e6",
  300:"#d6d6d6",
  400:"#a5a5a5",
  500:"#767676",
  600:"#575757",
  700:"#434343",
  800:"#292929",
  900:"#1a1a1a",
  950:"#000000",
}
```

Preferred Usage

| Purpose | Shade |
|----------|-------|
| Main Heading | 950 |
| Body Text | 800 |
| Secondary Text | 600 |
| Caption | 500 |
| Border | 200 |
| Divider | 100 |

---

## Background

```js
white: {
    50:"#ffffff"
}
```

Use white as the primary background across the website.

Avoid colored page backgrounds.

---

# Typography

## Heading Font

Fraunces

Used for:

- Hero Title
- Blog Title
- Section Heading
- Featured Article
- Pull Quotes

Weight

- 600
- 700

---

## Body Font

Open Sans

Used for:

- Paragraphs
- Navigation
- Buttons
- Inputs
- Lists
- Metadata
- Footer
- Sidebar

Weight

- 400
- 500
- 600

---

# Typography Scale

| Element | Size | Weight |
|----------|------|--------|
| Hero | 64px | 700 |
| H1 | 48px | 700 |
| H2 | 36px | 700 |
| H3 | 30px | 600 |
| H4 | 24px | 600 |
| H5 | 20px | 600 |
| Body Large | 18px | 400 |
| Body | 16px | 400 |
| Small | 14px | 400 |
| Caption | 12px | 400 |

---

# Reading Experience

The reading experience takes priority over visual effects.

## Content Width

Recommended

```
max-w-3xl
```

Ideal reading width

- 65–75 characters per line

---

## Paragraph Style

- Font Size: 18px
- Line Height: 1.8
- Comfortable spacing between paragraphs
- Left aligned text
- Never justify text

---

## White Space

Whitespace is an essential design element.

Use generous spacing throughout the layout.

Recommended spacing

```
4
8
12
16
24
32
40
48
64
80
96
```

---

# Layout

Container

```
max-w-7xl
mx-auto
px-6
lg:px-8
```

Article Content

```
max-w-3xl
mx-auto
```

Section Padding

```
py-20
```

---

# Navigation

The navigation should be clean and unobtrusive.

Recommended items

- Logo
- Categories
- Search
- Theme Toggle (Optional)
- CTA (Optional)

Sticky navigation is recommended.

---

# Buttons

## Primary

Background

International Orange 500

Hover

International Orange 600

Text

White

Radius

```
rounded-lg
```

---

## Secondary

Transparent

Border

Black 200

Text

Black 900

---

## Ghost

Transparent

No border

Hover

Black 50

---

# Cards

Cards should feel editorial.

Include:

- Cover Image
- Category
- Reading Time
- Publish Date
- Title
- Short Description

Style

- White background
- Thin border
- Rounded corners
- Minimal shadow
- Smooth hover transition

Avoid heavy shadows.

---

# Images

Images should support the content.

Guidelines

- Large
- High quality
- Rounded corners
- Responsive
- Spacious margins

Never place text too close to images.

---

# Icons

Use Lucide React only.

Recommended size

- 18
- 20
- 24

Icons should inherit text color.

---

# Border Radius

| Component | Radius |
|------------|--------|
| Button | rounded-lg |
| Input | rounded-lg |
| Card | rounded-xl |
| Image | rounded-xl |
| Modal | rounded-2xl |
| Avatar | rounded-full |

---

# Shadows

Prefer

```
shadow-sm
shadow-md
```

Avoid

- Heavy shadows
- Colored shadows
- Glassmorphism

---

# Animations

Animations should feel subtle.

Duration

```
150ms
200ms
250ms
```

Use

- opacity
- translate
- slight scale
- smooth color transition

Avoid

- Bounce
- Spin
- Flash
- Excessive motion

---

# Blog Components

The AI Agent should prioritize these reusable components.

- Navbar
- Hero Section
- Featured Article
- Latest Articles
- Article Card
- Category List
- Search Bar
- Author Card
- Newsletter
- Related Articles
- Table of Contents
- Reading Progress Bar
- Pagination
- Footer

---

# Markdown Content Styling

Support proper styling for:

- Headings
- Paragraphs
- Lists
- Nested Lists
- Tables
- Images
- Links
- Blockquotes
- Inline Code
- Code Blocks
- Horizontal Rules

Code blocks should include:

- Rounded corners
- Horizontal scrolling
- Comfortable padding
- Monospace font

---

# Accessibility

Always follow WCAG AA standards.

Requirements

- Proper color contrast
- Keyboard navigation
- Semantic HTML
- Visible focus states
- Descriptive labels
- Alt text for images
- Minimum touch target of 44×44px

---

# Responsive Design

Design mobile-first.

Support

- Mobile
- Tablet
- Laptop
- Desktop

Layouts should gracefully adapt to every screen size.

---

# Tailwind CSS Guidelines

Use utility classes whenever possible.

Prefer Tailwind design tokens over arbitrary values.

Avoid unnecessary custom CSS.

Create reusable components.

Maintain consistent spacing throughout the project.

---

# AI Agent Rules

The AI Agent must:

- Follow this design system consistently.
- Prioritize readability over decoration.
- Keep layouts minimal and spacious.
- Use Fraunces only for headings.
- Use Open Sans for all other text.
- Use International Orange only for interactive elements and CTAs.
- Use Lucide React icons exclusively.
- Keep backgrounds white and uncluttered.
- Generate reusable React components.
- Write clean and maintainable Tailwind CSS.
- Ensure all layouts are responsive by default.
- Maintain consistent spacing, typography, and color usage.
- Do not introduce additional fonts, colors, icon libraries, or design styles unless explicitly requested.

---

# Design Keywords

Minimal

Editorial

Readable

Elegant

Content First

Whitespace

Clean

Modern

Accessible

Responsive

Scalable

Consistent

Timeless