import { Typography, Button } from "@mui/material";
import { Fragment } from "react/jsx-runtime";
import { Link as RouterLink } from "react-router-dom";

export default () => {

    return(
    <Fragment>
        <Typography variant='h5' sx={{ px: 5, py: 2 }}>
            Congratulation! You completed registration process.
        </Typography>
        <Button 
            component={RouterLink}
            to="/Login"
            size="small"
            sx={{mx: "auto"}}
        >
            Back to login
        </Button>
    </Fragment>);
}