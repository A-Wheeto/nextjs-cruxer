import Link from "next/link";
import styles from "../../styles/ui/LocationCard.module.css"

export default function LocationCard({ name, location, description, email, phoneNumber }) {
  return (
    <div className={`card ${styles.card}`}>
      <h5 className="card-header text-center fw-bold">{name}</h5>
      <div className="card-body">
        <h5 className="card=title">{location}</h5>
        <p className="card-text mb-0">{description}</p>
      </div>
      <div className="card-footer d-flex justify-content-between">
        <div>
          <Link href={`mailto: ${email}`}>{email}</Link>
        </div>
        <div>
          <Link href={`tel: ${phoneNumber}`}>{phoneNumber}</Link>
        </div>
      </div>
    </div>
  )
}