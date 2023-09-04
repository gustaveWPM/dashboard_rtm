import DashboardSidebarDynamicRenderingConfig from '@/config/DashboardSidebar/dynamicRenderingConfig';
import IButtonStyleReactIcon from './_types/IButtonStyleReactIcon';

const commons = 'transition-all text-white flex w-fit p-3 rounded-lg inline-block';

export const SidebarButtonStyle: IButtonStyleReactIcon = {
  isActiveClassList: commons + ' ' + 'bg-purple-800',
  isNotActiveClassList: commons + ' ' + 'bg-purple-400',
  sidebarIconProps: { size: DashboardSidebarDynamicRenderingConfig.sidebarIconSizeInPx }
};

export default SidebarButtonStyle;
