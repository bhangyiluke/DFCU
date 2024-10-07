import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    Grid,
    Link,
    Paper,
    TextField,
    Typography,
} from "@mui/material";

const Register = () => {

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
                ></Avatar>
            </Paper>
        </Container>
    );
};
export default Register;
