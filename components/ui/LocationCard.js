import Link from "next/link";
import styles from "../../styles/ui/LocationCard.module.css"

export default function LocationCard({ name, location, description, email, phoneNumber }) {
  return (
    <div className={`card ${styles.card}`}>
      <h5 className="card-header text-center fw-bold">{name}</h5>
      <div className="card-body">
        <h5 className="card=title"><span className="bi bi-geo-alt-fill me-2"/>{location}</h5>
        <p className="card-text mb-0">{description}</p>
      </div>
      <div className="card-footer">
        <p className="text-body-secondary mb-1">
          Email: <Link href={`mailto: ${email}`}>{email}</Link>
        </p>
        <p className="text-body-secondary mb-0">
          Tel: <Link href={`tel: ${phoneNumber}`}>{phoneNumber}</Link>
        </p>
      </div>
    </div>
  )
}