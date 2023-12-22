import React, { useEffect, useCallback, useState } from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MyNetworkMap from '../components/MyNetworkMapView';
import { AuthRoutes, SortOrder } from '../enums';
import CheckboxIcon from '../assets/images/checkbox-unchecked.svg';
import CheckboxCheckedAvailableIcon from '../assets/images/available-checkbox-selected.svg';
import CheckboxCheckedConsumedIcon from '../assets/images/consumed-checkbox-selected.svg';
import CheckboxCheckedSoldIcon from '../assets/images/sold-checkbox-selected.svg';
import AddPortService from '../services/addPort.service';
import MyNNetworkService from '../services/myNetwork.service';

const MyNetwork: React.FC = () => {
  const [networkElements, setNetworkElements] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [bandwidthPorts, setBandwidthPorts] = useState<any[]>([]);
  const [count, setCount] = useState<number>(0);
  const [mapFilters, setMapFilters] = useState<{
    available: boolean, consumed: boolean, sold: boolean
  }>({
    available: true,
    consumed: true,
    sold: true,
  });
  const [listBandwidths, setListBandwidths] = useState<{
    available: any[], consumed: any[], sold: any[]
  }>({
    available: [],
    consumed: [],
    sold: [],
  });
  const [bandwidthPointIds, setBandwidthPointIds] = useState<{
    neId: string, feId: string
  }>({
    neId: '', feId: '',
  });
  const [search, setSearch] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');

  // const handleListSearchChanges = useCallback((searchText: any) => {
  //   setSearch(searchText);
  // }, [setSearch]);

  const handleBandwidthClick = useCallback((neId: string, feId: string) => {
    setLoading(true);
    setBandwidthPointIds({
      neId,
      feId,
    });
    const filters: string[] = [];

    Object.keys(mapFilters).forEach((filter: any) => {
      filters.push(filter.toString());
    });
    const neIds = neId === '' || feId === '' ? [] : [neId, feId];
    const payload = {
      filters,
      searchText,
      neIds,
    };

    MyNNetworkService.getMyNetworkBandwidthsList(payload)
      .then((response: any) => {
        setLoading(false);

        let totalCount = 0;
        totalCount += response?.data?.availableResult.length ?? 0;
        totalCount += response?.data?.consumedResult.length ?? 0;
        totalCount += response?.data?.soldResult.length ?? 0;

        setListBandwidths({
          available: response?.data?.availableResult,
          consumed: response?.data?.consumedResult,
          sold: response?.data?.soldResult,
        });
        setCount(totalCount);
      })
      .catch(() => {
        setLoading(false);
        setCount(0);
        setListBandwidths({
          available: [],
          consumed: [],
          sold: [],
        });
      });
  }, [mapFilters, searchText, setLoading, setCount, setListBandwidths]);

  const fetchBandwidthForMyNetwork = useCallback(() => {
    const filters: string[] = [];

    Object.keys(mapFilters).forEach((filter: any) => {
      // @ts-ignore
      if (mapFilters[filter]) {
        filters.push(filter.toString());
      }
    });

    const payload = {
      filters,
    };

    MyNNetworkService.getMyNetworkBandwidths(payload)
      .then((response: any) => {
        setBandwidthPorts(response?.data ?? []);
      })
      .catch(() => {
        setBandwidthPorts([]);
      });
  }, [setBandwidthPorts, mapFilters]);

  const fetchNetworkElements = useCallback(() => {
    AddPortService.getNetworkElements()
      .then((response: any) => {
        setNetworkElements(response.data || []);
        fetchBandwidthForMyNetwork();
      })
      .catch(() => {
        setNetworkElements([]);
      });
  }, [setNetworkElements, fetchBandwidthForMyNetwork]);

  useEffect(() => {
    fetchNetworkElements();
  }, [fetchNetworkElements]);

  useEffect(() => {
    handleBandwidthClick(bandwidthPointIds.neId, bandwidthPointIds.feId);
  }, [handleBandwidthClick, searchText, bandwidthPointIds.neId, bandwidthPointIds.feId]);

  const handleFiltersChange = useCallback((id: string) => {
    setMapFilters((prev: any) => {
      return {
        ...prev,
        [id]: !prev[id],
      };
    });
  }, [setMapFilters]);

  const handleListSearchChanges = useCallback((e: any) => {
    setSearch(e.target.value.trim());
    if (e.target.value.trim() === '') {
      setSearchText('');
      handleBandwidthClick(bandwidthPointIds.neId, bandwidthPointIds.feId);
    }
  }, [setSearch, handleBandwidthClick, setSearchText, bandwidthPointIds.neId, bandwidthPointIds.feId]);

  const handleSearchClicked = useCallback(() => {
    setSearchText(search);
  }, [setSearchText, search]);

  return (
    <div className="my-network-map-root">
      <div className="top">
        <div className="left">
          <Link to={AuthRoutes.dashboard}><ArrowBackIcon /></Link>
          <h3>My Network</h3>
        </div>
        <div className="right">
          <FormControlLabel
            control={(
              <Checkbox
                classes={{
                  root: 'show-ports-checkbox',
                }}
                color="default"
                checked={mapFilters.available}
                onChange={() => handleFiltersChange('available')}
                icon={<img src={CheckboxIcon} alt="Checkbox" className="checkbox-icon" />}
                checkedIcon={<img src={CheckboxCheckedAvailableIcon} alt="Checkbox Checked" className="checkbox-checked-icon" />}
                name="available"
              />
            )}
            label="Available"
          />
          <FormControlLabel
            control={(
              <Checkbox
                classes={{
                  root: 'show-ports-checkbox',
                }}
                color="default"
                checked={mapFilters.consumed}
                onChange={() => handleFiltersChange('consumed')}
                icon={<img src={CheckboxIcon} alt="Checkbox" className="checkbox-icon" />}
                checkedIcon={<img src={CheckboxCheckedConsumedIcon} alt="Checkbox Checked" className="checkbox-checked-icon" />}
                name="consumed"
              />
            )}
            label="Consumed"
          />
          <FormControlLabel
            control={(
              <Checkbox
                classes={{
                  root: 'show-ports-checkbox',
                }}
                color="default"
                checked={mapFilters.sold}
                onChange={() => handleFiltersChange('sold')}
                icon={<img src={CheckboxIcon} alt="Checkbox" className="checkbox-icon" />}
                checkedIcon={<img src={CheckboxCheckedSoldIcon} alt="Checkbox Checked" className="checkbox-checked-icon" />}
                name="sold"
              />
            )}
            label="Sold"
          />
        </div>
      </div>
      <div className="bottom">
        <MyNetworkMap onSearchChange={handleListSearchChanges} onSearchClicked={handleSearchClicked} listBandwidths={listBandwidths} searchText={search} loading={loading} count={count} networkElements={networkElements} bandwidthPorts={bandwidthPorts} onBandwidthClick={handleBandwidthClick} />
      </div>
    </div>
  );
};

export default MyNetwork;
