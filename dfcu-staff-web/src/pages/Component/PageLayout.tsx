import { Card, CardContent, Stack, Typography } from "@mui/material";
const PageLayout = ({ title, children }: any) => (
    <Stack spacing={2} width="100%">
        <Typography variant="h3" component={"h1"}>
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