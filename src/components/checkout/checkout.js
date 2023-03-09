import React from "react";
import styles from "./checkout.module.css";


const Checkout = (props) => {
    const { cartList } = props;

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
                        {
                            value.count !== null ?
                                <div>
                               {value.count}
                                </div> : null
                        }

                    </div>
                )
            } else return null;
        })
    }

    return (
        <div>
            <div className={styles.title}>
                <h1> Checkout </h1>
               
            </div>
            <div className={styles.container}>
                {
                    RenderObjet()
                }
            </div>
        </div>
    )
}

export default Checkout;