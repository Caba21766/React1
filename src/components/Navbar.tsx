// src/components/Navbar.tsx

import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const navLinks = [
  { label: 'Inicio', to: '/' },
  { label: 'Favoritos ⭐', to: '/favoritos' }
];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={3}
        sx={{
          backgroundColor: '#121212',
          borderBottom: '1px solid #333'
        }}
      >
        <Toolbar sx={{ px: { xs: 2, md: 4 } }}>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              color: 'white',
              textDecoration: 'none',
              fontWeight: 700,
              letterSpacing: 1
            }}
          >
            🎬 PeliNet
          </Typography>

          {isDesktop ? (
            <Box>
              {navLinks.map(({ label, to }) => (
                <Button
                  key={to}
                  component={RouterLink}
                  to={to}
                  color="inherit"
                  sx={{
                    textTransform: 'none',
                    fontWeight: 500,
                    mx: 1,
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' }
                  }}
                >
                  {label}
                </Button>
              ))}
            </Box>
          ) : (
            <IconButton
              color="inherit"
              edge="end"
              onClick={toggleDrawer(true)}
              aria-label="open menu"
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{ width: 240, backgroundColor: '#121212', height: '100%' }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {navLinks.map(({ label, to }) => (
              <ListItem key={to} disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to={to}
                  sx={{
                    color: 'white',
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)' }
                  }}
                >
                  <ListItemText primary={label} primaryTypographyProps={{ fontWeight: 500 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
