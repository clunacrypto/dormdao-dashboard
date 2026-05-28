# DormDAO Dashboard

## Project
Live portfolio analytics platform for DormDAO's 17 university crypto investment clubs.
Live URL: https://dormdao-dashboard.vercel.app
GitHub: https://github.com/clunacrypto/dormdao-dashboard

## Stack
- Next.js 16 (App Router, React Server Components)
- TypeScript + Tailwind CSS + Recharts
- Supabase (Postgres + Storage)
- Google Sheets CSV for portfolio data
- CoinGecko API for live prices
- Vercel deployment

## Project structure
- app/ — Next.js pages and API routes
- app/api/ — all API routes (sheets, prices, notes, snapshot, documents)
- components/ — shared React components
- lib/ — utility functions (sheets parser, supabase client, price fetcher)
- public/ — static assets including school logos

## Data flow
1. Portfolio data: Google Sheets CSV → /api/sheets → parsed server-side → cached 5min
2. Token prices: CoinGecko API → /api/prices → cached 60s in-memory
3. Research notes: Supabase postgres → /api/notes
4. Daily snapshots: cron-job.org → POST /api/snapshot → portfolio_snapshots table
5. Fund documents: Supabase Storage (token-documents bucket) → /api/documents

## Supabase tables
- research_notes (id, author_name, school, token_ticker, sentiment, content, upvotes, thesis_type, price_target, time_horizon)
- note_votes (id, note_id, user_id)
- portfolio_snapshots (id, captured_at, school_name, nav_usd, eth_return_pct, usd_return_pct, deployed_pct, holdings)
- portfolio_changes (id, detected_at, school_name, change_type, token_ticker, token_name, old_quantity, new_quantity, eth_value)
- token_documents (id, token_ticker, title, school, document_date, file_url, document_type, created_at)

## Environment variables
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
GOOGLE_SHEETS_CSV_URL
CRON_SECRET

## Known issues to fix
1. ETH rows on school detail pages show "—" for Chain, Tokens, Cost
2. Avg Position Age showing 453 days (should be ~180 days)
3. Top & Bottom 3 chart negative labels overlap bars on mobile
4. Light mode text visibility issues in some areas

## Coding conventions
- Use TypeScript strictly, no `any` types
- Tailwind for all styling, no inline styles
- Server components by default, client components only when needed (charts, interactivity)
- API routes use Next.js route handlers (app/api/route.ts pattern)
- Always handle loading and error states in UI components