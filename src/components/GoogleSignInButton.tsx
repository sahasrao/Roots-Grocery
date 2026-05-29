import { GoogleLogin, type CredentialResponse } from '@react-oauth/google'
import { useAuth } from '../context/AuthContext'

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

export default function GoogleSignInButton() {
  const { signInWithGoogle } = useAuth()

  const handleSuccess = (response: CredentialResponse) => {
    if (response.credential) {
      signInWithGoogle(response.credential)
    }
  }

  if (!clientId) {
    return (
      <p className="text-sm text-muted text-center px-4">
        Google sign-in is not configured. Set{' '}
        <code className="font-mono text-xs">VITE_GOOGLE_CLIENT_ID</code> in your
        environment.
      </p>
    )
  }

  return (
    <div className="flex justify-center [&>div]:!w-full [&>div]:!max-w-sm">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => undefined}
        theme="filled_black"
        shape="pill"
        text="continue_with"
        size="large"
        width="320"
      />
    </div>
  )
}
