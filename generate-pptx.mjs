import pptxgen from "pptxgenjs";
import path from "path";

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "LandStack — Smart India Hackathon Winning Pitch Deck";
pres.author = "LandStack Team";
pres.company = "Government of India — Smart India Hackathon";
pres.subject = "Digital Public Infrastructure (DPI) for Land Governance";

// Color Palette Constants
const C = {
  bg: "F1F5F9",
  cardBg: "FFFFFF",
  slateDark: "0F172A",
  slateMid: "334155",
  slateLight: "64748B",
  slateBorder: "CBD5E1",
  emerald: "059669",
  emeraldLight: "ECFDF5",
  emeraldBorder: "A7F3D0",
  sky: "0284C7",
  skyLight: "F0F9FF",
  skyBorder: "BAE6FD",
  amber: "D97706",
  amberLight: "FFFBEB",
  amberBorder: "FDE68A",
  crimson: "DC2626",
  crimsonLight: "FEF2F2",
  crimsonBorder: "FECACA",
  purple: "7C3AED",
  purpleLight: "F5F3FF",
  purpleBorder: "DDD6FE",
};

const fontHeading = "Arial";
const fontBody = "Calibri";
const fontMono = "Consolas";

// Helper: Common Header
function addSlideHeader(slide, slideNum, categoryText, primaryKeyText = "") {
  // Background
  slide.background = { color: C.bg };

  // Top header bar container
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6,
    y: 0.35,
    w: 12.13,
    h: 0.55,
    fill: { color: C.cardBg },
    line: { color: C.slateBorder, width: 1 },
    rectRadius: 0.08,
  });

  // Slide Number Pill
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.75,
    y: 0.45,
    w: 0.95,
    h: 0.35,
    fill: { color: C.slateDark },
    rectRadius: 0.15,
  });
  slide.addText(`SLIDE 0${slideNum}`, {
    x: 0.75,
    y: 0.45,
    w: 0.95,
    h: 0.35,
    fontSize: 9,
    fontFace: fontBody,
    color: "FFFFFF",
    bold: true,
    align: "center",
    valign: "middle",
  });

  // Category Tag Pill
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 1.8,
    y: 0.45,
    w: 3.2,
    h: 0.35,
    fill: { color: C.emeraldLight },
    line: { color: C.emeraldBorder, width: 1 },
    rectRadius: 0.15,
  });
  slide.addText(categoryText.toUpperCase(), {
    x: 1.8,
    y: 0.45,
    w: 3.2,
    h: 0.35,
    fontSize: 8.5,
    fontFace: fontBody,
    color: C.emerald,
    bold: true,
    align: "center",
    valign: "middle",
  });

  // Primary Key / Status Pill (Right Aligned)
  if (primaryKeyText) {
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 8.5,
      y: 0.45,
      w: 4.08,
      h: 0.35,
      fill: { color: C.skyLight },
      line: { color: C.skyBorder, width: 1 },
      rectRadius: 0.15,
    });
    slide.addText(primaryKeyText, {
      x: 8.5,
      y: 0.45,
      w: 4.08,
      h: 0.35,
      fontSize: 8.5,
      fontFace: fontMono,
      color: C.sky,
      bold: true,
      align: "center",
      valign: "middle",
    });
  }
}

// ====================================================================
// SLIDE 1: VISION & UNFAIR ADVANTAGE (THE HOOK)
// ====================================================================
{
  const slide = pres.addSlide();
  addSlideHeader(slide, 1, "Vision & Unfair Advantage", "PRIMARY KEY: GJ06GND000101");

  // Title Box
  slide.addText("LandStack — Next-Gen Parcel-Centric Digital Public Infrastructure", {
    x: 0.6,
    y: 1.05,
    w: 12.13,
    h: 0.5,
    fontSize: 21,
    fontFace: fontHeading,
    bold: true,
    color: C.slateDark,
  });

  slide.addText("Unified GIS Cadastre, AI Encroachment Intelligence, and DigiLocker-Secured Land Governance", {
    x: 0.6,
    y: 1.55,
    w: 12.13,
    h: 0.35,
    fontSize: 12,
    fontFace: fontBody,
    color: C.slateLight,
  });

  // Core Innovation Hero Callout Card
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6,
    y: 2.0,
    w: 12.13,
    h: 0.75,
    fill: { color: C.emeraldLight },
    line: { color: C.emeraldBorder, width: 1 },
    rectRadius: 0.1,
  });
  slide.addText([
    { text: "CORE INNOVATION: ", options: { bold: true, color: C.emerald, fontSize: 10.5 } },
    {
      text: "Replaces fragmented, text-heavy land registries with a single, high-performance spatial source of truth anchored by a 14-digit ULPIN (Bhu-Aadhaar) primary key. Unites Revenue Records, GIS Polygons, and Municipal ledgers into one interactive operating system.",
      options: { color: C.slateDark, fontSize: 10.5 },
    },
  ], {
    x: 0.8,
    y: 2.05,
    w: 11.73,
    h: 0.65,
    fontFace: fontBody,
    valign: "middle",
  });

  // 3 Differentiator Cards
  const cardW = 3.84;
  const cardGap = 0.3;
  const cardY = 2.95;
  const cardH = 3.25;

  // Card 1
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6,
    y: cardY,
    w: cardW,
    h: cardH,
    fill: { color: C.cardBg },
    line: { color: C.slateBorder, width: 1 },
    rectRadius: 0.12,
  });
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8,
    y: cardY + 0.2,
    w: 1.4,
    h: 0.28,
    fill: { color: C.skyLight },
    line: { color: C.skyBorder, width: 1 },
    rectRadius: 0.14,
  });
  slide.addText("SPATIAL MOAT", {
    x: 0.8,
    y: cardY + 0.2,
    w: 1.4,
    h: 0.28,
    fontSize: 8,
    fontFace: fontHeading,
    bold: true,
    color: C.sky,
    align: "center",
    valign: "middle",
  });
  slide.addText("Dynamic Canvas vs. Static Viewers", {
    x: 0.8,
    y: cardY + 0.55,
    w: 3.44,
    h: 0.45,
    fontSize: 12.5,
    fontFace: fontHeading,
    bold: true,
    color: C.slateDark,
  });
  slide.addText([
    { text: "• Legacy Portals (Bhuvan): ", options: { bold: true, color: C.slateMid } },
    { text: "Render passive, read-only WMS map tiles with zero real-time parcel binding.\n\n", options: { color: C.slateMid } },
    { text: "• LandStack DPI: ", options: { bold: true, color: C.emerald } },
    { text: "Hardware-accelerated Leaflet Canvas (preferCanvas={true}) with instant <50ms Property Dossier modals, camera auto-pan, and animated perimeter glow boundary tracing.", options: { color: C.slateMid } },
  ], {
    x: 0.8,
    y: cardY + 1.05,
    w: 3.44,
    h: 2.0,
    fontSize: 9.5,
    fontFace: fontBody,
  });

  // Card 2
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6 + cardW + cardGap,
    y: cardY,
    w: cardW,
    h: cardH,
    fill: { color: C.cardBg },
    line: { color: C.slateBorder, width: 1 },
    rectRadius: 0.12,
  });
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6 + cardW + cardGap + 0.2,
    y: cardY + 0.2,
    w: 1.4,
    h: 0.28,
    fill: { color: C.emeraldLight },
    line: { color: C.emeraldBorder, width: 1 },
    rectRadius: 0.14,
  });
  slide.addText("LEGAL MOAT", {
    x: 0.6 + cardW + cardGap + 0.2,
    y: cardY + 0.2,
    w: 1.4,
    h: 0.28,
    fontSize: 8,
    fontFace: fontHeading,
    bold: true,
    color: C.emerald,
    align: "center",
    valign: "middle",
  });
  slide.addText("Sovereign eKYC vs. Paper Slips", {
    x: 0.6 + cardW + cardGap + 0.2,
    y: cardY + 0.55,
    w: 3.44,
    h: 0.45,
    fontSize: 12.5,
    fontFace: fontHeading,
    bold: true,
    color: C.slateDark,
  });
  slide.addText([
    { text: "• Legacy Portals: ", options: { bold: true, color: C.slateMid } },
    { text: "Rely on forged paper affidavits, manual Talati desk verifications, and vulnerable rubber stamps.\n\n", options: { color: C.slateMid } },
    { text: "• LandStack DPI: ", options: { bold: true, color: C.emerald } },
    { text: "Direct DigiLocker biometric/OTP authentication. Requires sovereign 6-digit OTP verification for instant, legally compliant mutations with zero impersonation.", options: { color: C.slateMid } },
  ], {
    x: 0.6 + cardW + cardGap + 0.2,
    y: cardY + 1.05,
    w: 3.44,
    h: 2.0,
    fontSize: 9.5,
    fontFace: fontBody,
  });

  // Card 3
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6 + (cardW + cardGap) * 2,
    y: cardY,
    w: cardW,
    h: cardH,
    fill: { color: C.cardBg },
    line: { color: C.slateBorder, width: 1 },
    rectRadius: 0.12,
  });
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6 + (cardW + cardGap) * 2 + 0.2,
    y: cardY + 0.2,
    w: 1.6,
    h: 0.28,
    fill: { color: C.purpleLight },
    line: { color: C.purpleBorder, width: 1 },
    rectRadius: 0.14,
  });
  slide.addText("DETECTION MOAT", {
    x: 0.6 + (cardW + cardGap) * 2 + 0.2,
    y: cardY + 0.2,
    w: 1.6,
    h: 0.28,
    fontSize: 8,
    fontFace: fontHeading,
    bold: true,
    color: C.purple,
    align: "center",
    valign: "middle",
  });
  slide.addText("Proactive AI vs. Reactive Demolitions", {
    x: 0.6 + (cardW + cardGap) * 2 + 0.2,
    y: cardY + 0.55,
    w: 3.44,
    h: 0.45,
    fontSize: 12.5,
    fontFace: fontHeading,
    bold: true,
    color: C.slateDark,
  });
  slide.addText([
    { text: "• Legacy Portals: ", options: { bold: true, color: C.slateMid } },
    { text: "Encroachments are discovered only after illegal RCC construction or protracted citizen complaints.\n\n", options: { color: C.slateMid } },
    { text: "• LandStack DPI: ", options: { bold: true, color: C.emerald } },
    { text: "Automated AI satellite computer-vision change detection comparing 2022 baseline vs 2026 high-res Cartosat imagery to veto boundary shifts before mutation approvals.", options: { color: C.slateMid } },
  ], {
    x: 0.6 + (cardW + cardGap) * 2 + 0.2,
    y: cardY + 1.05,
    w: 3.44,
    h: 2.0,
    fontSize: 9.5,
    fontFace: fontBody,
  });

  // Bottom Flow Banner
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6,
    y: 6.35,
    w: 12.13,
    h: 0.55,
    fill: { color: C.slateDark },
    rectRadius: 0.08,
  });
  slide.addText("UNIFIED FLOW:  [ 14-Digit ULPIN: GJ06GND000101 ] ──► [ Spatial Cadastre ] ──► [ Civil 7/12 RoR ] ──► [ CERSAI Bank Lien ]", {
    x: 0.8,
    y: 6.35,
    w: 8.5,
    h: 0.55,
    fontSize: 9,
    fontFace: fontMono,
    color: "FFFFFF",
    valign: "middle",
  });
  slide.addText("PILOT: Gandhinagar Sectors 21 & 22", {
    x: 9.4,
    y: 6.35,
    w: 3.13,
    h: 0.55,
    fontSize: 9,
    fontFace: fontBody,
    bold: true,
    color: C.emeraldLight,
    align: "right",
    valign: "middle",
  });

  slide.addNotes(
    "SPEAKER SCRIPT (35 Sec):\n" +
    "\"Respected Jury, 66% of all civil litigation in India is tied to land. Why? Because our land records are blind text files disconnected from real physical earth. Bhuvan is just a map viewer. AnyRoR is just a PDF repository. We built LandStack—India's first parcel-centric Digital Public Infrastructure for land governance. By binding every square meter of land to a 14-digit ULPIN Bhu-Aadhaar primary key, we merge high-speed Leaflet canvas rendering, DigiLocker biometric mutation security, and AI satellite encroachment intelligence into a single pane of glass.\"\n\n" +
    "JUDGE DEFENSE:\n" +
    "Q: Why not just use Bhuvan?\n" +
    "A: Bhuvan is a geospatial visualization platform, not a governance transaction engine. On Bhuvan, a Tehsildar cannot verify a CERSAI bank mortgage lock, trigger a DigiLocker biometric eKYC transfer, or generate a legally binding 7/12 RoR certificate. LandStack treats the map as an interactive operating system for land law."
  );
}

// ====================================================================
// SLIDE 2: THE CRITICAL BREAKDOWN (PROBLEM & ECONOMIC IMPACT)
// ====================================================================
{
  const slide = pres.addSlide();
  addSlideHeader(slide, 2, "Problem Statement & Economic Impact", "1.3% ANNUAL GDP DRAG ON INDIA");

  // Title Box
  slide.addText("The Hidden Cost of Legacy Land Administration", {
    x: 0.6,
    y: 1.05,
    w: 12.13,
    h: 0.5,
    fontSize: 21,
    fontFace: fontHeading,
    bold: true,
    color: C.slateDark,
  });
  slide.addText("Siloed records, 60-day administrative bottlenecks, and unchecked public reserve encroachments.", {
    x: 0.6,
    y: 1.55,
    w: 12.13,
    h: 0.35,
    fontSize: 12,
    fontFace: fontBody,
    color: C.slateLight,
  });

  // Left Column: 3 System Failures (7.2 inches)
  const leftW = 7.2;
  const painY = 2.05;
  const boxH = 1.3;
  const boxGap = 0.15;

  // Pain 1
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6,
    y: painY,
    w: leftW,
    h: boxH,
    fill: { color: C.cardBg },
    line: { color: C.slateBorder, width: 1 },
    rectRadius: 0.1,
  });
  slide.addShape(pres.shapes.OVAL, {
    x: 0.8,
    y: painY + 0.18,
    w: 0.35,
    h: 0.35,
    fill: { color: C.crimsonLight },
    line: { color: C.crimsonBorder, width: 1 },
  });
  slide.addText("1", {
    x: 0.8,
    y: painY + 0.18,
    w: 0.35,
    h: 0.35,
    fontSize: 10,
    fontFace: fontHeading,
    bold: true,
    color: C.crimson,
    align: "center",
    valign: "middle",
  });
  slide.addText("Fragmented Data Silos (The Blind Stack)", {
    x: 1.25,
    y: painY + 0.15,
    w: 6.35,
    h: 0.35,
    fontSize: 12,
    fontFace: fontHeading,
    bold: true,
    color: C.slateDark,
  });
  slide.addText(
    "Revenue Records (RoR / 7/12), Sub-Registrar Deeds (e-Garvi), Municipal Tax Ledgers, and Bank Mortgage Locks (CERSAI) exist in isolated databases. A buyer acquires a parcel with a clean revenue record, completely unaware of an existing mortgage lock or power grid easement.",
    {
      x: 1.25,
      y: painY + 0.5,
      w: 6.35,
      h: 0.72,
      fontSize: 9.5,
      fontFace: fontBody,
      color: C.slateMid,
    }
  );

  // Pain 2
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6,
    y: painY + boxH + boxGap,
    w: leftW,
    h: boxH,
    fill: { color: C.cardBg },
    line: { color: C.slateBorder, width: 1 },
    rectRadius: 0.1,
  });
  slide.addShape(pres.shapes.OVAL, {
    x: 0.8,
    y: painY + boxH + boxGap + 0.18,
    w: 0.35,
    h: 0.35,
    fill: { color: C.amberLight },
    line: { color: C.amberBorder, width: 1 },
  });
  slide.addText("2", {
    x: 0.8,
    y: painY + boxH + boxGap + 0.18,
    w: 0.35,
    h: 0.35,
    fontSize: 10,
    fontFace: fontHeading,
    bold: true,
    color: C.amber,
    align: "center",
    valign: "middle",
  });
  slide.addText("Mutation Bottlenecks (The 60-Day Paper Choke)", {
    x: 1.25,
    y: painY + boxH + boxGap + 0.15,
    w: 6.35,
    h: 0.35,
    fontSize: 12,
    fontFace: fontHeading,
    bold: true,
    color: C.slateDark,
  });
  slide.addText(
    "Manual paper verification, physical notice dispatch, and physical Talati signatures lead to 60+ day backlogs for Tehsildars and Revenue Officers. This administrative delay breeds rent-seeking and leaves a 2-month window for fraudulent double-sales.",
    {
      x: 1.25,
      y: painY + boxH + boxGap + 0.5,
      w: 6.35,
      h: 0.72,
      fontSize: 9.5,
      fontFace: fontBody,
      color: C.slateMid,
    }
  );

  // Pain 3
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6,
    y: painY + (boxH + boxGap) * 2,
    w: leftW,
    h: boxH,
    fill: { color: C.cardBg },
    line: { color: C.slateBorder, width: 1 },
    rectRadius: 0.1,
  });
  slide.addShape(pres.shapes.OVAL, {
    x: 0.8,
    y: painY + (boxH + boxGap) * 2 + 0.18,
    w: 0.35,
    h: 0.35,
    fill: { color: C.purpleLight },
    line: { color: C.purpleBorder, width: 1 },
  });
  slide.addText("3", {
    x: 0.8,
    y: painY + (boxH + boxGap) * 2 + 0.18,
    w: 0.35,
    h: 0.35,
    fontSize: 10,
    fontFace: fontHeading,
    bold: true,
    color: C.purple,
    align: "center",
    valign: "middle",
  });
  slide.addText("Undetected Spatial Encroachment (The Reactive Trap)", {
    x: 1.25,
    y: painY + (boxH + boxGap) * 2 + 0.15,
    w: 6.35,
    h: 0.35,
    fontSize: 12,
    fontFace: fontHeading,
    bold: true,
    color: C.slateDark,
  });
  slide.addText(
    "Lack of automated temporal spatial analysis allows unauthorized construction onto public utility reserves, stormwater drains, and agricultural corridors to go undetected until permanent structures are already completed.",
    {
      x: 1.25,
      y: painY + (boxH + boxGap) * 2 + 0.5,
      w: 6.35,
      h: 0.72,
      fontSize: 9.5,
      fontFace: fontBody,
      color: C.slateMid,
    }
  );

  // Right Column: Macro Economics + Flowchart (4.6 inches)
  const rightX = 8.1;
  const rightW = 4.63;

  // Stat Card 1: 66%
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: rightX,
    y: 2.05,
    w: rightW / 2 - 0.1,
    h: 1.45,
    fill: { color: C.crimsonLight },
    line: { color: C.crimsonBorder, width: 1 },
    rectRadius: 0.1,
  });
  slide.addText("66%", {
    x: rightX,
    y: 2.15,
    w: rightW / 2 - 0.1,
    h: 0.55,
    fontSize: 28,
    fontFace: fontHeading,
    bold: true,
    color: C.crimson,
    align: "center",
  });
  slide.addText("CIVIL LITIGATION\nOver 2.2 Crore pending court cases in India stem from land disputes.", {
    x: rightX + 0.05,
    y: 2.7,
    w: rightW / 2 - 0.2,
    h: 0.75,
    fontSize: 8.5,
    fontFace: fontBody,
    color: C.crimson,
    align: "center",
    bold: true,
  });

  // Stat Card 2: $14.2B
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: rightX + rightW / 2 + 0.1,
    y: 2.05,
    w: rightW / 2 - 0.1,
    h: 1.45,
    fill: { color: C.slateDark },
    rectRadius: 0.1,
  });
  slide.addText("$14.2B", {
    x: rightX + rightW / 2 + 0.1,
    y: 2.15,
    w: rightW / 2 - 0.1,
    h: 0.55,
    fontSize: 26,
    fontFace: fontHeading,
    bold: true,
    color: C.emeraldLight,
    align: "center",
  });
  slide.addText("LOCKED CAPITAL\nFrozen in encumbered titles, stalling infrastructure and credit.", {
    x: rightX + rightW / 2 + 0.15,
    y: 2.7,
    w: rightW / 2 - 0.2,
    h: 0.75,
    fontSize: 8.5,
    fontFace: fontBody,
    color: "FFFFFF",
    align: "center",
  });

  // System Failure Flowchart Box
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: rightX,
    y: 3.65,
    w: rightW,
    h: 2.55,
    fill: { color: C.cardBg },
    line: { color: C.slateBorder, width: 1 },
    rectRadius: 0.1,
  });
  slide.addText("SYSTEM FAILURE FLOWCHART", {
    x: rightX + 0.2,
    y: 3.75,
    w: rightW - 0.4,
    h: 0.3,
    fontSize: 9.5,
    fontFace: fontHeading,
    bold: true,
    color: C.slateLight,
  });
  slide.addText(
    "[ ISOLATED REGISTRIES ]\n" +
    "       │  RoR ≠ Deed ≠ Tax\n" +
    "       ▼\n" +
    "[ MANUAL PAPER VERIFICATION ]\n" +
    "       │  Talati Desks & Affidavits\n" +
    "       ▼\n" +
    "[ 60-DAY ADMINISTRATIVE CHOKE ]\n" +
    "       │  2.2 Crore Pending Disputes\n" +
    "       ▼\n" +
    "[ FRAUDULENT MUTATIONS & SUITS ]",
    {
      x: rightX + 0.2,
      y: 4.05,
      w: rightW - 0.4,
      h: 2.05,
      fontSize: 9,
      fontFace: fontMono,
      color: C.slateDark,
      lineSpacingMultiple: 1.1,
    }
  );

  // Footer note
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6,
    y: 6.35,
    w: 12.13,
    h: 0.5,
    fill: { color: C.cardBg },
    line: { color: C.slateBorder, width: 1 },
    rectRadius: 0.08,
  });
  slide.addText("Sources: NITI Aayog Land Governance Report & Ministry of Rural Development DILRMP Data", {
    x: 0.8,
    y: 6.35,
    w: 8.0,
    h: 0.5,
    fontSize: 9,
    fontFace: fontBody,
    color: C.slateLight,
    valign: "middle",
  });
  slide.addText("LANDSTACK FIX: Unified 14-Digit ULPIN Binding", {
    x: 8.8,
    y: 6.35,
    w: 3.73,
    h: 0.5,
    fontSize: 9,
    fontFace: fontHeading,
    bold: true,
    color: C.emerald,
    align: "right",
    valign: "middle",
  });

  slide.addNotes(
    "SPEAKER SCRIPT (35 Sec):\n" +
    "\"Judges, let's look at the real economic cost. Right now, India loses 1.3% of its GDP annually because of broken land records. When an applicant buys a plot in Gandhinagar, the Sub-Registrar records the deed, but the Revenue Department takes 60 days to update the 7/12 Record of Rights. In that 60-day blind window, fraudulent sellers take bank loans against the same parcel or build walls 2.4 meters into municipal drainage buffers. By the time a Tehsildar reviews the file, the damage is permanent. LandStack eliminates this entire breakdown cascade with real-time transactional synchronization.\"\n\n" +
    "JUDGE DEFENSE:\n" +
    "Q: States already have e-Dhara / Bhoomi. Isn't this already solved?\n" +
    "A: e-Dhara digitized paper; it did not modernize the architecture. Scanning a 1970 manual ledger into an untagged PDF creates a 'Digital Silo', not Digital Public Infrastructure. If an e-Dhara record cannot talk in real-time to a bank's loan ledger or satellite telemetry via a spatial primary key, it is simply digital paper waiting to be litigated."
  );
}

// ====================================================================
// SLIDE 3: LANDSTACK ARCHITECTURE & SPATIAL CORE (THE ENGINE)
// ====================================================================
{
  const slide = pres.addSlide();
  addSlideHeader(slide, 3, "LandStack Architecture & Spatial Core", "LEAFLET CANVAS + ULPIN INDEX");

  // Title Box
  slide.addText("A Modular 3-Layer Digital Public Infrastructure", {
    x: 0.6,
    y: 1.05,
    w: 12.13,
    h: 0.5,
    fontSize: 21,
    fontFace: fontHeading,
    bold: true,
    color: C.slateDark,
  });
  slide.addText("Decoupled spatial vector canvas, centered property dossier, and unified interop matrix.", {
    x: 0.6,
    y: 1.55,
    w: 12.13,
    h: 0.35,
    fontSize: 12,
    fontFace: fontBody,
    color: C.slateLight,
  });

  // 3-Layer Stack Cards
  const layerW = 3.84;
  const layerGap = 0.3;
  const layerY = 2.05;
  const layerH = 3.35;

  // Layer 1
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6,
    y: layerY,
    w: layerW,
    h: layerH,
    fill: { color: C.cardBg },
    line: { color: C.emeraldBorder, width: 2 },
    rectRadius: 0.12,
  });
  slide.addText("LAYER 1: BASE SPATIAL CORE", {
    x: 0.8,
    y: layerY + 0.2,
    w: 3.44,
    h: 0.3,
    fontSize: 10,
    fontFace: fontHeading,
    bold: true,
    color: C.emerald,
  });
  slide.addText("High-Performance Vector Canvas", {
    x: 0.8,
    y: layerY + 0.5,
    w: 3.44,
    h: 0.35,
    fontSize: 12.5,
    fontFace: fontHeading,
    bold: true,
    color: C.slateDark,
  });
  slide.addText([
    { text: "• Leaflet Canvas Rendering: ", options: { bold: true, color: C.slateDark } },
    { text: "Implements preferCanvas={true} for zero-DOM-thrashing rendering of 10,000+ MultiPolygon GeoJSONs.\n\n", options: { color: C.slateMid } },
    { text: "• Tri-Basemap Switcher: ", options: { bold: true, color: C.slateDark } },
    { text: "Zero-API-key toggle between OpenStreetMap, ArcGIS World Imagery, and CartoDB Positron.\n\n", options: { color: C.slateMid } },
    { text: "• Dynamic Cadastre: ", options: { bold: true, color: C.slateDark } },
    { text: "Sector 21 & 22 plots color-coded by Agricultural, Industrial, Utility, and Residential zoning.", options: { color: C.slateMid } },
  ], {
    x: 0.8,
    y: layerY + 0.9,
    w: 3.44,
    h: 2.3,
    fontSize: 9.5,
    fontFace: fontBody,
  });

  // Layer 2
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6 + layerW + layerGap,
    y: layerY,
    w: layerW,
    h: layerH,
    fill: { color: C.cardBg },
    line: { color: C.skyBorder, width: 2 },
    rectRadius: 0.12,
  });
  slide.addText("LAYER 2: GOVERNANCE DOSSIER", {
    x: 0.6 + layerW + layerGap + 0.2,
    y: layerY + 0.2,
    w: 3.44,
    h: 0.3,
    fontSize: 10,
    fontFace: fontHeading,
    bold: true,
    color: C.sky,
  });
  slide.addText("Dynamic Centered Property Dossier", {
    x: 0.6 + layerW + layerGap + 0.2,
    y: layerY + 0.5,
    w: 3.44,
    h: 0.35,
    fontSize: 12.5,
    fontFace: fontHeading,
    bold: true,
    color: C.slateDark,
  });
  slide.addText([
    { text: "• Real-Time Dossier Engine: ", options: { bold: true, color: C.slateDark } },
    { text: "Fetches AnyRoR 7/12 status, municipal tax ledger, and deed records in a sub-50ms centered modal.\n\n", options: { color: C.slateMid } },
    { text: "• Atomic Spatial Binding: ", options: { bold: true, color: C.slateDark } },
    { text: "Integrates 14-digit ULPIN, Survey/Khasra numbers, and accurate survey metrics (sq. m / acres).\n\n", options: { color: C.slateMid } },
    { text: "• Spatial Navigation: ", options: { bold: true, color: C.slateDark } },
    { text: "Camera auto-panning and dynamic animated perimeter glow boundary tracing.", options: { color: C.slateMid } },
  ], {
    x: 0.6 + layerW + layerGap + 0.2,
    y: layerY + 0.9,
    w: 3.44,
    h: 2.3,
    fontSize: 9.5,
    fontFace: fontBody,
  });

  // Layer 3
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6 + (layerW + layerGap) * 2,
    y: layerY,
    w: layerW,
    h: layerH,
    fill: { color: C.cardBg },
    line: { color: C.purpleBorder, width: 2 },
    rectRadius: 0.12,
  });
  slide.addText("LAYER 3: INTEROP GATEWAY", {
    x: 0.6 + (layerW + layerGap) * 2 + 0.2,
    y: layerY + 0.2,
    w: 3.44,
    h: 0.3,
    fontSize: 10,
    fontFace: fontHeading,
    bold: true,
    color: C.purple,
  });
  slide.addText("Service Interoperability Mesh", {
    x: 0.6 + (layerW + layerGap) * 2 + 0.2,
    y: layerY + 0.5,
    w: 3.44,
    h: 0.35,
    fontSize: 12.5,
    fontFace: fontHeading,
    bold: true,
    color: C.slateDark,
  });
  slide.addText([
    { text: "• e-Garvi (Deeds): ", options: { bold: true, color: C.slateDark } },
    { text: "Connects Sub-Registrar sale deeds directly with Revenue Department records.\n\n", options: { color: C.slateMid } },
    { text: "• CERSAI (Banking): ", options: { bold: true, color: C.slateDark } },
    { text: "Mortgage registry cross-check to prevent double-pledging or fraudulent loans.\n\n", options: { color: C.slateMid } },
    { text: "• GUVNL / Utility Grids: ", options: { bold: true, color: C.slateDark } },
    { text: "Verifies high-tension power line easements and municipal drainage rights-of-way.", options: { color: C.slateMid } },
  ], {
    x: 0.6 + (layerW + layerGap) * 2 + 0.2,
    y: layerY + 0.9,
    w: 3.44,
    h: 2.3,
    fontSize: 9.5,
    fontFace: fontBody,
  });

  // Centered Autocomplete Search Feature Box
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6,
    y: 5.55,
    w: 12.13,
    h: 1.0,
    fill: { color: C.skyLight },
    line: { color: C.skyBorder, width: 1 },
    rectRadius: 0.1,
  });
  slide.addText("🔍  CENTERED CADASTRAL AUTOCOMPLETE SEARCH BAR", {
    x: 0.8,
    y: 5.65,
    w: 8.5,
    h: 0.3,
    fontSize: 10.5,
    fontFace: fontHeading,
    bold: true,
    color: C.sky,
  });
  slide.addText("Instant search across ULPINs (e.g. GJ06GND000101), Survey/Khasra No (142/1), and Citizen Names with camera auto-fly and animated perimeter glow boundary tracing.", {
    x: 0.8,
    y: 5.95,
    w: 9.5,
    h: 0.45,
    fontSize: 9.5,
    fontFace: fontBody,
    color: C.slateDark,
  });
  slide.addText("SUB-50ms LATENCY\nZero Canvas Thrashing", {
    x: 10.4,
    y: 5.75,
    w: 2.1,
    h: 0.6,
    fontSize: 9,
    fontFace: fontMono,
    bold: true,
    color: C.sky,
    align: "center",
  });

  slide.addNotes(
    "SPEAKER SCRIPT (40 Sec):\n" +
    "\"Under the hood, LandStack is architected as a modular 3-layer DPI. At Layer 1, our spatial core uses Leaflet's canvas-optimized renderer (preferCanvas={true}). We can render thousands of multi-polygon parcels without dropping below 60 frames per second, switching seamlessly between OpenStreetMap, ArcGIS Satellite, and CartoDB Positron. At Layer 2, clicking any parcel triggers our centered Property Dossier in under 50 milliseconds, uniting land-use zoning, tax status, and ownership. And at Layer 3, our Interoperability Gateway indexes sub-registrar deeds, municipal tax ledgers, and CERSAI bank liens to the 14-digit ULPIN.\"\n\n" +
    "JUDGE DEFENSE:\n" +
    "Q: How does Leaflet scale without freezing the browser?\n" +
    "A: Standard Leaflet injects individual SVG DOM nodes per polygon, which crashes around 500 parcels. We explicitly implemented preferCanvas={true}, forcing Leaflet to draw geometry on a single hardware-accelerated HTML5 Canvas element. Combined with bounding-box spatial indexing (getBounds()), our client only draws visible vectors, achieving buttery-smooth 60 FPS performance."
  );
}

// ====================================================================
// SLIDE 4: AI ENCROACHMENT INSPECTOR & AUTOMATED RISK SCORING
// ====================================================================
{
  const slide = pres.addSlide();
  addSlideHeader(slide, 4, "AI Encroachment Inspector & Risk Scoring", "94.2% AI MODEL CONFIDENCE SCORE");

  // Title Box
  slide.addText("Proactive Spatial Intelligence & Automated Risk Engine", {
    x: 0.6,
    y: 1.05,
    w: 12.13,
    h: 0.5,
    fontSize: 21,
    fontFace: fontHeading,
    bold: true,
    color: C.slateDark,
  });
  slide.addText("Dual-pane temporal satellite change detection and pre-mutation automated triage locks.", {
    x: 0.6,
    y: 1.55,
    w: 12.13,
    h: 0.35,
    fontSize: 12,
    fontFace: fontBody,
    color: C.slateLight,
  });

  // Left Column: Split-View AI Inspector (6.8 inches)
  const leftW = 6.8;
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6,
    y: 2.05,
    w: leftW,
    h: 4.5,
    fill: { color: C.slateDark },
    rectRadius: 0.12,
  });

  slide.addText("🛰️  AI SATELLITE ENCROACHMENT INSPECTOR", {
    x: 0.8,
    y: 2.2,
    w: 4.5,
    h: 0.3,
    fontSize: 11,
    fontFace: fontHeading,
    bold: true,
    color: C.emeraldLight,
  });
  slide.addText("Sector 21, Gandhinagar | Plot #4", {
    x: 5.2,
    y: 2.2,
    w: 2.0,
    h: 0.3,
    fontSize: 9,
    fontFace: fontMono,
    color: C.slateLight,
    align: "right",
  });

  // Dual Pane boxes
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8,
    y: 2.6,
    w: 3.0,
    h: 1.7,
    fill: { color: "1E293B" },
    line: { color: "334155", width: 1 },
    rectRadius: 0.08,
  });
  slide.addText("2022 SATELLITE BASELINE\nISRO Archive Imagery\n\nStatutory Cadastre: CLEAR\nZero Encroachment", {
    x: 0.9,
    y: 2.7,
    w: 2.8,
    h: 1.5,
    fontSize: 9.5,
    fontFace: fontMono,
    color: "94A3B8",
    align: "center",
  });

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 4.1,
    y: 2.6,
    w: 3.0,
    h: 1.7,
    fill: { color: "1E293B" },
    line: { color: C.amber, width: 2 },
    rectRadius: 0.08,
  });
  slide.addText("2026 HIGH-RES ORTHOMOSAIC\nCartosat-3 (0.28m) Stream\n\n⚠️ SHIFT DETECTED\n+2.4m onto Public Reserve", {
    x: 4.2,
    y: 2.7,
    w: 2.8,
    h: 1.5,
    fontSize: 9.5,
    fontFace: fontMono,
    color: C.amberBorder,
    bold: true,
    align: "center",
  });

  // Warning Banner
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8,
    y: 4.45,
    w: 6.3,
    h: 0.9,
    fill: { color: "2A1B0E" },
    line: { color: C.amber, width: 1 },
    rectRadius: 0.08,
  });
  slide.addText("⚠️  REAL-TIME CV ALERT: Edge-detection flagged a 2.4-meter unauthorized boundary shift over the statutory municipal stormwater corridor with 94.2% AI model confidence.", {
    x: 0.9,
    y: 4.5,
    w: 6.1,
    h: 0.8,
    fontSize: 9.5,
    fontFace: fontBody,
    color: C.amberBorder,
    valign: "middle",
  });

  // Action Buttons
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8,
    y: 5.5,
    w: 3.05,
    h: 0.55,
    fill: { color: "1E293B" },
    line: { color: "475569", width: 1 },
    rectRadius: 0.08,
  });
  slide.addText("📄 Export Field Survey Dossier", {
    x: 0.8,
    y: 5.5,
    w: 3.05,
    h: 0.55,
    fontSize: 9.5,
    fontFace: fontHeading,
    bold: true,
    color: "FFFFFF",
    align: "center",
    valign: "middle",
  });

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 4.05,
    y: 5.5,
    w: 3.05,
    h: 0.55,
    fill: { color: C.emerald },
    rectRadius: 0.08,
  });
  slide.addText("⚠️ Issue Digital Encroachment Notice", {
    x: 4.05,
    y: 5.5,
    w: 3.05,
    h: 0.55,
    fontSize: 9.5,
    fontFace: fontHeading,
    bold: true,
    color: "FFFFFF",
    align: "center",
    valign: "middle",
  });

  // Right Column: Automated Risk Scoring Engine (5.0 inches)
  const rightX = 7.7;
  const rightW = 5.03;

  slide.addText("DYNAMIC AUTOMATED RISK SCORING ENGINE", {
    x: rightX,
    y: 2.05,
    w: rightW,
    h: 0.35,
    fontSize: 11,
    fontFace: fontHeading,
    bold: true,
    color: C.slateDark,
  });

  // Risk 1: High
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: rightX,
    y: 2.45,
    w: rightW,
    h: 1.25,
    fill: { color: C.crimsonLight },
    line: { color: C.crimsonBorder, width: 1 },
    rectRadius: 0.1,
  });
  slide.addText("🔴  HIGH RISK (Hard Lock)", {
    x: rightX + 0.15,
    y: 2.55,
    w: rightW - 0.3,
    h: 0.3,
    fontSize: 11,
    fontFace: fontHeading,
    bold: true,
    color: C.crimson,
  });
  slide.addText("Triggered by active CERSAI mortgage lien, litigation caveat, or detected spatial encroachment >1.5m. Tehsildar mutation action is automatically disabled until Collector clearance.", {
    x: rightX + 0.15,
    y: 2.85,
    w: rightW - 0.3,
    h: 0.75,
    fontSize: 9,
    fontFace: fontBody,
    color: C.slateDark,
  });

  // Risk 2: Medium
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: rightX,
    y: 3.85,
    w: rightW,
    h: 1.25,
    fill: { color: C.amberLight },
    line: { color: C.amberBorder, width: 1 },
    rectRadius: 0.1,
  });
  slide.addText("🟡  MEDIUM RISK (Conditional Gate)", {
    x: rightX + 0.15,
    y: 3.95,
    w: rightW - 0.3,
    h: 0.3,
    fontSize: 11,
    fontFace: fontHeading,
    bold: true,
    color: C.amber,
  });
  slide.addText("Property tax arrears (>₹10,000) or minor boundary variance (<1m). System prompts mandatory tax settlement or surveyor field demarcation before proceeding.", {
    x: rightX + 0.15,
    y: 4.25,
    w: rightW - 0.3,
    h: 0.75,
    fontSize: 9,
    fontFace: fontBody,
    color: C.slateDark,
  });

  // Risk 3: Low
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: rightX,
    y: 5.25,
    w: rightW,
    h: 1.25,
    fill: { color: C.emeraldLight },
    line: { color: C.emeraldBorder, width: 1 },
    rectRadius: 0.1,
  });
  slide.addText("🟢  LOW RISK / CLEAR (Fast-Track Lane)", {
    x: rightX + 0.15,
    y: 5.35,
    w: rightW - 0.3,
    h: 0.3,
    fontSize: 11,
    fontFace: fontHeading,
    bold: true,
    color: C.emerald,
  });
  slide.addText("100% verified AnyRoR title, zero encumbrance, clean satellite delta. Eligible for 48-hour automated DigiLocker approval flow with zero manual delay.", {
    x: rightX + 0.15,
    y: 5.65,
    w: rightW - 0.3,
    h: 0.75,
    fontSize: 9,
    fontFace: fontBody,
    color: C.slateDark,
  });

  slide.addNotes(
    "SPEAKER SCRIPT (40 Sec):\n" +
    "\"Here is LandStack's game-changer: We stop land disputes before mutations are signed. Meet our AI Encroachment Inspector. Instead of waiting for a citizen to complain years after an encroachment occurs, our engine takes 2022 satellite baselines, overlays 2026 high-resolution Cartosat imagery, and computes boundary deviations against official cadastre coordinates. Look at this parcel in Gandhinagar Sector 21: The system flagged a 2.4-meter illegal expansion onto a public utility reserve with a 94.2% AI confidence score. The system immediately assigned a HIGH RISK badge and locked the mutation queue. The Tehsildar can issue an automated digital legal notice with a single click.\"\n\n" +
    "JUDGE DEFENSE:\n" +
    "Q: Satellite imagery can have false positives. How can you legally penalize citizens based on AI?\n" +
    "A: LandStack practices Responsible AI Governance. The AI model does not execute demolitions—it serves as a pre-mutation triage filter. When a 94.2% confidence shift is flagged, it blocks the fast-track mutation, marks the docket as HIGH RISK, and auto-generates a geo-tagged inspection manifest for ground surveyors. It prevents fraudulent officers from quietly approving illegal plots behind closed doors."
  );
}

// ====================================================================
// SLIDE 5: REVENUE OFFICER CONTROL CENTER & SAFEGUARD WORKFLOWS
// ====================================================================
{
  const slide = pres.addSlide();
  addSlideHeader(slide, 5, "Officer Control Center & Workflows", "4-ROLE RBAC SWITCHER ACTIVE");

  // Title Box
  slide.addText("Revenue Officer Control Center & Safeguard Workflows", {
    x: 0.6,
    y: 1.05,
    w: 12.13,
    h: 0.5,
    fontSize: 21,
    fontFace: fontHeading,
    bold: true,
    color: C.slateDark,
  });
  slide.addText("Role-based governance, DigiLocker biometric eKYC, instant RoR certificates, and SHA-256 audit ledger.", {
    x: 0.6,
    y: 1.55,
    w: 12.13,
    h: 0.35,
    fontSize: 12,
    fontFace: fontBody,
    color: C.slateLight,
  });

  // 4 Roles Grid Bar
  const roleW = 2.88;
  const roleGap = 0.2;
  const roles = [
    { role: "👨‍💼 Tehsildar (RO)", name: "Rajesh Kumar #8821", desc: "Quasi-judicial mutation adjudication" },
    { role: "🏗️ Town Planning", name: "Priya Sharma #4402", desc: "Zoning bylaws & municipal NOCs" },
    { role: "📊 District Collector", name: "Aman Verma #1001", desc: "High-risk escalation & circle audits" },
    { role: "⚙️ System Admin", name: "IT Ops Desk #0099", desc: "API gateways & cryptographic keys" },
  ];

  roles.forEach((r, idx) => {
    const rx = 0.6 + idx * (roleW + roleGap);
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: rx,
      y: 2.05,
      w: roleW,
      h: 0.75,
      fill: { color: C.cardBg },
      line: { color: C.slateBorder, width: 1 },
      rectRadius: 0.08,
    });
    slide.addText(r.role, {
      x: rx + 0.1,
      y: 2.1,
      w: roleW - 0.2,
      h: 0.25,
      fontSize: 10,
      fontFace: fontHeading,
      bold: true,
      color: C.slateDark,
    });
    slide.addText(`${r.name}  •  ${r.desc}`, {
      x: rx + 0.1,
      y: 2.35,
      w: roleW - 0.2,
      h: 0.4,
      fontSize: 8,
      fontFace: fontBody,
      color: C.slateLight,
    });
  });

  // 3 Actionable Mutation Decision Cards
  const actW = 3.84;
  const actGap = 0.3;
  const actY = 2.95;
  const actH = 2.5;

  // Flow 1: Approve
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6,
    y: actY,
    w: actW,
    h: actH,
    fill: { color: C.emeraldLight },
    line: { color: C.emeraldBorder, width: 2 },
    rectRadius: 0.1,
  });
  slide.addText("🟢  APPROVE FLOW (DigiLocker Gated)", {
    x: 0.8,
    y: actY + 0.15,
    w: 3.44,
    h: 0.3,
    fontSize: 11,
    fontFace: fontHeading,
    bold: true,
    color: C.emerald,
  });
  slide.addText([
    { text: "1. Officer Approval: ", options: { bold: true, color: C.slateDark } },
    { text: "Triggers mandatory DigiLocker Sovereign eKYC modal.\n\n", options: { color: C.slateMid } },
    { text: "2. Cryptographic eKYC: ", options: { bold: true, color: C.slateDark } },
    { text: "Citizen authorizes via 6-digit OTP / Aadhaar Virtual ID.\n\n", options: { color: C.slateMid } },
    { text: "3. Instant Certification: ", options: { bold: true, color: C.slateDark } },
    { text: "Displays 'Welcome Home!' onboarding popup & auto-downloads official 7/12 RoR Certificate with digital seals.", options: { color: C.slateMid } },
  ], {
    x: 0.8,
    y: actY + 0.5,
    w: 3.44,
    h: 1.9,
    fontSize: 9,
    fontFace: fontBody,
  });

  // Flow 2: Reject
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6 + actW + actGap,
    y: actY,
    w: actW,
    h: actH,
    fill: { color: C.crimsonLight },
    line: { color: C.crimsonBorder, width: 2 },
    rectRadius: 0.1,
  });
  slide.addText("🔴  REJECT FLOW (Audit Mandatory)", {
    x: 0.6 + actW + actGap + 0.2,
    y: actY + 0.15,
    w: 3.44,
    h: 0.3,
    fontSize: 11,
    fontFace: fontHeading,
    bold: true,
    color: C.crimson,
  });
  slide.addText([
    { text: "1. Statutory Rejection Code: ", options: { bold: true, color: C.slateDark } },
    { text: "Officer must select legal code (Title Inconsistency, Disputed Succession, Active Encumbrance).\n\n", options: { color: C.slateMid } },
    { text: "2. Written Audit Justification: ", options: { bold: true, color: C.slateDark } },
    { text: "Mandatory detailed rejection comment logged to public ledger.\n\n", options: { color: C.slateMid } },
    { text: "3. Anti-Corruption Safeguard: ", options: { bold: true, color: C.slateDark } },
    { text: "Prevents arbitrary backroom rejections.", options: { color: C.slateMid } },
  ], {
    x: 0.6 + actW + actGap + 0.2,
    y: actY + 0.5,
    w: 3.44,
    h: 1.9,
    fontSize: 9,
    fontFace: fontBody,
  });

  // Flow 3: Hold
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6 + (actW + actGap) * 2,
    y: actY,
    w: actW,
    h: actH,
    fill: { color: C.skyLight },
    line: { color: C.skyBorder, width: 2 },
    rectRadius: 0.1,
  });
  slide.addText("🔵  HOLD / SURVEY FLOW", {
    x: 0.6 + (actW + actGap) * 2 + 0.2,
    y: actY + 0.15,
    w: 3.44,
    h: 0.3,
    fontSize: 11,
    fontFace: fontHeading,
    bold: true,
    color: C.sky,
  });
  slide.addText([
    { text: "1. Clock Suspension: ", options: { bold: true, color: C.slateDark } },
    { text: "Temporarily halts statutory 48-hour countdown clock.\n\n", options: { color: C.slateMid } },
    { text: "2. Demarcation Work Order: ", options: { bold: true, color: C.slateDark } },
    { text: "Dispatches GPS boundary coordinates directly to local surveyor rover units.\n\n", options: { color: C.slateMid } },
    { text: "3. Ground Verification: ", options: { bold: true, color: C.slateDark } },
    { text: "Surveyor uploads physical boundary coordinates to reconcile discrepancy.", options: { color: C.slateMid } },
  ], {
    x: 0.6 + (actW + actGap) * 2 + 0.2,
    y: actY + 0.5,
    w: 3.44,
    h: 1.9,
    fontSize: 9,
    fontFace: fontBody,
  });

  // Bottom Analytics & Audit Banner
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6,
    y: 5.55,
    w: 12.13,
    h: 1.25,
    fill: { color: C.cardBg },
    line: { color: C.slateBorder, width: 1 },
    rectRadius: 0.1,
  });
  slide.addText("ENTERPRISE ANALYTICS DASHBOARD & IMMUTABLE AUDIT TRAIL", {
    x: 0.8,
    y: 5.65,
    w: 8.0,
    h: 0.3,
    fontSize: 10,
    fontFace: fontHeading,
    bold: true,
    color: C.slateDark,
  });
  slide.addText([
    { text: "• Recharts Analytics Engine: ", options: { bold: true, color: C.slateDark } },
    { text: "Live tracking of Monthly Mutation Settlement Efficiency, Land Use Zoning Distribution, and e-Stamp Duty vs Property Tax collection.\n", options: { color: C.slateMid } },
    { text: "• SHA-256 Cryptographic Audit Ledger: ", options: { bold: true, color: C.emerald } },
    { text: "Every keystroke, eKYC validation, and rejection comment is permanently hashed: [Timestamp | Officer ID | ULPIN | Action Code | SHA-256 Hash]. Eliminates retrospective file tampering.", options: { color: C.slateMid } },
  ], {
    x: 0.8,
    y: 5.95,
    w: 11.73,
    h: 0.75,
    fontSize: 9,
    fontFace: fontBody,
  });

  slide.addNotes(
    "SPEAKER SCRIPT (40 Sec):\n" +
    "\"Now look at the operational engine where the Revenue Officer actually works. In standard government offices, mutations happen in backrooms with rubber stamps. On LandStack, every action is governed by strict, role-based workflows. When the Tehsildar approves a mutation, our system fires a mandatory DigiLocker eKYC verification. Only after biometric/OTP cryptographic signing does the system commit the transfer, generate the official 7/12 Record of Rights certificate, and trigger an onboarding dossier. If an officer rejects an application, they cannot simply dismiss it—they must enter statutory legal codes and written justifications. Everything is permanently locked into a SHA-256 immutable audit trail. Corruption is eliminated by design.\"\n\n" +
    "JUDGE DEFENSE:\n" +
    "Q: Rural Patwaris are not tech-savvy. How will they use this?\n" +
    "A: We designed LandStack with a Light Material UI mirroring consumer banking apps. It requires zero command-line or GIS expertise. Officers have 3 clean buttons: Approve (Green), Reject (Red), and Hold (Blue). The system handles the complex spatial projection, CERSAI bank checking, and DigiLocker validation behind the scenes, cutting clerk training time from 3 months to 20 minutes."
  );
}

// ====================================================================
// SLIDE 6: SCALABILITY, REAL-WORLD IMPACT & IMPLEMENTATION ROADMAP
// ====================================================================
{
  const slide = pres.addSlide();
  addSlideHeader(slide, 6, "Scalability, Real-World Impact & Roadmap", "PRODUCTION READY | NGRODR COMPLIANT");

  // Title Box
  slide.addText("Production-Ready, Scalable Across National Registries", {
    x: 0.6,
    y: 1.05,
    w: 12.13,
    h: 0.5,
    fontSize: 21,
    fontFace: fontHeading,
    bold: true,
    color: C.slateDark,
  });
  slide.addText("Measurable macroeconomic savings, production tech stack, and 3-phase rollout into NGRODR.", {
    x: 0.6,
    y: 1.55,
    w: 12.13,
    h: 0.35,
    fontSize: 12,
    fontFace: fontBody,
    color: C.slateLight,
  });

  // 3-Column Layout: Impact Metrics (4.0 in) | Tech Stack (3.2 in) | Roadmap (4.4 in)
  // Col 1: Quantified Impact
  const c1X = 0.6;
  const c1W = 3.9;
  slide.addText("QUANTIFIED IMPACT METRICS", {
    x: c1X,
    y: 2.05,
    w: c1W,
    h: 0.35,
    fontSize: 10.5,
    fontFace: fontHeading,
    bold: true,
    color: C.slateDark,
  });

  // Metric 1: 80%
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: c1X,
    y: 2.45,
    w: c1W,
    h: 1.25,
    fill: { color: C.cardBg },
    line: { color: C.emeraldBorder, width: 2 },
    rectRadius: 0.1,
  });
  slide.addText("80% REDUCTION", {
    x: c1X + 0.15,
    y: 2.55,
    w: c1W - 0.3,
    h: 0.3,
    fontSize: 13,
    fontFace: fontHeading,
    bold: true,
    color: C.emerald,
  });
  slide.addText("Mutation Processing Latency\nTurnaround slashed from 60 days to under 48 hours via automated triage and DigiLocker validation.", {
    x: c1X + 0.15,
    y: 2.85,
    w: c1W - 0.3,
    h: 0.75,
    fontSize: 9,
    fontFace: fontBody,
    color: C.slateMid,
  });

  // Metric 2: 100%
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: c1X,
    y: 3.85,
    w: c1W,
    h: 1.25,
    fill: { color: C.cardBg },
    line: { color: C.skyBorder, width: 2 },
    rectRadius: 0.1,
  });
  slide.addText("100% ELIMINATION", {
    x: c1X + 0.15,
    y: 3.95,
    w: c1W - 0.3,
    h: 0.3,
    fontSize: 13,
    fontFace: fontHeading,
    bold: true,
    color: C.sky,
  });
  slide.addText("Data Reconciliation Errors\nULPIN primary key eradicates cross-departmental mismatches between deeds, 7/12 RoRs, and tax ledgers.", {
    x: c1X + 0.15,
    y: 4.25,
    w: c1W - 0.3,
    h: 0.75,
    fontSize: 9,
    fontFace: fontBody,
    color: C.slateMid,
  });

  // Metric 3: Zero Fraud
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: c1X,
    y: 5.25,
    w: c1W,
    h: 1.25,
    fill: { color: C.cardBg },
    line: { color: C.purpleBorder, width: 2 },
    rectRadius: 0.1,
  });
  slide.addText("ZERO UNAUTHORIZED MUTATIONS", {
    x: c1X + 0.15,
    y: 5.35,
    w: c1W - 0.3,
    h: 0.3,
    fontSize: 12,
    fontFace: fontHeading,
    bold: true,
    color: C.purple,
  });
  slide.addText("Sovereign Legal Non-Repudiation\nMandatory DigiLocker biometric/OTP signatures make title impersonation and paper forgery impossible.", {
    x: c1X + 0.15,
    y: 5.65,
    w: c1W - 0.3,
    h: 0.75,
    fontSize: 9,
    fontFace: fontBody,
    color: C.slateMid,
  });

  // Col 2: Production Tech Stack (3.4 in)
  const c2X = 4.8;
  const c2W = 3.3;
  slide.addText("PRODUCTION TECH STACK", {
    x: c2X,
    y: 2.05,
    w: c2W,
    h: 0.35,
    fontSize: 10.5,
    fontFace: fontHeading,
    bold: true,
    color: C.slateDark,
  });

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: c2X,
    y: 2.45,
    w: c2W,
    h: 4.05,
    fill: { color: C.cardBg },
    line: { color: C.slateBorder, width: 1 },
    rectRadius: 0.1,
  });

  const stackItems = [
    { label: "Frontend Core", val: "React 19 + Vite 8.x" },
    { label: "Design System", val: "Tailwind CSS v4 (Light UI)" },
    { label: "Spatial Canvas", val: "Leaflet (preferCanvas)" },
    { label: "Analytics Engine", val: "Recharts Responsive" },
    { label: "Identity & eKYC", val: "DigiLocker REST Gateway" },
    { label: "Audit Ledger", val: "SHA-256 Tamper-Proof" },
    { label: "CI/CD & Edge", val: "Vercel Global Edge CDN" },
  ];

  stackItems.forEach((st, idx) => {
    const sy = 2.65 + idx * 0.52;
    slide.addText(st.label, {
      x: c2X + 0.15,
      y: sy,
      w: 1.4,
      h: 0.3,
      fontSize: 8.5,
      fontFace: fontHeading,
      bold: true,
      color: C.slateLight,
    });
    slide.addText(st.val, {
      x: c2X + 1.5,
      y: sy,
      w: 1.65,
      h: 0.3,
      fontSize: 8.5,
      fontFace: fontMono,
      color: C.slateDark,
      bold: true,
      align: "right",
    });
  });

  // Col 3: 3-Phase Roadmap (4.4 in)
  const c3X = 8.4;
  const c3W = 4.33;
  slide.addText("3-PHASE IMPLEMENTATION ROADMAP", {
    x: c3X,
    y: 2.05,
    w: c3W,
    h: 0.35,
    fontSize: 10.5,
    fontFace: fontHeading,
    bold: true,
    color: C.slateDark,
  });

  // Phase 1
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: c3X,
    y: 2.45,
    w: c3W,
    h: 1.25,
    fill: { color: C.emeraldLight },
    line: { color: C.emeraldBorder, width: 1 },
    rectRadius: 0.1,
  });
  slide.addText("PHASE 1: Gandhinagar Pilot (LIVE NOW)", {
    x: c3X + 0.15,
    y: 2.55,
    w: c3W - 0.3,
    h: 0.3,
    fontSize: 10.5,
    fontFace: fontHeading,
    bold: true,
    color: C.emerald,
  });
  slide.addText("Fully mapped Sectors 21 & 22 cadastre with real polygon geometry, AI satellite inspector, and DigiLocker eKYC mutation lifecycle.", {
    x: c3X + 0.15,
    y: 2.85,
    w: c3W - 0.3,
    h: 0.75,
    fontSize: 9,
    fontFace: fontBody,
    color: C.slateDark,
  });

  // Phase 2
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: c3X,
    y: 3.85,
    w: c3W,
    h: 1.25,
    fill: { color: C.skyLight },
    line: { color: C.skyBorder, width: 1 },
    rectRadius: 0.1,
  });
  slide.addText("PHASE 2: Statewide Gujarat Expansion (Q3-Q4 2026)", {
    x: c3X + 0.15,
    y: 3.95,
    w: c3W - 0.3,
    h: 0.3,
    fontSize: 10.5,
    fontFace: fontHeading,
    bold: true,
    color: C.sky,
  });
  slide.addText("Direct integration with Gujarat Revenue Dept e-Dhara and e-Garvi registry across 33 Collectorates and 250+ Talukas.", {
    x: c3X + 0.15,
    y: 4.25,
    w: c3W - 0.3,
    h: 0.75,
    fontSize: 9,
    fontFace: fontBody,
    color: C.slateDark,
  });

  // Phase 3
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: c3X,
    y: 5.25,
    w: c3W,
    h: 1.25,
    fill: { color: C.purpleLight },
    line: { color: C.purpleBorder, width: 1 },
    rectRadius: 0.1,
  });
  slide.addText("PHASE 3: Pan-India National DPI (2027 - 2028)", {
    x: c3X + 0.15,
    y: 5.35,
    w: c3W - 0.3,
    h: 0.3,
    fontSize: 10.5,
    fontFace: fontHeading,
    bold: true,
    color: C.purple,
  });
  slide.addText("Federated integration with NGRODR and Digital India Land Records Modernization Programme (DILRMP) for 6.5 lakh villages nationwide.", {
    x: c3X + 0.15,
    y: 5.65,
    w: c3W - 0.3,
    h: 0.75,
    fontSize: 9,
    fontFace: fontBody,
    color: C.slateDark,
  });

  slide.addNotes(
    "SPEAKER SCRIPT (40 Sec - CLOSER):\n" +
    "\"Judges, LandStack is not an unverified idea or a Figma mockup. It is a live, production-grade platform built on React 19, Leaflet canvas rendering, and Tailwind CSS. In our Gandhinagar pilot, LandStack reduces mutation latency by 80%—taking it from 60 days down to under 48 hours—while driving reconciliation errors and fraudulent mutations to absolute zero. Our Phase 1 pilot is live today in Gandhinagar Sectors 21 and 22. Phase 2 connects Gujarat's e-Dhara and e-Garvi state databases. And Phase 3 plugs into the National Generic Document Registration System (NGRODR) to create a unified Digital Public Infrastructure for 1.4 billion citizens. We have the code, we have the architecture, and we are ready to deploy. Thank you, and we welcome your questions!\"\n\n" +
    "JUDGE DEFENSE:\n" +
    "Q: Land is a State subject under the Indian Constitution (List II, Entry 18). How can a single platform handle different state tenancy and land revenue laws?\n" +
    "A: That is the exact brilliance of our Digital Public Infrastructure (DPI) architecture. Just like UPI doesn't alter whether a citizen banks with SBI or HDFC, LandStack does not alter state tenancy laws. LandStack provides an unbundled, open API protocol layer anchored by the Central Government's 14-digit ULPIN standard. Gujarat can enforce its Bombay Land Revenue Code, while Maharashtra enforces the MLRC through modular governance rules plugged into Layer 2, without changing the underlying spatial or identity primitives. That is how DPI succeeds in a federal democracy."
  );
}

// Generate the PPTX File
const outputPath = path.resolve("..", "LandStack-SIH-Winning-Pitch-Deck.pptx");
pres.writeFile({ fileName: outputPath })
  .then(fileName => {
    console.log(`SUCCESS: PowerPoint presentation created at ${fileName}`);
  })
  .catch(err => {
    console.error("ERROR generating presentation:", err);
    process.exit(1);
  });
