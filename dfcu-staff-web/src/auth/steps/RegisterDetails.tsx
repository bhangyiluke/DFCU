import { staffService } from "@/services/staff.service";
import { Grid, TextField, Button, Box, CircularProgress, Snackbar, Alert, SnackbarCloseReason, SnackbarOrigin } from "@mui/material";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { DateField } from '@mui/x-date-pickers/DateField';
import SendIcon from '@mui/icons-material/Send';
import { FormEvent, useContext, useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { ImageRounded } from "@mui/icons-material";
import { RegisterContext } from "@/context/RegisterContext";

const anchorOrigin:SnackbarOrigin = { vertical: 'bottom', horizontal: 'right' };

export default () => {
    // const [fileName, setFileName] = useState();
    const [open, setOpen] = useState(false);
    const { state, setState } = useContext(RegisterContext);
    const [data, setData] = useState<{
        fileName?: string,
        error?: string,
        loading?: boolean
    }>();

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    useEffect(() => {
        handleClick();
    }, [state.response]);

    const handleFileChanged = (e: any) => {
        var file = e.target.files[0];
        file && setData({ fileName: file.name });

    }

    const updateResponse = (data: any) => {
        setState && setState(old => ({ ...old, response: data, activeStep: data.success ? (old.activeStep || 0) + 1 : old.activeStep }));
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        // var username = formData.get("username") as string;
        // var password = formData.get("password") as string;
        staffService.registerStaff(formData).then(data => {
            console.log("staffService.registerStaff =>", data);
            setData(old => ({ ...old, loading: false }));
            updateResponse(data);
        }).catch(e => {
            console.log(e);
            setData(old => ({ ...old, loading: false }));
            updateResponse({ success: false, message: e });
        });
    };
    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <TextField
                        name='surname'
                        label='Surname'
                        margin='normal'
                        required
                        fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name='otherNames'
                        label='Other Name(s)'
                        margin='normal'
                        required
                        fullWidth />
                </Grid>

                <Grid item xs={12}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker
                            name='dateOfBirth'
                            label='Date of Birth'
                            format="YYYY-MM-DD"
                            slotProps={
                                {
                                    textField: {
                                        margin: 'normal',
                                        fullWidth: true
                                    }
                                }
                            }
                        />
                    </DemoContainer>
                </Grid>
                <Grid item sx={{ my: 2 }} xs={12}>
                    <Button variant="outlined" component="label" color="primary" fullWidth>
                        {" "}
                        <ImageRounded /> {data?.fileName || "Upload a photo"}
                        <input type="file" accept="images/**" onChange={handleFileChanged} hidden />
                    </Button>
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
                    > Submit </Button>
                </Grid>
            </Grid>
            <Snackbar open={open && state.response?.success} autoHideDuration={6000} onClose={handleClose} anchorOrigin={anchorOrigin}>
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {state.response?.message}
                </Alert>
            </Snackbar>
            <Snackbar open={open && !state.response?.success} autoHideDuration={6000} onClose={handleClose} anchorOrigin={anchorOrigin}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {state.response?.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}