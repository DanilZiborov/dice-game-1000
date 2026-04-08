import { Link } from 'react-router-dom';
import { type JSX } from 'react';

export const Rules = (): JSX.Element => {
  return (
    <div className="mx-auto py-10 leading-relaxed">
      <h1 className="mb-12 text-center text-3xl font-bold">Правила игры «Тысяча» на костях</h1>

      <div className="mb-8 border-l-4 py-2 pl-4 text-lg">
        <p className="font-medium">Важно:</p>
        <p>
          Правила игры могут отличаться в разных регионах и даже семьях. Ниже приведён классический и наиболее
          распространённый вариант. По этим правилам ведётся подсчёт очков в приложении.
        </p>
      </div>

      {/* ОБЩЕЕ */}

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">Общие правила и цель игры</h2>
        <p className="mb-4 underline">Цель игры — первым набрать&nbsp;1000&nbsp;очков</p>
        <p className="mb-4">
          <span className="font-medium">Инвентарь:</span>&nbsp;5&nbsp;шестигранных игральных костей.
        </p>
        <p className="mb-4">
          <span className="font-medium">Количество игроков:</span>&nbsp;от&nbsp;2&nbsp;и более.
        </p>
        <p className="mb-4">
          <span className="font-medium">Порядок хода:</span>&nbsp;игроки ходят по очереди, определяя очерёдность бросков
          любым удобным способом.
        </p>
      </section>

      {/*ХОД ИГРОКА*/}

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">Ход игрока</h2>
        <ol className="mb-4 list-decimal space-y-4 pl-8">
          <li>Игрок бросает все пять костей одновременно.</li>
          <li>
            Затем игрок проверяет, выпали ли у него результативные кости.
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <span className="font-medium">Результативные кости:</span>&nbsp;единица&nbsp;—&nbsp;10&nbsp;очков;
                пятёрка&nbsp;—&nbsp;5&nbsp;очков и специальные комбинации.{' '}
                <Link to="/combos" className="text-cyber-secondary underline">
                  (см. раздел с комбинациями).
                </Link>
              </li>
              <li>
                <u>Пять единиц в одном броске всегда приносят игроку мгновенную победу</u>&nbsp;— никакие условия не
                могут этому помешать.
              </li>
            </ul>
          </li>
          <li>
            <span className="font-medium">
              Если выпали результативные кости, игрок должен решить, что делать дальше. Есть два варианта:
            </span>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <span className="font-medium underline">Закончить ход.</span>&nbsp; Подсчитать набранные очки, прибавить
                их к своему общему счёту и передать ход следующему игроку.
              </li>
              <li>
                <span className="font-medium underline">Или рискнуть и продолжить бросать.</span>&nbsp;Бросать нужно ВСЕ
                нерезультативные (невыпавшие) кости.
              </li>
            </ul>
          </li>
        </ol>
        <p className="mb-4">
          Игрок может набирать очки, пока у него выпадают результативные кости. Однако если по итогу броска не выпало ни
          одной результативной кости, то ход игрока завершается, а все набранные за ход очки сгорают. Игроку
          записывается &#34;болт&#34; (о них будет дальше).
        </p>
        <p>
          Кроме того, если по итогам одного или нескольких бросков все кости игрока оказались результативными, и не
          осталось &#34;свободных&#34; костей для броска, игрок ОБЯЗАН бросить все 5 костей.
        </p>

        <div className="mt-8">
          <p className="mb-4 text-lg font-bold text-cyber-secondary">Пример:</p>

          <div className="rounded-lg border border-cyber-secondary p-6">
            <div className="space-y-6 italic">
              <p className="font-medium not-italic">
                Рассмотрим ход игроков на примере. Предположим, в партию играют Катя, Паша, Настя и Даня
              </p>

              <div>
                <p className="mb-2">
                  <span className="font-medium not-italic">Ход Кати:</span> Катя бросает 5 костей и выбрасывает{' '}
                  <span className="font-medium">4 4 4 2 3</span> — это комбинация на{' '}
                  <span className="font-medium">40 очков</span>. Остальные кости — 2 и 3 — ничего не дают.
                </p>
                <p>
                  Катя решает не рисковать, <span className="underline">фиксирует 40 очков</span> и передаёт ход Паше.
                </p>
              </div>

              <div>
                <p className="mb-2">
                  <span className="font-medium not-italic">Ход Паши:</span> Паша бросает 5 костей: выпадают{' '}
                  <span className="font-medium">1 5 4 4 6 (15 очков)</span>.
                </p>
                <p className="mb-2">
                  Он решает продолжить и бросает три оставшиеся кости (4 4 6) — выпадает{' '}
                  <span className="font-medium">5 2 4 </span>. Выпала результативная 5, добавляем к ней 15 очков с
                  предыдущего броска, и промежуточный результат Паши уже 20 очков.
                </p>
                <p className="mb-2">
                  Паша снова рискует и бросает две оставшиеся кости… Выпадает 6 и 6 —{' '}
                  <span className="underline">ни одной результативной кости</span>.
                </p>
                <p>
                  Все набранные за ход очки сгорают, Паша получает <span className="font-medium">«болт»</span> и с
                  грустью передаёт ход Насте.
                </p>
              </div>

              <div>
                <p className="mb-2">
                  <span className="font-medium not-italic">Ход Насти:</span> Настя бросает 5 костей:{' '}
                  <span className="font-medium"> выпадает 1 1 5 2 3 (25 очков)</span>
                </p>
                <p className="mb-2">
                  Она решает продолжить и бросает 2 и 3 — выпадает{' '}
                  <span className="font-medium">1 и 1 (ещё 20 очков)</span>.
                </p>
                <p className="mb-2">
                  Теперь все кости стали результативными, поэтому Настя{' '}
                  <span className="underline">обязана бросить все 5 костей снова</span>.
                </p>
                <p className="mb-2">
                  Она бросает и получает: 1, 1, 1, 3, 4 — это ещё <span className="font-medium">100 очков</span> за три
                  единицы.
                </p>
                <p>
                  Настя решает остановиться, не искушать судьбу и записывает результат:{' '}
                  <span className="font-medium">25 + 20 + 100 = 145 очков</span>. Неплохой ход.
                </p>
              </div>

              <div>
                <p className="mb-2">
                  <span className="font-medium not-italic">Ход Дани:</span> Даня бросает кости и выбрасывает{' '}
                  <span className="font-medium">2 3 4 5 6</span> — комбинацию на{' '}
                  <span className="font-medium">250 очков</span>. Повезло так повезло.
                </p>
                <p className="mb-2">
                  Но радоваться рано: по правилам он{' '}
                  <span className="underline">обязан бросить все 5 костей снова</span>.
                </p>
                <p className="mb-2">
                  Он бросает… и получает 4, 6, 3, 3, 2 —{' '}
                  <span className="underline">ни одной результативной кости</span>.
                </p>
                <p>
                  Все 250 очков сгорают, Даня получает <span className="font-medium">«болт»</span> и моральную травму.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*<БОЛТЫ*/}

      <section className="mb-12">
        <h2 className="mb-6 pb-2 text-2xl font-semibold">«Болты»</h2>
        <p className="mb-4">
          «Болт» записывается игроку, если по итогам его броска у него
          <span className="font-medium">выпало 0&nbsp;очков</span>.
        </p>
        <p className="mb-6">
          Если игрок накопил три болта, с него списывается заранее оговорённое количество очков (обычно&nbsp;50).
        </p>
        <ul className="list-disc space-y-2 pl-8">
          <li>
            Если игрок не вошёл в игру, болты <span className="font-medium">не записываются</span>.
          </li>
          <li>
            Игроку, сидящему на бочке, болты <span className="font-medium">не записываются</span>.
          </li>
          <li>
            Игроку, сидящему в яме, болты <span className="font-medium">не записываются</span>.
          </li>
          <li>В настройках можно изменить количество штрафных очков за три болта или совсем отключить их.</li>
        </ul>
      </section>

      {/* ПАСПОРТ */}

      <section className="mb-12">
        <h2 className="mb-6 pb-2 text-2xl font-semibold">Вход в игру (паспорт)</h2>
        <p className="mb-6">
          Чтобы войти в игру и начать записывать очки, игрок должен <span className="font-medium">за один ход</span>{' '}
          набрать <span className="font-medium">определённое количество очков (обычно 75)</span>.
        </p>
        <p className="mb-4 font-medium">Важные уточнения:</p>
        <ul className="list-disc space-y-3 pl-8">
          <li>
            Вход в игру возможен <span className="font-medium">только один раз за партию</span>. Повторно входить в игру
            не нужно, даже если счёт опустится до&nbsp;0.
          </li>
          <li>
            Игрокам, ещё не вошедшим в игру, <span className="font-medium">болты не записываются</span>.
          </li>
          <li>В настройках можно изменить количество очков &#34;паспорта&#34; или совсем отключить его.</li>
        </ul>
      </section>

      {/*ОБГОН*/}

      <section className="mb-12">
        <h2 className="mb-6 pb-2 text-2xl font-semibold">Правило обгона</h2>
        <p className="mb-6">
          Обгон — это ситуация, когда у игрока А до его хода было меньше очков, чем у игрока Б, а после хода игрока А у
          него стало больше очков, чем у игрока Б. Если по итогу хода игрока А количество очков у игроков А и Б равное,
          это <span className="font-medium">не считается обгоном</span>.
        </p>
        <ul className="mb- list-disc space-y-3 pl-8">
          <li>
            Обогнанный игрок{' '}
            <span className="font-medium">теряет заранее оговорённое количество очков (обычно&nbsp;50)</span>.
          </li>
          <li>
            Можно обогнать <span className="font-medium">несколько игроков одновременно</span>.
          </li>
          <li>В настройках можно изменить количество очков штрафа за обгон или совсем отключить его.</li>
        </ul>
      </section>

      {/* ЯМЫ */}

      <section className="mb-12">
        <h2 className="mb-6 pb-2 text-2xl font-semibold">Ямы</h2>
        <p className="mb-4">
          Яма — это заранее определённый промежуток очков. В классическом варианте игры есть две ямы: 200–300&nbsp;очков
          и 700–800&nbsp;очков.
        </p>
        <p className="mb-4">
          Если в конце своего хода игрок &#34;упал в яму&#34;, то ему нужно выбросить ЗА ОДИН ХОД определённое
          количество очков, чтобы &#34;выпрыгнуть&#34; из ямы.
        </p>
        <div className="mt-4 ml-4 border-l-4 border-gray-200 pl-4 italic">
          <p>
            Пример: Даня в конце своего хода имеет счёт&nbsp;720. Он попал в яму 700-800. Теперь ему нужно выбросить не
            менее&nbsp;81&nbsp;очка (по факту 85) за один ход, чтобы выбраться из ямы. Если он выбросил меньше, очки не
            начисляются и он остаётся в яме.
          </p>
        </div>
        <ul className="mt-4 list-disc space-y-2 pl-8">
          <li>Болты в ямах не записываются.</li>
          <li>
            В яму можно попасть не только по результату своего хода, но и в результате:
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>штрафа после обгона;</li>
              <li>штрафа за третий болт.</li>
            </ul>
          </li>
          <li>В настройках партии можно включить обе ямы или какую-то одну или отключить их совсем.</li>
        </ul>
      </section>

      {/*САМОСВАЛ*/}

      <section className="mb-12">
        <h2 className="mb-6 pb-2 text-2xl font-semibold">Самосвал</h2>
        <p className="mb-6">Если игрок набирает ровно&nbsp;555&nbsp;очков, его итоговый счёт обнуляется.</p>
        <ul className="list-disc space-y-3 pl-8">
          <li>Попасть на самосвал можно и в результате штрафов после обгона или болтов.</li>
          <li>После самосвала входить в игру заново не нужно, хоть это и слабое утешение для игрока.</li>
          <li>Самосвал можно отключить в настройках партии.</li>
        </ul>
      </section>

      {/* БОЧКА */}

      <section className="mb-12">
        <h2 className="mb-6 pb-2 text-2xl font-semibold">Бочка</h2>

        <p className="mb-6">
          Когда игрок набирает <span className="font-medium">900 очков</span>, он{' '}
          <span className="font-medium">«садится на бочку»</span>. Теперь, чтобы победить, ему нужно за один ход набрать
          недостающие до <span className="font-medium">1000 очков</span>.
        </p>

        <ul className="list-disc space-y-4 pl-8">
          <li>
            <span className="font-medium">Ограничение при входе на бочку:</span> если игрок набрал больше 900 очков, его
            счёт всё равно становится равен 900.
          </li>

          <li>
            <span className="font-medium">Падение с бочки:</span> если игрок не набрал нужное количество очков за ход,
            он «падает с бочки» и его счёт становится <span className="font-medium">800</span>.
          </li>

          <li>
            <span className="font-medium">Третье падение:</span> если игрок падает с бочки в третий раз, его счёт
            обнуляется.
          </li>

          <li>
            Если игрок садится на бочку, на которой уже кто-то сидит, то сидевший на бочке игрок падает с неё,
            откатываясь до 800 очков. При этом такое падение не считается попыткой &#34;взять бочку&#34; и не идёт в
            счёт попыток. Таким образом, на бочке одновременно может сидеть только один игрок.
          </li>
        </ul>

        <div className="mt-8">
          <p className="mb-4 text-lg font-bold text-cyber-secondary">Пример:</p>

          <div className="rounded-lg border border-cyber-secondary p-6">
            <div className="space-y-6 italic">
              <div>
                <p className="mb-2">
                  <span className="font-medium not-italic">Ход Кати:</span> у Кати{' '}
                  <span className="font-medium">880 очков</span>. Она бросает кости и набирает{' '}
                  <span className="font-medium">50 очков</span>.
                </p>
                <p>
                  Несмотря на это, её итоговый счёт становится <span className="underline">ровно 900</span>. Катя
                  «садится на бочку».
                </p>
              </div>

              <div>
                <p className="mb-2">
                  <span className="font-medium not-italic">Ход Паши:</span> у Паши уже{' '}
                  <span className="font-medium">900 очков</span>. Ему нужно набрать минимум{' '}
                  <span className="font-medium">100 очков</span> за ход, чтобы победить.
                </p>
                <p className="mb-2">
                  Он бросает кости, но набирает только <span className="font-medium">60 очков</span>.
                </p>
                <p>
                  Этого недостаточно, поэтому Паша <span className="underline">падает с бочки</span> и откатывается до{' '}
                  <span className="font-medium">800 очков</span>.
                </p>
              </div>

              <div>
                <p className="mb-2">
                  <span className="font-medium not-italic">Ход Насти:</span> Настя уже дважды падала с бочки. Сейчас у
                  неё снова <span className="font-medium">900 очков</span>.
                </p>
                <p className="mb-2">Она делает попытку, но снова не добирает нужное количество очков.</p>
                <p>
                  Это третье падение, поэтому её счёт <span className="underline">сбрасывается до 0</span>. Очень
                  болезненно.
                </p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="mt-8 mb-4 text-xl font-semibold">Вариант «облегчённая бочка»</h3>

        <p className="mb-4">
          В этом варианте игроку даётся <span className="font-medium">три хода</span>, чтобы добрать до 1000 очков. Очки
          между ходами сохраняются.
        </p>

        <div className="mt-4">
          <p className="mb-4 text-lg font-bold text-cyber-secondary">Пример:</p>

          <div className="rounded-lg border border-cyber-secondary p-6">
            <div className="space-y-6 italic">
              <div>
                <p>
                  <span className="font-medium not-italic">Ход Дани:</span> Даня набирает{' '}
                  <span className="font-medium">900 очков</span> и садится на бочку. У него есть три попытки.
                </p>
              </div>

              <div>
                <p>
                  В первой попытке он набирает <span className="font-medium">25 очков</span> и передаёт ход.
                </p>
              </div>

              <div>
                <p>
                  Во второй попытке он набирает ещё <span className="font-medium">60 очков</span>. Теперь у него уже{' '}
                  <span className="font-medium">85 очков</span>.
                </p>
              </div>

              <div>
                <p>
                  В третьей попытке ему нужно набрать минимум <span className="font-medium">15 очков</span>, чтобы
                  выиграть партию.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 border-l-4 border-gray-200 pl-6">
          <p className="italic">
            В приложении можно активировать такой вариант бочки в настройках партии. Так он называется «Режим быстрой
            победы». Он уменьшает время партии, но делает её более предсказуемой.
          </p>
        </div>
      </section>

      {/*КОНЕЦ ИГРЫ*/}

      <section>
        <h2 className="mb-6 pb-2 text-2xl font-semibold">Завершение игры</h2>
        <p>Игра заканчивается, когда один из игроков набирает&nbsp;1000&nbsp;и более очков.</p>
      </section>
    </div>
  );
};
