import IButtonStyleReactIcon from '@/components/config/styles/types/IButtonStyleReactIcon';
import { cn } from '@/lib/tailwind';

const COMMONS = 'transition-colors duration-200 p-2.5 rounded-lg';

export const SidebarButtonStyle: IButtonStyleReactIcon = {
  isActiveClassList: cn(COMMONS, 'text-white bg-slate-600'),
  isNotActiveClassList: cn(COMMONS, 'text-gray-300 bg-slate-800'),
  sidebarIconProps: { size: 20 }
} as const;

export default SidebarButtonStyle;
