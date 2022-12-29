import { Toolbar as MuiToolbar, IconButton, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
// import Image from "mui-image";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

interface ToolbarProps {
  open: boolean;
  handleDrawerOpen: () => void;
}

export default function Toolbar({ open, handleDrawerOpen }: ToolbarProps) {
  return (
    <MuiToolbar color="transparent">
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{
          marginRight: 5,
          ...(open && { display: "none" }),
        }}
      >
        <Menu />
      </IconButton>
      {/* <Image src="/Logo.png" width={50} /> */}
      <div
        style={{
          backgroundColor: "crimson",
          borderRadius: "100%",
          padding: "4px",
          marginRight: "4px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AttachMoneyIcon style={{ color: "white" }} />
      </div>
      <Typography variant="h6" noWrap component="div" sx={{ color: "black" }}>
        Alchemy Money
      </Typography>
    </MuiToolbar>
  );
}
