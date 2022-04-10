import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button'
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Link as RouterLink } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { fet } from "../../modules/fet";

import { mainListItems, secondaryListItems } from "../listItems";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.rnsit.ac.in/">
        RNSIT
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

//   ------------------------------------------------------------------------------------------------

function StudentClass12Record() {
  const usn = window.sessionStorage.getItem('uid');
  let xii_records;
  xii_records = {
    usn: '',
    board_12th: '',
    g_state_12th: 'Haryana',
    cgpa_12th: '',
    cgpa12_scale: ''
  } 
  let [xData, setxData] = React.useState(xii_records);
  React.useEffect(() => {
    fet("/getStudents", 'POST', {params:{id: {usn}}})
    .then(response => {console.log(response)
        // 4. Setting *dogImage* to the image url that we received from the response above
    // .then(data => setDogImage(data.message))
    setxData(prevState => ({
      ...prevState,
      ...response[0].profileFull
  }));
    
  })},{})

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [Board, setAge] = React.useState("");

  const handleChange = e => {
    const { name, value } = e.target;
    setxData(prevState => ({
        ...prevState,
        [name]: value
    }));
};

  const onSubmit = async() => {
    console.log("Form submitted");
    fet("/update", "POST", xData)
    .then((response) => {
        console.log(response);
      });
    console.log(xData);
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <AppBar position="absolute" open={open} elevation={0}>
          <Toolbar
            sx={{
              background: "#021B38",
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>{mainListItems}</List>
          <Divider />
          <List>{secondaryListItems}</List>
        </Drawer>

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            minHeight: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 540,
                  }}
                >
                <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        height: 90,
                      }}
                    >
                      <Typography variant="h4" color="text.primary">
                        Class 12 Records
                      </Typography>
                      <Typography variant="h9" color="text.primary">
                        Class 12 records of student
                      </Typography>
                    </Paper> 
                    <br></br>
                    <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <br></br>
                    <Grid item xs={4}>
                      <Typography
                        variant="h9"
                        color="text.primary"
                        sx={{ ml: 8 }}
                      >
                        <br></br>
                        Board
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                    <FormControl sx={{ width: 150 }}>
                        <InputLabel id="demo-simple-select-label">
                          Select
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="board_12th"
                          value={xData.board_12th}
                          label="Board"
                          onChange={handleChange}
                        >
                          <MenuItem value={'CBSE'}>CBSE</MenuItem>
                          <MenuItem value={'ICSE'}>ICSE</MenuItem>
                          <MenuItem value={'International'}>International</MenuItem>
                          <MenuItem value={'State'}>State</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        variant="h9"
                        color="text.primary"
                        sx={{ ml: 8 }}
                      >
                        <br></br>
                        Score Type
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                    <TextField sx={{ mt: 2}} defaultValue="CGPA" id="standard-basic" variant="standard" disabled />
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        variant="h9"
                        color="text.primary"
                        sx={{ ml: 8 }}
                      >
                        <br></br>
                        Obtained CGPA
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                    <TextField id="standard-basic" name="cgpa_12th" value={xData.cgpa_12th} onChange={handleChange} variant="standard" />
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        variant="h9"
                        color="text.primary"
                        sx={{ ml: 8 }}
                      >
                        <br></br>
                        CGPA Scale
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                    <TextField id="standard-basic" name="cgpa12_scale" value={xData.cgpa12_scale} onChange={handleChange} variant="standard" />
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        variant="h9"
                        color="text.primary"
                        sx={{ ml: 8 }}
                      >
                        <br></br>
                        Class 12 Marksheet
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <br></br>
                    <input type="file" />
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={8}>
                        <br></br>
                        <Button onClick={onSubmit} variant="contained">Submit</Button>
                    </Grid>
                    </Grid>
                </Paper>
                <br></br>
              <RouterLink
                  to="/signed_in/student_dashboard/records"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                  <KeyboardBackspaceIcon fontSize="large" />
                  <span>&nbsp; BACK</span>
                  </div>
                </RouterLink>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function StudentClass12Records() {
  return < StudentClass12Record />;
}