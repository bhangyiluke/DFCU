import { RegisterContext } from "@/context/RegisterContext";
import { Button, CircularProgress, Grid, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { FormEvent, useContext, useState } from "react";
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
        var token = formData.get("token") as string;

        // console.log("authService.verifyOtp =>", token);      
        token && setData(old => ({...old, loading: true }));
        token && authService.verifyOtp(token).then(data => {
            // console.log("authService.verifyOtp =>", data);            
            setData(old => ({...old, loading: false }));
            updateResponse(data);
        }).catch(e => {            
            setData(old => ({...old, loading: false }));
            updateResponse({success:false,message:e});
        });
    }

    return (
        <Grid component="form" onSubmit={handleSubmit} container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    placeholder='Enter the token'
                    name='token'
                    label='Token'
                    variant='outlined'
                    margin='normal'
                    error={!!data?.error}
                    helperText={!!data?.error && data?.error}
                    required
                    fullWidth />
            </Grid>
            <Grid item xs={12}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large" sx={{ m: "auto" }}
                    fullWidth
                    startIcon={data?.loading ? <CircularProgress color="inherit" size={20}/> : <SendIcon />}
                    disabled={data?.loading}
                > Send </Button>
            </Grid>
        </Grid>
    );
}