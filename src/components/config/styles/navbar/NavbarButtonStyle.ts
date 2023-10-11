import IButtonStyleBase from '@/components/config/styles/types/IButtonStyleBase';

const COMMONS = 'transition-colors duration-200 flex flex-1 justify-center rounded-md px-3 py-2 font-medium cursor-pointer';

export const NavbarButtonStyle: IButtonStyleBase = {
  isActiveClassList: COMMONS + ' ' + 'bg-slate-800 text-white',
  isNotActiveClassList: COMMONS + ' ' + 'text-gray-300 hover:bg-slate-900 hover:text-white'
} as const;

export default NavbarButtonStyle;