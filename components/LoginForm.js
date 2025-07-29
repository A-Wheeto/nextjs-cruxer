import style from "@/styles/LoginForm.module.css"
import Link from "next/link"

export default function LoginForm() {
  return (
    <div className={`${style.card}`}>
      <form>
        <div>
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div>
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" />
        </div>
        <div className="d-flex mt-3 justify-content-between align-items-center">
          <button type="submit" className={`btn ${style.btn}`}>Login</button>
          <button type="submit" className={`btn ${style.btn}`}>Sign up</button>
        </div>
      </form>
    </div>
  )
}