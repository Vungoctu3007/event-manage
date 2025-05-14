// Navigation.tsx
import React from 'react';

interface NavItem {
  label: string;
  link: string;
}

const Navigation: React.FC = () => {
  const navItems: NavItem[] = [
    { label: 'Nhạc sống', link: '/nhac-song' },
    { label: 'Sân khấu & Nghệ thuật', link: '/san-khau-nghe-thuat' },
    { label: 'Thể Thao', link: '/the-thao' },
    { label: 'Khác', link: '/khac' },
  ];

  return (
    <nav className="bg-background-color py-4">
      <ul className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10">
        {navItems.map((item, index) => (
          <li key={index}>
            <a
              href={item.link}
              className="text-green-500 hover:text-white text-lg font-bold transition-colors duration-300"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
