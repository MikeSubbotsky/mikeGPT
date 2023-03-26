import { AppBar, IconButton, SvgIcon, Toolbar, Avatar } from '@mui/material';
import GitHubIcon from '../images/i-git-white.svg';
import LinkedInIcon from '../images/i-linkedin-white.svg';

const NavBar = () => {
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="GitHub"
            href="https://github.com/MikeSubbotsky"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Avatar
              variant="rounded"
              src={GitHubIcon}
              alt="GitHub"
              sx={{ width: 36, height: 36, backgroundColor: 'transparent', margin: 1 }}
            />
          </IconButton>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="LinkedIn"
            href="https://www.linkedin.com/in/mike-subbotsky/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Avatar
              variant="rounded"
              src={LinkedInIcon}
              alt="LinkedIn"
              sx={{ width: 36, height: 36, backgroundColor: 'transparent', margin: 1 }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  };

export default NavBar;