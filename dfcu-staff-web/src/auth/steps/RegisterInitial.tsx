import { RegisterContext } from "@/context/RegisterContext";
import { Button, Grid, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useContext } from "react";

export default () => {
    const { state, setState } = useContext(RegisterContext);

    const handleChange = (e: any) => {
        console.log(e.target.name, e.target.value);
        setState && setState(old => ({
            ...old,
            user: {
                ...old.user,
                [e.target.name]: e.target.value
            }
        }));

    }
    console.log("Form Load", state);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    placeholder='Type your email here'
                    name='email'
                    label='Email'
                    value={state.user.email}
                    onChange={handleChange}
                    type='email'
                    variant='outlined'
                    margin='normal'
                    InputLabelProps={{
                        shrink: true
                    }}
                    error={!!state?.errors?.email}
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
                > <SendIcon /> Send </Button>
            </Grid>
        </Grid>
    );
}