import { useTheme } from "@emotion/react";
import { AddCircleOutlineOutlined, SubjectOutlined } from "@mui/icons-material";
import { AppBar, Avatar, Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import { format } from "date-fns";
import { useLocation, useNavigate } from "react-router-dom";

const Layout = ({ children }: { children: JSX.Element }) => {

    const drawerWidth = 240;

    const styles = {
        background: '#f9f9f9',
        width: '100%',
    };

    const drawerStyles = {
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
        },
    };

    const active = {
        background: '#f4f4f4',
    };

    const appbarStyles = {
        width: `calc(100% - ${drawerWidth}px)`
    };

    // const theme = useTheme();
    // console.log("toolbar height:", theme);
    const toolbar = {
        height: 80,
    }



    const menuItems = [
        {
            text: 'My Notes',
            icon: <SubjectOutlined color="secondary" />,
            path: '/'
        },
        {
            text: 'Create Note',
            icon: <AddCircleOutlineOutlined color="secondary" />,
            path: '/create'
        }
    ];

    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Box sx={{ display: 'flex' }}>
            {/* app bar */}
            <AppBar sx={appbarStyles} elevation={0}>
                <Toolbar>
                    <Typography component="div" sx={{ flexGrow: 1 }}>Today is {format(new Date(), 'do MMMM Y')}</Typography>
                    <Typography>Mario</Typography>
                    <Avatar sx={{ marginLeft: 2 }} src="/mario-av.png"></Avatar>
                </Toolbar>
            </AppBar>

            {/* side drawer */}
            <Drawer
                sx={drawerStyles}
                variant="permanent"
                anchor="left"
            >
                <Typography variant="h5">
                    Ninja Notes
                </Typography>
                {/* list / links */}
                <List>
                    {menuItems.map((menuItem) => {
                        return (
                            <ListItem key={menuItem.text} sx={location.pathname === menuItem.path ? active : null}>
                                <ListItemButton onClick={() => navigate(menuItem.path)}>
                                    <ListItemIcon>{menuItem.icon}</ListItemIcon>
                                    <ListItemText primary={menuItem.text} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Drawer>
            <Box component="main" sx={styles}>
                <Box sx={toolbar}></Box>
                {children}
            </Box>
        </Box>
    );
}

export default Layout;