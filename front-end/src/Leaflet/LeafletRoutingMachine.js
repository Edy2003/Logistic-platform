import React, {useEffect, useState} from 'react';
import L from "leaflet";
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import {useMap} from "react-leaflet";

function LeafletRoutingMachine (cities){
const map = useMap();
    useEffect(() => {
        L.Routing.control({
            waypoints: cities.cities
        }).addTo(map)
    }, [cities.cities]);
    return null;
}

export default LeafletRoutingMachine;