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
          <ul className="navbar-nav">
            {session ? (
              <li className="nav-item dropdown">
                <a 
                  className={`nav-link p-2 mx-0 dropdown-toggle ${styles.link}`}
                  href="#" 
                  id="userDropdown" 
                  role="button" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  {session.user.username || session.user.name}
                </a>
                <ul className={`${styles.dropdown_menu} dropdown-menu dropdown-menu-end mt-3`} aria-labelledby="userDropdown">
                  <li>
                    <Link href="/profile" className="dropdown-item">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button 
                      className="dropdown-item"
                      onClick={() => signOut()}
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link href="/auth/signin" className={`nav-link p-2 ${styles.link}`}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/auth/signup" className={`nav-link p-2 ${styles.link}`}>
                    Create an account
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