function Cart() {
  return (
    <div className="max-w-md p-5 py-16 mx-auto">
      <h1 className="mb-6 text-2xl font-bold text-center">Корзина</h1>

      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold">Ваши выбранные питомцы:</h2>
        <ul className="space-y-2">
          <li className="flex items-center justify-between pb-2 border-b">
            <span>Барон (Собака, Лабрадор)</span>
            <span>5 000 ₽</span>
          </li>
          <li className="flex items-center justify-between pb-2 border-b">
            <span>Мурка (Кошка, Британская)</span>
            <span>3 000 ₽</span>
          </li>
        </ul>
        <p className="mt-4 font-medium text-md">Итого: 8 000 ₽</p>
      </div>

      <form className="space-y-5">
        <h2 className="text-lg font-semibold">Контактные данные:</h2>

        <div className="flex flex-col">
          <input
            className="p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 peer"
            id="name"
            type="text"
            placeholder="Введите ваше имя"
            required
          />
          <label
            className="text-sm text-gray-500 peer-placeholder-shown:text-gray-400 peer-focus:text-green-600"
            htmlFor="name"
          >
            Имя
          </label>
        </div>

        <div className="flex flex-col">
          <input
            className="p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 peer"
            id="phone"
            type="tel"
            placeholder="Введите номер телефона"
            required
          />
          <label
            className="text-sm text-gray-500 peer-placeholder-shown:text-gray-400 peer-focus:text-green-600"
            htmlFor="phone"
          >
            Телефон
          </label>
        </div>

        <div className="flex flex-col">
          <input
            className="p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 peer"
            id="email"
            type="email"
            placeholder="Введите email (по желанию)"
          />
          <label
            className="text-sm text-gray-500 peer-placeholder-shown:text-gray-400 peer-focus:text-green-600"
            htmlFor="email"
          >
            Email
          </label>
        </div>

        <div className="flex flex-col">
          <textarea
            className="p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 peer"
            id="address"
            placeholder="Введите адрес доставки"
          ></textarea>
          <label
            className="text-sm text-gray-500 peer-placeholder-shown:text-gray-400 peer-focus:text-green-600"
            htmlFor="address"
          >
            Адрес доставки
          </label>
        </div>

        <div className="flex flex-col">
          <select
            className="p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 peer"
            id="payment"
            required
          >
            <option value="" disabled>
              Выберите способ оплаты
            </option>
            <option value="card">Картой</option>
            <option value="cash">Наличными при получении</option>
            <option value="transfer">Банковский перевод</option>
          </select>
          <label
            className="text-sm text-gray-500 peer-focus:text-green-600"
            htmlFor="payment"
          >
            Способ оплаты
          </label>
        </div>

        <button
          className="w-full px-4 py-2 text-sm text-white bg-green-600 rounded-md hover:bg-green-700"
          type="submit"
        >
          Оформить заказ
        </button>
      </form>
    </div>
  );
}

export default Cart;

