import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
function User() {
  const [acdata, setAcdata] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [inputval, setInputval] = React.useState({
    imgURL: "",
    title: "",
    category: "",
    description: ""
  });
  const auth = window.localStorage.getItem("kye");
  const kye = "m1724125002212ugb807081893dm";

  function getData() {
    axios.get("https://service.apikeeda.com/api/v1/blog", {
      headers: {
        "x-apikeeda-key": kye,
        authorization: auth,
      }
    }).then((d) => {
      setAcdata(d.data.data);
      setInputval({ imgURL: "", title: "", category: "", description: "" });
    }).catch((d) => {
      console.log(d);
    });
  }
  function getDataOfCategory() {
    axios.get("https://service.apikeeda.com/api/v1/category", {
      headers: {
        "x-apikeeda-key": kye,
        authorization: auth,
      },
    })
      .then((e) => {
        setData(e.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  useEffect(() => {
    getDataOfCategory()
    getData();
  }, []);

  function getCategoryName(categoryId) {
    const category = data.find(c => c._id === categoryId);
    return category ? category.name : 'No Category';
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "black" }}>
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          > */}
            {/* <MenuIcon /> */}
          {/* </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BLOGS
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ padding: 2, marginBottom: "70px" }}>
        <Grid container spacing={2}>
          {acdata.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={item._id}>
              <Box
                sx={{
                  border: '1px solid #ddd',
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: 2,
                  padding: 2,
                  textAlign: 'center'
                }}
              >
                <img
                  src={item.imgURL}
                  alt={item.title}
                  style={{ width: '100%', height: '220px',backgroundSize:"cover" }}
                />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {getCategoryName(item.category)}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {item.description.slice(0, 200)}
                  {item.description.length > 200 ? "..." : ""}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box
        component="footer"
        sx={{
          marginTop: "50px",
          backgroundColor: 'black',
          color: 'white',
          mt: 'auto',
          width: '100%',
          position: 'relative',
         
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Typography variant="h5" gutterBottom sx={{ textAlign: "center" }}>
              Company
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "center", marginBottom: "10px" }}>
              <Link href="#" color="inherit" underline="none" >
                About Us
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "center", marginBottom: "10px" }}>
              <Link href="#" color="inherit" underline="none">
                Careers
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "center", marginBottom: "10px" }}>
              <Link href="#" color="inherit" underline="none">
                Blog
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
              Services
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "center", marginBottom: "10px" }}>
              <Link href="#" color="inherit" underline="none">
                Web Development
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "center", marginBottom: "10px" }}>
              <Link href="#" color="inherit" underline="none">
                Design
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "center", marginBottom: "10px" }}>
              <Link href="#" color="inherit" underline="none">
                Marketing
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
              Contact
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "center", marginBottom: "10px" }}>
              <Link href="mailto:info@example.com" color="inherit" underline="none">
                info@example.com
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "center", marginBottom: "10px" }}>
              <Link href="tel:+1234567890" color="inherit" underline="none">
                +1 (234) 567-890
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "center", marginBottom: "10px" }}>
              <Link href="#" color="inherit" underline="none">
                kamrej,surat,gujrat..
              </Link>
            </Typography>
          </Grid>
        </Grid>
        <Box
          sx={{
            textAlign: 'center',
            mt: 3,
            borderTop: '1px solid',
          }}
        >
          <Typography variant="body2" sx={{ padding: "30px" }}>
            &copy; {new Date().getFullYear()} creactive and maltimedia
          </Typography>
        </Box>
      </Box>

    </Box>
  );
}

export default User;