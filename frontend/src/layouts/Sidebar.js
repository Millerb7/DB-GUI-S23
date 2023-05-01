import PropTypes from "prop-types";
import { useEffect, useContext } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  Box,
  Link,
  Button,
  Drawer,
  Typography,
  Avatar,
  Stack,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import useResponsive from "../hooks/useResponsive";
import Logo from "../components/Logo";
import Scrollbar from "../components/Scrollbar";
import { Icon } from "@iconify/react";

const DRAWER_WIDTH = 280;

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const getIcon = (name) => <Icon icon={name} />;

Sidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function Sidebar({ isOpenSidebar, onCloseSidebar, setUser }) {
  const { pathname } = useLocation();
  const isDesktop = useResponsive("up", "lg");

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
  }, [pathname]);

  const handleLogout = () => {
    console.log("logged out :)");
    setUser(null);
    sessionStorage.setItem("userId", null);
  };

  const pages = [
    {
      title: "Dashboard",
      path: "",
      icon: getIcon("eva:pie-chart-2-fill"),
    },
    {
      title: "Calendar",
      path: "/dashboard/calendar",
      icon: getIcon("eva:calendar-fill"),
    },
    {
      title: "Courses",
      path: "/dashboard/courses",
      icon: getIcon("eva:book-fill"),
    },
  ];

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }}>
        <Logo />
      </Box>

      <List disablePadding sx={{ paddingTop: 2 }}>
        {pages.map((page) => (
          <ListItemButton
            key={page.title}
            component={RouterLink}
            to={page.path}
            sx={{
              display: "flex",
              alignItems: "center",
              fontWeight: "fontWeightMedium",
              "&:before": { display: "block" },
              "&:hover": {
                bgcolor: "background.default",
              },
              py: 2,
            }}
          >
            <Icon>{page.icon && page.icon}</Icon>
            <ListItemText
              disableTypography
              primary={page.title}
              sx={{ ml: 2 }}
            />
            {page.info && page.info}
          </ListItemButton>
        ))}

        <ListItemButton
          key={"logout"}
          component={RouterLink}
          to={"/Login"}
          sx={{
            display: "flex",
            alignItems: "center",
            fontWeight: "fontWeightMedium",
            "&:before": { display: "block" },
            "&:hover": {
              bgcolor: "background.default",
            },
            py: 2,
          }}
          onClick={handleLogout}
        >
          <Icon icon="eva:materials-symbols:logout" />
          <ListItemText disableTypography primary={"Logout"} sx={{ ml: 2 }} />
        </ListItemButton>
      </List>

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
