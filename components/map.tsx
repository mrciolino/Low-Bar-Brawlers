"use client";

import { LatLngExpression, BoundsExpression } from 'leaflet';
import { MapContainer, Marker, Popup } from 'react-leaflet'
import { ImageOverlay } from 'react-leaflet/ImageOverlay'
import 'leaflet/dist/leaflet.css'
import React from 'react';
import L from 'leaflet'

interface ProfilePopUp {
    cityName: string;
    description: string;
}

const ProfilePopUp: React.FC<ProfilePopUp> = ({ cityName, description }) => {
    return (
        <Popup>
            <div className="profile-card">
                <h2>{cityName}</h2>
                <p>{description}</p>
            </div>
        </Popup>
    );
};

var IconCity = L.icon({
    iconUrl: 'marker-icon-green.png',
    shadowUrl: 'marker-shadow.png',
});

var IconTown = L.icon({
    iconUrl: 'marker-icon-red.png',
    shadowUrl: 'marker-shadow.png',
});

var IconEvent = L.icon({
    iconUrl: 'marker-icon-blue.png',
    shadowUrl: 'marker-shadow.png',
});


const position: LatLngExpression = [.01345, .01800]
const bounds: BoundsExpression = [[0, 0], [.02690, .03600]]

const Map = () => {
    return (
        <MapContainer center={position} scrollWheelZoom={true} style={{ height: "67vh", width: "100%" }} className='rounded-lg border border-transparent bg-neutral-100 dark:bg-neutral-900'
            zoom={15} minZoom={15} maxZoom={20} maxBounds={bounds}>
            <Marker position={[.01345, .01800]} icon={IconCity}>
                <ProfilePopUp cityName="City Name" description="City Description" />
            </Marker>
            <Marker position={[.02345, .01800]} icon={IconTown}>
                <ProfilePopUp cityName="Town Name" description="Town Description" />
            </Marker>
            <Marker position={[.01345, .01000]} icon={IconEvent}>
                <ProfilePopUp cityName="Event Name" description="Event Description" />
            </Marker>
            <ImageOverlay bounds={bounds} url="/map.jpg" />
        </MapContainer>
    )
}

export default Map