import React from "react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import Button from '@mui/material/Button';
import styles from './Parts.module.css';
import { cpus } from './cpus.js';
import { mobos } from './mobo.js'
import { gpus } from "./gpu";
import { rams } from "./ram";
import { psu } from "./psu";
import { storage } from "./storage";
import { cases } from "./case";
import TextField from '@mui/material/TextField';

export const CPU = (props) => {
    const { cartList, addComponent } = props;
    const [brand, chooseBrand, handleComplete] = useOutletContext()
    const data = cpus.data;
    console.log(data);

    const handleAddItem = (item) => {
        if (cartList.Motherboard.id !== "") {
            if (cartList.Motherboard.socket !== item.socket) {
                alert("The cpu and the motherboard are incompatible ")
            } else {
                addComponent("CPU", item);
                handleComplete("Motherboard");
            }
        } else {
            addComponent("CPU", item);
            handleComplete("Motherboard");
        }

    }

    return (<div>
        <div className={styles.header}>
            <div className={styles.btnGrpHead}>
                <div>
                    <Button variant="contained" color="primary" onClick={() => chooseBrand("INTEL")}>Intel</Button>
                </div>
                <div>
                    <Button variant="contained" color="error" onClick={() => chooseBrand("AMD")}>AMD</Button>
                </div>
            </div>
        </div>
        <div className={styles.container}>
            {

                data.map(item => {
                    if (item.brand === brand) {
                        return <div className={styles.itemCard} key={item.id}>
                            <div >
                                <img width={"200px"} src={`${process.env.PUBLIC_URL}/assets/${item.model}.png`} alt="" />
                            </div>
                            <div >
                                {item.brand}
                            </div>
                            <div >
                                {item.model}
                            </div>
                            <div >
                                {item.socket}
                            </div>
                            <div>
                                <Button variant="contained" color="secondary" onClick={() => handleAddItem(item)} >Add to cart</Button>
                            </div>

                        </div>
                    }
                })
            }
        </div>
    </div>);
}

export const Mother = (props) => {
    const { cartList, addComponent } = props;
    const [brand, chooseBrand, handleComplete] = useOutletContext()
    const data = mobos.data;

    const handleAddItem = (item) => {
        if (cartList.CPU.id !== "") {
            if (cartList.CPU.socket !== item.socket) {
                alert("The cpu and the motherboard are incompatible ")
            } else {
                addComponent("Motherboard", item);
                handleComplete("GPU");
            }
        } else {
            addComponent("Motherboard", item);
            handleComplete("GPU");
        }

    }


    return (<div>
        <div className={styles.container}>
            {

                data.map(item => {
                    return <div className={styles.itemCard} key={item.id}>
                        <div >
                            <img width={"200px"} src={`${process.env.PUBLIC_URL}/assets/${item.model}.png`} alt="" />
                        </div>
                        <div >
                            {item.brand}
                        </div>
                        <div >
                            {item.model}
                        </div>
                        <div >
                            {item.socket}
                        </div>
                        <div>
                            <Button variant="contained" color="secondary" onClick={() => handleAddItem(item)} >Add to cart</Button>
                        </div>

                    </div>

                })
            }
        </div>
    </div>);
}

export const GPU = (props) => {
    const { cartList, addComponent } = props;
    const [brand, chooseBrand, handleComplete] = useOutletContext()
    const data = gpus.data;

    const handleAddItem = (item) => {

        addComponent("GPU", item);
        handleComplete("RAM");
    }
    return (<div>
        <div className={styles.container}>
            {
                data.map(item => {
                    return <div className={styles.itemCard} key={item.id}>
                        <div >
                            <img width={"200px"} src={`${process.env.PUBLIC_URL}/assets/${item.model}.png`} alt="" />
                        </div>
                        <div >
                            {item.brand}
                        </div>
                        <div >
                            {item.model}
                        </div>
                        <div>
                            <Button variant="contained" color="secondary" onClick={() => handleAddItem(item)} >Add to cart</Button>
                        </div>

                    </div>
                })
            }
        </div>
    </div>);
}

export const RAM = (props) => {
    const { cartList, addComponent } = props;
    const [brand, chooseBrand, handleComplete] = useOutletContext()
    const data = rams.data;
    const [count, setCount] = useState(1);

    const handleAddItem = (item) => {
        item["count"] = "Count: " + count;
        addComponent("RAM", item);

        /*handleComplete("PSU");*/
    }

    const changeHandler = (e) => {
        setCount(e.target.value);
    }
    const confirmCount = (item) => {
        item["count"] = "Count: " + count;
        addComponent("RAM", item);
        handleComplete("PSU");
    }
    return (<div>
        <div className={styles.container}>
            {

                data.map(item => {
                    return <div className={styles.itemCard} key={item.id}>
                        <div >
                            <img width={"200px"} src={`${process.env.PUBLIC_URL}/assets/${item.model}.png`} alt="" />
                        </div>
                        <div >
                            {item.brand}
                        </div>
                        <div >
                            {item.model}
                        </div>
                        <div>
                            {
                                cartList.RAM.id === "" ?
                                    <Button variant="contained" color="secondary" onClick={() => handleAddItem(item)} >Add to cart</Button>
                                    : <div className={styles.countContainer}>
                                        <TextField
                                            sx={{ input: { color: 'whitesmoke' }, label: { color: 'whitesmoke' }, background: { color: 'whitesmoke' } }}
                                            color={"error"}
                                            id="outlined-controlled"
                                            label="Count"
                                            type={"number"}
                                            value={count}
                                            inputProps={{ min: 1 }}
                                            onChange={(e) => changeHandler(e)}

                                        />
                                        <Button variant="contained" color="secondary" onClick={() => confirmCount(item)} >Confirm count</Button>
                                    </div>
                            }




                        </div>

                    </div>
                })
            }
        </div>
    </div>);
}

export const PSU = (props) => {
    const { cartList, addComponent } = props;
    const [brand, chooseBrand, handleComplete] = useOutletContext()
    const data = psu.data;

    const handleAddItem = (item) => {
        addComponent("PSU", item);
        handleComplete("Storage");
    }
    return (<div>
        <div className={styles.container}>
            {
                data.map(item => {
                    return <div className={styles.itemCard} key={item.id}>
                        <div >
                            <img width={"200px"} src={`${process.env.PUBLIC_URL}/assets/${item.model}.png`} alt="" />
                        </div>
                        <div >
                            {item.brand}
                        </div>
                        <div >
                            {item.model}
                        </div>
                        <div>
                            <Button variant="contained" color="secondary" onClick={() => handleAddItem(item)} >Add to cart</Button>
                        </div>

                    </div>
                })
            }
        </div>
    </div>);
}

export const StorageComp = (props) => {
    const { cartList, addComponent } = props;
    const [brand, chooseBrand, handleComplete] = useOutletContext()
    const data = storage.data;

    const handleAddItem = (item) => {
        addComponent("Storage", item);
        handleComplete("Case");
    }
    return (<div>
        <div className={styles.container}>
            {
                data.map(item => {
                    return <div className={styles.itemCard} key={item.id}>
                        <div >
                            <img width={"200px"} src={`${process.env.PUBLIC_URL}/assets/${item.model}.png`} alt="" />
                        </div>
                        <div >
                            {item.brand}
                        </div>
                        <div >
                            {item.model}
                        </div>
                        <div>
                            <Button variant="contained" color="secondary" onClick={() => handleAddItem(item)} >Add to cart</Button>
                        </div>

                    </div>
                })
            }
        </div>
    </div>);
}

export const CaseComponent = (props) => {
    const { cartList, addComponent } = props;
    const [brand, chooseBrand, handleComplete] = useOutletContext()
    const data = cases.data;

    const handleAddItem = (item) => {
        addComponent("Case", item);
        handleComplete("Checkout");
    }
    return (<div>
        <div className={styles.container}>
            {
                data.map(item => {
                    return <div className={styles.itemCard} key={item.id}>
                        <div >
                            <img width={"200px"} src={`${process.env.PUBLIC_URL}/assets/${item.model}.png`} alt="" />
                        </div>
                        <div >
                            {item.brand}
                        </div>
                        <div >
                            {item.model}
                        </div>
                        <div>
                            <Button variant="contained" color="secondary" onClick={() => handleAddItem(item)} >Add to cart</Button>
                        </div>

                    </div>
                })
            }
        </div>
    </div>);
} 
