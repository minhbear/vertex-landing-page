import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ArrowRight, Menu } from "lucide-react";
import { twJoin } from "tailwind-merge";
import Image from "next/image";
import { ImageAssets } from "public";

type NavItem = {
  label: string;
  href: string;
  isExternal?: boolean;
};

const navigationItems: NavItem[] = [
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Pricing", href: "#pricing" },
  {
    label: "Docs",
    href: "https://docs.solindexprotocol.dev",
    isExternal: true,
  },
];

const navigationIndexer: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Indexer", href: "/indexers" },
  { label: "IDL", href: "/idls" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  const pathName = usePathname();

  // Effect to detect scroll and update header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-20 w-full border-b transition-colors duration-200 bg-background backdrop-blur-sm border-border`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-primary mr-2">
              <Image
                src={ImageAssets.LogoImage}
                alt="logo image"
                className="w-6 h-6"
              />
            </div>
            <div
              className="font-bold text-xl tracking-tight cursor-pointer"
              onClick={() => router.push("/")}
            >
              Vertex
            </div>
          </div>

          {/* Desktop Navigation */}
          {pathName === "/" ? (
            <nav className="hidden md:flex space-x-8 text-sm font-medium">
              {navigationItems.map((item) =>
                item.isExternal ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition"
                  >
                    {item.label}
                  </a>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition"
                  >
                    {item.label}
                  </a>
                )
              )}
            </nav>
          ) : (
            <div>
              <nav className="hidden md:flex space-x-8 text-sm font-medium">
                {navigationIndexer.map((item) => (
                  <div
                    key={item.label}
                    onClick={() => router.push(item.href)}
                    className={twJoin(
                      " hover:text-foreground transition hover:cursor-pointer",
                      item.href === pathName
                        ? "text-[#642bdf]"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.label}
                  </div>
                ))}
              </nav>
            </div>
          )}

          <Button
            size="lg"
            className="group"
            onClick={() => {
              window.open("https://app.vertex-sol.xyz/", "_blank");
            }}
          >
            Create Indexer
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-8">
                  {navigationItems.map((item) => (
                    <SheetClose asChild key={item.label}>
                      {item.isExternal ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 text-foreground hover:text-primary transition"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <a
                          href={item.href}
                          className="px-4 py-2 text-foreground hover:text-primary transition"
                        >
                          {item.label}
                        </a>
                      )}
                    </SheetClose>
                  ))}
                  <div className="mt-4 border-t border-border pt-4">
                    <SheetClose asChild>
                      <a href="#early-access">
                        <Button className="w-full">Get Early Access</Button>
                      </a>
                    </SheetClose>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
