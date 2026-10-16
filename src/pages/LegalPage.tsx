import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  ChevronDown,
  Cpu,
  Github,
  Info,
  List,
  Mail,
  Shield,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useLanguage, LanguageProvider } from '@/contexts/LanguageContext';
import {
  LEGAL_DOCS,
  LEGAL_EMAIL,
  LEGAL_ROUTES,
  LEGAL_UI,
  type LegalBlock,
  type LegalDocId,
  type LegalItem,
  type LegalSection,
} from '@/content/legal';
import { cn } from '@/lib/utils';
import iconBussines from '@/assets/IconNetwork.png';

// Bracketed placeholders are highlighted only while developing, so they are easy to spot.
const HIGHLIGHT_PLACEHOLDERS = import.meta.env.DEV;

const glanceIcons = { shield: Shield, chip: Cpu, trash: Trash2 };

const sectionId = (doc: LegalDocId, section: LegalSection) => `${doc}-${section.n.toLowerCase()}`;
const sectionNumber = (n: string) => (/^\d$/.test(n) ? `0${n}` : n);

const RichText = ({ text }: { text: string }) => (
  <>
    {text.split(/(\[[^\]]+\])/).filter(Boolean).map((part, i) =>
      HIGHLIGHT_PLACEHOLDERS && /^\[.*\]$/.test(part) ? (
        <mark key={i} className="rounded bg-amber-500/15 px-1 text-amber-400">
          {part}
        </mark>
      ) : (
        <span key={i}>{part}</span>
      ),
    )}
  </>
);

const ItemText = ({ item }: { item: LegalItem }) => {
  const [lead, text] = Array.isArray(item) ? item : ['', item];
  return (
    <span>
      {lead && <strong className="font-semibold text-foreground">{lead}</strong>}
      <RichText text={text} />
    </span>
  );
};

const gridColumns = (count: number) =>
  count === 4 ? '1fr 0.7fr 2fr 1.4fr' : count === 3 ? '1.1fr 1fr 1.2fr' : '1.2fr 1.4fr';

const Block = ({ block }: { block: LegalBlock }) => {
  switch (block.k) {
    case 'p':
      return (
        <p className="text-[15px] leading-7 text-muted-foreground">
          {block.l && <strong className="font-semibold text-foreground">{block.l}</strong>}
          <RichText text={block.t} />
        </p>
      );
    case 'h':
      return <h3 className="mt-1 text-[15px] font-bold text-foreground">{block.t}</h3>;
    case 'c':
      return (
        <div className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-4">
          <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-400" aria-hidden="true" />
          <p className="text-[15px] leading-relaxed text-amber-200">
            {block.l && <strong className="text-amber-400">{block.l}</strong>}
            {block.t}
          </p>
        </div>
      );
    case 'ul':
      return (
        <ul className="flex flex-col gap-2.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-slate-300">
              <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" aria-hidden="true" />
              <ItemText item={item} />
            </li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol className="flex flex-col gap-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-slate-300">
              <span
                className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <ItemText item={item} />
            </li>
          ))}
        </ol>
      );
    case 'table': {
      const columns: CSSProperties = { gridTemplateColumns: gridColumns(block.head.length) };
      return (
        <>
          {/* Desktop: grid table */}
          <div role="table" className="hidden overflow-hidden rounded-xl border border-white/10 text-sm md:block">
            <div role="row" className="grid bg-secondary/60" style={columns}>
              {block.head.map((h) => (
                <div key={h} role="columnheader" className="px-4 py-3 font-semibold text-foreground">
                  {h}
                </div>
              ))}
            </div>
            {block.rows.map((row, r) => (
              <div key={r} role="row" className="grid border-t border-white/5" style={columns}>
                {row.map((cell, c) => (
                  <div
                    key={c}
                    role="cell"
                    className={cn('px-4 py-3 leading-relaxed', c === 0 ? 'font-medium text-foreground' : 'text-muted-foreground')}
                  >
                    <RichText text={cell} />
                  </div>
                ))}
              </div>
            ))}
          </div>
          {/* Mobile: one card per row */}
          <div className="flex flex-col gap-2 md:hidden">
            {block.rows.map((row, r) => (
              <dl key={r} className="flex flex-col gap-2 rounded-lg bg-secondary/50 p-3.5">
                {row.map((cell, c) => (
                  <div key={c} className="flex flex-col gap-0.5">
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-primary">{block.head[c]}</dt>
                    <dd className="text-sm leading-relaxed text-slate-300">
                      <RichText text={cell} />
                    </dd>
                  </div>
                ))}
              </dl>
            ))}
          </div>
        </>
      );
    }
  }
};

const useActiveSection = (ids: string[]) => {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    setActive(ids[0]);
    if (typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-110px 0px -65% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return active;
};

const LegalPageContent = ({ doc }: { doc: LegalDocId }) => {
  const { language, setLanguage, t } = useLanguage();
  const ui = LEGAL_UI[language];
  const content = LEGAL_DOCS[doc][language];
  const [tocOpen, setTocOpen] = useState(false);

  const ids = useMemo(() => content.sections.map((s) => sectionId(doc, s)), [content, doc]);
  const active = useActiveSection(ids);

  useEffect(() => {
    document.title = `${doc === 'terms' ? ui.terms : ui.privacy} | Brothers Apps Studios`;
    document.documentElement.lang = language;
  }, [doc, language, ui]);

  const tabs: { id: LegalDocId; label: string; short: string }[] = [
    { id: 'terms', label: ui.terms, short: ui.termsShort },
    { id: 'privacy', label: ui.privacy, short: ui.privacyShort },
  ];

  const tocLinks = (onNavigate?: () => void) =>
    content.sections.map((section) => {
      const id = sectionId(doc, section);
      const isActive = id === active;
      return (
        <a
          key={id}
          href={`#${id}`}
          onClick={onNavigate}
          aria-current={isActive ? 'true' : undefined}
          className={cn(
            'rounded-lg px-3 py-2.5 text-sm leading-snug transition-colors',
            isActive ? 'bg-primary/10 font-semibold text-primary' : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {sectionNumber(section.n)} · {section.title}
        </a>
      );
    });

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-glass">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between gap-4 lg:h-20">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-30 h-10 rounded-lg bg-primary flex items-center justify-center">
                <img
                  src={iconBussines}
                  alt="AI-Powered Mobile App"
                  className="w-30 h-10 drop-shadow-2xl opacity-50 rounded-md"
                />
              </div>
              <span className="text-lg font-bold text-foreground">Brothers Apps Studios</span>
            </Link>

            <div className="flex items-center gap-2 md:gap-4">
              <Link
                to="/"
                className="hidden items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground md:inline-flex"
              >
                <ArrowLeft className="h-4 w-4" />
                {ui.back}
              </Link>
              <button
                onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                aria-label={language === 'es' ? 'Switch to English' : 'Cambiar a español'}
                className="rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
              >
                {language === 'es' ? 'EN' : 'ES'}
              </button>
              <Button asChild size="sm" className="hidden bg-primary font-medium text-primary-foreground hover:bg-primary/90 md:inline-flex">
                <a href="/#contact">{ui.contact}</a>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-16 lg:pt-20">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center gap-1.5 px-4 pt-2 text-sm text-muted-foreground transition-colors hover:text-foreground md:hidden"
        >
          <ArrowLeft className="h-4 w-4" />
          {ui.back}
        </Link>

        {/* Header */}
        <motion.header
          className="container mx-auto flex flex-col items-center gap-3 px-4 pb-8 pt-6 text-center md:gap-4 md:pb-12 md:pt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-medium uppercase tracking-widest text-primary">Legal</span>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            {content.title1}
            <span className="text-gradient">{content.title2}</span>
          </h1>
          <p className="max-w-2xl text-muted-foreground lg:text-lg">{content.subtitle}</p>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-card px-3.5 py-2 text-xs text-muted-foreground md:text-sm">
            <Calendar className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            {ui.updated} {content.date}
          </span>

          <div
            role="tablist"
            aria-label={ui.tablist}
            className="mt-2 grid w-full grid-cols-2 gap-1 rounded-xl border border-white/5 bg-card p-1 md:inline-flex md:w-auto"
          >
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                to={LEGAL_ROUTES[tab.id]}
                role="tab"
                aria-selected={tab.id === doc}
                className={cn(
                  'rounded-lg px-4 py-2.5 text-sm transition-colors',
                  tab.id === doc ? 'bg-secondary font-semibold text-foreground' : 'font-medium text-muted-foreground hover:text-foreground',
                )}
              >
                <span className="md:hidden">{tab.short}</span>
                <span className="hidden md:inline">{tab.label}</span>
              </Link>
            ))}
          </div>

          {ui.note && (
            <div
              role="note"
              className="mt-1 flex max-w-2xl items-start gap-2.5 rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-left text-sm leading-relaxed text-blue-200"
            >
              <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" aria-hidden="true" />
              <span>{ui.note}</span>
            </div>
          )}
        </motion.header>

        {/* At a glance */}
        {content.glance && (
          <div className="container mx-auto px-4 pb-6 md:pb-10">
            <div className="grid gap-3 md:grid-cols-3 md:gap-4">
              {content.glance.map((item) => {
                const Icon = glanceIcons[item.icon];
                return (
                  <div key={item.icon} className="flex items-start gap-3.5 rounded-2xl border border-primary/25 bg-card p-4 md:p-5">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/15">
                      <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    </span>
                    <div className="flex min-w-0 flex-col gap-1">
                      <p className="font-bold text-foreground">
                        <RichText text={item.title} />
                      </p>
                      <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Mobile table of contents */}
        <div className="container mx-auto px-4 pb-4 lg:hidden">
          <Collapsible open={tocOpen} onOpenChange={setTocOpen} className="overflow-hidden rounded-xl border border-white/5 bg-card">
            <CollapsibleTrigger className="flex min-h-[52px] w-full items-center justify-between px-4 text-sm font-semibold text-foreground">
              <span className="flex items-center gap-2.5">
                <List className="h-4 w-4 text-primary" aria-hidden="true" />
                {ui.onPage} · {content.sections.length} {ui.sections}
              </span>
              <ChevronDown className={cn('h-4 w-4 text-muted-foreground transition-transform', tocOpen && 'rotate-180')} aria-hidden="true" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <nav aria-label={ui.tocAria} className="flex flex-col gap-0.5 border-t border-white/5 p-2">
                {tocLinks(() => setTocOpen(false))}
              </nav>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Body */}
        <div className="container mx-auto flex items-start gap-12 px-4 pb-16 lg:pb-24">
          <aside className="sticky top-28 hidden max-h-[calc(100vh-8rem)] w-72 flex-shrink-0 overflow-y-auto rounded-2xl border border-white/5 bg-card p-5 lg:block">
            <p className="px-3 pb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{ui.onPage}</p>
            <nav aria-label={ui.tocAria} className="flex flex-col gap-0.5">
              {tocLinks()}
            </nav>
          </aside>

          <div className="flex min-w-0 flex-1 flex-col gap-3 md:gap-4">
            {content.sections.map((section) => (
              <section
                key={sectionId(doc, section)}
                id={sectionId(doc, section)}
                className="flex scroll-mt-24 flex-col gap-4 rounded-2xl border border-white/5 bg-card p-5 md:p-8 lg:scroll-mt-28"
              >
                <div className="flex items-center gap-3.5">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary/15 text-xs font-bold text-primary md:h-9 md:w-9 md:text-[13px]">
                    {sectionNumber(section.n)}
                  </span>
                  <h2 className="text-lg font-bold leading-snug md:text-xl">{section.title}</h2>
                </div>
                {section.blocks.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </section>
            ))}

            {/* Contact */}
            <div className="mt-1 flex flex-wrap items-center gap-4 rounded-2xl border border-primary/25 bg-secondary/50 p-5 md:gap-5 md:p-8">
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/20">
                <Mail className="h-6 w-6 text-primary" aria-hidden="true" />
              </span>
              <div className="flex min-w-0 flex-1 basis-64 flex-col gap-1">
                <p className="text-lg font-bold">{content.contactTitle}</p>
                <p className="text-sm text-muted-foreground">
                  <RichText text={content.address} />
                </p>
              </div>
              <Button asChild className="w-full bg-primary font-medium text-primary-foreground hover:bg-primary/90 hover-glow md:w-auto">
                <a href={`mailto:${LEGAL_EMAIL}`} className="break-all">
                  {LEGAL_EMAIL}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-6">
        <div className="container mx-auto flex flex-col-reverse items-center justify-between gap-4 px-4 md:flex-row">
          <p className="text-sm text-muted-foreground">© 2026 Brothers Apps Studios. {t('footer.rights')}</p>
          <div className="flex flex-wrap items-center justify-center gap-5 text-sm">
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                to={LEGAL_ROUTES[tab.id]}
                aria-current={tab.id === doc ? 'page' : undefined}
                className={cn('transition-colors', tab.id === doc ? 'font-semibold text-foreground' : 'text-muted-foreground hover:text-foreground')}
              >
                {tab.label}
              </Link>
            ))}
            <a
              href="https://github.com/alvaro2302"
              aria-label="GitHub"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-secondary/80 hover:text-foreground"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const LegalPage = ({ doc }: { doc: LegalDocId }) => (
  <LanguageProvider>
    <LegalPageContent doc={doc} />
  </LanguageProvider>
);

export default LegalPage;
