import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import HandshakeIcon from '@mui/icons-material/Handshake';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import EngineeringIcon from '@mui/icons-material/Engineering';
import SportsTennisIcon from '@mui/icons-material/SportsTennis'; 
import CategoryIcon from '@mui/icons-material/Category';
import PaymentsIcon from '@mui/icons-material/Payments';
import PeopleIcon from '@mui/icons-material/People'; 
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { Avatar, Collapse } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { deepOrange } from '@mui/material/colors';
import AccountMenu from './IconButton';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const menuItems = [
  { text: 'Inicio', icon: <HomeIcon /> },
  { text: 'Socios', icon: <HandshakeIcon />, path: '/socios'  },
  { text: 'Facturas', icon: <RequestQuoteIcon /> },
  { 
    text: 'Gestión', 
    icon: <EngineeringIcon />, 
    isCollapsible: true, 
    subItems: [
      { text: 'Deportes', icon: <SportsTennisIcon />, path: '/deportes' },
      { text: 'Categorías', icon: <CategoryIcon />, path: '/categorias' },
      { text: 'Tipo gastos', icon: <PaymentsIcon />, path: '/tipoitem' },
      { text: 'Usuarios', icon: <PeopleIcon /> }
    ]
  },
  { text: 'Gastos', icon: <AccountBalanceIcon /> },
  { text: 'Reportes', icon: <AssessmentIcon /> },
  { text: 'Notificaciones', icon: <NotificationsIcon /> },
];

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  gap: theme.spacing(2),
  ...theme.mixins.toolbar,
  justifyContent: 'flex',
}));



export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<boolean>(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const toggleGestion = () => {
    setGestionOpen(!gestionOpen);
  };

  const handleSubItemClick = (path: string) => {
    navigate(path);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                mr: 2,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Club Los Andes
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
        <AccountMenu>
            <Avatar sx={{ bgcolor: deepOrange[500] }}>C</Avatar>
          </AccountMenu>
          <Typography
            noWrap
            component="div"
            style={{ marginLeft: '10px', fontSize: '13px' }}
          >
            Cristian Garcia
          </Typography>
          <IconButton
            onClick={handleDrawerClose}
            style={{ marginLeft: 'auto' }}
          >
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
        {menuItems.map(({ text, icon, isCollapsible, subItems, path }) => (
          isCollapsible ? (
            <React.Fragment key={text}>
              <ListItem disablePadding>
                <ListItemButton onClick={toggleGestion}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                  {gestionOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItemButton>
              </ListItem>
              <Collapse in={gestionOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {subItems.map(({ text: subText, icon: subIcon, path }) => (
                    <ListItem key={subText} sx={{ pl: 4 }} disablePadding>
                      <ListItemButton onClick={() => handleSubItemClick(path)}>
                        <ListItemIcon>{subIcon}</ListItemIcon>
                        <ListItemText primary={subText} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          ) : (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={path ? () => handleSubItemClick(path) : undefined}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        ))}
        </List>
      </Drawer>
      <Main open={open}>
      </Main>
    </Box>
  );
}