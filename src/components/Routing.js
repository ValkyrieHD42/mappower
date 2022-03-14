import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";
import {useSelector} from "react-redux";

L.Marker.prototype.options.icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
});

export default function RoutingAdd(props) {
    const map = useMap();
    const waypoints = useSelector((state) => state.coordniates.value);
    console.log(waypoints);
    useEffect(() => {
        if (!map) return;
        console.log(waypoints);
        const routingControl = L.Routing.control({
            waypoints: [
                L.latLng(waypoints.startPointLat, waypoints.startPointLong),
                L.latLng(waypoints.endPointLat, waypoints.endPointLong)
            ],
            routeWhileDragging: true
        }).addTo(map);

        return () => map.removeControl(routingControl);
    }, [map]);

    return null;
}
