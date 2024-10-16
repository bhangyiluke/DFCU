import {
    Avatar,
    Button,
    Container,
    Grid,
    Paper,
} from "@mui/material";
import RegisterInitial from "./steps/RegisterInitial";
import RegisterContext, { RegisterContext as RegisterState } from "@/context/RegisterContext";
import Completed from "./steps/Completed";
import RegisterToken from "./steps/RegisterToken";
import RegisterDetails from "./steps/RegisterDetails";
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const Register = () => {
    // const { state, setState } = useContext(RegisterState);
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RegisterContext>
            <Container maxWidth="sm">
                <Paper elevation={8} sx={{ marginTop: 8, padding: 2 }}>
                    <Avatar
                        sx={{
                            mx: "auto",
                            textAlign: "center",
                            bgcolor: "primary.main",
                            mb: 1,
                        }}

                    >
                    </Avatar>
                    {/* <RegisterInitial /> */}
                    {/* <RegisterToken/> */}
                    <RegisterDetails/>
                    {/* <Completed/>  */}
                    <Grid container justifyContent="space-between" sx={{ mt: 1 }}>
                        <Grid item>
                            <Button
                                component={RouterLink}
                                to="/login"
                                size="small"
                            >
                                Back to login
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </RegisterContext>
        </LocalizationProvider>
    );
};
export default Register;
