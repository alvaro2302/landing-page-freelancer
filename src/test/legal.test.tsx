import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import LegalPage from "@/pages/LegalPage";
import { LEGAL_DOCS, LEGAL_ROUTES, type LegalBlock, type LegalDocument } from "@/content/legal";

const blockStrings = (b: LegalBlock): string[] => {
  switch (b.k) {
    case "p":
      return [b.t, b.l ?? ""];
    case "h":
      return [b.t];
    case "c":
      return [b.l, b.t];
    case "ul":
    case "ol":
      return b.items.flat();
    case "table":
      return [...b.head, ...b.rows.flat()];
  }
};

/** Every string the page renders for a document. */
const renderedStrings = (d: LegalDocument): string[] => [
  d.title1, d.title2, d.subtitle, d.date, d.contactTitle, d.address,
  ...(d.glance ?? []).flatMap((g) => [g.title, g.text]),
  ...d.sections.flatMap((s) => [s.title, ...s.blocks.flatMap(blockStrings)]),
];

const tableRows = (d: LegalDocument, section: string): string[][] =>
  d.sections
    .find((s) => s.n === section)!
    .blocks.flatMap((b) => (b.k === "table" ? b.rows : []));

const renderAt = (path: string) => {
  // LanguageProvider reads ?lang from window.location, so mirror the test URL there.
  window.history.pushState({}, "", path);
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path={LEGAL_ROUTES.terms} element={<LegalPage doc="terms" />} />
        <Route path={LEGAL_ROUTES.privacy} element={<LegalPage doc="privacy" />} />
      </Routes>
    </MemoryRouter>,
  );
};

describe("legal content", () => {
  it("has the same sections in English and Spanish", () => {
    for (const doc of ["terms", "privacy"] as const) {
      const en = LEGAL_DOCS[doc].en.sections.map((s) => s.n);
      const es = LEGAL_DOCS[doc].es.sections.map((s) => s.n);
      expect(es).toEqual(en);
    }
  });

  it("has no [bracketed] template placeholders left", () => {
    for (const doc of ["terms", "privacy"] as const) {
      for (const lang of ["en", "es"] as const) {
        const leftovers = renderedStrings(LEGAL_DOCS[doc][lang]).filter((s) => /\[[^\]]+\]/.test(s));
        expect(leftovers, `${doc}/${lang}`).toEqual([]);
      }
    }
  });

  it("lists PhotoRestore in Appendix A and keeps Section 10 (anchor #privacy-10)", () => {
    for (const lang of ["en", "es"] as const) {
      const privacy = LEGAL_DOCS.privacy[lang];
      expect(tableRows(privacy, "A").map((r) => r[0])).toContain("PhotoRestore");
      expect(privacy.sections.some((s) => s.n === "10")).toBe(true);
    }
  });

  it("names every provider that receives photos in Section 5", () => {
    for (const lang of ["en", "es"] as const) {
      const providers = tableRows(LEGAL_DOCS.privacy[lang], "5").map((r) => r[0]);
      for (const name of ["Replicate, Inc.", "OpenAI, L.L.C.", "Google LLC (Gemini API)", "Supabase, Inc.", "Fly.io, Inc."]) {
        expect(providers).toContain(name);
      }
    }
  });

  it("uses separate, stable routes for each document", () => {
    expect(LEGAL_ROUTES).toEqual({ terms: "/terms", privacy: "/privacy" });
  });
});

describe("LegalPage", () => {
  beforeEach(() => window.localStorage.clear());

  it("renders the Terms of Service at /terms", () => {
    renderAt("/terms?lang=en");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Terms of Service");
    expect(screen.getByRole("heading", { name: "Agreement and scope" })).toBeInTheDocument();
  });

  it("renders the Privacy Policy at /privacy", () => {
    renderAt("/privacy?lang=en");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Privacy Policy");
    expect(screen.getByRole("heading", { name: "Appendix A: Apps covered by this policy" })).toBeInTheDocument();
  });

  it("opens in Spanish with ?lang=es and shows the translation notice", () => {
    renderAt("/privacy?lang=es");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Política de Privacidad");
    expect(screen.getByRole("note")).toHaveTextContent("prevalece la versión en inglés");
  });

  it("switches language with the toggle", () => {
    renderAt("/terms?lang=en");
    fireEvent.click(screen.getByRole("button", { name: "Cambiar a español" }));
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Términos de Servicio");
    expect(window.localStorage.getItem("language")).toBe("es");
  });

  it("navigates between documents with the tabs", () => {
    renderAt("/terms?lang=en");
    fireEvent.click(screen.getByRole("tab", { name: /Privacy/ }));
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Privacy Policy");
  });
});
