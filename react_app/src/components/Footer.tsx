import { Link } from "react-router-dom"

function Footer() { 
  return (
    <footer className="bg-purple-200 p-8 mt-16">
      <div className="flex justify-between">
        <ul>
          <h3>Контакты</h3>
          <li>Телефон: +7 (123) 456-78-90</li>
          <li>Email: example@mail.com</li>
          <li>Адрес: г. Москва, ул. Примерная, д. 1</li>
          <li>Время работы: Пн-Пт 8:00-18:00</li>
        </ul>
        <ul>
          <h3>Навигация</h3>
          <li><Link to="/">Главная</Link></li>
          <li><Link to="/about">О нас</Link></li>
          <li><Link to="/catalog">Каталог животных</Link></li>
          <li><Link to="/cart">Доставка и оплата</Link></li>
        </ul>
        <ul>
          <h3>Социальные сети</h3>
          <li>VK</li>
          <li>Instagram</li>
          <li>Telegram</li>
          <li>YouTube</li>
        </ul>
        <ul>
          <h3>Информация</h3>
          <li>Политика конфиденциальности</li>
          <li>Пользовательское соглашение</li>
          <li>Возврат и гарантии</li>
        </ul>
      </div>

      <div className="text-center mt-12 text-sm">
        <p>© 2025 Интернет-магазин питомцев. Все права защищены.</p>
      </div>
    </footer>
  )
}

export default Footer