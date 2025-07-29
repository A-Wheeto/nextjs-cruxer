// pages/auth-test.js
import { useSession } from 'next-auth/react'

export default function AuthTest() {
  const { data: session, status } = useSession()

  return (
    <div style={{ padding: '20px' }}>
      <h1>Auth Test Page</h1>
      <p>Status: {status}</p>
      <p>Session: {session ? 'Logged in' : 'Not logged in'}</p>
      {session && (
        <pre>{JSON.stringify(session, null, 2)}</pre>
      )}
      <p>Database connection should be working if no errors appear.</p>
    </div>
  )
}