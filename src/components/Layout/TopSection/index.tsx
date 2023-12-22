import React, { useCallback } from 'react';
import { Tooltip } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import ShortLogo from '../../../assets/images/wavexchange-logo.svg';
import HelpIcon from '../../../assets/images/help.svg';
import Logout from '../../../assets/images/logout.svg';
import Profile from '../../../assets/images/profile.svg';
import Logo from '../../../assets/images/register-logo.svg';
import AuthService from '../../../services/auth.service';
import { NonAuthRoutes } from '../../../enums';

interface TopSectionProps {
  name: string
}

const TopSection: React.FC<TopSectionProps> = ({ name }) => {
  const navigate = useNavigate();

  const handleLogoutClick = useCallback(() => {
    AuthService.logout();
    navigate(NonAuthRoutes.login);
  }, [navigate]);

  return (
    <div className="top-section">
      <div className="short-logo">
        <img src={ShortLogo} alt="Short Logo" />
      </div>
      <div className="main-top-section">
        <div className="main-logo">
          <img src={Logo} alt="Main Logo" />
        </div>
        <div className="main-top-section-actions">
          <div className="main-top-action-welcome">
            <span>Welcome</span>
            <label>{`${name}`}</label>
          </div>
          <div className="main-top-action-help">
            <Tooltip
              title="Help"
              placement="bottom"
              arrow
              classes={{
                tooltip: 'tooltip',
              }}
            >
              <img src={HelpIcon} alt="Help" />
            </Tooltip>
          </div>
          <div className="main-top-action-user">
            <Tooltip
              title="User Profile"
              placement="bottom"
              arrow
              classes={{
                tooltip: 'tooltip',
              }}
            >
              <img src={Profile} alt="Profile" />
            </Tooltip>
          </div>
          <div className="main-top-action-logout">
            <Tooltip
              title="Logout"
              placement="bottom"
              arrow
              classes={{
                tooltip: 'tooltip',
              }}
            >
              <img src={Logout} alt="Logout" onClick={handleLogoutClick} data-testid="img-logout" />
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
