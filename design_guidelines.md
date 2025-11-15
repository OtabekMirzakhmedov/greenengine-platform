# GREENENGINE Web Platform - Design Guidelines

## Design Approach

**Selected Approach:** Design System (Material Design + Academic Refinements)

**Justification:** This institutional education platform requires clarity, accessibility, and content density. Material Design provides robust patterns for information architecture, document management, and gallery displays while maintaining professional credibility for academic partnerships.

**Key Principles:**
- Information clarity over decoration
- Hierarchical content organization
- Scannable, structured layouts
- Trust and professionalism
- Document-centric interactions

---

## Typography

**Font Family:**
- Primary: **Inter** (headings, UI elements, navigation)
- Secondary: **Source Serif Pro** (body text, long-form content)

**Scale:**
- H1: 48px/56px (font-bold) - Page titles
- H2: 36px/44px (font-semibold) - Section headers
- H3: 28px/36px (font-semibold) - Subsection titles
- H4: 20px/28px (font-medium) - Card titles, event names
- Body: 16px/26px (font-normal) - Main content
- Small: 14px/20px (font-normal) - Metadata, captions
- Button/Nav: 15px/20px (font-medium) - Interactive elements

**Emphasis:** Use font-semibold for emphasis, font-normal for body, avoid italics except for quotes/citations.

---

## Layout System

**Spacing Primitives:** Use Tailwind units of **4, 6, 8, 12, 16, 20, 24**
- Component padding: p-6, p-8
- Section spacing: py-12, py-16, py-20
- Grid gaps: gap-6, gap-8
- Element margins: mb-4, mb-6, mb-8

**Grid Structure:**
- Max container: max-w-7xl mx-auto px-6 lg:px-8
- Content max-width: max-w-4xl (long-form text)
- Two-column splits: 2/3 - 1/3 ratio for content/sidebar
- Institution/Event grids: grid-cols-1 md:grid-cols-2 lg:grid-cols-3

**Responsive Breakpoints:**
- Mobile: base (< 768px) - single column, stacked navigation
- Tablet: md (768px+) - 2 columns where appropriate
- Desktop: lg (1024px+) - full layouts, 3 columns for cards

---

## Component Library

### Navigation
**Primary Navigation:**
- Horizontal navigation bar with dropdown mega-menus for multi-level structure
- Sticky header on scroll with elevation shadow
- Mobile: Hamburger menu with slide-in drawer
- Secondary breadcrumb navigation on internal pages

**Footer:**
- Three-column layout: Project info | Quick links | Partner logos
- Social media icons, newsletter signup, contact information
- Copyright and EU funding acknowledgment

### Hero Sections
**Home Page:**
- Full-width hero with background image (1920x800px) showing diverse international students/institutions
- Centered headline + subheadline + dual CTAs
- Height: 70vh on desktop, 50vh mobile
- Overlay: semi-transparent gradient for text readability

**Internal Pages:**
- Reduced hero (40vh) with page title and breadcrumb
- Can include institution-specific imagery for storytelling pages

### Cards & Content Blocks

**Institution Cards:**
- Image thumbnail (16:9 aspect ratio)
- Institution name (H4)
- Country flag icon + location
- Brief description (2 lines, truncated)
- "Read Story" CTA link
- Hover: subtle elevation increase

**Event Cards:**
- Date badge (absolute positioned, top-left)
- Event title (H4)
- Location + venue
- Photo count indicator
- "View Details" link

**Document Cards:**
- PDF icon or thumbnail preview
- Document title
- File size + format badge
- Download button (primary)
- View/preview option (secondary)

**Action Plan/Infographic Cards:**
- Visual preview thumbnail
- Title + brief description
- Download PDF button
- Optional: Related tags/categories

### Content Pages

**Standard Page Template:**
- Page title (H1)
- Last updated metadata
- Sidebar with: Related links, Downloads, Quick navigation
- Main content area with rich text formatting
- Related content section at bottom

**Institution Storytelling Pages:**
- Hero image specific to institution
- Institution name + logo
- Tabbed sections: Overview | Achievements | Media Gallery | Documents
- Photo gallery: Masonry grid with lightbox
- Video embeds: 16:9 responsive containers

**Event Detail Pages:**
- Event header: Title, date, location, attendee count
- Agenda section with downloadable PDF
- Photo gallery: Grid layout (3 columns desktop, 1 mobile)
- Document section: List of downloadable materials
- Participants/speakers section if applicable

### Forms & Inputs

**Admin CMS Forms:**
- Floating labels for text inputs
- WYSIWYG editor: Full-width with toolbar
- File upload: Drag-and-drop zone with progress indicator
- Select dropdowns: Material-style with clear indicators
- Radio/checkbox groups with proper spacing (gap-4)
- Submit buttons: Right-aligned, primary style

**Search:**
- Prominent search bar on content-heavy pages
- Auto-suggest dropdown with highlighted matches
- Filter chips for refinement (events by year, institutions by country)

### Gallery & Media

**Photo Galleries:**
- Grid layout with equal-height thumbnails
- Lightbox overlay on click with navigation arrows
- Caption display on hover/focus
- Download original option

**Video Players:**
- Embedded YouTube/Vimeo with custom play button overlay
- Fallback poster image
- Responsive 16:9 aspect ratio container

### Interactive Elements

**Buttons:**
- Primary: Solid fill, medium rounded corners (rounded-md), px-6 py-3
- Secondary: Outline style, same sizing
- Tertiary: Text link with arrow icon
- Icon buttons: Square (40x40px), rounded-full for circular
- Disabled state: reduced opacity (opacity-50)

**Downloads:**
- PDF downloads: Icon + filename + size
- Batch download option for multiple files
- Download counter/analytics indicator

**Accordions:**
- For FAQ sections and collapsible content
- Clean expansion animation
- Clear open/close indicators (chevron icons)

### Admin CMS Interface

**Dashboard:**
- Card-based metrics overview (users, pages, recent activity)
- Quick action buttons
- Recent edits list

**Content Management:**
- Data table with sortable columns
- Inline edit/delete actions
- Bulk selection for batch operations
- Status indicators (published, draft)
- Search and filter bar

**Editor Interface:**
- Split view: Form fields left, preview right (desktop)
- Save/publish/schedule buttons in sticky toolbar
- Validation messages inline with fields
- Auto-save indicator

---

## Animations

Use animations extremely sparingly:
- Navigation menu transitions: 200ms ease
- Card hover elevation: 150ms ease-out
- Modal/drawer open: 250ms ease-in-out
- NO scroll-triggered animations
- NO parallax effects
- NO loading spinners except for file uploads

---

## Images

**Required Images:**

1. **Home Hero** (1920x800px): Diverse international students collaborating, green/sustainable theme, bright and optimistic
2. **Institution Pages** (1920x600px each): Campus or representative image for each of the 11 partner institutions
3. **Event Photos**: Multiple photos per event (landscape orientation, 1200x800px minimum)
4. **Partner Logos**: High-res transparent PNGs for all institutional partners
5. **Infographic Thumbnails**: Preview images for each report (600x800px portrait)

**Image Treatment:**
- All images optimized for web (WebP format with JPEG fallback)
- Lazy loading for galleries
- Subtle vignette on hero images for text contrast
- No filters/effects on institution/event photos (authentic representation)

---

## Accessibility

- WCAG 2.1 AA compliance minimum
- Keyboard navigation for all interactive elements
- Focus indicators: 2px outline offset by 2px
- Alt text for all images (descriptive for content images, empty for decorative)
- Proper heading hierarchy (no skipped levels)
- Form labels always visible (no placeholder-only inputs)
- Minimum 4.5:1 contrast ratio for all text