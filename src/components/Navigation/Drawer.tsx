import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import DrawerSpacer from "./DrawerSpacer";

interface DrawerProps {
  drawerWidth: number;
  open: boolean;
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
}

const MenuLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

export default function Drawer({
  drawerWidth,
  open,
  handleDrawerOpen,
  handleDrawerClose,
}: DrawerProps) {
  const theme = useTheme();

  const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });

  const StyledDrawer = styled(MuiDrawer, {
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

  return (
    <StyledDrawer variant="permanent" open={open}>
      <DrawerSpacer>
        {open && (
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        )}
      </DrawerSpacer>
      <Divider />
      <List>
        <ListItem disablePadding sx={{ display: "block" }}>
          <MenuLink to="/">
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <AccountBalanceIcon />
              </ListItemIcon>
              <ListItemText primary="Mortgage" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </MenuLink>
          <MenuLink to="/budget">
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <AccountBalanceWalletIcon />
              </ListItemIcon>
              <ListItemText primary="Budget" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </MenuLink>
        </ListItem>
      </List>
    </StyledDrawer>
  );
}
