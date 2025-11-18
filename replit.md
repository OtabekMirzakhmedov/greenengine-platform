# GREENENGINE Web Platform

## Overview

The GREENENGINE Web Platform is an international educational initiative that promotes intercultural competence and sustainable development across Central Asia, Georgia, and Europe. The platform serves as a comprehensive portal featuring:

- Public website with project information and storytelling pages for partner institutions
- Intercultural Passport module with MOOC integration and digital storytelling
- Action Plans, Events, Infographics, and Community Development sections
- Content Management System (CMS) for administrators
- RESTful API backend with JWT-based authentication

The application is designed following Material Design principles with academic refinements, emphasizing clarity, accessibility, and content density for an institutional education context.

## User Preferences

Preferred communication style: Simple, everyday language.

## Admin Panel

The platform includes a comprehensive Content Management System (CMS) for administrators:

**Login Credentials:**
- Email: `admin@greenengine.org`
- Password: `admin123`

**Admin Dashboard Features:**
- Modern, user-friendly interface with gradient background
- Sticky header with backdrop blur effect
- User badge showing logged-in admin email
- 7 content management sections with colorful icons:
  - Pages (Blue) - Manage About and Passport pages
  - Institutions (Green) - Institution stories and profiles
  - Events (Purple) - Project meetings and workshops
  - Action Plans (Orange) - Strategic implementation plans
  - Infographics (Pink) - Visual reports and data
  - Community Plans (Teal) - Community development initiatives
  - Partners (Indigo) - Partner institutions information

**Admin Pages Structure:**
- All pages follow consistent design pattern
- Header with back button and add button
- Responsive grid layout (1/2/3 columns)
- Card-based item display with edit/delete actions
- Loading states with skeletons
- Empty states with helpful messages
- Delete confirmation dialogs for safety

**Protected Routes:**
- All `/admin/*` routes require authentication
- Automatic redirect to login if not authenticated
- Session persisted via JWT in HTTP-only cookies

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18 with TypeScript
- Vite as the build tool and development server
- Wouter for client-side routing (lightweight React Router alternative)
- TanStack Query (React Query) for server state management
- Tailwind CSS for styling with custom design system

**UI Component Library:**
- Radix UI primitives for accessible, unstyled components
- shadcn/ui design system (New York style variant)
- Custom component configuration with path aliases (`@/components`, `@/lib`, etc.)

**Design System:**
- Typography: Inter (UI/headings) and Source Serif Pro (body text)
- Color scheme: Primary green (#1FAF38), neutral grays, semantic color tokens
- Spacing: Tailwind units (4, 6, 8, 12, 16, 20, 24)
- Responsive breakpoints: mobile-first approach with md (768px) and lg breakpoints
- Custom CSS properties for theming (light/dark mode support)

**State Management:**
- React Query for server state (caching, synchronization)
- React Context for authentication state
- Local component state with React hooks

**Key Architectural Patterns:**
- Component composition with layout wrappers (PublicLayout, ProtectedRoute)
- Protected routes requiring authentication for admin pages
- Optimistic UI updates with React Query mutations
- Skeleton loading states for improved perceived performance

### Backend Architecture

**Technology Stack:**
- Node.js with Express.js framework
- TypeScript for type safety
- Drizzle ORM for database interactions
- JWT (jsonwebtoken) for stateless authentication
- bcrypt for password hashing

**API Structure:**
- RESTful endpoints under `/api` prefix
- Cookie-based JWT authentication
- Express middleware for request validation (express-validator)
- File upload handling with multer (disk storage)
- Request/response logging middleware

**Authentication & Authorization:**
- JWT tokens stored in HTTP-only cookies
- Token expiration: 7 days
- Role-based access control (admin role)
- Protected routes using `requireAuth` middleware
- Password requirements: minimum 6 characters, bcrypt hashing

**File Storage:**
- Local filesystem storage in `/uploads` directory
- Multer configuration: 10MB file size limit
- Unique filename generation using timestamps and random suffixes

**API Endpoints:**
- `/api/auth/login` - User authentication
- `/api/auth/me` - Current user session
- `/api/auth/logout` - Session termination
- `/api/institutions` - Institution CRUD operations
- `/api/events` - Event management
- `/api/action-plans` - Action plan resources
- `/api/infographics` - Infographic resources
- `/api/community-plans` - Community development plans
- `/api/partners` - Partner organization data (GET all, GET by ID, POST, PUT, DELETE)
- `/api/pages` - Dynamic page content management
- `/api/news` - News and updates management (GET all, POST, PUT, DELETE)

### Public Pages

**Partners Page:**
- Displays all 11 partner institutions grouped by country
- Comprehensive partner cards with: name, PIC code, description, address, phone, email, website
- Interactive contact links (phone, email) and website buttons
- Uses stock images as placeholder logos
- Countries represented: Uzbekistan (4), Georgia (4), Turkey (1), Greece (1), Italy (1)

**News Carousel (Home Page):**
- Hero carousel displaying latest news and updates
- Auto-play functionality with manual navigation
- Each news item shows: title, excerpt, published date, featured image
- Seamless integration with home page hero section

### Database Architecture

**Database System:**
- PostgreSQL (configured for Neon serverless)
- Connection pooling via @neondatabase/serverless
- WebSocket support for serverless connections

**ORM Layer:**
- Drizzle ORM for type-safe queries
- Schema-first approach with TypeScript definitions
- Migration management via drizzle-kit

**Schema Design:**

**Users Table:**
- UUID primary keys (gen_random_uuid)
- Email (unique), hashed password, role
- Created timestamp

**Institutions Table:**
- Core fields: name, slug (unique), country, description
- Rich content: story, achievements
- Media: logoUrl, heroImageUrl, gallery (JSONB array)
- Attachments: JSONB array with name/url/size
- Ordering support with integer order field

**Events Table:**
- Title, slug, date, location, venue
- Content sections: overview, agenda, outcomes, highlights
- Media: featuredImageUrl, gallery (JSONB), photoGallery (JSONB)
- Attachments support

**Pages Table:**
- Dynamic content management: title, slug, category
- Content field for rich text
- Published status flag
- Updated timestamp

**Action Plans, Infographics, Community Plans Tables:**
- Similar structure: title, slug, description
- File URL references for downloadable resources
- Optional image URLs for visual previews

**Partners Table:**
- Core fields: name, country, description
- Contact information: email, phone, address
- PIC identification code
- Logo URL, website URL
- Ordering support with integer order field

**News Table:**
- Core fields: title, excerpt, content
- Media: featuredImageUrl
- Published date tracking
- Created and updated timestamps

**Data Types:**
- Text fields for content
- JSONB for structured arrays (galleries, attachments)
- Timestamps with default now()
- Integer for ordering and flags

### Development & Deployment

**Build Process:**
- Vite for frontend bundling (ESM output)
- esbuild for backend compilation
- TypeScript compilation check via `tsc`
- Separate build outputs: `dist/public` (frontend), `dist` (backend)

**Development Environment:**
- Replit-specific tooling (cartographer, dev-banner, error overlay)
- Hot Module Replacement (HMR) via Vite
- Middleware mode for Vite integration with Express
- Custom logging with formatted timestamps

**Environment Variables:**
- `DATABASE_URL` - PostgreSQL connection string (required)
- `SESSION_SECRET` - JWT signing key (defaults to development key)
- `NODE_ENV` - Environment designation

**Database Management:**
- `npm run db:push` - Schema synchronization with database
- Seed script for creating admin user (admin@greenengine.org)

## External Dependencies

### Core Framework Dependencies
- **React 18**: UI library with hooks and concurrent features
- **Express.js**: Web server framework
- **TypeScript**: Type safety across frontend and backend
- **Vite**: Frontend build tool and dev server

### Database & ORM
- **PostgreSQL**: Primary relational database
- **@neondatabase/serverless**: Neon serverless Postgres client with WebSocket support
- **Drizzle ORM**: Type-safe database ORM with migrations
- **drizzle-zod**: Schema validation integration

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives (20+ component packages)
- **shadcn/ui**: Pre-built component system built on Radix
- **class-variance-authority**: Component variant management
- **tailwind-merge & clsx**: Conditional className utilities

### State Management & Data Fetching
- **TanStack Query (React Query)**: Server state management, caching, synchronization
- **wouter**: Lightweight React routing (alternative to React Router)

### Authentication & Security
- **jsonwebtoken**: JWT token generation and verification
- **bcrypt**: Password hashing (v6.0.0)
- **cookie-parser**: Cookie parsing middleware

### Form Handling
- **react-hook-form**: Form state management and validation
- **@hookform/resolvers**: Validation schema resolvers
- **zod**: Schema validation library

### File Upload
- **multer**: Multipart form data handling for file uploads

### Development Tools
- **@replit/vite-plugin-***: Replit-specific development enhancements (cartographer, dev-banner, runtime error overlay)
- **tsx**: TypeScript execution for development
- **express-validator**: Request validation middleware

### Date & Time
- **date-fns**: Date formatting and manipulation utilities

### Icons
- **lucide-react**: Icon library for UI components
- **react-icons**: Additional icon sets (social media icons)

### Additional UI Libraries
- **cmdk**: Command palette component
- **embla-carousel-react**: Carousel/slider functionality
- **recharts**: Charting library for data visualization
- **vaul**: Drawer component primitives
- **input-otp**: OTP input component
- **react-day-picker**: Date picker component

### Fonts
- **Google Fonts**: Inter (sans-serif) and Source Serif 4 (serif) font families

### Notes
- No external CMS platform; content managed via custom admin interface
- No external file storage service (S3, Cloudinary); uses local filesystem
- No external authentication providers; custom JWT implementation
- Designed for Replit deployment with potential for standard Node.js hosting