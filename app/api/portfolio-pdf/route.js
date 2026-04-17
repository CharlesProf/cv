export const runtime = "nodejs";

import PDFDocument from "pdfkit";

// ─── Data (inline to avoid ESM/CJS import issues in route) ───────────────────
const experiences = [
  {
    title: "Backend Software Engineer / IT Consultant",
    date: "July 2025 – Present",
    place: "BitHealth (IT Healthcare Consultant) – Assigned to Siloam Hospitals Group, Indonesia",
    points: [
      "Developed and maintained backend services for healthcare applications used by Siloam Hospitals, one of Indonesia's largest hospital networks.",
      "Managed and improved existing application workflows, ensuring system stability and efficient data processing.",
      "Contributed to a large-scale CRM integration project with Avanade to enable personalized customer engagement.",
      "Implemented device token integration to support push notification services within CRM customer journeys.",
      "Participated in WhatsApp integration with 8x8 to support automated patient communication and engagement.",
      "Contributed to patient personalization features based on treatment history and predefined criteria.",
    ],
  },
  {
    title: "Backend Developer Intern",
    date: "August 2023 – June 2024",
    place: "PT. Inovasi Sukses Sentosa, Indonesia",
    points: [
      "Developed new backend features in collaboration with multiple internal teams for business and operational needs.",
      "Maintained and fixed existing systems while optimizing modules to improve website loading performance.",
      "Supported feature development across frontend and backend using ASP.NET, C#, and React.",
      "Improved code structure and maintainability through iterative enhancements and technical cleanup.",
    ],
  },
];

const education = [
  {
    title: "Bachelor of Computer Science",
    date: "2020 – 2024",
    place: "Bina Nusantara University (BINUS)",
    description:
      "Computer Science Global Class graduate. Focused on Intelligent Systems, Database Technology, Software Engineering, and Network Technology. GPA: 3.70. Active member of the university badminton club.",
  },
  {
    title: "Student Exchange Program",
    date: "Jan 2023 – Jun 2023",
    place: "Tampere University, Finland",
    description:
      "Strengthened global collaboration experience and adaptability through international coursework and team-based assignments.",
  },
];

const projects = [
  {
    label: "Full Stack Web App",
    title: "Inventory & POS Management App",
    description:
      "A multi-role cashier and owner app where admins manage shops, products, categories, and track revenue & profit. Employees handle sales transactions with cart checkout.",
    techStack: ["Next.js", "Neon Serverless PostgreSQL", "Vercel", "Tailwind CSS"],
    liveLink: "https://my-ecommerce-6s1bddcxq-charles-projects-73090cc9.vercel.app/",
  },
  {
    label: "Thesis Project",
    title: "Campus Event Network App",
    description:
      "A web application centralizing campus event discovery for students who need community service hours and student activity scores for graduation requirements.",
    techStack: ["Next.js", "Prisma PostgreSQL", "Firebase", "Bootstrap", "JavaScript"],
    liveLink: "https://youtu.be/RAJ-jVMKBfA?si=Jtuj4Wa4o6pQnwQN",
  },
  {
    label: "Seller Dashboard",
    title: "Indotrading Seller Analytics Dashboard",
    description:
      "A seller dashboard on Indonesia's largest B2B supplier network featuring visitor analytics, RFQ statistics, product performance tracking, and SLA monitoring.",
    techStack: ["ASP.NET", "C#", "React", "SQL Server", "MongoDB", "Redis"],
    liveLink: "https://seller.indotrading.com",
  },
];

const skills = [
  { name: "C# / ASP.NET", value: 100 },
  { name: "C Programming", value: 100 },
  { name: "Laravel (PHP)", value: 95 },
  { name: "PostgreSQL / SQL", value: 95 },
  { name: "HTML / CSS", value: 95 },
  { name: "JavaScript", value: 90 },
  { name: "MongoDB", value: 90 },
  { name: "React.js", value: 85 },
  { name: "Express.js (Node)", value: 85 },
  { name: "Git", value: 85 },
  { name: "Python", value: 75 },
  { name: "Figma", value: 65 },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const ACCENT = "#2563eb";
const DARK = "#111827";
const MID = "#374151";
const LIGHT = "#6b7280";
const BG_BADGE = "#dbeafe";
const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN_X = 45;
const CONTENT_W = PAGE_W - MARGIN_X * 2;

function wrapText(doc, text, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let current = "";
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (doc.widthOfString(test) <= maxWidth) {
      current = test;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function drawHRule(doc, y, color = "#e5e7eb") {
  doc.save().moveTo(MARGIN_X, y).lineTo(PAGE_W - MARGIN_X, y).strokeColor(color).lineWidth(0.5).stroke().restore();
}

function sectionHeader(doc, y, title) {
  doc
    .font("Helvetica-Bold")
    .fontSize(9)
    .fillColor(ACCENT)
    .text(title.toUpperCase(), MARGIN_X, y, { characterSpacing: 1.2 });
  const newY = doc.y + 3;
  drawHRule(doc, newY, "#dbeafe");
  return newY + 7;
}

function bulletPoints(doc, points, startY, indent = 10) {
  let y = startY;
  const bulletX = MARGIN_X + indent;
  const textX = bulletX + 10;
  const textW = CONTENT_W - indent - 10;

  for (const pt of points) {
    const lines = wrapText(doc, pt, textW);
    const blockH = lines.length * 13 + 2;
    if (y + blockH > PAGE_H - 50) {
      doc.addPage();
      y = 45;
    }
    doc.save().fillColor(ACCENT).circle(bulletX + 2, y + 4, 2).fill().restore();
    doc.font("Helvetica").fontSize(9).fillColor(MID);
    lines.forEach((line, i) => {
      doc.text(line, textX, y + i * 13, { lineBreak: false });
    });
    y += blockH + 2;
  }
  return y;
}

// ─── PDF builder ─────────────────────────────────────────────────────────────
function buildPortfolioPDF() {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 0, bufferPages: true, info: { Title: "Charles Wilbert – Portfolio" } });
    const chunks = [];
    doc.on("data", (c) => chunks.push(c));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    let y = 40;

    // ── Header ───────────────────────────────────────────────────────────────
    doc.font("Helvetica-Bold").fontSize(24).fillColor(DARK).text("Charles Wilbert", MARGIN_X, y);
    y = doc.y + 4;
    doc.font("Helvetica").fontSize(10).fillColor(LIGHT)
      .text("Backend Software Engineer  ·  IT Consultant  ·  Full Stack Developer", MARGIN_X, y);
    y = doc.y + 6;

    // contact row
    doc.font("Helvetica").fontSize(8.5).fillColor(ACCENT)
      .text("+62 811-7000-789", MARGIN_X, y, { continued: true })
      .text("   ·   charles.wilbert2408@gmail.com", { continued: true })
      .text("   ·   linkedin.com/in/charleswilbert", { continued: true })
      .text("   ·   github.com/CharlesProf");
    y = doc.y + 4;
    drawHRule(doc, y, ACCENT);
    y += 14;

    // ── About ────────────────────────────────────────────────────────────────
    y = sectionHeader(doc, y, "About");
    doc.font("Helvetica").fontSize(9).fillColor(MID)
      .text(
        "Computer Science Global Class graduate from BINUS University with professional experience in healthcare technology. " +
        "Specializes in backend engineering, system integration, and enterprise application development with hands-on work in " +
        "CRM integration, push notification services, and communication workflows. Currently serving as a Data Governance " +
        "Consultant at Siloam Hospitals Group, contributing to data management and governance initiatives. Open to new opportunities.",
        MARGIN_X, y, { width: CONTENT_W, lineGap: 2 }
      );
    y = doc.y + 16;

    // ── Work Experience ───────────────────────────────────────────────────────
    y = sectionHeader(doc, y, "Work Experience");
    for (const exp of experiences) {
      if (y > PAGE_H - 100) { doc.addPage(); y = 45; }
      // title + date
      doc.font("Helvetica-Bold").fontSize(10).fillColor(DARK).text(exp.title, MARGIN_X, y, { continued: true });
      doc.font("Helvetica").fontSize(8.5).fillColor(LIGHT)
        .text(`   ${exp.date}`, { align: "right", width: CONTENT_W });
      y = doc.y + 1;
      doc.font("Helvetica-Oblique").fontSize(8.5).fillColor(LIGHT).text(exp.place, MARGIN_X, y);
      y = doc.y + 5;
      y = bulletPoints(doc, exp.points, y);
      y += 8;
    }

    // ── Education ─────────────────────────────────────────────────────────────
    if (y > PAGE_H - 120) { doc.addPage(); y = 45; }
    y = sectionHeader(doc, y, "Education");
    for (const edu of education) {
      doc.font("Helvetica-Bold").fontSize(10).fillColor(DARK).text(edu.title, MARGIN_X, y, { continued: true });
      doc.font("Helvetica").fontSize(8.5).fillColor(LIGHT)
        .text(`   ${edu.date}`, { align: "right", width: CONTENT_W });
      y = doc.y + 1;
      doc.font("Helvetica-Oblique").fontSize(8.5).fillColor(LIGHT).text(edu.place, MARGIN_X, y);
      y = doc.y + 4;
      doc.font("Helvetica").fontSize(9).fillColor(MID)
        .text(edu.description, MARGIN_X, y, { width: CONTENT_W, lineGap: 2 });
      y = doc.y + 12;
    }

    // ── Page 2 – Projects + Skills ────────────────────────────────────────────
    doc.addPage();
    y = 40;

    y = sectionHeader(doc, y, "Projects");
    for (const proj of projects) {
      if (y > PAGE_H - 120) { doc.addPage(); y = 45; }

      // card background
      const cardH = 95;
      doc.save().rect(MARGIN_X, y, CONTENT_W, cardH).fill("#f8fafc").restore();
      doc.save().rect(MARGIN_X, y, 3, cardH).fill(ACCENT).restore();

      const inner = MARGIN_X + 12;
      const innerW = CONTENT_W - 14;
      let cy = y + 8;

      doc.font("Helvetica-Bold").fontSize(8).fillColor(ACCENT)
        .text(proj.label.toUpperCase(), inner, cy, { characterSpacing: 0.8 });
      cy = doc.y + 2;
      doc.font("Helvetica-Bold").fontSize(10.5).fillColor(DARK).text(proj.title, inner, cy);
      cy = doc.y + 3;
      doc.font("Helvetica").fontSize(8.5).fillColor(MID)
        .text(proj.description, inner, cy, { width: innerW, lineGap: 1.5 });
      cy = doc.y + 5;

      // tech badges (simple text chips)
      let bx = inner;
      for (const tech of proj.techStack) {
        const tw = doc.widthOfString(tech, { fontSize: 7.5 }) + 10;
        if (bx + tw > PAGE_W - MARGIN_X) break;
        doc.save().roundedRect(bx, cy, tw, 13, 3).fill(BG_BADGE).restore();
        doc.font("Helvetica-Bold").fontSize(7.5).fillColor(ACCENT).text(tech, bx + 5, cy + 3, { lineBreak: false });
        bx += tw + 5;
      }
      cy += 16;
      doc.font("Helvetica").fontSize(8).fillColor(ACCENT).text(proj.liveLink, inner, cy);

      y += cardH + 8;
    }

    // ── Skills ────────────────────────────────────────────────────────────────
    if (y > PAGE_H - 220) { doc.addPage(); y = 45; }
    y = sectionHeader(doc, y, "Technical Skills");

    const COL_W = (CONTENT_W - 20) / 2;
    const half = Math.ceil(skills.length / 2);
    const leftCol = skills.slice(0, half);
    const rightCol = skills.slice(half);

    const drawSkillCol = (col, startX, startY) => {
      let sy = startY;
      for (const sk of col) {
        doc.font("Helvetica").fontSize(8.5).fillColor(MID).text(sk.name, startX, sy, { lineBreak: false });
        doc.font("Helvetica").fontSize(8).fillColor(LIGHT)
          .text(`${sk.value}%`, startX + COL_W - 25, sy, { lineBreak: false });
        sy = sy + 12;
        // track bar
        doc.save().rect(startX, sy, COL_W - 28, 4).fill("#e5e7eb").restore();
        doc.save().rect(startX, sy, (COL_W - 28) * (sk.value / 100), 4).fill(ACCENT).restore();
        sy += 10;
      }
      return sy;
    };

    drawSkillCol(leftCol, MARGIN_X, y);
    drawSkillCol(rightCol, MARGIN_X + COL_W + 20, y);

    // ── Footer on every page ──────────────────────────────────────────────────
    const range = doc.bufferedPageRange();
    for (let i = 0; i < range.count; i++) {
      doc.switchToPage(range.start + i);
      drawHRule(doc, PAGE_H - 28, "#e5e7eb");
      doc.font("Helvetica").fontSize(7.5).fillColor(LIGHT)
        .text("Charles Wilbert – Portfolio", MARGIN_X, PAGE_H - 20, { continued: true })
        .text(`${i + 1} / ${range.count}`, { align: "right", width: CONTENT_W });
    }

    doc.end();
  });
}

// ─── Route handler ───────────────────────────────────────────────────────────
export async function GET() {
  try {
    const buffer = await buildPortfolioPDF();
    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="charles-wilbert-portfolio.pdf"',
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err) {
    console.error("Portfolio PDF generation failed:", err);
    return new Response("Failed to generate portfolio PDF", { status: 500 });
  }
}
