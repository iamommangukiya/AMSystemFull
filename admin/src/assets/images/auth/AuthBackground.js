// material-ui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import background from 'assets/images/bg_img.jpg';

// ==============================|| AUTH BLUR BACK SVG ||============================== //

const AuthBackground = () => {
    const theme = useTheme();
    return (
        <Box sx={{ position: 'absolute', opacity: '0.8', zIndex: -1, bottom: 0, width: '100%' }}>
            <img src={background} alt="loginbackground" style={{ width: '100%' }} />
        </Box>
    );
};

export default AuthBackground;
