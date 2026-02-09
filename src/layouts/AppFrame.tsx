import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logout } from "../services/auth";

const drawerWidth = 240;

const navItems = [
  { label: "Dashboard", to: "/", icon: <DashboardRoundedIcon /> },
  { label: "History", to: "/history", icon: <HistoryRoundedIcon /> },
  { label: "Explore", to: "/explore", icon: <ExploreRoundedIcon /> },
];

const AppFrame = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const drawer = (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Sensor Control
      </Typography>
      <List sx={{ gap: 0.5 }}>
        {navItems.map((item) => (
          <ListItemButton
            key={item.label}
            component={NavLink}
            to={item.to}
            onClick={() => setMobileOpen(false)}
            sx={{
              borderRadius: 2,
              "&.active": { backgroundColor: "rgba(15, 76, 129, 0.12)" },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: "rgba(255, 250, 244, 0.8)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid #efe5d8",
        }}
      >
        <Toolbar sx={{ gap: 2 }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setMobileOpen(true)}
            sx={{ display: { md: "none" } }}
          >
            <MenuRoundedIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Live Telemetry
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutRoundedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              borderRight: "1px solid #efe5d8",
              backgroundColor: "rgba(255, 250, 244, 0.9)",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          px: { xs: 2, md: 4 },
          pb: 6,
          pt: { xs: 10, md: 12 },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppFrame;
