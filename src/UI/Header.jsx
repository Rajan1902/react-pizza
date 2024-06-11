import { Link } from "react-router-dom"
import SearchOrder from "../features/orders/SearchOrder"
import UserName from "../features/user/UserName"

const Header = () => {
  return (
    <header className="bg-yellow-400 uppercase border-b-2 border-stone-300 px-4 py-3 sm:px-6 flex items-center justify-between">
        <Link to='/' className="tracking-widest">Rajan's Pizza</Link>
        <SearchOrder></SearchOrder>
        <UserName></UserName>
    </header>
  )
}

export default Header
