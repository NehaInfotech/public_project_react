import * as React from 'react';
import { Box, Typography, Breadcrumbs, FormControl, InputLabel, Select, MenuItem, TextField, Button, Grid } from '@mui/material';
import { Link } from "react-router-dom";
import axios from 'axios';
import AddIcon from "@mui/icons-material/Add";
import EditIcon from '@mui/icons-material/Edit';
import UpgradeIcon from "@mui/icons-material/Upgrade";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

function AccordionPage() {

    const [data, setData] = React.useState([]);
    const [inputval, setInputval] = React.useState({
        imgURL: "",
        title: "",
        category: "",
        description: ""
    });
    const [edit, setEdit] = React.useState(null);
    const [acdata, setAcdata] = React.useState([]);

    const auth = window.localStorage.getItem("kye");
    const kye = "m1724125002212ugb807081893dm";

    function setField(item) {
        setInputval({ ...inputval, [item.target.name]: item.target.value });
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
    React.useEffect(() => {
        getDataOfCategory();
        getData();
    }, []);

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
    function sendData() {
        console.log(inputval);

        axios.post("https://service.apikeeda.com/api/v1/blog", inputval, {
            headers: {
                "x-apikeeda-key": kye,
                authorization: auth,
            },
        })
            .then(() => {
                getData();
            })
            .catch((e) => {
                console.log(e);
            });
    }
    function deleteData(id) {
        axios.delete(`https://service.apikeeda.com/api/v1/blog/${id}`, {
            headers: {
                "x-apikeeda-key": kye,
                authorization: auth,
            },
        })
            .then(() => {
                getData();
            })
            .catch((e) => {
                console.log(e);
            });
    }
    function editData() {
        axios.patch(`https://service.apikeeda.com/api/v1/blog/${edit}`, inputval, {
            headers: {
                "x-apikeeda-key": kye,
                authorization: auth,
            },
        })
            .then(() => {
                setEdit(null);
                setInputval({ imgURL: "", title: "", category: "", description: "" });
                getData();
            })
            .catch((e) => {
                console.log(e);
            });
    }
    function search(input) {
        axios.get(`https://service.apikeeda.com/api/v1/blog/search?search=${input}`, {
            headers: {
                "x-apikeeda-key": kye,
                authorization: auth,
            },
        })
            .then((e) => {
                setAcdata(e.data.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }
    function getCategoryName(categoryId) {
        const category = data.find(c => c._id === categoryId);
        return category ? category.name : 'No Category';
    }

    return (
        <Box>
            <Typography variant="h5">Accordion</Typography>
            <Breadcrumbs aria-label="breadcrumb" marginBottom="30px">
                <Link className="Breadcrumb" style={{ color: "#899bbd", fontSize: "14px", textDecoration: "none" }} to="/admin">
                    Home
                </Link>
                <Typography color="#899bbd" fontSize="14px">Components</Typography>
                <Typography color="#273246" fontSize="14px">Accordion</Typography>
            </Breadcrumbs>
            <TextField
                label="Search"
                sx={{ width: "180px", float: "right", marginBottom: "50px" }}
                onChange={(e) => { search(e.target.value); }}
            />
            <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <FormControl sx={{ width: "100px" }}>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={inputval.category}
                        label="Category"
                        onChange={(event) => { setInputval({ ...inputval, category: event.target.value }); }}
                    >
                        {data.map((item) => (
                            <MenuItem key={item._id} value={item._id}>
                                {item.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    value={inputval.imgURL}
                    name='imgURL'
                    label="Add URL"
                    sx={{ width: "30%" }}
                    onChange={(e) => { setField(e); }}
                />
                <TextField
                    name='title'
                    value={inputval.title}
                    label="Add Title"
                    sx={{ width: "25%" }}
                    onChange={(e) => { setField(e); }}
                />
                <TextField
                    name='description'
                    value={inputval.description}
                    label="Add Description"
                    sx={{ width: "25%" }}
                    onChange={(e) => { setField(e); }}
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
                        edit ? editData() : sendData();
                    }}
                >
                    {edit ? "Update" : "Add"}
                </Button>
            </Box>
            <Box sx={{ marginTop: "50px" }} >
                <Box mt={3}>
                    <Grid container spacing={2}>
                        {acdata.map((item) => (
                            <Grid item xs={12} sm={6} md={4} lg={4} key={item._id}>

                                <Card sx={{ maxWidth: 455, boxShadow: 3 }}>
                                    <CardMedia
                                        sx={{ height: 250 }}
                                        image={item.imgURL}
                                        title={item.title}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div" sx={{display:"flex",justifyContent:"space-between"}}>
                                            {item.title}
                                            <Typography variant="body2" color="text.secondary" sx={{textAlign:"center",marginTop:"5px"}}>
                                                {getCategoryName(item.category)}
                                            </Typography>
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.description.slice(0,300)}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="error" onClick={() => deleteData(item._id)}>
                                            <DeleteIcon /> Delete
                                        </Button>
                                        <Button size="small" color="primary" onClick={() => {
                                            setEdit(item._id);
                                            setInputval({
                                                imgURL: item.imgURL,
                                                title: item.title,
                                                category: item.category,
                                                description: item.description
                                            });
                                        }}>
                                            <EditIcon /> Edit
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
}

export default AccordionPage;