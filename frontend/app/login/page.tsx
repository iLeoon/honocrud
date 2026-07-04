import LoginForm from '../../components/login-form'

export const metadata = {
  title: 'Login',
}

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </main>
  )
}
