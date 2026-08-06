import {
  Drawer,
  Toolbar,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import { Link } from "react-router-dom";

const drawerWidth = 240;

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />

      <List>

        <ListItemButton
          component={Link}
          to="/dashboard"
        >
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton
          component={Link}
          to="/incidents"
        >
          <ListItemText primary="Incidents" />
        </ListItemButton>

        <ListItemButton
          component={Link}
          to="/history"
        >
          <ListItemText primary="History" />
        </ListItemButton>

        <ListItemButton
          component={Link}
          to="/reports"
        >
          <ListItemText primary="Reports" />
        </ListItemButton>

      </List>

    </Drawer>
  );
}

export default Sidebar;