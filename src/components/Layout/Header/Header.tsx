import { StyledHeader } from "./Header.styled";
import Typography from '@mui/material/Typography';

const Header: React.FC = () => {
    return (
        <StyledHeader>
            <Typography variant="h1" component="div" gutterBottom>
                People database
            </Typography>
        </StyledHeader>
    );
}
export default Header;