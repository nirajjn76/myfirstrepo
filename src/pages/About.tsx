import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Logo from '../assets/images/register-logo.svg';
import { ABOUT_PAGE_BUCKET_PRE_URL } from '../utils/apiConstants';
import DashboardService from '../services/dashboard.service';

const About: React.FC = () => {
  const [menus, setMenus] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>({});

  useEffect(() => {
    DashboardService.getAboutMenus()
      .then((resp) => {
        setMenus(resp.data);
        setSelectedItem(resp.data[0]);
      })
      .catch((e: any) => {
        setMenus([]);
        setSelectedItem({});
      });
  }, []);

  return (
    <div className="about-root">
      <div className="top">
        <div className="text">
          <h3>About</h3>
          <img src={Logo} alt="Main Logo" />
        </div>
        <div className="lines">
          <div className="border-1" />
          <div className="border-2" />
        </div>
      </div>
      {
        menus.length > 0 && (
          <div className="bottom">
            <div className="left">
              {
                menus.map((item) => {
                  return (
                    <div className={clsx('menu', selectedItem.id === item.id && 'selected')} onClick={() => setSelectedItem(item)}>
                      {item.text}
                    </div>
                  );
                })
              }
            </div>

            <div className="right">
              <img src={ABOUT_PAGE_BUCKET_PRE_URL + selectedItem.file_name} alt="About" />
            </div>
          </div>
        )
      }

      {/* {
        menus.length <= 0 && (
          <div className="bottom-null">
            <label>No records found</label>
          </div>
        )
      } */}
    </div>
  );
};

export default About;
