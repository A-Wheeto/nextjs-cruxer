import "../styles/globals.css"
import Header from "@/components/Header"
import { SessionProvider } from "next-auth/react"

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Header />
      <div className="container mt-4 pb-2">
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  )
}