# SignalOS Design System

A Ramp-inspired but original design system for a premium, high-trust SaaS / workflow-consulting brand. Built around clarity, speed, operational precision, and one distinctive signature color: **Electric Cobalt**.

---

## 1. Brand Direction

### Core Vibe

**Precise. Fast. Expensive-looking. Operational.**

This system is designed for a brand that helps teams compress manual work into cleaner workflows, lightweight software, dashboards, automations, and internal tools.

### Design Principles

- **Clarity over decoration**: every page should feel easy to scan.
- **High contrast**: strong black/white structure with one energetic accent.
- **Operational polish**: use metrics, diagrams, screenshots, and systems language.
- **Restrained drama**: use glow and accent color sparingly.
- **Finance-grade trust**: avoid gimmicky AI visuals, cartoon illustrations, and loud gradients.

---

## 2. Signature Color

### Electric Cobalt

Primary brand color: **Electric Cobalt**  
Hex: `#245BFF`

This replaces Ramp-style neon energy with a colder, more technical, premium electric blue.

```css
--brand-50:  #EEF4FF;
--brand-100: #D9E6FF;
--brand-200: #B7D0FF;
--brand-300: #85ADFF;
--brand-400: #4C7FFF;
--brand-500: #245BFF;
--brand-600: #123EF2;
--brand-700: #0E2FC2;
--brand-800: #102A92;
--brand-900: #132866;
--brand-950: #0A1438;
```

### Usage

Use Electric Cobalt for:

- Primary buttons
- Active states
- Hero accents
- Product callouts
- Workflow highlights
- Subtle glow behind key UI cards

Avoid using it for:

- Large full-page backgrounds
- Every icon
- Long body text
- Multiple competing gradients

---

## 3. Neutral Palette

Warm grays keep the system premium without feeling sterile.

```css
--gray-0:   #FFFFFF;
--gray-25:  #FAFAF8;
--gray-50:  #F5F5F2;
--gray-100: #EDEDE8;
--gray-200: #D8D8D0;
--gray-300: #B8B8AC;
--gray-400: #8C8C80;
--gray-500: #66665B;
--gray-600: #4A4A42;
--gray-700: #33332D;
--gray-800: #20201C;
--gray-900: #11110F;
--gray-950: #080807;
```

---

## 4. Semantic Colors

Use these only for product states, charts, alerts, and system feedback.

```css
--success: #17B26A;
--warning: #F79009;
--danger:  #F04438;
--info:    #245BFF;
--purple:  #7C3AED;
--mint:    #2DD4BF;
```

---

## 5. Light Mode Tokens

```css
--background: #FAFAF8;
--surface:    #FFFFFF;
--surface-2:  #F5F5F2;
--border:     #EDEDE8;
--text:       #11110F;
--muted:      #66665B;
--brand:      #245BFF;
```

---

## 6. Dark Mode Tokens

```css
--background: #080807;
--surface:    #11110F;
--surface-2:  #20201C;
--border:     #33332D;
--text:       #FAFAF8;
--muted:      #B8B8AC;
--brand:      #4C7FFF;
```

---

## 7. Typography

### Recommended Fonts

```css
--font-sans: "Inter", "Helvetica Neue", Arial, sans-serif;
--font-mono: "IBM Plex Mono", "SFMono-Regular", Consolas, monospace;
```

### Type Scale

```css
--text-xs:   12px;
--text-sm:   14px;
--text-md:   16px;
--text-lg:   18px;
--text-xl:   20px;
--text-2xl:  24px;
--text-3xl:  32px;
--text-4xl:  44px;
--text-5xl:  64px;
```

### Heading Styles

```css
h1 {
  font-size: 64px;
  line-height: 0.95;
  letter-spacing: -0.05em;
  font-weight: 650;
}

h2 {
  font-size: 44px;
  line-height: 1;
  letter-spacing: -0.04em;
  font-weight: 650;
}
```

### Typography Rules

- Use large, tight headlines.
- Keep body copy plain and direct.
- Use mono text for labels, metrics, system tags, and technical callouts.
- Avoid overly playful typefaces.
- Avoid long centered paragraphs.

---

## 8. Spacing

Use an 8px-based spacing system.

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 24px;
--space-6: 32px;
--space-7: 48px;
--space-8: 64px;
--space-9: 96px;
--space-10: 128px;
```

### Layout Guidance

- Use generous vertical spacing.
- Keep sections clean and focused.
- One major idea per section.
- Avoid cramped cards or dense walls of text.

---

## 9. Containers

```css
--container-sm: 720px;
--container-md: 960px;
--container-lg: 1120px;
--container-xl: 1280px;
```

Recommended use:

- Blog/article content: `720px`
- Standard marketing sections: `960px` to `1120px`
- Product hero visuals: `1280px`

---

## 10. Radius

```css
--radius-sm: 6px;
--radius-md: 10px;
--radius-lg: 16px;
--radius-xl: 24px;
--radius-full: 999px;
```

### Usage

```css
Cards: 16px;
Buttons: 10px;
Inputs: 10px;
Badges: 999px;
Modals: 24px;
```

The overall feel should be modern and precise, not bubbly.

---

## 11. Shadows and Glow

```css
--shadow-sm: 0 1px 2px rgba(17, 17, 15, 0.06);
--shadow-md: 0 8px 24px rgba(17, 17, 15, 0.08);
--shadow-lg: 0 24px 80px rgba(17, 17, 15, 0.14);

--glow-brand: 0 0 80px rgba(36, 91, 255, 0.35);
```

### Usage

- Use normal shadows for cards and product surfaces.
- Use brand glow only behind hero cards, product screenshots, or primary CTA sections.
- Do not apply glow to every component.

---

## 12. Buttons

### Primary Button

```css
.button-primary {
  background: #245BFF;
  color: #FFFFFF;
  border-radius: 10px;
  padding: 12px 18px;
  font-weight: 600;
  box-shadow: 0 0 40px rgba(36, 91, 255, 0.28);
}

.button-primary:hover {
  background: #123EF2;
  transform: translateY(-1px);
}
```

### Secondary Button

```css
.button-secondary {
  background: #FFFFFF;
  color: #11110F;
  border: 1px solid #EDEDE8;
  border-radius: 10px;
  padding: 12px 18px;
  font-weight: 600;
}
```

### Ghost Button

```css
.button-ghost {
  background: transparent;
  color: #33332D;
  border-radius: 10px;
  padding: 12px 18px;
  font-weight: 600;
}
```

---

## 13. Cards

```css
.card {
  background: #FFFFFF;
  border: 1px solid #EDEDE8;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(17, 17, 15, 0.06);
}
```

### Card Rules

- One main idea per card.
- Use short headings.
- Include a metric, icon, or visual anchor when possible.
- Avoid paragraphs longer than 2 to 3 lines.

---

## 14. Badges

```css
.badge {
  background: #EEF4FF;
  color: #123EF2;
  border: 1px solid #D9E6FF;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 10px;
}
```

### Example Badge Copy

- AI Workflow Audit
- Custom Ops App
- Manual Hours Removed
- Built in Days, Not Months
- Finance-Grade Systems
- Lightweight Automation

---

## 15. Inputs

```css
.input {
  background: #FFFFFF;
  border: 1px solid #D8D8D0;
  border-radius: 10px;
  padding: 12px 14px;
  color: #11110F;
}

.input:focus {
  border-color: #245BFF;
  box-shadow: 0 0 0 4px rgba(36, 91, 255, 0.12);
  outline: none;
}
```

---

## 16. Hero Section Formula

Recommended structure:

```text
Badge
Headline
Subheadline
CTA Row
Trust Row
Product / Workflow Visual
```

### Example Hero Copy

```text
AI workflows and lightweight software for teams buried in manual work.

I help small teams compress repetitive operations into simple systems, dashboards, automations, and custom internal tools — without months of agency bloat.
```

### CTA Copy

```text
Book a workflow audit
See example systems
```

### Trust Row Copy

```text
Built for operators · Finance-grade systems · Fast implementation
```

---

## 17. Visual Language

### Use

- Black and white UI mockups
- Thin borders
- Big product cards
- Before/after workflow diagrams
- Electric Cobalt highlights
- Tiny mono labels
- Screenshots inside rounded rectangles
- Operational metrics such as hours saved, steps removed, tools connected

### Avoid

- Generic AI gradients everywhere
- Too many emojis
- Cartoon illustrations
- Overly playful rounded UI
- Stock photos of people pointing at laptops
- Rainbow palettes
- Neon green as a primary color

---

## 18. Messaging Style

### Voice

- Direct
- Clear
- Practical
- Confident
- Outcome-oriented

### Avoid

- Vague AI hype
- “Transform your business” filler
- Overexplaining technical implementation
- Consulting buzzwords without proof

### Good Messaging Examples

```text
Compress manual work into simple systems.
```

```text
Custom internal tools without the agency bloat.
```

```text
Dashboards, automations, and workflows built around how your team actually works.
```

```text
Find the repetitive work. Remove the drag. Build the lightweight system.
```

---

## 19. Complete CSS Token Starter

```css
:root {
  --background: #FAFAF8;
  --surface: #FFFFFF;
  --surface-2: #F5F5F2;

  --text: #11110F;
  --text-muted: #66665B;
  --border: #EDEDE8;

  --brand: #245BFF;
  --brand-hover: #123EF2;
  --brand-soft: #EEF4FF;
  --brand-border: #D9E6FF;

  --success: #17B26A;
  --warning: #F79009;
  --danger: #F04438;

  --font-sans: "Inter", "Helvetica Neue", Arial, sans-serif;
  --font-mono: "IBM Plex Mono", monospace;

  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 999px;

  --shadow-sm: 0 1px 2px rgba(17, 17, 15, 0.06);
  --shadow-md: 0 8px 24px rgba(17, 17, 15, 0.08);
  --shadow-lg: 0 24px 80px rgba(17, 17, 15, 0.14);
  --glow-brand: 0 0 80px rgba(36, 91, 255, 0.35);
}
```

---

## 20. Tailwind Config Starter

```js
export default {
  theme: {
    extend: {
      colors: {
        background: "#FAFAF8",
        surface: "#FFFFFF",
        ink: "#11110F",
        muted: "#66665B",
        border: "#EDEDE8",
        brand: {
          50: "#EEF4FF",
          100: "#D9E6FF",
          200: "#B7D0FF",
          300: "#85ADFF",
          400: "#4C7FFF",
          500: "#245BFF",
          600: "#123EF2",
          700: "#0E2FC2",
          800: "#102A92",
          900: "#132866",
          950: "#0A1438",
        },
      },
      fontFamily: {
        sans: ["Inter", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "16px",
        xl: "24px",
        full: "999px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(17, 17, 15, 0.06)",
        md: "0 8px 24px rgba(17, 17, 15, 0.08)",
        lg: "0 24px 80px rgba(17, 17, 15, 0.14)",
        glow: "0 0 80px rgba(36, 91, 255, 0.35)",
      },
    },
  },
};
```

---

## 21. Suggested Brand Applications

### Best Fit

**Bromsey Systems**

Practical, credible, and founder-led. Works well for consulting, workflow compression, custom software, and fractional operations/technology work.

### Other Possible Names

- Signal Systems
- Ops Current
- Hourstack
- Compression Co.
- Workflow Current

---

## 22. One-Line Positioning

```text
Bromsey Systems builds AI workflows and lightweight internal tools that compress manual work for small teams.
```

Alternative:

```text
Custom systems, automations, and dashboards for teams that need less manual work and more operating leverage.
```

---

## 23. Final System Summary

- **Brand color:** Electric Cobalt `#245BFF`
- **Base feel:** premium SaaS, operational, sharp, finance-grade
- **Typography:** Inter + IBM Plex Mono
- **Background:** warm off-white `#FAFAF8`
- **Text:** near-black `#11110F`
- **Surfaces:** white cards with thin warm-gray borders
- **Visual anchor:** product screenshots, workflow maps, before/after diagrams
- **Avoid:** generic AI gradients, neon green, cartoon visuals, vague business-copy filler
