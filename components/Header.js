import Link from "next/link"
import styles from "@/styles/Navbar.module.css"
import { useSession, signOut } from "next-auth/react"

export default function Header() {
  const { data: session, status } = useSession();
  
  return (
    <nav className={`navbar navbar-expand-lg navbar-dark ${styles.background_color}`}>
      <div className="container d-flex justify-content-between align-items-center">
        <Link href="/" className={`navbar-brand ${styles.title}`}>
          C R U <span className={`${styles.title_x}`}>&#10007;</span> E R
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarToggler" 
          aria-controls="navbarToggler" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* Collapsible nav links */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarToggler">
          <ul className="navbar-nav mb-2 mb-lg-0">
            {status === 'loading' ? (
              <li className="nav-item">
                <span className={`nav-link ${styles.link}`}>Loading...</span>
              </li>
            ) : session ? (
              <>
                <li className="nav-item">
                  <span className={`nav-link ${styles.link}`}>
                    Hello, {session.user.username}!
                  </span>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link btn btn-link ${styles.link}`}
                    onClick={() => signOut()}
                    style={{ border: 'none', background: 'none', padding: '0.5rem 1rem' }}
                  >
                    SIGN OUT
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link href="/auth/signin" className={`nav-link ${styles.link}`}>
                    LOGIN
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/auth/signup" className={`nav-link ${styles.link}`}>
                    CREATE AN ACCOUNT
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}