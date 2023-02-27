import React from "react";
import { useState } from "react";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import styles from './ShopCart.module.css';

const ShopButton = styled(Button)(({ theme }) => ({
    color: "whitesmoke",
    '&:hover': {
        backgroundColor: "rgb(236, 46, 46)",
    },
    fontFamily: ['Montserrat', 'serif'].join(','),
    fontSize: 20,
    fontWeight: 400,

}));


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    backgroundColor: 'rgb(0, 0, 0)',
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));


export const ShopCart = (props) => {
    const { cartList } = props;
    console.log(cartList);
    const [openCart, setOpenCart] = useState(false);

    const toggleCart = () => {
        setOpenCart(!openCart);
    }

    const RenderObjet = () => {
        return Object.entries(cartList).map(([key, value], i) => {
            if (value.id !== "") {
                return (
                    <div className={styles.itemCard} key={key}>

                        <div >
                            <img width={"200px"} src={`${process.env.PUBLIC_URL}/assets/${value.model}.png`} alt="" />
                        </div>
                        <div >
                           {value.model}
                        </div>

                    </div>
                )
            }else return null;
        })
    }

    return (
        <div>
            <div className={styles.btnCart}>
                <ShopButton onClick={() => toggleCart()}>Shop Cart</ShopButton>
            </div>
            <Drawer
                PaperProps={{
                    sx: {
                        backgroundColor: "rgba(85, 5, 5, 0.644)"
                    }
                }}
                sx={{

                    width: "400px",
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: "400px",
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="right"
                open={openCart}
            >
                <DrawerHeader>
                    <IconButton sx={{ color: 'whitesmoke' }} onClick={toggleCart}>
                        <CloseIcon />
                    </IconButton>
                    <div className={styles.title}>
                        Shopping Cart
                    </div>
                </DrawerHeader>
                <div >
                    <Button onClick={() => props.emptyCart()}>Empty cart</Button>
                </div>
                <div className={styles.container}>
                    {
                        RenderObjet()
                    }
                </div>


            </Drawer>
        </div>
    );
}