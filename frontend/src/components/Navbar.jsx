import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Outlet, useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import Fingerprint from '@mui/icons-material/Fingerprint';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Cookies from 'js-cookie'

export default function Navbar() {
  const navigation = useNavigate()
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const signIn = () => {
    setAnchorEl(null);
    navigation(`/sign-in`)
  };
  const signUp = () => {
    setAnchorEl(null);
    navigation(`/sign-up`)
  };
  const accueil = () => {
    setAnchorEl(null);
    navigation(`/`)
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    setAnchorEl(null);
    Cookies.remove('tokenBigData');
    Cookies.remove('email');
    navigation(`/`)
  };

  return (
    <Box style={{width:"100vw",height:"100vh"}}>
    <Box sx={{ display:"flex", flexGrow: 1 ,width:"100vw",alignItems:"center",justifyContent:"center"}}>
      {/* <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup> */}
      <AppBar  sx={{ width:"90vw",background: "rgba(255, 255, 255, 0.9)",position:"absolute",top:"3vh",left:"5vw",
      color: "rgb(52, 71, 103)",borderRadius: "10rem",boxShadow: "rgba(20, 20, 20, 0.12) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.07) 0rem 0.125rem 0.25rem -0.0625rem",
      backdropFilter: "saturate(200%) blur(30px)"}}>
        <Toolbar>
          <p
          className='title'
          >
            Keep Your <span style={{color:"#1976d2"}}>Customers</span>
          </p>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            
          </Typography>
          {auth && (
            <div style={{marginRight: "2vw"}}>
              {Cookies.get('tokenBigData')=== undefined?<IconButton aria-label="fingerprint" onClick={handleMenu} color="primary">
  <Fingerprint fontSize="large"/>
</IconButton>:
<Button onClick={handleMenu} variant="text" style={{fontWeight:"600"}}>{Cookies.get('email')}</Button>}
{Cookies.get('tokenBigData')?
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={accueil}>Accueil</MenuItem>
                <MenuItem onClick={logout}>Log Out</MenuItem>
              </Menu>:
                            <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                          >
                            <MenuItem onClick={accueil}>Accueil</MenuItem>

                            <MenuItem onClick={signIn}>Sign In</MenuItem>
                            <MenuItem onClick={signUp}>Sign Up</MenuItem>
                            
            
                          </Menu>}
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
          <Outlet />
          </Box>
  );
}