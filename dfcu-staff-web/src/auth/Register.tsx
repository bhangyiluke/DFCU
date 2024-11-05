import {
    Avatar,
    Button,
    Container,
    Grid,
    Paper,
    Typography,
} from "@mui/material";
import RegisterContext from "@/context/RegisterContext";
import Completed from "./steps/Completed";
import { Link as RouterLink } from "react-router-dom";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import RegisterSteps from "./steps/RegisterSteps";

const Register = () => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <RegisterContext>
                <Container maxWidth="sm">
                    <Paper elevation={8} sx={{ my: 8, padding: 2 }}>
                        <Avatar
                            sx={{
                                mx: "auto",
                                textAlign: "center",
                                bgcolor: "primary.main",
                                mb: 1,
                            }}

                        >
                        </Avatar>
                        <Typography
                            component="h3"
                            variant="h5"
                            sx={{ textAlign: "center" }}
                        >
                            Register
                        </Typography>
                        <Completed />
                        <RegisterSteps/>
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
