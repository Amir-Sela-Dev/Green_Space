import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';

export function AboutUs() {
    const [coordinates, setCoordinates] = useState({ lat: 32.0853, lng: 34.7818 })
    const zoom = 16
    const AnyReactComponent = ({ text }) => <div style={{ fontSize: '15px' }}>{text}</div>;

    const handleClick = ({ lat, lng }) => {
        setCoordinates({ lat, lng })
    }

    function goToStore(cityName) {
        switch (cityName) {
            case 'tel aviv':
                setCoordinates({ lat: 32.0853, lng: 34.7818 })
                break;
            case 'new york':
                setCoordinates({ lat: 40.7666420630756, lng: -73.98033687868745 })
                break;
            case 'paris':
                setCoordinates({ lat: 48.840925935183286, lng: 2.3288174406260698 })
                break;
            case 'tokyo':
                setCoordinates({ lat: 35.66653843270466, lng: 139.7554540304869 })
                break;
            default:
                setCoordinates({ lat: 32.0853, lng: 34.7818 })
                break;
        }
    }

    return (
        <section className="about">
            <h2>About Usssss</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni aperiam quo veniam velit dolor reprehenderit, laudantium consequatur neque numquam labore quae. Accusamus libero perferendis ducimus? Alias unde hic quisquam doloremque.</p>
            <div className="map-main-container">
                <div style={{ height: '70vh', width: '70%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "AIzaSyBCdVWW9p0o7YZ14rqKrbF8m6JWc_o0VbI" }}
                        defaultCenter={coordinates}
                        center={coordinates}
                        defaultZoom={zoom}
                    >
                        <AnyReactComponent
                            // lat={coordinates.lat}
                            // lng={coordinates.lng}
                            {...coordinates}
                            text="📍
                            Plant shop!
                            "
                        />
                    </GoogleMapReact>
                </div>
                <div className="brunches">
                    <article onClick={() => { goToStore('tel aviv') }}>
                        <h2>Tel Aviv branch</h2>
                    </article >
                    <article onClick={() => { goToStore('new york') }}>
                        <h2>New York branch</h2>
                    </article>
                    <article onClick={() => { goToStore('paris') }}>
                        <h2>paris branch</h2>
                    </article>
                    <article onClick={() => { goToStore('tokyo') }}>
                        <h2>Tokyo branch</h2>
                    </article>
                </div>
            </div>

        </section>

    )

}
