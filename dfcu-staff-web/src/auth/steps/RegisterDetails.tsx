import { staffService } from "@/services/staff.service";
import { Grid, TextField, Button, Box } from "@mui/material";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateField } from '@mui/x-date-pickers/DateField';
import SendIcon from '@mui/icons-material/Send';
import { FormEvent } from "react";
import { DatePicker } from "@mui/x-date-pickers";

export default () => {

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        // var username = formData.get("username") as string;
        // var password = formData.get("password") as string;
        staffService.registerStaff(formData).then(data => {
            console.log(data);
            // navigate("/");
        }).catch(e => console.log(e));
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
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large" sx={{ m: "auto" }}
                        fullWidth
                        // onClick={handleSubmit}
                    > <SendIcon /> Submit </Button>
                </Grid>
            </Grid>
        </Box>
    );
}