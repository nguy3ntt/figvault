# figVault

figVault is a LEGO minifigure collection and value-tracking app. The app helps collectors manually store their minifigures, track estimated market value, and eventually identify minifigures from uploaded images or videos.

The first version focuses on a practical and maintainable MVP: a polished frontend, manual minifigure input, collection management, mock value tracking, and a clean structure that can later connect to a backend, Rebrickable catalog data, BrickLink pricing data, and image-assisted recognition.

## Core Goal

Build a collector-focused app for managing LEGO minifigures.

Users should be able to:

* Add minifigures manually.
* Upload a photo for assisted identification.
* Store minifigures in a personal collection.
* Track quantity, condition, estimated value, and total collection value.
* View dashboard analytics such as total value, top figures, and recent value movement.
* Later connect real catalog and market-pricing APIs.

## Current Scope

This project focuses only on LEGO minifigures, not loose bricks, full sets, or general LEGO parts.

The MVP will not attempt perfect automatic recognition. Image recognition will be treated as an assistive feature:

> The app suggests likely minifigure matches, and the user confirms the correct one.

## Planned Features

### MVP Features

* Minifigure dashboard
* Manual minifigure input
* Collection grid/list
* Image upload interface
* Mock recognition result
* Estimated value display
* Condition tracking
* Quantity tracking
* Value summary cards
* Basic price history visualization

### Later Features

* User authentication
* Backend API using FastAPI
* PostgreSQL database
* Rebrickable catalog integration
* BrickLink price guide integration
* Price snapshot history
* Image-assisted minifigure recognition
* Video frame-based recognition
* Wishlist and price alerts
* CSV import/export
* Public collection showcase

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* CSS modules or plain CSS first
* Recharts or custom chart components later

### Backend Later

* FastAPI
* PostgreSQL
* SQLAlchemy
* Supabase or local PostgreSQL
* Background jobs for price refresh

### Data Sources Later

* Rebrickable for minifigure catalog data
* BrickLink for market price guide data
* Manual price override as fallback

### Vision Later

* OpenCLIP for image similarity search
* FAISS or pgvector for vector search
* OpenCV for video frame extraction

## Development Plan

### Phase 1: Frontend MVP

* Build main UI layout.
* Create dashboard page.
* Create collection cards.
* Create manual input form.
* Create image upload section.
* Use mock minifigure data.

### Phase 2: Backend MVP

* Create FastAPI backend.
* Create database models.
* Add CRUD endpoints for minifigures.
* Connect frontend to backend.

### Phase 3: Pricing

* Add price snapshot table.
* Add manual price tracking.
* Add cached market price retrieval.
* Show value history.

### Phase 4: Recognition

* Add image upload endpoint.
* Generate image embeddings.
* Compare uploaded image against known minifigure images.
* Return top candidate matches.
* Allow user confirmation.

## Local Setup

Install dependencies:

```bash
npm install
```

Run the frontend:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

## Project Status

Early frontend MVP in progress.
