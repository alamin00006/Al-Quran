# Quran Backend - Express + Mongoose + TypeScript

A modular REST API serving Quran surahs and ayahs with translation search.

## Folder Structure

```txt
.
├── .vscode/
├── data/
├── dist/
├── node_modules/
├── public/
├── src/
│   ├── app/
│   │   ├── aggregations/
│   │   ├── modules/
│   │   │   ├── ayah/
│   │   │   ├── search/
│   │   │   └── surah/
│   │   └── routes/
│   ├── config/
│   ├── enums/
│   ├── errors/
│   ├── helpers/
│   ├── interface/
│   ├── mail/
│   ├── middleware/
│   ├── scripts/
│   ├── shared/
│   ├── SMS/
│   ├── swagger/
│   ├── app.ts
│   └── server.ts
├── package.json
└── tsconfig.json
```

## Setup

```bash
cp .env.example .env
npm install
npm run seed
npm run dev
```

The API starts on `http://localhost:5000` by default.

## Scripts

```bash
npm run dev        # Start TypeScript dev server with watch mode
npm run build      # Compile TypeScript to dist/
npm start          # Run compiled dist/server.js
npm run seed       # Seed MongoDB from ./data/
npm run typecheck  # Type-check without emitting files
```

Seed data is bundled in `./data/`:

- `data/surahs.json` - 114 surah meta entries
- `data/quran.json` - full Quran with Arabic, English, and Bangla translations

## REST API

| Method | Endpoint                         | Description                 |
| ------ | -------------------------------- | --------------------------- |
| GET    | `/api/v1/surahs`                 | List all 114 surahs         |
| GET    | `/api/v1/surahs/:id`             | Get one surah with ayahs    |
| GET    | `/api/v1/surahs/:id/ayahs`       | Get ayahs of a surah        |
| GET    | `/api/v1/ayahs/:surahId/:ayahId` | Get single ayah             |
| GET    | `/api/v1/search?q=mercy&lang=en` | Search ayahs by translation |
| GET    | `/health`                        | Health check                |

`lang` accepts `en` or `bn`; default is `en`.
