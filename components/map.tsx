"use client";


import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { LatLngExpression, BoundsExpression } from 'leaflet';
import ReactLeafletEditable from 'react-leaflet-editable';
import { ImageOverlay } from 'react-leaflet/ImageOverlay'
import React, { useRef, useState } from 'react'
import 'leaflet-editable'
import L, { Icon } from 'leaflet'

import { DrawingPinFilledIcon, SlashIcon } from '@radix-ui/react-icons';
import { Button } from "@/components/ui/button"
import 'leaflet/dist/leaflet.css'
import '../app/map.css'

export default function Map() {
    const [map, setMap] = useState();
    const editRef = useRef();
    let redoArr = [];

    const editPolyline = () => {
        console.log("startPolyline");
        editRef.current.startPolyline();
    };

    const editMarker = () => {
        console.log("startMarker");
        editRef.current.startMarker();
    };


    // 后退：Ctrl+Z，前进：Shift+Z
    const redoListener = function (map) {
        let latlng = null;
        L.DomEvent.addListener(
            document,
            "keydown",
            function (e) {
                if (e.keyCode == 90) {
                    if (!this.editTools._drawingEditor) return;
                    if (e.shiftKey) {
                        if (redoArr.length)
                            this.editTools._drawingEditor.push(redoArr.pop());
                    } else {
                        latlng = this.editTools._drawingEditor.pop();
                        if (latlng) redoArr.push(latlng);
                    }
                }
            },
            map
        );
    };
    const whenMapCreated = (map: any) => {
        setMap(map);
        redoListener(map);
    };

    const position: LatLngExpression = [.01345, .01800];
    const bounds: BoundsExpression = [[0, 0], [.02690, .03600]];
    return (
        <ReactLeafletEditable ref={editRef} map={map}>
            <MapContainer editable={true} whenCreated={whenMapCreated} center={position} scrollWheelZoom={true} style={{ height: "67vh", width: "100%" }}
                className='rounded-lg border border-transparent bg-neutral-100 dark:bg-neutral-900' zoom={15} minZoom={15} maxZoom={20} maxBounds={bounds}>
                <ImageOverlay bounds={bounds} url="/map.jpg" />
                <div className="btn-group">
                    <Button title="Add Line" onClick={editPolyline} className="editable-btn absolute top-5 right-12" size="sm">
                        <SlashIcon className="iconfont h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                    </Button>
                    <Button title="Add Marker" onClick={editMarker} className="editable-btn absolute top-5 right-0" size="sm">
                        <DrawingPinFilledIcon className="iconfont h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                    </Button>

                </div>
            </MapContainer>
        </ReactLeafletEditable>
    );
}
