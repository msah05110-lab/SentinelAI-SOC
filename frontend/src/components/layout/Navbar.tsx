import {
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";

function Navbar() {
  return (
    <AppBar position="fixed">

      <Toolbar>

        <Typography variant="h6">

          SentinelAI SOC

        </Typography>

      </Toolbar>

    </AppBar>
  );
}

export default Navbar;