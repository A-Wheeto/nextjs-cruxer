import styles from "../styles/site.module.css"
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { useState } from "react";
import ImageUpload from "../components/ui/ImageUpload";

export default function Profile({ user: initialUser }) {
  const [user, setUser] = useState(initialUser)

  const handleImageUpdate = (newImageUrl) => {
    setUser(prev => ({ ...prev, image: newImageUrl }))
  }

  return (
    <div className="row justify-content-center">
      <div className={`col-md-6 col-lg-4 text-center ${styles.section}`}>
        <ImageUpload 
          currentImage={user.image} 
          onImageUpdate={handleImageUpdate}
        />
        <p className="text-body-secondary mt-5 mb-0">Username</p>
        <p className="fs-2">{user.username}</p>
        <p className="text-body-secondary mt-2 mb-0">Full Name</p>
        <p className="fs-2">{user.name}</p>
        <p className="text-body-secondary mt-2 mb-0">Email Address</p>
        <p className="fs-2">{user.email}</p>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  const user = {
    id: session.user.id,
    username: session.user.username,
    email: session.user.email,
    name: session.user.name || null,
    image: session.user.image || null,
  };

  return {
    props: {
      user,
    },
  };
}