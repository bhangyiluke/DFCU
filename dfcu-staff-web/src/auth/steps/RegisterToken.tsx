import { RegisterContext } from "@/context/RegisterContext";
import { Button, CircularProgress, Grid, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useContext, useState } from "react";
import { authService } from "@/services/authentication.service";

export default () => {
    const { state, setState } = useContext(RegisterContext);
    const [data, setData] = useState<{
        token?: string,
        error?: string,
        loading?: boolean
    }>();

    const handleChange = (e: any) => {
        // console.log(e.target.name, e.target.value);
        setData({ [e.target.name]: e.target.value });

    }

    const updateResponse = (data: any) => {
        setState && setState(old => ({ ...old, response: data, activeStep: data.success ? (old.activeStep || 0) + 1 : old.activeStep }));
    }

    const handleSubmit = () => {
        setData(old => ({ old, loading: true }));
        data?.token && authService.verifyOtp(data?.token).then(data => {
            console.log("authService.verifyOtp =>", data);            
            setData(old => ({ old, loading: false }));
            updateResponse(data);
        }).catch(e => {            
            setData(old => ({...old, loading: false }));
            updateResponse({success:false,message:e});
        });
    }
    // console.log("Register Token => ", state);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    placeholder='Enter the token'
                    name='token'
                    label='Token'
                    value={data?.token}
                    onChange={handleChange}
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
                    onClick={handleSubmit}
                    startIcon={data?.loading ? <CircularProgress color="inherit" size={20}/> : <SendIcon />}
                    disabled={data?.loading}
                > Send </Button>
            </Grid>
        </Grid>
    );
}