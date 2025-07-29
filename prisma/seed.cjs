const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.homePageCard.createMany({
    data: [
      {
        title: "Track Your Ascents",
        description: "Log your climbs effortlessly and keep detailed records of each route you conquer. Monitor your progress over time with stats and personal bests to stay motivated and improve your skills.",
        link: "/log"
      },
      {
        title: "Connect with Climbers",
        description: "Meet and interact with fellow climbing enthusiasts from around the world. Share tips, organize meetups, and build your climbing community both online and offline.",
        link: "/community"
      },
      {
        title: "Discover New Routes",
        description: "Explore new climbing routes tailored to your skill level and location. Get recommendations, user reviews, and detailed route information to find your next adventure.",
        link: "/map"
      }
    ],
  });

  console.log("✅ Seeded homepage cards!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
