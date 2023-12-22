import React, { useState, useCallback } from 'react';
import Input from '../../DesignSystem/input';
import Button from '../../DesignSystem/button';
import { PURCHASE_PORT_CHARGE_PER_MONTH, TableConstants, YearDaysForCalculation } from '../../../utils/appConstants';
import SwipeIcon from '../../../assets/images/swipe-icon.svg';
import SearchIcon from '../../../assets/images/search-icon.svg';
import MapSearchIcon from '../../../assets/images/map-search-icon.svg';
import CollapseBox from './CollapsibleBox';

interface BandwidthListProps {
  onDrawerContentChange: (content: 'list' | 'details', bandwidth: any) => void;
  count: number;
  onSearchChange: (e: any) => void;
  onSearchClicked: (e: any) => void;
  neNames: any;
  loading: boolean;
  search: string;
  listBandwidths: {
    available: any[], consumed: any[], sold: any[]
  }
}

const BandwidthList: React.FC<BandwidthListProps> = ({
  onDrawerContentChange, loading, count, search, onSearchChange, neNames, listBandwidths, onSearchClicked,
}) => {
  const [collapsibleStates, setCollapsibleStates] = useState<{
    available: boolean, consumed: boolean, sold: boolean
  }>({
    available: true,
    consumed: false,
    sold: false,
  });

  const handleCollapsibleNEClose = useCallback((id: string) => {
    setCollapsibleStates((prev: any) => {
      return {
        ...prev,
        [id]: false,
      };
    });
  }, [setCollapsibleStates]);

  const handleCollapsibleNEOpen = useCallback((id: string) => {
    setCollapsibleStates((prev: any) => {
      return {
        available: false,
        consumed: false,
        sold: false,
        [id]: true,
      };
    });
  }, [setCollapsibleStates]);

  const neText = neNames.nneName;
  const feText = neNames.fneName;

  return (
    <div className="list-bandwidth-form">
      <div className="list-bandwidth">
        <div className="title">
          <label>
            {loading ? 0 : count}
            {' '}
            Bandwidth/s
          </label>
          <div>
            <div className="fe-text">
              <img src={MapSearchIcon} alt="Swipe" data-testid="swipe-icon" />
              {neText}
            </div>
            <div className="swap">
              <img src={SwipeIcon} alt="Swipe" data-testid="swipe-icon" />
            </div>
            <div className="ne-text">
              {feText}
            </div>
          </div>
        </div>
        <div className="list-root">
          <div className="filter">
            <div className="input-div">
              <Input variant="input-pre-icon" icon={SearchIcon} placeholder="Search" name="search" value={search} onChange={onSearchChange} className="bandwidth-lis-search" />
            </div>
            <div className="btn-div">
              <Button variant="search" text="Search" className="search-btn" disabled={!search.trim()} onClick={onSearchClicked} />
            </div>
          </div>
          <div className="list">
            <CollapseBox
              text="Available"
              id="available"
              open={collapsibleStates.available}
              onCollapsibleNEClose={handleCollapsibleNEClose}
              onCollapsibleNEOpen={handleCollapsibleNEOpen}
              loading={loading}
              data={listBandwidths.available}
              onDrawerContentChange={onDrawerContentChange}
            />
            <CollapseBox
              text="Consumed"
              id="consumed"
              open={collapsibleStates.consumed}
              onCollapsibleNEClose={handleCollapsibleNEClose}
              onCollapsibleNEOpen={handleCollapsibleNEOpen}
              loading={loading}
              data={listBandwidths.consumed}
              onDrawerContentChange={onDrawerContentChange}
            />
            <CollapseBox
              text="Sold"
              id="sold"
              open={collapsibleStates.sold}
              onCollapsibleNEClose={handleCollapsibleNEClose}
              onCollapsibleNEOpen={handleCollapsibleNEOpen}
              loading={loading}
              data={listBandwidths.sold}
              onDrawerContentChange={onDrawerContentChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BandwidthList;
