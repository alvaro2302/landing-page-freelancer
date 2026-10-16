import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import LegalPage from "@/pages/LegalPage";
import { LEGAL_DOCS, LEGAL_ROUTES } from "@/content/legal";

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
