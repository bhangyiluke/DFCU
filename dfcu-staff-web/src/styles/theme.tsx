import { createTheme } from "@mui/material";
import LinkBehavior from "./components/LinkBehavior";

const theme = createTheme({
    components: {
        MuiLink: {
            defaultProps: {
                component: LinkBehavior,
            },
        },
        MuiButtonBase: {
            defaultProps: {
                LinkComponent: LinkBehavior,
            },
        },
        MuiTextField:{
            defaultProps:{
                size:"small"
            }
        },
        MuiAlert:{
            defaultProps:{
                variant:"filled"
            }
        }
    },
});

export default theme;
