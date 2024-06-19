

import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAppStore } from "../AppStore";
import InfoIcon from "@mui/icons-material/Info";
import "../SideNav/StyleNavLink.css";
import InsightsIcon from "@mui/icons-material/Insights";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import ForumIcon from "@mui/icons-material/Forum";
import { Typography } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SwipeVerticalIcon from "@mui/icons-material/SwipeVertical";

const drawerWidth = 250;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(5)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,

  whiteSpace: "nowrap",
  boxSizing: "border-box",

  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const SideNav = () => {
  // const theme = useTheme();
  const navigate = useNavigate();
  const open = useAppStore((state) => state.dopen);

  return (
    <div className=" ">
      <Box className="" sx={{ display: "flex" }}>
        <CssBaseline />
        <Drawer variant="permanent" open={open}>
          <Box className="" height={60} />
          <Divider />
          <List sx={{ backgroundColor: "" }}>
            <NavLink
              to="/analytics"
              activeClassName="active-link"
              onClick={() => navigate("/analytics")}
            >
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  className="bg-black"
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    background:
                    location.pathname === "/analytics"
                      ? "yellow"
                      : "your_default_color_here",
                  borderRadius:
                    location.pathname === "/analytics"
                      ? "9px"
                      : "your_default_color_here",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : "auto",
                      justifyContent: "center",
                      color:location.pathname === "/analytics"
                      ? "rgb(2, 107, 255)"
                      : "your_default_color_here",
                    }}
                  >
                    <InsightsIcon />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ opacity: open ? 1 : 0 }}
                    primary={
                      <Typography
                        variant="body1" // Adjust variant as per your design
                        sx={{fontWeight:
                          location.pathname === "/analytics"
                            ? "bold"
                            : "your_default_color_here", }}
                      >
                        Analytics
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>

            <NavLink activeClassName="active" to={"/company"}>
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                onClick={() => navigate("/company")}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    background:
                    location.pathname === "/company"
                      ? "yellow"
                      : "your_default_color_here",
                  borderRadius:
                    location.pathname === "/company"
                      ? "9px"
                      : "your_default_color_here",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : "auto",
                      justifyContent: "center",
                      color:location.pathname === "/company"
                      ? "rgb(2, 107, 255)"
                      : "your_default_color_here",
                    }}
                  >
                    <BusinessIcon />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ opacity: open ? 1 : 0 }}
                    primary={
                      <Typography
                        variant="body1" // Adjust variant as per your design
                        sx={{ fontWeight:
                          location.pathname === "/company"
                            ? "bold"
                            : "your_default_color_here", }}
                      >
                        Company
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>
            <NavLink activeClassName="active" to={"/user"}>
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                onClick={() => navigate("/user")}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    background:
                    location.pathname === "/user"
                      ? "yellow"
                      : "your_default_color_here",
                  borderRadius:
                    location.pathname === "/user"
                      ? "9px"
                      : "your_default_color_here",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : "auto",
                      justifyContent: "center",
                      color:location.pathname === "/user"
                      ? "rgb(2, 107, 255)"
                      : "your_default_color_here",
                    }}
                  >
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText  sx={{ opacity: open ? 1 : 0 }}
                   primary={
                    <Typography
                      variant="body1" // Adjust variant as per your design
                      sx={{ fontWeight:
                        location.pathname === "/user"
                          ? "bold"
                          : "your_default_color_here", }}
                    >
                      User
                    </Typography>
                  }
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>
            <NavLink to={"/support-ticket"}>
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                onClick={() => navigate("/support-ticket")}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    background:
                    location.pathname === "/support-ticket"
                      ? "yellow"
                      : "your_default_color_here",
                  borderRadius:
                    location.pathname === "/support-ticket"
                      ? "9px"
                      : "your_default_color_here",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : "auto",
                      justifyContent: "center",
                      color:location.pathname === "/support-ticket"
                      ? "rgb(2, 107, 255)"
                      : "your_default_color_here",
                    }}
                  >
                    <LocalActivityIcon />
                  </ListItemIcon>
                  <ListItemText
                  
                    sx={{ opacity: open ? 1 : 0 }}
                    primary={
                      <Typography
                        variant="body1" // Adjust variant as per your design
                        sx={{fontWeight:
                          location.pathname === "/support-ticket"
                            ? "bold"
                            : "your_default_color_here", }}
                      >
                        Support Ticket
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>
            <NavLink to={"/external-request-view"}>
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                onClick={() => navigate("/external-request-view")}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    background:
                    location.pathname === "/external-request-view"
                      ? "yellow"
                      : "your_default_color_here",
                  borderRadius:
                    location.pathname === "/external-request-view"
                      ? "9px"
                      : "your_default_color_here",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : "auto",
                      justifyContent: "center",
                      color:location.pathname === "/external-request-view"
                      ? "rgb(2, 107, 255)"
                      : "your_default_color_here",
                    }}
                  >
                    <TrendingUpIcon />
                  </ListItemIcon>
                  <ListItemText
                  
                    sx={{ opacity: open ? 1 : 0 }}
                    primary={
                      <Typography
                        variant="body1" // Adjust variant as per your design
                        sx={{ fontWeight:
                          location.pathname === "/external-request-view"
                            ? "bold"
                            : "your_default_color_here", }}
                      >
                        External Request View
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>
            <NavLink to={"/internal-request-view"}>
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                onClick={() => navigate("/internal-request-view")}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    background:
                    location.pathname === "/internal-request-view"
                      ? "yellow"
                      : "your_default_color_here",
                  borderRadius:
                    location.pathname === "/internal-request-view"
                      ? "9px"
                      : "your_default_color_here",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : "auto",
                      justifyContent: "center",
                      color:location.pathname === "/internal-request-view"
                          ? "rgb(2, 107, 255)"
                          : "your_default_color_here",
                    }}
                  >
                    <SwipeVerticalIcon />
                  </ListItemIcon>
                  <ListItemText
                    
                    sx={{ opacity: open ? 1 : 0 }}
                    primary={
                      <Typography
                        variant="body1" // Adjust variant as per your design
                        sx={{ fontWeight:
                          location.pathname === "/internal-request-view"
                            ? "bold"
                            : "your_default_color_here", }}
                      >
                       Internal Request View
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>
            <NavLink to={"/secure-channel"}>
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                onClick={() => navigate("/secure-channel")}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    background:
                    location.pathname === "/secure-channel"
                      ? "yellow"
                      : "your_default_color_here",
                  borderRadius:
                    location.pathname === "/secure-channel"
                      ? "9px"
                      : "your_default_color_here",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : "auto",
                      justifyContent: "center",
                      color:location.pathname === "/secure-channel"
                          ? "rgb(2, 107, 255)"
                          : "your_default_color_here",
                    }}
                  >
                    <ForumIcon />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ opacity: open ? 1 : 0 }}
                    primary={
                      <Typography
                        variant="body1" // Adjust variant as per your design
                        sx={{ fontWeight:
                          location.pathname === "/secure-channel"
                            ? "bold"
                            : "your_default_color_here", }}
                      >
                       Secure Channel
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>
            <NavLink to={"/logs"}>
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                onClick={() => navigate("/logs")}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    background:
                    location.pathname === "/logs"
                      ? "yellow"
                      : "your_default_color_here",
                  borderRadius:
                    location.pathname === "/logs"
                      ? "9px"
                      : "your_default_color_here",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : "auto",
                      justifyContent: "center",
                      color:location.pathname === "/logs"
                          ? "rgb(2, 107, 255)"
                          : "your_default_color_here",
                    }}
                  >
                    <InfoIcon />
                  </ListItemIcon>
                  <ListItemText
                   sx={{ opacity: open ? 1 : 0 }} 
                   primary={
                    <Typography
                      variant="body1" // Adjust variant as per your design
                      sx={{ fontWeight:
                        location.pathname === "/logs"
                          ? "bold"
                          : "your_default_color_here", }}
                    >
                    Logs
                    </Typography>
                  }
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>
          </List>
        </Drawer>
      </Box>
    </div>
  );
};

export default SideNav;
