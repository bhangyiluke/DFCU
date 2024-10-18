import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
const PageLayout = ({ title, children }: any) => (
    <Stack spacing={2} width="100%">
        <Typography variant="h5" component="h5">
            {title}
        </Typography>
        <Grid2 container spacing={1}>
            {children}
        </Grid2>
    </Stack>
);

export default PageLayout;