import { redirect } from "next/navigation"

function LoginRedirect() {

  const redirectTo = setTimeout(() => {
    redirect('/')
  }, 2000)

  return (
    <div>
      <h1>Redirecionando...</h1>
    </div>
  )
}

export default LoginRedirect