// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'Dashboard',
    path: '',
    icon: getIcon('eva:pie-chart-2-fill')
  },
  {
    title: 'Calendar',
    path: '/dashboard/calendar',
    icon: getIcon('eva:calendar-fill')
  },
  {
    title: 'Courses',
    path: '/dashboard/courses',
    icon: getIcon('eva:book-fill')
  },
  {
    title: 'Logout',
    path: '/Login',
    icon: getIcon('eva:materials-symbols:logout')
  }
];

export default sidebarConfig;
