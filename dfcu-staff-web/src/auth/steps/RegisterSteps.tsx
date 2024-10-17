import { useContext } from "react";
import { Fragment } from "react/jsx-runtime";
import { RegisterContext as RegisterState } from "@/context/RegisterContext";
import RegisterInitial from "./RegisterInitial";
import RegisterToken from "./RegisterToken";
import RegisterDetails from "./RegisterDetails";
import { Step, StepLabel, Stepper, Typography } from "@mui/material";

const steps = ['Provide Email', 'Verify OTP', 'Register User'];

export default () => {
    const { state } = useContext(RegisterState);
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
    </Fragment>);
}