import { Toolbar as MuiToolbar, IconButton, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
// import Image from "mui-image";
import Image from "mui-image";

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
      <Image src="/AlchemyMoneyLogo.png" width={50} />
      <Typography variant="h6" noWrap component="div" sx={{ color: "black" }}>
        Finance Management
      </Typography>
    </MuiToolbar>
  );
}
