import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useRef ,useState} from 'react';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
import { Outlet, useNavigate } from 'react-router-dom'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Backdrop from '@mui/material/Backdrop';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Cookies from 'js-cookie'
import { LoginRequest } from '../Utils/AuthRequest';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {

    const navigation = useNavigate()
    const signUp = () => {
        navigation(`/sign-up`)
      };
    const emailInputRef = useRef(null);

    useEffect(() => {
      emailInputRef.current.focus();
    }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get('email'),
      password: data.get('password'),
    });
    const user = {
        username: data.get('email'),
        password: data.get('password'),
      }
      handleOpen()
    LoginRequest(user).then((res) => {
        handleClose()
        const token = res.access_token
        Cookies.set('tokenBigData', token, { path: '/' }); 
        Cookies.set('userRole',res.user_role)
        Cookies.set('fName',res.first_name)
        Cookies.set('Lname',res.last_name)
        Cookies.set('email',user.username)
        toast.success('You Are Connected !', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
      });
        navigation('/predict')
    }).catch((err) => {
        console.log(err)
        
    })
  

  };
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const [openSnack, setOpenSnack] = React.useState(false);

  const handleClickSnack = () => {
    setOpenSnack(true);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal } = state;
  return (
    <>   
    <Snackbar anchorOrigin={{ vertical, horizontal }} open={openSnack}  onClose={handleCloseSnack} disableWindowBlurListener>
  <Alert onClose={handleCloseSnack} severity="success" sx={{ width: '100%' }}>
  You Are Connected  !
  </Alert>
</Snackbar>
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      </Backdrop>
    <Box >

        <Box style={{position:"absolute",top:"15vh",left:"0",width:"50vw"}}>
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
          }}
        >
   
          <p className='welcome'>Welcome back</p>
          <p className='welcomeText'>Enter your email and password to sign in</p>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              inputRef={emailInputRef}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Box style={{display:"flex",alignItems:"left"}}>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" onClick={signUp} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    </Box>
    <Box style={{position:"absolute",top:"0",left:"50vw",width:"50vw",height:"100%",overflow:"hidden"}}>
<Box className='middleBg'></Box>
    </Box>
    </Box>
    </>
  );
}