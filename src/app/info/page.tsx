import Image from "next/image";

export default function Info() {
  return (
    <>
      <div className="max-w-4xl mx-auto p-6 space-y-8 text-gray-800">
        {/* Вхід */}
        <section>
          <h2 className="text-2xl font-semibold flex items-center gap-2">Вхід як адміністратор</h2>
          <p>Для входу використайте наступні дані:</p>
          <ul className="list-disc list-inside ml-4">
            <li>
              <strong>Email:</strong> admin@gmail.com
            </li>
            <li>
              <strong>Пароль:</strong> admin
            </li>
          </ul>
          <p className="mt-2">Після авторизації ви будете перенаправлені на сторінку зі списком заявок.</p>
        </section>

        {/* Основна сторінка */}
        <section>
          <h2 className="text-2xl font-semibold flex items-center gap-2">Основна сторінка</h2>
          <Image src="/Orders.jpg" alt="Preview orders window" width={1500} height={855} />
          <h3 className="text-xl mt-4 font-semibold">Інтерфейс основної сторінки</h3>
          <ol className="list-decimal list-inside ml-4 space-y-2">
            <li>
              <strong>Кнопка переходу до адмінпанелі</strong> — Розміщена у верхньому правому куті. Веде до адмінпанелі.
            </li>
            <li>
              <strong>Кнопка Log Out</strong> — Дає змогу вийти з системи.
            </li>
            <li>
              <strong>Панель фільтрів</strong> — Дозволяє фільтрувати заявки за критеріями.
            </li>
            <li>
              <strong>Чекбокс &#34;Тільки мої заявки&#34;</strong> — Фільтрує список, залишаючи лише заявки, створені поточним користувачем.
            </li>
            <li>
              <strong>Кнопка &#34;Скинути фільтри&#34;</strong> — Очищує всі активні фільтри.
            </li>
            <li>
              <strong>Кнопка &#34;Експорт в Excel&#34;</strong> — Експортує всі заявки у файл формату <code>.xlsx</code>.
            </li>
            <li>
              <strong>Список заявок</strong> — Відображає всі заявки. Підтримує сортування.
            </li>
            <li>
              <strong>Сортування</strong> — Натисканням на заголовок колонки змінюється порядок сортування.
            </li>

            <h4 className="text-xl   ">(Перегляд заявки)</h4>

            <li>
              <strong>Картка заявки</strong> — Натиснувши на заявку, відкриється її детальна інформація.
            </li>
            <li>
              <strong>Поле для коментаря</strong> — Можна залишити коментар до заявки.
            </li>
            <li>
              <strong>Кнопка Edit</strong> — Відкриває модальне вікно для редагування заявки.
            </li>
          </ol>

          <h2 className="text-2xl font-semibold flex items-center gap-2">Вибір або створення групи:</h2>
          <Image src="/modal.jpg" alt="Preview modal window" width={807} height={678} />

          <ol className="list-decimal list-inside ml-4 space-y-2">
            <li>або створити нову (залежно від вибраної дії)</li>
            <li>вибрати наявну групу</li>
          </ol>
        </section>

        {/* Адмінпанель */}
        <section>
          <h2 className="text-2xl font-semibold flex items-center gap-2"> Адмінпанель</h2>
          <Image src="/admin.jpg" alt="Preview admin window" width={1500} height={855} />
          <ol className="list-decimal list-inside ml-4 space-y-2">
            <li>
              <strong>Загальна статистика</strong> — по всіх заявках.
            </li>
            <li>
              <strong>Кнопка Create User</strong> — створення нового користувача.
            </li>
            <li>
              <strong>Картки користувачів</strong>, де можна:
            </li>
            <ul className="list-disc list-inside ml-6">
              <li>Забанити користувача</li>
              <li>Активувати акаунт — надсилає лист з підтвердженням на email</li>
              <li>Скинути пароль</li>
              <li>Кількість створених заявок</li>
              <li>Кількість заявок у роботі</li>
              <li>Останній вхід</li>
              <li>Інша додаткова інформація</li>
            </ul>
          </ol>
        </section>

        {/* Створення нового користувача */}
        <section>
          <h2 className="text-2xl font-semibold flex items-center gap-2"> Створення нового користувача</h2>
          <ol className="list-decimal list-inside ml-4 space-y-2">
            <li>
              Натисніть кнопку <strong>Create User</strong>
            </li>
            <li>У модальному вікні введіть дані нового користувача та робочу електронну пошту</li>
            <li>Перевірте пошту й перейдіть за посиланням для активації</li>
            <li>На сторінці активації введіть новий пароль та підтвердіть його</li>
          </ol>
          <p className="mt-2 font-medium">Вітаємо! Ви створили нового користувача. Тепер можна працювати з новим акаунтом.</p>
        </section>
      </div>
    </>
  );
}
