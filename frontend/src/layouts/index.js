import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { alpha, styled } from "@mui/material/styles";
import { Box, Stack, AppBar, Toolbar, IconButton } from "@mui/material";
import { Icon } from "@iconify/react";
import Sidebar from "./Sidebar";
import { getUser } from "src/api/user";

const DRAWER_WIDTH = 280;

const ContentStyle = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
  margin: 100,
});

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)",
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}));

const MainStyle = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

export const UserContext = createContext(null);

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(undefined);

  // gets user when dashboard is opened after login :)
  useEffect(() => {
    getUser(sessionStorage.getItem("userId")).then((x) => setUser(x));
  }, []);

  if (!user) {
    return <>Loading...</>;
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ContentStyle>
        <RootStyle>
          <Toolbar>
            <IconButton
              onClick={() => setOpen}
              sx={{ display: { lg: "none" } }}
            >
              <Icon icon="solar:hamburger-menu-broken" />
            </IconButton>

            <Box sx={{ flexGrow: 1 }} />
          </Toolbar>
        </RootStyle>
        <Sidebar
          isOpenSidebar={open}
          onCloseSidebar={() => setOpen(false)}
          setUser={setUser}
        />
        <MainStyle>
          <Outlet context={{ user }} />
        </MainStyle>
      </ContentStyle>
    </UserContext.Provider>
  );
}
