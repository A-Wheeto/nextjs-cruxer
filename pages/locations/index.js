import { PrismaClient } from "@prisma/client";
import LocationCard from "@/components/ui/LocationCard";

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const locations = await prisma.climbingGym.findMany({
    orderBy: { name: "asc" }
  });

  // Serialize the climbing gyms data
  const serializedLocation = locations.map(location => ({
    ...location,
    createdAt: location.createdAt.toISOString(),
  }));

  return {
    props: { locations: serializedLocation },
  }
}

export default function Locations({ locations }) {
  return (
    <>
      <h1>Climbing Gyms</h1>
      <section className="row mt-2 g-4 mb-4">
        {locations.map((gym) => (
          <div className="col-12 col-md-4 card-group">
            <LocationCard 
              name={gym.name}
              location={gym.location}
              description={gym.description}
              email={gym.email}
              phoneNumber={gym.phoneNumber}
            />
          </div>
        ))}
      </section>
    </>
  )
}