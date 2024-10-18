import { RegisterContext } from "@/context/RegisterContext";
import { Button, CircularProgress, Grid, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { FormEvent, useContext, useState } from "react";
import { staffService } from "@/services/staff.service";
import { authService } from "@/services/authentication.service";

export default () => {

    const { setState } = useContext(RegisterContext);

    const [data, setData] = useState<{
        error?: string,
        loading?: boolean
    }>();

    const updateResponse = (data: any) => {
        setState && setState(old => ({ ...old, response: data, activeStep: data.success ? (old.activeStep || 0) + 1 : old.activeStep }));
    }

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        var email = formData.get("email") as string;

        email && setData(old => ({ old, loading: true }));
        email && authService.requestOtp(email).then(data => {
            // console.log("authService.requestOtp =>", data);
            // Add the api Response to the Context state for navigation purposes;            
            setData(old => ({ ...old, loading: false }));
            updateResponse(data);
        }).catch(e => {            
            var message=(e.response && e.response.message)||e.message||e;
            // console.error(message);
            setData(old => ({ ...old, loading: false }));
            updateResponse({ success: false, message: message});
        });
    }

    return (
        <Grid component="form" onSubmit={handleSubmit} container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    placeholder='Enter your email'
                    name='email'
                    label='Email'
                    type="email"
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
                    disabled={data?.loading}
                > Send </Button>
            </Grid>
        </Grid>
    );
}