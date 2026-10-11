import { Link, useRouterState } from "@tanstack/react-router";
import { useState, Fragment } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/compower-logo.webp";


const navLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const resourceLinks = [
  { to: "/generator-sizing", label: "Generator Size Calculator", external: false },
  { to: "/downloads", label: "Downloads", external: false },
  { to: "https://bpc.compowerafrica.com", label: "BPC Tariff Calculator", external: true },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const { location } = useRouterState();
  const currentPath = location.pathname;
  const resourcesActive = resourceLinks.some((r) => !r.external && r.to === currentPath);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/100">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="ComPower logo" className="h-9 w-auto lg:h-8 xl:h-9" width={311} height={36} />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:inline lg:hidden xl:inline">
            Botswana
          </span>
        </Link>


        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link, i) => {
            const isActive = currentPath === link.to;
            // Insert the Resources dropdown right after "Projects".
            return (
              <Fragment key={link.to}>
                {i === 4 && (
                  <div
                    key="resources"
                    className="relative"
                    onMouseEnter={() => setResourcesOpen(true)}
                    onMouseLeave={() => setResourcesOpen(false)}
                  >
                    <button
                      className={`flex items-center gap-1 px-2.5 xl:px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                        resourcesActive
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      Resources
                      <ChevronDown className="h-3.5 w-3.5" />
                    </button>

                    {resourcesOpen && (
                      <div className="absolute left-0 top-full w-56 rounded-md border border-border bg-background py-1 shadow-md">
                        {resourceLinks.map((item) =>
                          item.external ? (
                            <a
                              key={item.to}
                              href={item.to}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
                            >
                              {item.label}
                            </a>
                          ) : (
                            <Link
                              key={item.to}
                              to={item.to}
                              className={`block px-3 py-2 text-sm font-medium ${
                                currentPath === item.to
                                  ? "text-primary bg-primary/10"
                                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
                              }`}
                            >
                              {item.label}
                            </Link>
                          )
                        )}
                      </div>
                    )}
                  </div>
                )}
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-2.5 xl:px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              </Fragment>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Get a Quote
          </Link>
        </div>

        <button
          className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background px-4 py-4">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link, i) => {
              const isActive = currentPath === link.to;
              return (
                <Fragment key={link.to}>
                  {i === 4 && (
                    <div key="resources-mobile">
                      <button
                        onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                        className={`w-full flex items-center justify-between px-3 py-3 text-sm font-medium rounded-md transition-colors ${
                          resourcesActive
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                      >
                        Resources
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${mobileResourcesOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {mobileResourcesOpen && (
                        <div className="flex flex-col gap-1 pl-4">
                          {resourceLinks.map((item) =>
                            item.external ? (
                              <a
                                key={item.to}
                                href={item.to}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setOpen(false)}
                                className="px-3 py-2.5 text-sm font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
                              >
                                {item.label}
                              </a>
                            ) : (
                              <Link
                                key={item.to}
                                to={item.to}
                                onClick={() => setOpen(false)}
                                className={`px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                                  currentPath === item.to
                                    ? "text-primary bg-primary/10"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                }`}
                              >
                                {item.label}
                              </Link>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  )}
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={`px-3 py-3 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                </Fragment>
              );
            })}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Get a Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
