import { useContext, useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { RegisterContext as RegisterState } from "@/context/RegisterContext";
import RegisterInitial from "./RegisterInitial";
import RegisterToken from "./RegisterToken";
import RegisterDetails from "./RegisterDetails";
import { Alert, Snackbar, SnackbarCloseReason, SnackbarOrigin, Step, StepLabel, Stepper, Typography } from "@mui/material";

const steps = ['Provide Email', 'Verify OTP', 'Register User'];

const anchorOrigin: SnackbarOrigin = { vertical: 'bottom', horizontal: 'right' };

export default () => {
    const { state } = useContext(RegisterState);
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    useEffect(() => {
        handleClick();
    }, [state.response]);

    return (<Fragment>
        <Stepper activeStep={state.activeStep} orientation="horizontal">
            {steps.map((label, index) => (
                <Step key={label} completed={state.activeStep > index} >
                    <StepLabel
                        optional={
                            index === steps.length - 1 ? (
                                <Typography variant="caption">Last step</Typography>
                            ) : null
                        }>
                        {label}
                    </StepLabel>
                </Step>
            ))}
        </Stepper>
        {
            state.activeStep < steps.length ? {
                "0": <RegisterInitial />,
                "1": <RegisterToken />,
                "2": <RegisterDetails />
            }[state.activeStep] : <Fragment />
        }
        {
            state.response && (
                <Fragment><Snackbar open={open && state.response?.success} autoHideDuration={6000} onClose={handleClose} anchorOrigin={anchorOrigin}>
                    <Alert
                        onClose={handleClose}
                        severity="success"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        {state.response?.message}
                    </Alert>
                </Snackbar>
                    <Snackbar open={open && !state.response?.success} autoHideDuration={6000} onClose={handleClose} anchorOrigin={anchorOrigin}>
                        <Alert
                            onClose={handleClose}
                            severity="error"
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            {state.response?.message}
                        </Alert>
                    </Snackbar></Fragment>
            )
        }

    </Fragment>);
}