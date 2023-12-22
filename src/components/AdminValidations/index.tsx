import React, { useCallback, useState } from 'react';
import { Switch, Tooltip } from '@material-ui/core';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import CloseIcon from '@material-ui/icons/Close';
import Input from '../DesignSystem/input';
import Button from '../DesignSystem/button';
import SearchIcon from '../../assets/images/search-icon.svg';
import ListIcon from '../../assets/images/list-icon.svg';
import ListIconSelected from '../../assets/images/list-icon-selected.svg';
import MapViewIcon from '../../assets/images/map-view.svg';
import MapViewSelectedIcon from '../../assets/images/map-view-selected.svg';
import { AuthRoutes } from '../../enums';
import { priceFilterDropdown } from '../../utils/appConstants';
import Dropdown from '../DesignSystem/dropdown';
import WarningInfoIcon from '../../assets/images/warn-toast-icon.svg';

export interface AdminValidationsLayoutProps {
  title: string;
  table: React.ReactNode;
  isVerifiedSection?: boolean;
  isDeleteSection?: boolean;
  isGroupedSection?: boolean;
  isPortView? : boolean;
  isPriceFilter?: boolean;
  isSearchSection?: boolean;
  isMarketplace?: boolean;
  isMapview?: boolean;
  ports?: boolean;
  deletePorts?: boolean;
  deleteBandwidth?: boolean;
  bandwidth?: boolean;
  verified?: boolean;
  verifyAllLoading?: boolean;
  deleteAllLoading?: boolean;
  groupLoading?: boolean;
  unGroupLoading?: boolean;
  isNotToggleSwitch?: boolean;
  selected?: any[];
  priceFilterValue?: any;
  groupedSelected?: any[];
  unGroupedSelected?: any[];
  onVerifiedChange?: (checked: boolean) => void;
  onPortViewChange?: (checked: boolean) => void;
  onSearchChanges: (searchText: string) => void;
  onVerifyAllClick?: () => void;
  onDeleteAllClick?: () => void;
  onGroupClick?: () => void;
  onUnGroupClick?: () => void;
  onPriceFilterChange?: (value : string) => void;
}

const AdminValidationsLayout: React.FC<AdminValidationsLayoutProps> = ({
  title, table, deletePorts, deleteAllLoading, deleteBandwidth, isVerifiedSection, isDeleteSection, isNotToggleSwitch, isPriceFilter, priceFilterValue, isSearchSection, isGroupedSection, isPortView, isMarketplace, ports, bandwidth, verified, verifyAllLoading, groupLoading, unGroupLoading, selected, groupedSelected, onUnGroupClick, onGroupClick, unGroupedSelected, isMapview, onPriceFilterChange, onVerifiedChange, onPortViewChange, onSearchChanges, onDeleteAllClick, onVerifyAllClick,
}) => {
  const [searchText, setSearchText] = useState<string>('');
  const { pathname } = window.location;

  const handleDeleteAllBtnClick = useCallback(() => {
    return confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui-alert">
            <CloseIcon
              className="close-icon-popup"
              onClick={() => {
                onClose();
              }}
            />
            <div>
              <img src={WarningInfoIcon} alt="Warning" />
              {deleteBandwidth ? <label>Do you want to delete selected bandwidths?</label>
                : <label>Do you want to delete selected ports?</label>}

            </div>
            <div />
            <div className="buttons">
              <Button
                onClick={() => {
                  onClose();
                }}
                text="No"
                variant="greyed"
                className="cancel"
              />
              <Button
                onClick={() => {
                  onDeleteAllClick && onDeleteAllClick();
                  onClose();
                }}
                text="Yes"
                variant="primary"
              />
            </div>
          </div>
        );
      },
      closeOnEscape: true,
      closeOnClickOutside: true,
    });
  }, [onDeleteAllClick]);

  const handleVerifiedChange = useCallback((event) => {
    onVerifiedChange && onVerifiedChange(event.target.checked);
  }, [onVerifiedChange]);

  const handlePortViewChange = useCallback((event) => {
    onPortViewChange && onPortViewChange(event.target.checked);
  }, [onPortViewChange]);

  const handlePriceFilter = useCallback((value: any) => {
    onPriceFilterChange && onPriceFilterChange(value);
  }, [onPriceFilterChange]);

  const handleSearchChange = useCallback((event) => {
    setSearchText(event.target.value);

    if (event.target.value === '') {
      onSearchChanges('');
    }
  }, [setSearchText, onSearchChanges]);

  const handleSearchClicked = useCallback(() => {
    onSearchChanges(searchText.trim());
  }, [searchText, onSearchChanges]);

  const handleKeypress = useCallback((e) => {
    if (e.key === 'Enter') {
      handleSearchClicked();
    }
  }, [handleSearchClicked]);

  let rightActionSection;
  if (isVerifiedSection) {
    rightActionSection = (
      <div className="verify-all-btn-div">
        {
          bandwidth && verified && <label className="highlighted-text">(The verified ports are shown in highlighted) </label>
        }
        { !isNotToggleSwitch && (
          <div className="show-verified-div">
            <label>Show Verified</label>
            <Switch checked={verified} onChange={handleVerifiedChange} data-testid="switch" />
          </div>
        )}
        {!isVerifiedSection && <div className="empty-space-no-verified" />}
        {!verified && <Button variant="success" text={`Verify All (${selected && selected.length})`} className="verify-all-btn" disabled={!selected || selected.length <= 0} loading={verifyAllLoading} onClick={onVerifyAllClick} />}
        {isVerifiedSection && verified && <div className="empty-space" />}
      </div>
    );
  } else if (isDeleteSection) {
    rightActionSection = (
      <div className="verify-all-btn-div">
        {!isDeleteSection && <div className="empty-space-no-verified" />}
        {!verified && <Button variant="success" text={`Delete All (${selected && selected.length})`} className={clsx('verify-all-btn', selected && selected.length > 0 && 'delete-all-btn')} disabled={selected && selected.length <= 0} loading={deleteAllLoading} onClick={handleDeleteAllBtnClick} />}
        {isDeleteSection && verified && <div className="empty-space" />}
      </div>
    );
  } else if (isGroupedSection) {
    rightActionSection = (
      <div className="group-ungroup-div">
        <Button variant="grouped" text="Group" className="verify-all-btn" disabled={!groupedSelected || groupedSelected.length <= 0} loading={groupLoading} onClick={onGroupClick} />
        <Button variant="grouped" text="Ungroup" className="verify-all-btn" disabled={!unGroupedSelected || unGroupedSelected.length <= 0} loading={unGroupLoading} onClick={onUnGroupClick} />
      </div>
    );
  } else if (isPriceFilter) {
    rightActionSection = (
      <div className="price-filter-dropdown">
        <label className="filter-label">Filter by:</label>
        <Dropdown className="price-select" value={priceFilterValue} valueKey="value" textKey="text" icon="icon" options={priceFilterDropdown} onChange={handlePriceFilter} />
      </div>
    );
  } else if (isPortView) {
    rightActionSection = (
      <div className="verify-all-btn-div">
        <div className="show-verified-div">
          <label>Port View</label>
          <Switch checked={verified} onChange={handlePortViewChange} data-testid="switch" />
        </div>
        {
          verified
          && (
            <div className="group-ungroup-div">
              <Button variant="grouped" text="Group" className="verify-all-btn" disabled={!groupedSelected || groupedSelected.length <= 0} loading={groupLoading} onClick={onGroupClick} />
              <Button variant="grouped" text="Ungroup" className="verify-all-btn" disabled={!unGroupedSelected || unGroupedSelected.length <= 0} loading={unGroupLoading} onClick={onUnGroupClick} />
            </div>
          )
        }
        {!verified && <div className="empty-space-grouping" />}
      </div>
    );
  }

  return (
    <div className="verification-root" data-testid="admin-verification">
      <div className="title-main">
        <div className="title-root">
          <h3>{title}</h3>
        </div>
        {
          !!(ports || bandwidth) && (
            <div className="btn-group-root">
              <div className="btn-group">
                <Link to={isMarketplace ? AuthRoutes.marketPlacePorts : AuthRoutes.portVerification} className="ports-link"><Button variant="primary" className={clsx((pathname === AuthRoutes.portVerification || pathname === AuthRoutes.marketPlacePorts) && 'active')} text="Ports" /></Link>
                <Link to={isMarketplace ? AuthRoutes.marketPlaceBandwidth : AuthRoutes.bandwidthVerification} className="bandwidth-link"><Button variant="primary" className={clsx((pathname === AuthRoutes.bandwidthVerification || pathname === AuthRoutes.marketPlaceBandwidth) && 'active')} text="Bandwidth" /></Link>
              </div>
            </div>
          )
        }
        {
          !!(deletePorts || deleteBandwidth) && (
            <div className="btn-group-root">
              <div className="btn-group">
                <Link to={AuthRoutes.deletePorts} className="ports-link"><Button variant="primary" className={clsx((pathname === AuthRoutes.deletePorts) && 'active')} text="Ports" /></Link>
                <Link to={AuthRoutes.deleteBandwidthPorts} className="bandwidth-link"><Button variant="primary" className={clsx((pathname === AuthRoutes.deleteBandwidthPorts) && 'active')} text="Bandwidth" /></Link>
              </div>
            </div>
          )
        }
        {
          !!(isMarketplace && (bandwidth || isMapview)) && (
            <>
              {
                isMapview && (
                  <div className="btn-group-root">
                    <div className="btn-group" />
                  </div>
                )
              }
              <div className="map-list-div">
                <Tooltip
                  title="List View"
                  placement="bottom"
                  arrow
                  classes={{
                    tooltip: 'tooltip',
                  }}
                >
                  <Link to={AuthRoutes.marketPlaceBandwidth} className="list-link"><img src={pathname === AuthRoutes.marketPlaceBandwidth ? ListIconSelected : ListIcon} alt="List" onClick={onGroupClick} /></Link>
                </Tooltip>
                <Tooltip
                  title="Map View"
                  placement="bottom"
                  arrow
                  classes={{
                    tooltip: 'tooltip',
                  }}
                >
                  <Link to={AuthRoutes.marketPlaceBandwidthMap} className="map-link"><img src={pathname === AuthRoutes.marketPlaceBandwidthMap ? MapViewSelectedIcon : MapViewIcon} alt="Map" onClick={onUnGroupClick} /></Link>
                </Tooltip>
              </div>
            </>
          )
        }
      </div>

      <div className="table-filters">
        {isSearchSection && (
          <div className="search-box">
            <div className="search-input-div">
              <Input variant="input-pre-icon" name="user-search" placeholder="Search" icon={SearchIcon} onChange={handleSearchChange} onKeypress={handleKeypress} />
            </div>
            <div className="search-button-div">
              <Button variant="search" text="Search" className="search-btn" disabled={!searchText.trim()} onClick={handleSearchClicked} />
            </div>
          </div>
        )}
        {rightActionSection}
      </div>
      {table}
    </div>
  );
};

export default AdminValidationsLayout;
