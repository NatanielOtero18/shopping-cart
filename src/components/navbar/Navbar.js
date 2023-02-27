import React from "react";
import { Link } from "react-router-dom";
import { ShopCart } from "../cart/ShopCart";
import styles from "./Navbar.module.css"


const Navbar = (props) => {




    return (
        <div>
            <div className={styles.headerContainer}>
                <div>
                    <Link to={'/'} className={styles.link}>
                        <h2><span>B</span>uild your <span>P</span>C</h2>
                    </Link>
                </div>

                <div className={styles.btnGroup}>

                   <ShopCart cartList={props.cartList} emptyCart={props.emptyCart}/>


                </div>


            </div>



        </div>
    );
}

export default Navbar;