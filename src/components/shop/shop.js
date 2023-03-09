import React from "react";
import styles from './shop.module.css';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useState } from "react";

import './overdrives.css';
import { Outlet } from "react-router-dom";


import { useNavigate } from "react-router-dom";


const steps = ['CPU', 'Motherboard', 'GPU', 'RAM', 'PSU', 'Storage', 'Case'];




const ShoppingPage = (props) => {

    const { cartList , removeCoreComponent } = props;
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] =useState({});
    const [page, setPage] = useState(1);
    const [brand, setBrand] = useState("");

    const chooseBrand = (brand) =>{
        setBrand(brand);
       handleLink("CPU")
    }

    const handleChange = (event, value) => {
        setPage(value);
    };

    const navigate = useNavigate();


	const handleLink = (whereToGo) =>{    
		navigate(whereToGo)
	} 


    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step,label) => () => {
        setActiveStep(step);        
        removeCoreComponent(label);
        handleLink(label);
    };

    const handleComplete = (link) => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
        handleLink(link);
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };



    return (
        <div>
            <div className={styles.mainContainer}>
                <div className={styles.steperContainer}>
                    <div className={styles.menu}>
                        <Box sx={{ width: '100%' }}>
                            <Stepper nonLinear orientation='vertical' activeStep={activeStep}>
                                {steps.map((label, index) => (
                                    <Step key={label} completed={completed[index]} sx={{
                                        '& .MuiStepLabel-root .Mui-completed': {
                                            color: 'error.dark', // circle color (COMPLETED)
                                        },
                                        '& .MuiStepLabel-label': {
                                            color: 'white',
                                        },
                                        '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
                                        {
                                            color: 'white', // Just text label (COMPLETED)
                                        },
                                        '& .MuiStepLabel-root .Mui-active': {
                                            color: 'error.main', // circle color (ACTIVE)
                                        },
                                        '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
                                        {
                                            color: 'common.white', // Just text label (ACTIVE)
                                        },
                                        '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                                            fill: 'black', // circle's number (ACTIVE)
                                        },
                                    }}>
                                        <StepButton color="inherit" onClick={handleStep(index,label)}>
                                            {label}
                                        </StepButton>
                                    </Step>
                                ))}
                            </Stepper>

                        </Box>
                    </div>
                    <div className={styles.mainContent}>
                        <div>
                                {
                                    brand === "" ? 
                                    <div className={styles.brandHeader}>
                                        <div>
                                        Choose your favorite brand:
                                        </div>
                                        <Button variant="contained" color="primary" onClick={()=>chooseBrand("INTEL")}>Intel</Button>
                                        <Button variant="contained" color="error" onClick={()=>chooseBrand("AMD")}>AMD</Button>
                                    </div> :
                                    <Outlet context={[brand, chooseBrand, handleComplete]}/>
                                }
                        </div>

                        <div className={styles.footer}>
                            <div className={styles.pageContainer}>
                                <div>
                                  
                                 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ShoppingPage;