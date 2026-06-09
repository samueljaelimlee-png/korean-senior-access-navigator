# 🇰🇷 Korean Senior Access Navigator
### 한국어 시니어 복지 혜택 안내 시스템

> A bilingual AI-powered tool helping Korean-speaking immigrant seniors navigate government benefits in New Jersey and New York.

[![Live App](https://img.shields.io/badge/Live%20App-Visit%20Now-brightgreen)](https://korean-senior-access-navigator.base44.app)
[![Language](https://img.shields.io/badge/Language-Korean%20%7C%20English-blue)]()
[![Audience](https://img.shields.io/badge/Audience-Immigrant%20Seniors-orange)]()
[![Built With](https://img.shields.io/badge/Built%20With-Base44%20%7C%20React%20%7C%20AI-purple)]()

---

## 🧭 The Problem

Korean-speaking immigrant seniors in the tri-state area face a critical gap: **the same person living on different sides of the Hudson River receives different government benefits** — yet no accessible, bilingual resource exists to help them understand what they qualify for, or why.

Language barriers, digital literacy challenges, and the complexity of overlapping NJ/NY benefit systems leave thousands of seniors unable to access services they are legally entitled to.

---

## 💡 What This App Does

The **Korean Senior Access Navigator** is a bilingual (Korean/English) AI assistant that:

- 🔍 **Identifies eligible benefits** based on the user's location (NJ or NY), age, and income
- 🌐 **Communicates in Korean** — full Korean-language interface and responses
- 📋 **Explains NJ vs. NY policy differences** — including ANCHOR (NJ), STAR (NY), Medicaid, SNAP, and senior transit programs
- 📄 **Generates bilingual flyers** for community distribution
- 🏛️ **Guides users through application steps** with plain-language instructions
- 👥 **Supports community workshop use** — designed for group settings at senior centers and churches

---

## 🌍 Real-World Impact

| Metric | Status |
|--------|--------|
| 🎯 Target Users | 200+ Korean-speaking immigrant seniors |
| 📡 Distribution Channel | Rep. Ellen J. Park's Korean-American community network (700+ members) |
| 🏅 Recognition | New York Consulate General — Next Generation Leadership Award |
| 📍 Coverage Area | Bergen County NJ · Hudson County NJ · New York City NY |
| 🗓️ Workshops Held | Community sessions at Korean senior centers |

---

## 🔑 Key Discovery: The NJ/NY Benefits Gap

During development, a critical policy boundary was identified:

> **A Korean-speaking senior living in Fort Lee, NJ receives different government benefits than the same person living in Manhattan, NY — even if they are separated by just one mile across the Hudson River.**

This finding drove the app's core feature: **location-aware benefit comparison** that helps seniors and their families understand exactly what changes when they cross state lines.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite + Tailwind CSS |
| UI Components | shadcn/ui |
| AI Engine | Base44 AI (GPT-based bilingual responses) |
| Deployment | Base44 Platform |
| Version Control | GitHub |

---

## 📁 Project Structure

```
korean-senior-access-navigator/
├── src/
│   ├── components/       # UI components
│   ├── pages/            # App pages (Home, Benefits, About)
│   └── api/              # Base44 API integration
├── base44/               # Base44 platform config
├── public/               # Static assets
├── index.html
├── vite.config.js
└── README.md
```

---

## 🚀 Running Locally

### Prerequisites
- Node.js v18+
- npm

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/samueljaelimlee-png/korean-senior-access-navigator.git

# 2. Navigate to project directory
cd korean-senior-access-navigator

# 3. Install dependencies
npm install

# 4. Create environment file
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file:

```env
VITE_BASE44_APP_ID=your_app_id
VITE_BASE44_APP_BASE_URL=https://korean-senior-access-navigator.base44.app
```

### Run

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 📋 Benefits Covered

### New Jersey
- **ANCHOR Program** — Property tax relief for homeowners & renters
- **NJ Medicaid / NJ FamilyCare** — Health coverage
- **SNAP** — Food assistance
- **Senior Gold** — Prescription drug discounts
- **NJ Transit Senior Pass** — Reduced fare transit

### New York
- **STAR Program** — School tax relief
- **NY Medicaid** — Health coverage
- **SNAP** — Food assistance
- **EPIC** — Elderly Pharmaceutical Insurance Coverage
- **NYC Senior MetroCard** — Free/reduced transit

---

## 🤝 Community Partners

- **Rep. Ellen J. Park** — NJ State Assembly, 37th District (First Korean-American woman in NJ Legislature) — community distribution network
- **New York Korean Consulate General** — Next Generation Leadership recognition
- **Korean-American Association of New Jersey (KAANJ)** — Next Generation Board
- Local Korean senior centers across Bergen County, NJ

---

## 👤 Developer

**Samuel Jae-rim Lee**
- 11th Grade, Academies at Englewood / Dwight Morrow High School
- Englewood, New Jersey
- GitHub: [@samueljaelimlee-png](https://github.com/samueljaelimlee-png)

*Built as part of the 2026 Congressional App Challenge submission.*

---

## 📜 License

This project is open source. Feel free to adapt it for other immigrant communities and languages.

---

## 🙏 Acknowledgments

This app was built in response to witnessing Korean-speaking grandparents and neighbors struggle to access benefits they deserve. Every senior who finds one more benefit they qualify for makes this worth it.

> *"The translator is never neutral."*
