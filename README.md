# Campus Study Place Review App

A medium-fidelity mobile prototype for reviewing and discovering study places on campus.

## Features

### Core Features (Required)
- ✅ Browse Study Place Listings with categories and filters
- ✅ Study Place Details with photos, descriptions, amenities, and reviews
- ✅ Favorites & Visited Places tracking
- ✅ Search & Filter functionality with dropdowns and toggles
- ✅ Reviews & Ratings with interactive star widget

### Optional Features (Recommended)
- ✅ Notifications settings (toggle switches)
- ✅ Add New Place form
- ✅ Recommendations section on home page

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** (mobile-first design)
- **React Context** (state management)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
/app
  /place/[id]        - Study place details page
  /place/[id]/review - Write review page
  /favorites          - Favorites list
  /visited           - Visited places list
  /search            - Search and filter page
  /profile           - User profile and settings
  /add-place         - Add new study place form
/components          - Reusable components (Navigation)
/context             - React Context for state management
/data                - Mock data for study places
/types               - TypeScript type definitions
```

## User Flows Implemented

- ✅ Home → Details
- ✅ Home → Search → Results → Details
- ✅ Home → Filters → Results
- ✅ Home → Favorites / Visited
- ✅ Details → Write Review
- ✅ Profile → Notification Settings
- ✅ Profile → Add New Place form

## Design Notes

- Mobile-first responsive design
- Human-centered labels (e.g., "Quiet Level" instead of "Audio dB Metric")
- Clear visual hierarchy with cards, headers, and consistent spacing
- All required interactions are functional (dropdowns, toggles, buttons)

