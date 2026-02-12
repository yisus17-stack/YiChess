"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Menu, Search, ArrowRight } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { SearchableContent } from '@/lib/definitions';
import { searchableContent } from "@/lib/searchable-content";

function SearchDialog() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [filteredContent, setFilteredContent] = React.useState<SearchableContent[]>([]);
  const [searchTime, setSearchTime] = React.useState<number | null>(null);

  const popularSearches = ['Aperturas', 'Gambito de Dama', 'Defensa Siciliana', 'Jaque Mate de Coz', 'La Clavada', 'Estrategia'];

  React.useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setSearchTerm('');
        setFilteredContent([]);
        setSearchTime(null);
      }, 200); // Delay to allow fade-out animation
      return;
    }

    if (searchTerm.trim() === '') {
      setFilteredContent([]);
      setSearchTime(null);
      return;
    }

    const startTime = performance.now();
    const results = searchableContent.filter(item => {
      const term = searchTerm.toLowerCase();
      return (
        item.title.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.keywords?.toLowerCase().includes(term)
      );
    });
    const endTime = performance.now();

    setFilteredContent(results);
    setSearchTime(endTime - startTime);

  }, [searchTerm, open]);

  const handleLinkClick = () => {
    setOpen(false);
  };
  
  const Highlight: React.FC<{ text: string; highlight: string }> = ({ text, highlight }) => {
    if (!highlight.trim()) {
      return <span>{text}</span>;
    }
    const safeHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${safeHighlight})`, 'gi');
    if (!text || !text.split) return <span>{text}</span>
    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <strong key={i} className="bg-primary/20 text-primary rounded-sm px-0.5 font-bold">
              {part}
            </strong>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Buscar">
          <Search className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-none rounded-none p-0 flex flex-col top-0 translate-y-0 h-[40vh] rounded-b-2xl data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top">
        <DialogHeader>
          <DialogTitle className="sr-only">Búsqueda</DialogTitle>
          <DialogDescription className="sr-only">
            Busca en todo el contenido de YiChess. Escribe un término para empezar.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center border-b px-4 sm:px-10 h-20 shrink-0">
            <div className="flex items-center w-full max-w-screen-lg mx-auto">
                <Search className="mr-3 h-5 w-5 shrink-0 opacity-50" />
                <Input
                    type="search"
                    placeholder="Busca en YiChess..."
                    className="h-14 w-full bg-transparent border-transparent rounded-full py-3 px-6 text-base outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="ghost" onClick={() => setOpen(false)} className="ml-4 text-base">
                    Cancelar
                </Button>
            </div>
        </div>
        <div className="p-6 sm:p-10 overflow-auto">
            <div className="w-full max-w-screen-lg mx-auto">
            {searchTerm.trim() === '' ? (
                <div className="animate-in fade-in-50 duration-300">
                    <h3 className="text-sm font-medium text-gray-500 mb-4">Términos de búsqueda populares</h3>
                    <div className="flex flex-wrap gap-3">
                        {popularSearches.map(term => (
                            <Button key={term} variant="secondary" className="rounded-full font-medium" onClick={() => setSearchTerm(term)}>
                                {term}
                            </Button>
                        ))}
                    </div>
                </div>
            ) : (
              <>
                {filteredContent.length > 0 ? (
                  <div className="space-y-4 animate-in fade-in-50 duration-300">
                      <div className="text-xs text-gray-500 dark:text-gray-400 flex justify-between">
                        <span>{filteredContent.length} {filteredContent.length === 1 ? 'resultado' : 'resultados'}</span>
                        {searchTime !== null && <span>en {searchTime.toFixed(2)} ms</span>}
                      </div>
                      <div className="space-y-3 mt-4">
                          {filteredContent.map((item, index) => (
                            <Link href={item.path} key={`${item.title}-${index}`} className="block group" onClick={handleLinkClick}>
                                <div className="p-4 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                                  <div className="flex flex-row items-center justify-between">
                                      <div>
                                        <h3 className="text-base font-bold text-gray-900 dark:text-white">
                                          <Highlight text={item.title} highlight={searchTerm} />
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                          <Highlight text={item.description} highlight={searchTerm} />
                                        </p>
                                      </div>
                                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                                  </div>
                                </div>
                            </Link>
                          ))}
                      </div>
                  </div>
                ) : (
                  <div className="text-center py-10 h-full flex flex-col items-center justify-center animate-in fade-in-50 duration-300">
                    <p className="text-gray-600 dark:text-gray-400 font-semibold">No se encontraron resultados para "{searchTerm}".</p>
                    <p className="text-sm text-gray-500 mt-2">Intenta con una búsqueda diferente o con términos más generales.</p>
                  </div>
                )}
              </>
            )}
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function AppHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/jugar", label: "Jugar" },
    { href: "/puzzles", label: "Puzzles" },
    { href: "/reglas", label: "Reglas" },
    { href: "/estrategias", label: "Estrategias" },
    { href: "/contacto", label: "Contacto" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-solid border-gray-100 bg-white/90 backdrop-blur-md">
        <div className="flex items-center whitespace-nowrap px-4 sm:px-10 py-3 max-w-[1200px] mx-auto">
            <div className="flex-1 flex justify-start">
                <Link href="/" className="flex items-center gap-3">
                    <Logo />
                    <h2 className="text-[#1a1a1a] text-xl font-bold tracking-tight">YiChess</h2>
                </Link>
            </div>

            <nav className="hidden md:flex items-center gap-1 justify-center">
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                        "text-sm font-medium transition-colors px-3 py-2 rounded-md",
                        pathname === link.href
                            ? "font-bold text-primary"
                            : "text-gray-500 hover:text-primary"
                        )}
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>
            
            <div className="flex-1 flex items-center justify-end gap-2">
                <SearchDialog />
                
                <Button asChild className="hidden sm:flex h-9">
                    <Link href="/jugar">Jugar Ahora</Link>
                </Button>

                <div className="md:hidden">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Abrir menú</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px]">
                            <SheetHeader className="sr-only">
                              <SheetTitle>Menú móvil</SheetTitle>
                              <SheetDescription>
                                Enlaces de navegación principales para el sitio web de YiChess.
                              </SheetDescription>
                            </SheetHeader>
                            <div className="p-4">
                                <Link href="/" className="flex items-center gap-4 mb-8" onClick={() => setIsOpen(false)}>
                                    <Logo />
                                    <h2 className="text-[#1a1a1a] text-xl font-bold tracking-tight">YiChess</h2>
                                </Link>
                                <nav className="flex flex-col gap-2">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className={cn(
                                                "text-base font-medium transition-colors p-3 rounded-lg",
                                                pathname === link.href
                                                ? "font-bold text-primary"
                                                : "text-gray-600 hover:text-primary"
                                            )}
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </nav>
                                <Button asChild className="w-full mt-8">
                                    <Link href="/jugar" onClick={() => setIsOpen(false)}>Jugar Ahora</Link>
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
      </div>
    </header>
  );
}
