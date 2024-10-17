import { Typography, Button, Alert } from "@mui/material";
import { Fragment } from "react/jsx-runtime";
import { Link as RouterLink } from "react-router-dom";
import { useContext } from "react";
import { RegisterContext } from "@/context/RegisterContext";

export default () => {
    const { state } = useContext(RegisterContext);
    return (state.response && (state.response?.success ?
        <Fragment>
            <Alert severity="success">
                <Typography sx={{ px: 1, py: 2 }}>
                    {state.response?.message}
                </Typography>
            </Alert>
        </Fragment>
        :
        <Fragment>
            <Alert severity="error">
                <Typography sx={{ px: 1, py: 2 }}>
                    {state.response?.message}
                </Typography>
            </Alert>
        </Fragment>
    ));
}