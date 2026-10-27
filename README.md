# Liquid Measure Lab 🧪💧
## Interactive Mathematics Learning Innovation for Year 5 Primary School Pupils

**Liquid Measure Lab** is an interactive, responsive educational website designed for Year 5 primary school pupils in Malaysia. Created as a Mathematics PB educational innovation, its primary mission is to help pupils master converting liquid volume units between litres (**L**) and millilitres (**mL**), particularly when dealing with fractions and decimals.

---

### 📚 Curriculum Standard Alignment
- **DSKP Standard Pembelajaran 5.3.1:**
  > *"Convert units of liquid volume involving millilitres and litres in fractions and decimals."*
- **Language:** 100% English medium across all lessons, navigation, games, and feedback.
- **Focus:** Strictly unit conversions in fractions and decimals. (Arithmetic operations like addition/subtraction are intentionally excluded as they belong to separate standards).

---

### 🚀 Quick Start Guide (Local Setup)

#### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn / pnpm / bun

#### Installation & Execution Steps
1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start Development Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

3. **Build for Production:**
   ```bash
   npm run build
   ```

---

### 📹 How to Change the WATCH Section YouTube Video

There are **two ways** to update the video in the WATCH section:

#### Method 1: Using the In-App Text Input Box (No code editing required!)
1. Open the **WATCH** tab on the website.
2. Paste any YouTube video URL into the **"Paste YouTube Video Link"** box (e.g. `https://www.youtube.com/watch?v=P1c0B9_aOlo` or `https://youtu.be/...`).
3. Click **"Load Video"**. The embedded video player updates instantly!

#### Method 2: Editing the Configuration File
Open `src/config/videoConfig.ts`:
```typescript
export const YOUTUBE_VIDEO_CONFIG = {
  YOUTUBE_VIDEO_ID: "P1c0B9_aOlo", // Change video ID here
  YOUTUBE_VIDEO_URL: "https://www.youtube.com/watch?v=P1c0B9_aOlo",
  TITLE: "Watch and Learn: Converting Litres and Millilitres",
  DESCRIPTION: "Observe how litres (L) and millilitres (mL) relate..."
};
```

---

### 📁 Website Architecture & File Structure

```text
app/
├── src/
│   ├── components/
│   │   ├── Header.tsx        # Responsive navigation header
│   │   ├── Footer.tsx        # Footer with DSKP alignment notes & links
│   │   ├── Home.tsx          # Homepage with Lesson A Formula Card & Interactive Converter
│   │   ├── Mascot.tsx        # Animated Sploshy water droplet mascot
│   │   ├── Learn.tsx         # Textbook module (Lessons A to E & Try It practice)
│   │   ├── Watch.tsx         # Interactive YouTube video viewer & URL loader
│   │   ├── Explore.tsx       # Interactive jug & 10 containers (10–100 mL) with Calculation Panel
│   │   ├── Game.tsx          # 3 Game modes: Match, Fill Missing Value, Beat Misconception
│   │   └── Assessment.tsx    # Pre-test and Post-test quiz & evaluation breakdown
│   ├── config/
│   │   └── videoConfig.ts    # Single editable YouTube video configuration file
│   ├── App.tsx               # Main application layout and tab router
│   ├── index.css             # Tailwind v4 imports and custom water animations
│   └── main.tsx              # React entry point
├── package.json
├── vite.config.ts
└── README.md
```

---

### ✨ Key Features

1. **HOMEPAGE & Formula Card (Lesson A):**
   - **Formula 1 (Litres to Millilitres):** `L × 1,000 = mL` (e.g., `0.3 L = 0.3 × 1,000 = 300 mL`).
   - **Formula 2 (Millilitres to Litres):** `mL ÷ 1,000 = L` (e.g., `500 mL = 500 ÷ 1,000 = 0.5 L`).
   - Pupil-friendly explanations, visual direction arrows, highlighted `×` and `÷` operations, equipment illustrations (1 L jugs and bottles).
   - **"Try an Example" Interactive Converter Widget:** Allows pupils to input values, choose conversion direction (L→mL or mL→L), and view step-by-step calculations.

2. **LEARN (Textbook-Style Teaching Module):**
   - **Lesson A:** Understanding Litres & Millilitres (1 L = 1,000 mL) with visual capacity jugs (1 L, 500 mL, 250 mL).
   - **Lesson B:** Converting Litres to Millilitres using Decimals (Multiply by 1,000; worked examples 0.3 L = 300 mL, 1.25 L = 1,250 mL).
   - **Lesson C:** Converting Litres to Millilitres using Fractions (1/2 L = 500 mL, 3/4 L = 750 mL with visual fraction bars).
   - **Lesson D:** Converting Millilitres to Litres using Decimals (Divide by 1,000; worked example 2,750 mL = 2.75 L).
   - **Lesson E:** Converting Millilitres to Litres using Fractions (750 mL = 3/4 L, 250 mL = 1/4 L with fraction simplification steps).
   - "Show Steps" progressive reveal buttons & "Try It" mini-practice with detailed explanatory feedback.

3. **WATCH (YouTube Video Module):**
   - Dedicated text input box labelled "Paste YouTube Video Link" and "Load Video" button.
   - Parses standard formats (`watch?v=`, `youtu.be/`, `embed/`).
   - Responsive video player with observation guidelines for pupils.

4. **EXPLORE (Measuring Jug & 10 Containers Simulation):**
   - 10 distinct containers with capacities from **10 mL to 100 mL** (10, 20, 30, 40, 50, 60, 70, 80, 90, 100 mL).
   - Transparent 1.0 L measuring jug with scale ticks and liquid surface animation.
   - **Automatic Calculation Panel:**
     1. Sum of poured mL (e.g. `10 mL + 20 mL = 30 mL`).
     2. Conversion operation (`30 ÷ 1,000 = 0.03 L`).
     3. Final result (`30 mL = 0.03 L`).

5. **GAME (Interactive Mathematics Games):**
   - **Game A: Match the Measurement** (card pair matching for L and mL).
   - **Game B: Fill in the Missing Value** (conversion quizzes with step explanations).
   - **Game C: Beat the Misconception** (spot false conversions like 0.5 L = 50 mL vs 500 mL).
   - Scoring, streak counter, and confetti celebrations (`canvas-confetti`).

6. **ASSESSMENT (Pre/Post-Test Module):**
   - 5-question test covering L to mL, mL to L, decimals, fractions, and visual jug reading.
   - Pre-Test vs Post-Test comparison scorecard to measure learning growth.
   - Detailed answer breakdown with explanations for incorrect responses.

---

### ✅ Tested Interactions
- [x] TypeScript compilation (`tsc -b`) & Vite production bundling (`npm run build`).
- [x] Homepage Lesson A formula cards and interactive "Try an Example" converter widget.
- [x] WATCH section YouTube URL loading and video embedding.
- [x] EXPLORE simulation with 10 containers (10 mL–100 mL), filling, pouring, and calculation panel updates.
- [x] All 3 GAME modes and Assessment Pre/Post-Test scoring.
