import React from "react";
import styles from "./mainView.module.css"
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";


const ShopButton = styled(Button)(({ theme }) => ({
    color: "black",
    backgroundColor: "whitesmoke",
    '&:hover': {
        backgroundColor: "rgb(236, 46, 46)",
    },

}));

const MainView = () => {

	const navigate = useNavigate();
	const handleClick = () =>{
		navigate("/Shop")
	} 
	return( <div >
		<main>
		<section
		style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/wallpaperflare.com_wallpaper.jpg)` }}
		className={styles.mainBody}
	  >
		<div className={styles.title}>
			<h1>Start building your PC</h1>
			<h4>Take a look at our components</h4>
			<ShopButton onClick={handleClick}>Start shopping</ShopButton>
		</div>
		</section>
		</main>
		
	</div> );
}

export default MainView;