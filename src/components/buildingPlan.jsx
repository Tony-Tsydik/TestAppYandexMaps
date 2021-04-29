import React from 'react';
import { YMaps, Map, Polygon, Polyline } from 'react-yandex-maps';
import coordinates from '../staticData/floor';
import { v4 as uuidv4 } from 'uuid';
import { mapStyles, colors } from './stylesAttributes/buildingPlanStylesAttributes';

const MapContainer = (props) => {

    const initialCoordinates = {
        polygonCoordinates: [],
        otherCoordinates: []
    };

    const featureGeometryType = 'Polygon';

    coordinates.features.forEach((item) => {
        if (item.geometry.type === featureGeometryType) {
            const currentPolygonArray = [];
            item.geometry.coordinates.forEach((item) => {
                currentPolygonArray.push([item[1], item[0]])
            });
            initialCoordinates.polygonCoordinates.push(currentPolygonArray)
        } else {
            const currentCoordinatesArray = [];
            item.geometry.coordinates.forEach((item) => {
                currentCoordinatesArray.push([item[1], item[0]])
            });
            initialCoordinates.otherCoordinates.push(currentCoordinatesArray)
        }
    })
    return (

        <YMaps>
            <Map defaultState={{ center: [53.9171, 27.63485762632], zoom: 20 }} width={mapStyles.width} height={mapStyles.height} >

                {initialCoordinates.polygonCoordinates.map(item => <Polygon
                    geometry={[item]}
                    key = {uuidv4()}
                    options={{
                        fillColor: colors.polygonFillColor,
                        strokeColor: colors.polygonStrokeColor,
                        opacity: 1,
                        strokeWidth: 2,
                        draggable: false
                    }}
                />)}
                {initialCoordinates.otherCoordinates.map(item => <Polyline
                    geometry={item}
                    key = {uuidv4()}
                    options={{
                        balloonCloseButton: false,
                        strokeColor: colors.polylineStrokeColor,
                        strokeWidth: 2,
                        strokeOpacity: 1,
                        draggable: false,
                    }}
                />)}

            </Map>
        </YMaps>
    );
}

export default MapContainer;