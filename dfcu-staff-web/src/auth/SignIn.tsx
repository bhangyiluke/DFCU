import { FormEvent, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { LockOutlined } from "@mui/icons-material";
import {
    Alert,
    Avatar,
    Box,
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    Grid,
    Paper,
    Snackbar,
    SnackbarOrigin,
    TextField,
    Typography,
} from "@mui/material";
import { authService } from "../services/authentication.service";

const anchorOrigin: SnackbarOrigin = {
    vertical: "bottom",
    horizontal: "right",
};

const SignIn = () => {
    const navigate = useNavigate();

    const [error, setError] = useState();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        var username = formData.get("username") as string;
        var password = formData.get("password") as string;
        authService
            .login(username, password)
            .then((user) => {
                console.log(user);
                navigate("/");
            })
            .catch((e) => setError(e));
        // const data = Array.from(formData.entries()).reduce(
        //     (acc, [key, value]) => {
        //         acc[key] = value;
        //         return acc;
        //     },
        // );
    };
    return (
        <Container maxWidth="xs">
            <Paper elevation={8} sx={{ marginTop: 8, padding: 2 }}>
                <Avatar
                    sx={{
                        mx: "auto",
                        textAlign: "center",
                        bgcolor: "primary.main",
                        mb: 1,
                    }}
                >
                    <LockOutlined />
                </Avatar>
                <Typography
                    component="h3"
                    variant="h5"
                    sx={{ textAlign: "center" }}
                >
                    Sign In
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        placeholder="Enter username"
                        label="Username"
                        name="username"
                        fullWidth
                        required
                        autoFocus
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        placeholder="Enter password"
                        fullWidth
                        required
                        label="Password"
                        type="password"
                        name="password"
                        sx={{ mb: 2 }}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remeber" name="remember" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        sx={{ mt: 1 }}
                    >
                        Sign In
                    </Button>
                </Box>
                <Grid container justifyContent="space-between" sx={{ mt: 1 }}>
                    <Grid item>
                        <Button
                            component={RouterLink}
                            to="/forgot"
                            size="small"
                        >
                            {" "}
                            Forgot Password
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            component={RouterLink}
                            to="/register"
                            size="small"
                        >
                            {" "}
                            Register User
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            <Snackbar
                sx={{ maxWidth: "sm" }}
                open={!!error}
                autoHideDuration={6000}
                onClose={()=>setError(undefined)}
                anchorOrigin={anchorOrigin}
            >
                <Alert
                    onClose={()=>setError(undefined)}
                    severity="error"
                    sx={{ width: "100%" }}
                >
                    {error}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default SignIn;
