import { RegisterContext } from "@/context/RegisterContext";
import { Button, Grid, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";

export default () => {
    // const { state, setState } = useContext(RegisterContext);
    const [data, setData] = useState<{
        token?: string,
        error?: string
    }>();

    const handleChange = (e: any) => {
        // console.log(e.target.name, e.target.value);
        setData({ [e.target.name]: e.target.value });

    }

    const handleSubmit =()=>{
        setData({error:"An error occured when validating the token"})
    }
    // console.log("Form Load", state);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    placeholder='Verify the token'
                    name='token'
                    label='Token'
                    value={data?.token}
                    onChange={handleChange}
                    variant='outlined'
                    margin='normal'
                    InputLabelProps={{
                        shrink: true
                    }}
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
                > <SendIcon /> Send </Button>
            </Grid>
        </Grid>
    );
}