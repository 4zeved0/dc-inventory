import {
  Menu, X, Home, LayoutDashboard, Search, HardDrive, LogIn, LogOut, ClipboardList, Ticket, ChevronDown, ChevronRight
} from 'lucide-react';

export const dataNavbar = [
  { name: 'Inicial', pathname: '/', icon: Home },
  {
    name: 'Dashboard', pathname: '/dashboard', icon: LayoutDashboard, subItems: [
      { name: 'Pesquisar Equipamento', pathname: '/dashboard/searchEquipament', icon: Search },
    ]
  },
  {
    name: 'Equipamento', pathname: '#', icon: HardDrive, subItems: [
      { name: 'Entrada', pathname: '/equipamento/entrada', icon: LogIn },
      { name: 'Saída', pathname: '/equipamento/saida', icon: LogOut },
    ]
  },
  { name: 'Apontamento', pathname: '/appointment', icon: ClipboardList },
  { name: 'Chamados', pathname: '/tickets', icon: Ticket }
];