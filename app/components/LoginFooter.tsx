import Link from "next/link"

function LoginFooter() {
  return (
    <div className="max-w-sm w-full text-center">
      <hr className="py-2 border-1 border-slate-300" />
      <h1 className="text-slate-600">Criado por <Link target="_blank" href={'https://github.com/4zeved0'} className="underline">@MiguelSantos</Link></h1>
    </div>
  )
}


export default LoginFooter 