import React, { useCallback, useMemo, useState } from 'react';
import {
  Cartesian3, Cartesian2, Color, Material, NearFarScalar, OpenStreetMapImageryProvider,
} from 'cesium';
import {
  CameraFlyTo, Viewer, ImageryLayer, Entity, PolylineCollection, PointGraphics, PolylineGraphics, Polyline, ScreenSpaceCameraController, LabelGraphics,
} from 'resium';
import Spinner from '../DesignSystem/spinner';

interface MapViewProps {
  onBandwidthClick: (neId: string, feId: string, details?: any) => void;
  networkElements: any[];
  bandwidthPorts: any[];
  nodeIds: any[];
  myNetwork?: boolean;
}

const MapView: React.FC<MapViewProps> = ({
  onBandwidthClick, networkElements, bandwidthPorts, nodeIds, myNetwork,
}) => {
  const handleBandwidthClick = useCallback((neId: string, feId: string, details?: any) => {
    onBandwidthClick(neId, feId, details);
  }, [onBandwidthClick]);
  const [mapLoading, setMapLoading] = useState<boolean>(false);
  const entities = networkElements.map((ne: any, index: number) => {
    const outlineColor = myNetwork ? '#000000' : '#64AF29';
    return (
      <Entity
        key={index}
        position={Cartesian3.fromDegrees(parseFloat(ne.longitude), parseFloat(ne.latitude))}
        // name={ne.ne_name}
        // label={{
        //   fillColor: Color.fromCssColorString('#ffffff'), text: ne.ne_name, showBackground: true, backgroundColor: Color.fromCssColorString('#000000'), verticalOrigin: -1, scaleByDistance: new NearFarScalar(3100.0, 1.2, 9000.0, 0.6),
        // }}
      >
        <LabelGraphics text={ne.ne_name} fillColor={Color.fromCssColorString('#ffffff')} showBackground font="Helvetica Neue Regular" backgroundPadding={new Cartesian2(8, 8)} backgroundColor={Color.fromCssColorString('#000000')} verticalOrigin={-1} />
        <PointGraphics pixelSize={10} outlineColor={Color.fromCssColorString(outlineColor)} outlineWidth={3} />
      </Entity>
    );
  });

  const polylines = useMemo(() => {
    if (myNetwork) {
      return bandwidthPorts.map((item: any, index: number) => {
        const nearEndNE = networkElements.find((ne) => ne.id === item.nne_id);
        const farEndNE = networkElements.find((ne) => ne.id === item.fne_id);
        const positions = Cartesian3.fromDegreesArray([parseFloat(nearEndNE.longitude), parseFloat(nearEndNE.latitude), parseFloat(farEndNE.longitude), parseFloat(farEndNE.latitude)]);
        let color;

        if (item.count === 1) {
          if (!item.transaction_type && !item.verified && !item.status) {
            color = '#4D4D4D';
          } else if ((item.transaction_type === 7 && item.status === 'put_up_for_sale_bandwidth') || (item.status === 'Cross-Connected (Added)') || (item.status === 'Cross-Connected (Purchased)')) {
            color = '#E8D043';
          } else if ((!item.transaction_type && item.verified) || (item.transaction_type === 4 && item.current_owner_organization_id == localStorage.getItem('org_id'))) {
            color = '#64AF29';
          } else if (item.transaction_type === 4 && item.current_owner_organization_id != localStorage.getItem('org_id')) {
            color = '#FF3A3A';
          } else {
            color = '#FFFFFF';
          }
        } else {
          color = '#64AF29';
        }

        return <Polyline key={index} onClick={() => handleBandwidthClick(item.nne_id, item.fne_id, item)} material={Material.fromType('Color', { color: Color.fromCssColorString(color) })} width={4} positions={positions} />;
      });
    }
    return bandwidthPorts.map((item: any, index: number) => {
      const nearEndNE = networkElements.find((ne) => ne.id === item.nne_id);
      const farEndNE = networkElements.find((ne) => ne.id === item.fne_id);
      const positions = Cartesian3.fromDegreesArray([parseFloat(nearEndNE.longitude), parseFloat(nearEndNE.latitude), parseFloat(farEndNE.longitude), parseFloat(farEndNE.latitude)]);
      const color = item.nne_id === nodeIds[0] && item.nfne_id === nodeIds[1] ? '#0069F3' : '#64AF29';
      return <Polyline key={index} onClick={() => handleBandwidthClick(item.nne_id, item.fne_id)} material={Material.fromType('Color', { color: Color.fromCssColorString(color) })} width={4} positions={positions} />;
    });
  }, [bandwidthPorts, networkElements, nodeIds]);

  const imageryProvider = useMemo(
    () => new OpenStreetMapImageryProvider({ url: 'https://a.tile.openstreetmap.org/' }),
    [],
  );
  if (imageryProvider) {
    setTimeout(() => {
      setMapLoading(true);
    }, 2500);
  }
  return (
    (
      <>
        {!mapLoading && <Spinner className="map-loading" size={30} />}
        <Viewer requestRenderMode className="map-container" style={{ visibility: !mapLoading ? 'hidden' : 'visible' }} animation={false} baseLayerPicker={false} geocoder={false} selectionIndicator={false} timeline={false} fullscreenButton={false}>
          <ImageryLayer imageryProvider={imageryProvider} />
          {entities}
          <PolylineCollection>
            {polylines}
            <PolylineGraphics arcType={0} />
          </PolylineCollection>
          <CameraFlyTo
            duration={5}
            destination={Cartesian3.fromDegrees(-122.338514, 47.614344, 10000000)}
            once
          />
          <ScreenSpaceCameraController minimumZoomDistance={10} />
        </Viewer>
      </>
    )
  );
};

export default MapView;
