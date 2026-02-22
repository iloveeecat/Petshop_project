import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <section className="text-center mt-15">
        <h1>Помоги хвостикам найти дом</h1>
        <p className="mb-4">
          Покупай с добром — часть средств идёт на содержание животных и помощь
          приюту.
        </p>
        <Link to="/catalog" className="">Перейти в каталог</Link>
      </section>

      <section className="text-center mt-25">
        <h2>Почему выбирают нас</h2>
        <p>
          Каждое животное окружено вниманием, заботой и медицинской поддержкой.
        </p>
        <p>
          Часть прибыли идёт на корм, лечение и мероприятия по пристройству
          животных.
        </p>
        <p>
          Мы объединяем людей, которым не всё равно, и создаём тёплое
          сообщество.
        </p>
      </section>

      <section className="text-center mt-25">
        <h2>Наши любимчики</h2>
        <div className="flex justify-center gap-35 mt-10">
          <div>
            <h3>Василий</h3>
            <p>Дружелюбный и активный пёс</p>
            <Link to="/catalog">Подробнее</Link>
          </div>
          <div>
            <h3>Мурка</h3>
            <p>Нежная и ласковая кошка</p>
            <Link to="/catalog">Подробнее</Link>
          </div>
          <div>
            <h3>Мурзик</h3>
            <p>Умный и игривый кот</p>
            <Link to="/catalog">Подробнее</Link>
          </div>
        </div>
      </section>

      <section className="text-center mt-25">
        <h2>Станьте частью добра</h2>
        <p>
          Вы можете помочь не только покупкой, но и своим временем и участием
        </p>
        <Link to="/about">Узнать больше</Link>
      </section>
    </>
  );
}

export default Home;
