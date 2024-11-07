import { Alert, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Paper, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { Close, ImageRounded } from "@mui/icons-material";
import { FormEvent, Fragment, useEffect, useState } from "react";
import { staffService } from "@/services/staff.service";
import SendIcon from '@mui/icons-material/Send';
import dayjs from "dayjs";

type EmployeeData = {
    file?: any,
    loading?: false,
    fileName?: string
}

type ResponseData = {
    success?: false,
    message?: string
}

const Employee = ({ data, open, handleClose }: any) => {

    const [response, setResonse] = useState<ResponseData>();
    const [loading, setLoading] = useState<EmployeeData>();

    useEffect(() => {
        setLoading(undefined);
        setResonse(undefined);
    }, [open]);

    const handleFileChanged = (e: any) => {
        var file = e.target.files[0];
        !!file && setLoading(old => ({ ...old, file: file }));
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        staffService.updateStaff(data.employeeNo, formData).then(data => {
            setResonse(data);
            setLoading(old => ({ ...old, loading: false }));
            handleClose && handleClose();
        }).catch(e => {
            console.log(e);
            var message = (e.response && e.response.message) || e.message || e;
            setResonse(old => ({ ...old, message: message }));
            setLoading(old => ({ ...old, loading: false }));
        });
    };

    return (
        <Dialog open={open}
            onClose={handleClose}
            PaperProps={{
                elevation: 4,
                padding: 2,
                component: 'form',
                onSubmit: handleSubmit
            }}>
            <DialogTitle>Edit Employee</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={(theme) => ({
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                })}
            >
                <Close />
            </IconButton>
            <DialogContent dividers>
                <Grid container>
                    <Grid item xs={12}>
                        {!!response && !response.success && (
                            <Fragment>
                                <Alert
                                    severity="error"
                                    sx={{ width: "100%" }}
                                >
                                    {response?.message}
                                </Alert>
                            </Fragment>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Surname'
                            margin='normal'
                            value={data?.surname}
                            disabled
                            fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Other Name(s)'
                            margin='normal'
                            value={data?.otherNames}
                            disabled
                            fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <DemoContainer components={['DatePicker']} >
                            <DatePicker
                                name='dateOfBirth'
                                label='Date of Birth'
                                format="YYYY-MM-DD"
                                value={dayjs(data?.dateOfBirth)}
                                slotProps={
                                    {
                                        textField: {
                                            margin: 'normal',
                                            fullWidth: true,
                                            size: "small"
                                        }
                                    }
                                }
                            />
                        </DemoContainer>
                    </Grid>
                    <Grid item sx={{ my: 2 }} xs={12}>
                        <Button variant="outlined" component="label" color="primary" fullWidth>
                            {" "}
                            <ImageRounded /> {loading?.file?.name || "Upload a photo"}
                            <input type="file" id="idPhoto" name="idPhoto" accept="image/*" onChange={handleFileChanged} hidden />
                        </Button>
                    </Grid>
                    <Grid item sx={{ placeItems: "center" }} xs={12}>
                        {!!loading?.file && <Paper sx={{ height: 200, maxWidth: "100%", mx: "auto" }} component="img" src={URL.createObjectURL(loading?.file)} />}
                    </Grid>
                </Grid>
                <DialogActions>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={loading?.loading ? <CircularProgress color="inherit" size={20} /> : <SendIcon />}
                        disabled={loading?.loading}
                    > Submit </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}

export default Employee;