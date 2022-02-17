import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';
import bornesChargements from "../utils/bornesChargement.json";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Borne} from "../model/borne";
import MarkerClusterGroup from "react-leaflet-markercluster/src/react-leaflet-markercluster";
import {Card} from "react-bootstrap";

//             <ReactLeafletGoogleLayer apiKey='AIzaSyDhU1OMeX7iqtSXd4I0IvgQYuax7cji7Jk' />

function loadBornes() {
    const bornes = [];
    bornesChargements.map(item => {
        bornes.push(new Borne(item));
    })
    return bornes;
}

function BornesCluster() {
    const markers = [];

    bornesChargements.map(json => {
        const borne = new Borne(json)
        markers.push(
            <Marker position={[borne.locationDetails.latitude, borne.locationDetails.longitude]}>
                <Popup>
                    <h3> { borne.title }</h3>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Location details</Card.Title>
                            <Card.Text>
                                { borne.locationDetails.address }<br />
                                { borne.locationDetails.city }<br />
                                { borne.locationDetails.postalCode }<br />
                                { borne.locationDetails.country }<br />
                                <FontAwesomeIcon icon="fa-solid fa-map" /> { borne.locationDetails.latitude } | {
                                borne.locationDetails.longitude}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Popup>
            </Marker>
        )
    })

    return (
        <MarkerClusterGroup>
            {markers}
        </MarkerClusterGroup>
    )
}

function Map() {
    const position = [48.856614, 2.3522219]
    return (
        <MapContainer style={{ width: "100%", height: "100vh", zIndex: 0 }}  center={position} zoom={13} >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <BornesCluster />
        </MapContainer>
    );
}

export default Map;