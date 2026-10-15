'use client';

import React, { useEffect } from "react";
import {
  Sparkles,
  Layers,
  Wrench,
  ShieldCheck,
  Building2,
  Flame,
  X,
  GraduationCap,
  Cpu,
  FileCheck2,
} from "lucide-react";

export type BadgeColor = "lavender" | "teal" | "emerald" | "amber" | "rose" | "indigo";

export interface SidebarItem {
  id: string;
  label: string;
  badge?: string;
  badgeColor?: BadgeColor;
  hot?: boolean;
  domain?: string;
  icon?: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
}

export interface SidebarSection {
  title: string;
  icon?: React.ReactNode;
  items: SidebarItem[];
}

export interface SidebarProps {
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  sections?: SidebarSection[];
  className?: string;
  showQuorumWidget?: boolean;
}

const DEFAULT_SECTIONS: SidebarSection[] = [
  {
    title: "EXPLORE",
    icon: <Sparkles className="h-3.5 w-3.5 text-lavender-600" aria-hidden="true" />,
    items: [
      {
        id: "overview",
        label: "Overview & Blueprint",
        badge: "Live",
        badgeColor: "lavender",
        icon: Layers,
      },
      {
        id: "active-coalitions",
        label: "Active Coalitions",
        hot: true,
        icon: Flame,
      },
      {
        id: "spot-market",
        label: "Equipment Exchange",
        badge: "6 Rigs",
        badgeColor: "teal",
        icon: Wrench,
      },
    ],
  },
  {
    title: "PARTNER COLLEGES",
    icon: <Building2 className="h-3.5 w-3.5 text-lavender-600" aria-hidden="true" />,
    items: [
      {
        id: "iit-indore",
        label: "IIT Indore",
        domain: "Robotics",
        icon: GraduationCap,
      },
      {
        id: "sgsits-design",
        label: "SGSITS Indore",
        domain: "Design",
        icon: GraduationCap,
      },
      {
        id: "davv-biotech",
        label: "DAVV Indore",
        domain: "Biotech",
        icon: GraduationCap,
      },
      {
        id: "medicaps-drone",
        label: "Medi-Caps Univ",
        domain: "Avionics",
        icon: GraduationCap,
      },
    ],
  },
  {
    title: "PROTOCOLS",
    icon: <ShieldCheck className="h-3.5 w-3.5 text-lavender-600" aria-hidden="true" />,
    items: [
      {
        id: "match-score",
        label: "Algorithmic Match S(A, B)",
        badge: "v2.1",
        badgeColor: "indigo",
        icon: Cpu,
      },
      {
        id: "charters-ledger",
        label: "Multi-Sig Charters",
        badge: "Verified",
        badgeColor: "emerald",
        icon: FileCheck2,
      },
    ],
  },
];

const getBadgeStyles = (color?: BadgeColor): string => {
  switch (color) {
    case "teal":
    case "emerald":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "rose":
      return "bg-rose-50 text-rose-700 border-rose-200";
    case "amber":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "indigo":
      return "bg-indigo-50 text-indigo-700 border-indigo-200";
    case "lavender":
    default:
      return "bg-lavender-100 text-lavender-700 border-lavender-200";
  }
};

export const Sidebar: React.FC<SidebarProps> = ({
  activeCategory,
  setActiveCategory,
  isOpenMobile = false,
  onCloseMobile,
  sections = DEFAULT_SECTIONS,
  className = "",
  showQuorumWidget = true,
}) => {
  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (!isOpenMobile) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpenMobile]);

  // Handle Escape key to close mobile drawer
  useEffect(() => {
    if (!isOpenMobile || !onCloseMobile) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseMobile();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpenMobile, onCloseMobile]);

  const handleItemSelect = (item: SidebarItem) => {
    if (item.onClick) {
      item.onClick();
    } else {
      setActiveCategory(item.id);
    }
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const navigationContent = (
    <nav
      aria-label="Sidebar navigation"
      className="w-full h-full py-6 pr-2 md:pr-4 space-y-6 overflow-y-auto"
    >
      {/* Network Quorum Widget */}
      {showQuorumWidget && (
        <div className="mx-2 p-3.5 rounded-xl border border-lavender-200 bg-white shadow-soft-lavender space-y-2.5 transition-all">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-700 flex items-center gap-2 font-sans font-medium">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Consortium Nodes
            </span>
            <span className="text-lavender-700 font-bold bg-lavender-50 px-2 py-0.5 rounded border border-lavender-200">
              4 Verified
            </span>
          </div>

          <div
            className="h-1.5 w-full bg-lavender-100 rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={100}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Consortium Quorum status"
          >
            <div className="h-full bg-gradient-to-r from-lavender-500 to-lavender-700 rounded-full w-full transition-all duration-500" />
          </div>

          <p className="text-[11px] text-slate-500 leading-tight">
            Indore Regional Engineering Cluster • 100% Quorum
          </p>
        </div>
      )}

      {/* Navigation Sections */}
      {sections.map((section, sIdx) => (
        <div key={section.title || sIdx} className="space-y-1">
          <div className="px-3 mb-1.5 flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono">
            {section.icon && <span>{section.icon}</span>}
            <span>{section.title}</span>
          </div>

          <div className="space-y-0.5" role="list">
            {section.items.map((item) => {
              const isActive = activeCategory === item.id;
              const ItemIcon = item.icon;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleItemSelect(item)}
                  aria-current={isActive ? "page" : undefined}
                  className={`w-full group text-xs py-2 px-3 rounded-lg flex items-center justify-between transition-all text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender-500 ${
                    isActive
                      ? "bg-lavender-100/90 text-lavender-900 font-semibold border-l-2 border-lavender-600 shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-lavender-50/70"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate min-w-0">
                    {ItemIcon ? (
                      <ItemIcon
                        className={`h-3.5 w-3.5 shrink-0 transition-colors ${
                          isActive
                            ? "text-lavender-700"
                            : "text-slate-400 group-hover:text-lavender-600"
                        }`}
                        aria-hidden="true"
                      />
                    ) : isActive ? (
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-lavender-600 shrink-0"
                        aria-hidden="true"
                      />
                    ) : null}
                    <span className="truncate">{item.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    {item.badge && (
                      <span
                        className={`text-[10px] font-mono font-medium px-1.5 py-0.5 rounded border ${getBadgeStyles(
                          item.badgeColor
                        )}`}
                      >
                        {item.badge}
                      </span>
                    )}

                    {item.hot && (
                      <span className="flex items-center gap-0.5 text-[10px] font-mono text-rose-600 bg-rose-50 border border-rose-200 rounded px-1.5 py-0.5">
                        <Flame className="h-2.5 w-2.5 fill-rose-500 text-rose-500" aria-hidden="true" />
                        <span>HOT</span>
                      </span>
                    )}

                    {item.domain && (
                      <span className="text-[10px] font-mono text-slate-400 group-hover:text-slate-600">
                        {item.domain}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside
        aria-label="Consortium desktop navigation"
        className={`hidden md:block w-60 shrink-0 sticky top-16 h-[calc(100vh-4rem)] border-r border-lavender-200/80 bg-white/40 ${className}`}
      >
        {navigationContent}
      </aside>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-50 md:hidden flex animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Consortium mobile navigation"
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close mobile navigation overlay"
            onClick={onCloseMobile}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm -z-10 cursor-default transition-opacity"
            tabIndex={-1}
          />

          {/* Drawer Content */}
          <div className="w-72 bg-white p-4 border-r border-lavender-200 h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-lavender-100 mb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                Navigation
              </span>
              <button
                type="button"
                onClick={onCloseMobile}
                aria-label="Close navigation"
                className="text-slate-500 hover:text-slate-900 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender-500"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {navigationContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
