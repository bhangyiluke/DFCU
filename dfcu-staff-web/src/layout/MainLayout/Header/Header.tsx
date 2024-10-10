import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Divider,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Toolbar,
} from "@mui/material";
import { useLayoutContext } from "@/context/LayoutContext";
import useIsMobile from "@/hooks/useIsMobile";
import { authService } from "@/services/authentication.service";
import { SIDEBAR_WIDTH } from "../constants";
import Breadcrumbs from "./Breadcrumbs";

const Header = () => {
    const { sidebarOpen, setSidebarOpen } = useLayoutContext();
    const [currentUser, setCurrentUser] = useState({ username: "" });
    const isMobile = useIsMobile();
    const navigate = useNavigate();

    //For popup to work
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDrawerToggle = () => {
        setSidebarOpen((current) => !current);
    };

    // authService.currentUser.subscribe((u) => {
    //     setCurrentUser(Object({ user: u, isAdmin: u && u.role === "ADMIN" ,role: u.role}));
    // });
    // console.log("useLoaderData => ", currentUser);

    useEffect(() => {
        authService.currentUser.subscribe((u) => {
            u && setCurrentUser(
                Object({
                    user: u,
                    isAdmin: u && u.role === "ADMIN",
                    role: u.role,
                }),
            );
        });
        // return ()=>authService.currentUser.
    }, []);

    const handleLogout = () => {
        authService.logout();
        navigate("/login");
    };

    const UserMenu = () => (
        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{
                paper: {
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&::before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
            <MenuItem>
                <Avatar /> Profile
            </MenuItem>
            <Divider />
            {/* <MenuItem>
                <ListItemIcon>
                    <PersonAdd fontSize="small" />
                </ListItemIcon>
                Add another account
            </MenuItem> */}
            <MenuItem>
                <ListItemIcon>
                    <Settings fontSize="small" />
                </ListItemIcon>
                Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Logout
            </MenuItem>
        </Menu>
    );

    return (
        <AppBar
            elevation={0}
            position="fixed"
            sx={{
                width: `calc(100% - ${
                    sidebarOpen && !isMobile ? SIDEBAR_WIDTH : 0
                }px)`,
                transition: (theme) =>
                    theme.transitions.create(["width"], {
                        easing: sidebarOpen
                            ? theme.transitions.easing.easeOut
                            : theme.transitions.easing.sharp,
                        duration: sidebarOpen
                            ? theme.transitions.duration.enteringScreen
                            : theme.transitions.duration.leavingScreen,
                    }),
            }}
        >
            <Toolbar>
                <Box
                    sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        flexGrow: 1,
                    }}
                >
                    <IconButton
                        color="inherit"
                        aria-label="toggle drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Breadcrumbs />
                </Box>
                <Box>
                    <IconButton
                        component={RouterLink}
                        onClick={handleClick}
                        sx={{ padding: 0 }}
                        to="#"
                    >
                        <Avatar />
                    </IconButton>
                    <UserMenu />
                </Box>
            </Toolbar>
        </AppBar>
    );
};
export default Header;
