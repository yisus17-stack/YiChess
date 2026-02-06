"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Menu, Search, ArrowRight } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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

const searchableContent: SearchableContent[] = [
  { title: 'Reglas', path: '/reglas', description: 'Aprende las reglas básicas del ajedrez y el movimiento de cada pieza.' },
  { title: 'Estrategias', path: '/estrategias', description: 'Descubre estrategias y tácticas para principiantes, incluyendo aperturas y mates básicos.' },
  { title: 'Contacto', path: '/contacto', description: 'Envíanos tus sugerencias o comentarios sobre YiChess Simplificado.' }
];

function SearchDialog() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const filteredContent = searchTerm
    ? searchableContent.filter(
        item =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Buscar">
          <Search className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] p-0 gap-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Buscar</DialogTitle>
          <DialogDescription>
            Usa el cuadro de texto para buscar contenido en YiChess.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center border-b px-4">
            <Search className="mr-3 h-5 w-5 shrink-0 opacity-50" />
            <Input
                type="search"
                placeholder="Busca en YiChess..."
                className="h-14 w-full rounded-md bg-transparent py-3 pl-0 pr-4 text-base outline-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        <div className="p-6 overflow-auto max-h-[400px]">
            {searchTerm && filteredContent.length > 0 ? (
                <div className="space-y-4">
                    <h2 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                        Resultados para "{searchTerm}"
                    </h2>
                    <div className="space-y-3">
                        {filteredContent.map(item => (
                        <Link href={item.path} key={item.path} className="block group" onClick={handleLinkClick}>
                            <div className="p-4 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                            <div className="flex flex-row items-center justify-between">
                                <div>
                                <h3 className="text-base font-bold text-gray-900 dark:text-white">{item.title}</h3>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                                </div>
                                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                            </div>
                            </div>
                        </Link>
                        ))}
                    </div>
                </div>
            ) : (
              <div className="text-center py-10 h-full flex items-center justify-center">
                  <p className="text-gray-600 dark:text-gray-400">
                    {searchTerm ? "No se encontraron resultados." : "Encuentra cualquier cosa en YiChess."}
                  </p>
              </div>
            )}
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
