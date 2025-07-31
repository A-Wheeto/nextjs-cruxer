import LocationCard from "@/components/ui/LocationCard";
import locations from "../../data/locations.json";

export default function Locations() {
  return (
    <>
      <h1>Climbing Gyms</h1>
      <section className="row mt-2 g-4 mb-4">
        {locations.map((location, index) => (
          <div key={index} className="col-12 col-md-4 card-group">
            <LocationCard 
              name={location.name}
              location={location.location}
              description={location.description}
              email={location.email}
              phoneNumber={location.phoneNumber}
            />
          </div>
        ))}
      </section>
    </>
  )
}