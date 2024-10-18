import { Alert, Box, Button, CircularProgress, Grid, Paper, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { ImageRounded } from "@mui/icons-material";
import { FormEvent, Fragment, useEffect, useState } from "react";
import { staffService } from "@/services/staff.service";
import SendIcon from '@mui/icons-material/Send';
import dayjs from "dayjs";

const Employee = ({ data, handleUpdated }: any) => {
    const [response, setResonse] = useState<{
        success?: false,
        message?: string
    }>();

    const [loading, setLoading] = useState<{
        loading?: false,        
        fileName?: string
    }>();

    // alert(JSON.stringify(employee));
    // useEffect(()=>{
    //     setEmployee(old=>({...old,...data}));
    // },[data]);

    const handleFileChanged = (e: any) => {
        var file = e.target.files[0];
        file && setLoading(old => ({ ...old, fileName: file.name }));

    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        // const file = formData.get("idPhoto");
        // console.log(file);

        staffService.updateStaff(data.employeeNo, formData).then(data => {
            // console.log("staffService.registerStaff =>", data);
            setResonse(data);
            setLoading(old => ({ ...old, loading: false}));
            handleUpdated && handleUpdated();
        }).catch(e => {
            console.log(e);
            var message = (e.response && e.response.message) || e.message || e;
            setResonse(old => ({ ...old, message: message }));
            setLoading(old => ({ ...old, loading: false}));
        });
    };

    return (
        <Stack spacing={2} maxWidth="sm" sx={{ width: "100%", mx: "auto" }}>
            <Typography variant="h5" component="h1">
                Edit employee
            </Typography>

            <Paper elevation={4} sx={{ padding: 2 }}>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <Grid container>
                        <Grid item xs={12}>
                            {!!response && !response.success && (
                                <Fragment>
                                    <Alert
                                        severity="error"
                                        variant="filled"
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
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker
                                    name='dateOfBirth'
                                    label='Date of Birth'
                                    format="YYYY-MM-DD"                                    
                                    value={dayjs(data?.dateOfBirth)}
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
                                <ImageRounded /> {loading?.fileName || "Upload a photo"}
                                <input type="file" name="idPhoto" accept="images/**" onChange={handleFileChanged} hidden />
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large" sx={{ m: "auto" }}
                                fullWidth
                                startIcon={loading?.loading ? <CircularProgress color="inherit" size={20} /> : <SendIcon />}
                                disabled={loading?.loading}
                            > Submit </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Stack>
    );
}

export default Employee;