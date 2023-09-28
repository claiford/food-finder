import { Box, Button, TextField, Typography } from "@mui/material";

const Demo = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField type="text" label="Text Input"></TextField>

            <Box sx={{display: 'flex', gap: 3}}>
                <Button variant="contained">Contained button</Button>
                <Button variant="outlined">Outlined button</Button>
            </Box>
            
            <Typography variant="title1">
                title1
            </Typography>
            <Typography variant="title2" sx={{ backgroundColor: "white"}}>
                title2
            </Typography>
            <Typography variant="header1">
                header1
            </Typography>
            <Typography variant="header2">
                header2
            </Typography>
            <Typography variant="body1">
                body1
            </Typography>
            <Typography variant="body2">
                body2
            </Typography>
            <Typography variant="body3" sx={{ backgroundColor: "white"}}>
                body3
            </Typography>
            <Typography variant="body4">
                body4
            </Typography>
        </Box>
    )
};

export default Demo;