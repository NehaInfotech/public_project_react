import React, { useState } from "react";
import {
  Breadcrumbs, TextField
} from "@mui/material";
// import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import UpgradeIcon from "@mui/icons-material/Upgrade";
//Category Types

const CategoryPage = () => {
  const [inputval, setinputval] = useState({ name: "" });
  const [data, setdata] = useState([]);
  const [edit, setedit] = useState(null);

  const auth = window.localStorage.getItem("kye");
  const kye = "m1724125002212ugb807081893dm"
  function getdat() {
    axios
      .get("https://service.apikeeda.com/api/v1/category", {
        headers: {
          "x-apikeeda-key": kye,
          authorization: auth,
        },
      })
      .then((e) => {
        console.log(e);
        setdata(e.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    getdat();
  }, []);
  function senddata() {
    axios
      .post("https://service.apikeeda.com/api/v1/category", inputval, {
        headers: {
          "x-apikeeda-key": kye,
          authorization: auth,
        },
      })
      .then((e) => {
        getdat();
        setinputval({ name: "" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function deletedata(id) {
    axios
      .delete(`https://service.apikeeda.com/api/v1/category/${id}`, {
        headers: {
          "x-apikeeda-key": kye,
          authorization: auth,
        },
      })
      .then(() => {
        getdat();
      })
      .catch((e) => {
        console.log(e);
      });
  }
  function editdata() {
    axios
      .patch(`https://service.apikeeda.com/api/v1/category/${edit}`, inputval, {
        headers: {
          "x-apikeeda-key": kye,
          authorization: auth,
        },
      })
      .then(() => {
        setedit(false);
        setinputval({ name: "" });
        getdat();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function serch(input) {
    axios
      .get(`https://service.apikeeda.com/api/v1/category/search?search=${input}`,
        {
          headers: {
            "x-apikeeda-key": kye,
            authorization: auth,
          },
        }
      )
      .then((e) => {
        setdata(e.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <>
      <Box>
        <Typography variant="h5" marginBottom="5px">
          Category
        </Typography>
        <Breadcrumbs aria-label="breadcrumb" marginBottom="30px">
          <Link
            className="Breadcrumb"
            style={{
              color: "#899bbd",
              fontSize: "14px",
              textDecoration: "none",
            }}
            to="/admin"
          >
            Home
          </Link>
          <Typography color="#899bbd" fontSize="14px">
            Components
          </Typography>
          <Typography color="#273246" fontSize="14px">
            Category
          </Typography>
        </Breadcrumbs>

        <Box
          sx={{
            width: "90%",
            margin: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextField
            onChange={(e) => setinputval({ name: e.target.value })}
            value={inputval.name}
            label="add"
            sx={{
              width: "50%",
            }}
          />
          <Button
            startIcon={edit ? <UpgradeIcon /> : <AddIcon />}
            sx={{
              padding: "10px 18px",
              backgroundColor: "blue",
              color: "white",
              "&:hover": {
                cursor: "pointer",
                backgroundColor: "#0000ffb3",
              },
            }}
            onClick={() => {
              edit ? editdata() : senddata();
            }}
          >
            {edit ? "Updat" : "Add"}
          </Button>
          <TextField
            label="search"
            type="text"
            onChange={(e) => serch(e.target.value)}
          />
        </Box>
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6" gutterBottom>
         LIST
          </Typography>
          <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">No</TableCell>
                  <TableCell align="center">API ID</TableCell>
                  <TableCell align="center">Category name</TableCell>
                  <TableCell align="center">Delete</TableCell>
                  <TableCell align="center">Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={item._id} sx={{ textAlign: 'center' }}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{item._id}</TableCell>
                    <TableCell align="center">{item.name}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        onClick={() => deletedata(item._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        startIcon={<EditIcon />}
                        onClick={() => {
                          setedit(item._id);
                          setinputval({ name: item.name });
                        }}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
};

export default CategoryPage;
