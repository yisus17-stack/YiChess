"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const breadcrumbNameMap: { [key: string]: string } = {
  'reglas': 'Reglas',
  'estrategias': 'Estrategias',
  'contacto': 'Contacto',
  'jugar': 'Jugar',
  'mapa-del-sitio': 'Mapa del Sitio',
};

export function AppBreadcrumb() {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(segment => segment);

  if (pathSegments.length === 0 || pathname === '/') {
    return null;
  }
  
  const lastSegment = pathSegments[pathSegments.length - 1];
  const pageName = breadcrumbNameMap[lastSegment] || lastSegment;

  return (
    <div className="flex flex-wrap gap-2 mb-10 pt-10">
      <Link href="/" className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-widest font-bold hover:text-black dark:hover:text-white">Inicio</Link>
      <span className="text-gray-300 dark:text-gray-600 text-xs">/</span>
      <span className="text-gray-900 dark:text-white text-xs uppercase tracking-widest font-bold">{pageName}</span>
    </div>
  );
}
