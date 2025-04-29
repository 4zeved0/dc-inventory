'use client'

import { useState } from "react";
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import Link from "next/link";
import { dataNavbar } from '@/app/components/(Navbar)/NavData';

export default function Sidebar() {
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSubmenu = (name: string) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <>
      {/* Botão de abrir menu - só aparece no mobile */}
      <button
        className="fixed top-4 left-4 z-50 text-white bg-neutral-900 p-2 rounded-md md:hidden"
        onClick={toggleSidebar}
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-40 h-screen md:w-72 w-screen bg-neutral-900 shadow-lg flex flex-col p-4 
        transform transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:static md:shadow-none
      `}>
        <div className="flex items-center justify-center h-16 border-b border-neutral-800">
          <span className="text-white text-2xl font-bold tracking-widest">SIDEBAR</span>
        </div>

        <nav className="mt-6 space-y-2">
          {dataNavbar.map((item) => (
            <div key={item.name}>
              {/* Menu principal */}
              <div
                className="flex items-center justify-between px-3 py-2 text-gray-300 hover:bg-neutral-800 hover:text-white rounded-lg cursor-pointer transition-all"
                onClick={() => item.subItems ? toggleSubmenu(item.name) : undefined}
              >
                <Link href={item.pathname} className="flex items-center gap-3 w-full">
                  <item.icon className="w-5 h-5" />
                  <span className="text-base font-medium">{item.name}</span>
                </Link>

                {item.subItems && (
                  openSubmenus[item.name] ?
                    <ChevronDown className="w-4 h-4" /> :
                    <ChevronRight className="w-4 h-4" />
                )}
              </div>

              {/* Subitens */}
              {item.subItems && openSubmenus[item.name] && (
                <div className="pl-3 mt-1 space-y-1">
                  {item.subItems.map((subItem) => (
                    <Link
                      href={subItem.pathname}
                      key={subItem.name}
                      className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white hover:bg-neutral-800 rounded-md text-sm transition-all"
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside >

      {/* Fundo escuro atrás do sidebar no mobile (quando aberto) */}
      {
        sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={toggleSidebar}
          />
        )
      }
    </>
  );
}
