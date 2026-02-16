# Lendsqr Frontend Test

A Next.js 16 dashboard application for managing users, built as part of the Lendsqr frontend engineering test.

## Overview

This project is a user management dashboard that allows administrators to:
- View a list of users with pagination and filtering
- Search users by organization, username, email, or phone number
- View detailed user information
- Filter users by status, organization, or date range
- Manage user actions (blacklist, activate)

## Tech Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: TypeScript
- **Styling**: SCSS Modules
- **Testing**: Jest + React Testing Library
- **Package Manager**: pnpm

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Main dashboard page
│   │   ├── page.tsx      # Dashboard with user table
│   │   └── users/[id]/   # User details page
│   ├── login/            # Login page
│   └── globals.scss      # Global styles
├── components/           # React components
│   ├── Sidebar.tsx       # Navigation sidebar
│   ├── DashboardHeader.tsx # Top header with search
│   ├── Dropdown.tsx      # Reusable dropdown
│   ├── FilterForm.tsx    # User filter form
│   ├── UserStatus.tsx   # Random user status display
│   ├── UserMenu.tsx     # Action menu for table rows
│   └── Skeleton.tsx     # Loading skeletons
├── hooks/               # Custom React hooks
│   ├── useFetchUsers.ts       # Fetch paginated user list
│   └── useFetchUserDetails.ts # Fetch single user details
├── lib/                 # Utility functions
│   └── dashboard.ts     # Dashboard helpers
├── data/                # Static data & mocks
│   ├── sidebarLinks.json    # Sidebar navigation links
│   ├── usersSummary.json   # Dashboard stats
│   ├── usersTableHead.json # Table column headers
│   └── accountStatus.json  # User status options
├── styles/             # SCSS modules & global styles
│   ├── dashboard.module.scss
│   ├── sidebar.module.scss
│   ├── login.module.scss
│   └── global.scss     # Global variables & mixins
└── assets/             # Static assets
    └── fonts/          # Custom fonts (Avenir)
```

## Pages

### 1. Login Page (`/login`)
- Simple login form with email/password fields
- Uses Avenir font for branding
- Validates credentials (demo: any email + "lendsqr" password)

### 2. Dashboard (`/dashboard`)
- Displays user statistics cards (Users, Active, Loans, Savings)
- Searchable and filterable user table
- Pagination with configurable results per page
- Action menu for each user row (View Details, Blacklist, Activate)
- Responsive design for mobile, tablet, and desktop

### 3. User Details (`/dashboard/users/[id]`)
- Full user profile information
- Personal details, education & employment, socials, guarantor info
- Tab navigation (General Details, Documents, Bank Details, Loans, Savings)
- LocalStorage caching for offline access
- Back navigation to dashboard

## Key Features Implemented

### Responsive Sidebar
- Fixed position on mobile (< 1080px)
- Sticky on desktop
- Z-index handling to stay above other elements
- Reduced width (240px) to maximize dashboard space

### Search & Filtering
- Real-time search across multiple fields
- Filter by Organization, Status, or Date Range
- Filter dropdown with dynamic options
- Debounced search for performance

### User Table
- Sticky action column for consistent UX
- Horizontally scrollable on mobile
- Custom dropdown menus for actions
- Pagination with page size selector (10, 25, 50, 100)

### User Details Page
- Tab-based navigation
- LocalStorage caching - stores user data after first fetch
- Falls back to cached data if API fails
- Shows "Showing cached data" indicator

### Styling
- Work Sans font (loaded via Google Fonts)
- Custom Avenir fonts for specific elements
- SCSS modules for scoped styling
- Responsive breakpoints: 480px, 600px, 768px, 1024px, 1200px

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm test         # Run Jest tests
pnpm test:watch  # Run tests in watch mode
```

## Testing

The project uses Jest + React Testing Library for unit tests.

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch
```

### Writing Tests

Create test files in `src/components/__tests__/`:

```tsx
import { render, screen } from '@testing-library/react'
import YourComponent from '@/path/to/Component'

describe('YourComponent', () => {
  it('renders correctly', () => {
    render(<YourComponent />)
    expect(screen.getByTestId('element')).toBeInTheDocument()
  })
})
```

## Design Decisions

### Why SCSS Modules?
- Scoped styles prevent class name collisions
- Easy to maintain and refactor
- Good separation of concerns

### Why LocalStorage for User Details?
- Improves perceived performance on repeat visits
- Provides offline fallback if API is down
- Reduces API calls for previously viewed users

### Responsive Breakpoints
- **Mobile**: < 480px
- **Tablet**: 480px - 768px  
- **Desktop**: 768px - 1024px
- **Large Desktop**: > 1024px

### Z-Index Management
- Sidebar: 10000 (mobile/tablet)
- Header: 10
- Action cells: 10
- User menu: 10000
- Modal overlays: higher values as needed

## API Integration

The app uses mock data and hooks that simulate API calls. To integrate with a real API:

1. Update `useFetchUsers.ts` to make actual HTTP requests
2. Update `useFetchUserDetails.ts` similarly
3. Handle authentication tokens as needed

## Known Limitations

- Mock data is used instead of real API
- No authentication persistence (token storage not implemented)
- Some Sass deprecation warnings about `@import` (cosmetic)

## License

This project is for demonstration purposes as part of the Lendsqr frontend test.
