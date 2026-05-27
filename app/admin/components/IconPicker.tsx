'use client';

import { useState } from 'react';
import {
  ClipboardList,
  Droplets,
  MapPin,
  Package,
  Satellite,
  ShieldCheck,
  Truck,
  UserCheck,
  Users,
  type LucideIcon,
} from 'lucide-react';

const ICON_COMPONENTS: Record<string, LucideIcon> = {
  Droplets,
  Package,
  Truck,
  Users,
  UserCheck,
  ClipboardList,
  Satellite,
  ShieldCheck,
  MapPin,
};

type IconPickerProps = {
  name: string;
  defaultValue: string;
  options: string[];
};

export default function IconPicker({ name, defaultValue, options }: IconPickerProps) {
  const initialValue = options.includes(defaultValue) ? defaultValue : options[0] || 'Package';
  const [selectedIcon, setSelectedIcon] = useState(initialValue);
  const SelectedIconComponent = ICON_COMPONENTS[selectedIcon] || Package;

  return (
    <div className="relative">
      <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-red-600 z-10">
        <SelectedIconComponent size={18} />
      </div>

      <select
        name={name}
        value={selectedIcon}
        onChange={(e) => setSelectedIcon(e.target.value)}
        className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-medium text-gray-700"
      >
        {options.map((icon) => (
          <option key={icon} value={icon}>{icon}</option>
        ))}
      </select>
    </div>
  );
}
