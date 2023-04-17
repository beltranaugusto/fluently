
import React, { useState } from "react";
export const Test = () => {
    const [query, setQuery] = useState('');
    const [coordinates, setCoordinates] = useState(null);


    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
        );
        const data = await response.json();
        if (data.length > 0) {
            setCoordinates({ lat: data[0].lat, lng: data[0].lon });
        } else {
            setCoordinates(null);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Place:
                    <input type="text" value={query} onChange={handleInputChange} />
                </label>
                <button type="submit">Submit</button>
            </form>
            {coordinates && (
                <p>
                    Coordinates: ({coordinates.lat}, {coordinates.lng})
                </p>
            )}
        </div>
    );
}