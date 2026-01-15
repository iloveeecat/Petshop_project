import { Link } from 'react-router-dom'

function Header() {
    return (
        <header className="flex justify-between items-center bg-purple-200">
            <div className="flex flex-col items-center">
                <Link to="/">
                    <img src="/logo.svg" alt="Logo" className="w-32"/>
                    <p className="font-bold text-black font-xs -mt-6 mb-4 text-center">PetShop</p>
                </Link>
            </div>
            <nav>
                <ul className="flex gap-x-14 mr-10">
                    <li><Link to="/">Главная</Link></li>
                    <li><Link to="/about">О нас</Link></li>
                    <li><Link to="/catalog">Каталог</Link></li>
                    <li><Link to="/cart">Корзина</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header