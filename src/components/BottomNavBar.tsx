import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, ChartBarIcon } from '@heroicons/react/24/outline';

interface NavItemProps {
  Icon: React.ElementType;
  isActive: boolean;
  to: string;
}

const NavItem: React.FC<NavItemProps> = ({ Icon, isActive, to }) => (
  <Link to={to} className="flex flex-col items-center justify-center gap-1 w-20 h-full">
    <Icon
      className={`transition-all duration-200 w-6 h-6 ${
        isActive ? 'text-brand-primary' : 'text-gray-400'
      }`}
    />
    <div className={`h-1 w-1 rounded-full transition-all duration-200 ${isActive ? 'bg-brand-primary' : 'bg-transparent'}`} />
  </Link>
);

export type AppTab = 'home' | 'leaderboard';

interface BottomNavBarProps {
  activeTab: AppTab;
}

const routeMapping: { [key in AppTab]: string } = {
    home: '/app',
    leaderboard: '/app/leaderboard',
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab }) => {
  const navItems: { label: AppTab; icon: React.ElementType }[] = [
    { label: 'home', icon: HomeIcon },
    { label: 'leaderboard', icon: ChartBarIcon },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-auto max-w-sm mx-auto bg-white/70 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-around p-1 h-16 z-50">
      {navItems.map(item => (
        <NavItem
          key={item.label}
          Icon={item.icon}
          isActive={activeTab === item.label}
          to={routeMapping[item.label]}
        />
      ))}
    </div>
  );
};

export default BottomNavBar; 