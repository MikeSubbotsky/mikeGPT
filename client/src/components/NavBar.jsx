import { AppBar, IconButton, Toolbar, Avatar, Box, Button, Grow, Popper } from '@mui/material';
import { useState, useRef } from 'react';
import GitHubIcon from '../images/i-git-white.svg';
import LinkedInIcon from '../images/i-linkedin-white.svg';
import InstagramIcon from '../images/i-ig-white.svg';
import Description from './Description';

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBlur = (event) => {
    if (!anchorRef.current.contains(event.relatedTarget)) {
      handleClose();
    }
  };


  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'rgba(153, 153, 153, 0.3)' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between'}}>
        <Box width={'50%'} sx={{ alignItems: 'center'}}>
          <Button ref={anchorRef} onMouseEnter={handleToggle} onClick={handleToggle} color="inherit">
              About
          </Button>
          <Popper open={open} anchorEl={anchorRef.current} placement="bottom-start" transition>
          {({ TransitionProps }) => (
            <Grow {...TransitionProps} style={{ transformOrigin: 'top' }}>
              <Box
                onMouseLeave={handleClose}
                onTouchStart={handleClose}
                onBlur={handleBlur}
                tabIndex={0}
              >
                <Description />
              </Box>
            </Grow>
          )}
        </Popper>
        </Box>
        <Box>
          <IconButton
            edge="end"
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
            edge="end"
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
          <IconButton
            edge="end"
            color="inherit"
            aria-label="LinkedIn"
            href="https://www.instagram.com/submix75/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Avatar
              variant="rounded"
              src={InstagramIcon}
              alt="Instagram"
              sx={{ width: 32, height: 32, backgroundColor: 'transparent', margin: 1 }}
            />
          </IconButton>
          
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

