import style from "@/styles/ui/Card.module.css";
import Link from "next/link";

export default function Card({ title, description, link }) {
  return (
    <div className={`card ${style.card}`}>
      <h5 class="card-header text-center fw-bold">{title}</h5>
      <div class="card-body">
        <p class="card-text mb-0">{description}</p>
        <Link href={link} className="stretched-link hidden" />
      </div>
    </div>
  )
}