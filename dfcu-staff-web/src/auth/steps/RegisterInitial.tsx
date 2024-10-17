import { RegisterContext } from "@/context/RegisterContext";
import { Button, CircularProgress, Grid, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useContext, useState } from "react";
import { staffService } from "@/services/staff.service";
import { authService } from "@/services/authentication.service";

export default () => {
    const { state, setState } = useContext(RegisterContext);
    // const [email, setEmail] = useState();
    const [data, setData] = useState<{
        email?: string,
        error?: string,
        loading?: boolean
    }>();

    const handleChange = (e: any) => {
        console.log(e.target.value, validateEmail(data?.email));
        if (!validateEmail(data?.email)) {
            setData(old => ({ ...old, error: "Invalid email address provided." }));
            return;
        }
        setData({ [e.target.name]: e.target.value });
    }

    const updateResponse = (data: any) => {
        setState && setState(old => ({ ...old, response: data, activeStep: data.success ? (old.activeStep || 0) + 1 : old.activeStep }));
    }

    const validateEmail = (email?: string) => {
        // const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/;
        return true;
    }

    const handleSubmit = () => {
        if (!validateEmail(data?.email)) {
            setData(old => ({ ...old, error: "Invalid email address provided." }));
            return;
        }

        setData(old => ({ old, loading: true }));
        data?.email && authService.requestOtp(data?.email).then(data => {
            console.log("authService.requestOtp =>", data);
            // Add the api Response to the Context state for navigation purposes;            
            setData(old => ({ ...old, loading: false }));
            updateResponse(data);
        }).catch(e => {
            console.log(e);
            setData(old => ({ ...old, loading: false }));
            updateResponse({ success: false, message: e });
        });
    }
    // console.log("Register Initials => ", state);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    placeholder='Enter your email'
                    name='email'
                    label='Email'
                    typeof="email"
                    onBlur={handleChange}
                    type='email'
                    variant='outlined'
                    margin='normal'
                    error={!!data?.error}
                    helperText={data?.error}
                    required
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large" sx={{ m: "auto" }}
                    fullWidth
                    startIcon={data?.loading ? <CircularProgress color="inherit" size={20} /> : <SendIcon />}
                    onClick={handleSubmit}
                    disabled={data?.loading}
                > Send </Button>
            </Grid>
        </Grid>
    );
}