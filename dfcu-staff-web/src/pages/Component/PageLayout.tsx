import { Card, CardContent, Stack, Typography } from "@mui/material";
const PageLayout = ({ title, children }: any) => (
    <Stack spacing={2} width="100%">
        <Typography variant="h5" component="h5">
            {title}
        </Typography>
        <Card>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    </Stack>
);

export default PageLayout;