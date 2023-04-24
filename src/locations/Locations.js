import { useState, useEffect } from "react";
import "./Locations.css"


export const LocationsList = () => {
    const [managedLocations, setManagedLocations] = useState([]);

    const localMiratUser = localStorage.getItem("mirat_user")
    const miratUserObject = JSON.parse(localMiratUser)

    useEffect(
        () =>{
            fetch(`http://localhost:8088/managedLocations?_expand=location&adminId=${miratUserObject.id}`)
            .then(response => response.json())
            .then((managedLocationsArray) => {
                setManagedLocations(managedLocationsArray)
            })
        },
        []
    )

    return <>
        <h2></h2>
        <article className="locations">
            {
                managedLocations.map(
                    (managedLocation) => {
                        return <section className="location" key={`location--${managedLocation.id}`}>
                            <header>Location Name: {managedLocation?.location?.locationName}</header>
                            <footer>Address: {managedLocation?.location?.address}</footer>
                        </section>
                    }
                )
            }
        </article>
    </>
}