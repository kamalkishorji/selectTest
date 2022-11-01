import React,{useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Grid from '@mui/system/Unstable_Grid';
import styled from '@mui/system/styled';
import axios from 'axios';


const Item = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    border: '1px solid',
    borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
    padding: theme.spacing(1),
    borderRadius: '4px',
    textAlign: 'center',
}));

const Main = () => {
    const [products,setProducts] = useState([]);
    const [selectedProduct,setSelectedProduct] = useState(0);
    const getProducts = async()=>{
        let {data} = await axios.get('https://dummyjson.com/products');
        setProducts(data.products);
        //console.log(data.products);

    }
    useEffect(()=>{
        getProducts();

    },[]);
    const handleChange = (event) => {
        setSelectedProduct(event.target.value)
       console.log(event.target.value);
      };
    return (
        <Box sx={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            maxHeight: '100vh',
            marginTop: '100px'
        }}>
            <Grid container justifyContent='center' spacing={2}>
                <Grid xs={12}>
                    <Item>Please Select Product</Item>
                </Grid>
                <Grid xs={6}>
                    <Item>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Product</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Product"
                                value={0}
                               onChange={handleChange}
                            >
                            {products.map(product=>{
                                return  <MenuItem key={Math.random()*1000+product.id} value={product.id}>{product.title}</MenuItem>

                            })}
                               
                            </Select>
                        </FormControl>
                    </Item>
                </Grid>
                <Grid xs={6}>
                    <Item>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Selected Product</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedProduct}
                                label="Selected Product"

                            >
                              {products.map(product=>{
                                return  <MenuItem key={Math.random()*2000+product.id} value={product.id}>{product.title}</MenuItem>

                            })}
                            </Select>
                        </FormControl>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Main