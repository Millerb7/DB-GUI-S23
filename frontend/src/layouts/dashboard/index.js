import { createContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
//
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import { getUser } from 'src/api/user';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

export const UserContext = createContext(null);

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const [ user, setUser ] = useState(undefined);

  // gets user when dashboard is opened after login :)
  useEffect(() => {
    getUser(sessionStorage.getItem('userId')).then(x => setUser(x))
  }, []);

  if(!user) {
    return <>Loading...</>
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <RootStyle>
        <DashboardNavbar onOpenSidebar={() => setOpen(true)} act={user} />
        <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)}  act={user}/>
        <MainStyle>
          <Outlet context={{ user }}/>
        </MainStyle>
      </RootStyle>
    </UserContext.Provider>
  );
}
