import { Box, Button, CircularProgress, Grid, TextField, Typography } from "@mui/material";
import { PageLayout } from "./Component";
import { DatePicker } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { ImageRounded } from "@mui/icons-material";

const Employee = () => {
    return (
        <PageLayout title="Edit employee">
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
            </Box>
        </PageLayout>
    );
}

export default Employee;