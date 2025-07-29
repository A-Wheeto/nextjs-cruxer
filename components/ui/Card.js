import style from "@/styles/ui/Card.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Card({ title, description, link, image }) {
  return (
    <div className={`card ${style.card}`}>
      <Image src={image} className="card-img-top opacity-75" width={400} height={200} style={{objectFit: "cover"}} />
      <h5 className="card-header text-center fw-bold">{title}</h5>
      <div className="card-body">
        <p className="card-text mb-0">{description}</p>
        <Link href={link} className="stretched-link hidden" />
      </div>
    </div>
  )
}