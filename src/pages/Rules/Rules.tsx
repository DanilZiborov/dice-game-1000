import { Link } from 'react-router-dom';
import { type JSX } from 'react';

export const Rules = (): JSX.Element => {
  return (
    <div className="mx-auto py-10 leading-relaxed">
      <h1 className="mb-12 text-center text-3xl font-bold">Правила игры «Тысяча» на костях</h1>

      <div className="mb-8 border-l-4 py-2 pl-4 text-lg">
        <p className="font-medium">Важно:</p>
        <p>
          Правила игры могут отличаться в разных регионах и даже семьях. Ниже — классический и самый распространённый
          вариант (по мнению автора приложения). Именно по этим правилам работает подсчёт очков в приложении.
        </p>
      </div>

      {/* 1. Общие правила и цель игры */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">1. Общие правила и цель игры</h2>
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

      {/* 2. Ход игрока */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">2. Ход игрока: последовательность действий</h2>
        <ol className="list-decimal space-y-6 pl-8">
          <li>
            <span className="font-medium">Первый бросок:</span>&nbsp;в начале своего хода игрок бросает{' '}
            <span className="font-medium">все&nbsp;5&nbsp;костей</span> одновременно.
          </li>
          <li>
            <span className="font-medium">Анализ результата:</span>&nbsp;после броска игрок проверяет, выпали ли
            результативные комбинации.
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <span className="font-medium">Результативные кости:</span>&nbsp;единица&nbsp;—&nbsp;10&nbsp;очков;
                пятёрка&nbsp;—&nbsp;5&nbsp;очков и специальные комбинации.{' '}
                <Link to="/combos">Все комбинации подробно описаны здесь.</Link>
              </li>
              <li>
                <u>Пять единиц всегда приносят игроку мгновенную победу</u>&nbsp;— никакие условия не могут этому
                помешать.
              </li>
            </ul>
          </li>
          <li>
            <span className="font-medium">Решение игрока:</span>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <span className="font-medium">Остановить ход:</span>&nbsp;зафиксировать набранные очки, добавить их к
                своему общему счёту и передать ход следующему игроку.
              </li>
              <li>
                <span className="font-medium">Или рискнуть и продолжить бросать:</span>&nbsp;бросить можно только
                невыпавшие (нерезультативные) кости.
              </li>
            </ul>
          </li>
          <li>
            <span className="font-medium">Свободный бросок:</span>&nbsp;если в результате одного или нескольких бросков{' '}
            <span className="font-medium">все&nbsp;5&nbsp;костей оказались результативными</span>, игрок
            <span className="font-medium underline"> обязан</span>&nbsp;бросить все&nbsp;5&nbsp;костей снова.
          </li>
          <li>
            <span className="font-medium">Нулевой результат:</span>&nbsp;если в очередном броске не выпадает ни одной
            результативной комбинации, все набранные в этом ходу очки «сгорают» (не записываются), а ход переходит к
            следующему игроку. При этом игроку записывается <span className="font-medium">«болт»</span> (см.&nbsp;раздел
            «Болты» ниже).
          </li>
        </ol>
      </section>

      {/* 3. Вход в игру */}

      <section className="mb-12">
        <h2 className="mb-6 pb-2 text-2xl font-semibold">3. Вход в игру (паспорт)</h2>
        <p className="mb-6">
          Чтобы войти в игру и начать записывать очки, игрок должен в <span className="font-medium">одном ходе</span>{' '}
          набрать <span className="font-medium">определённое количество очков (в классическом варианте — 75)</span>.
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
        </ul>
      </section>

      {/* 5. Бочка */}
      <section className="mb-12">
        <h2 className="mb-6 pb-2 text-2xl font-semibold">5. «Бочка» (этап финального рывка)</h2>

        <p className="mb-6">
          Когда игрок набирает <span className="font-medium">определённое количество очков (обычно 900)</span>, он
          <span className="font-medium">«садится на бочку»</span>. Теперь ему нужно выбросить недостающие до 1000 очков
          за один ход.
        </p>

        <ul className="list-disc space-y-4 pl-8">
          <li>
            <span className="font-medium">Ограничение максимума очков, когда игрок «забирается на бочку»:</span> если
            игрок набрал больше лимита, позволяющего «сесть на бочку», его сумма не может превышать этот лимит.
            <div className="mt-2 ml-6 italic">
              Пример: чтобы сесть на бочку, нужно 900 очков. У игрока до хода было 880 очков, он выкидывает 50. Его
              итоговый результат составит не 930, а 900.
            </div>
          </li>

          <li>
            <span className="font-medium">Падение с бочки:</span> если игроку не удалось выбросить недостающие до
            победной тысячи очки, «падает с бочки», откатываясь на 800 очков.
          </li>

          <li>
            <span className="font-medium">Третье падение с бочки:</span> если игрок сидел на бочке 3 раза и не победил,
            при третьем падении его результат откатывается до 0.
          </li>
        </ul>

        <h3 className="mt-8 mb-4 text-xl font-semibold">Вариант «облегчённая бочка»</h3>
        <p className="mb-4">
          В этом варианте игроку, забравшемуся на бочку, даётся не один, а три хода, чтобы выбросить победные 1000
          очков. Очки, набранные в предыдущих попытках, не сгорают. Все остальные правила остаются прежними. Подробнее
          на примере:
        </p>

        <ol className="list-decimal space-y-4 pl-8">
          <li>Игрок набирает 900 очков и «садится на бочку». Начинается первая из трёх попыток.</li>
          <li>В первом ходе он выбрасывает 25 очков и передаёт ход дальше.</li>
          <li>Когда очередь снова доходит до игрока, он выбрасывает 60 очков и снова передаёт ход.</li>
          <li>
            В третьем ходе у игрока уже накоплено 85 очков (60 + 25), и теперь ему нужно не меньше 15 очков, чтобы
            достичь 1000 и победить.
          </li>
        </ol>

        <div className="mt-6 border-l-4 border-gray-200 pl-6">
          <p className="italic">
            В приложении этот вариант называется «Режим быстрой победы». Он уменьшает общую длительность партии, но
            снижает вероятность драматичных взлётов и падений.
          </p>
        </div>
      </section>

      {/* 6. Болты */}
      <section className="mb-12">
        <h2 className="mb-6 pb-2 text-2xl font-semibold">6. «Болты»</h2>
        <p className="mb-4">
          «Болт» записывается игроку, если по итогам его хода (в результате одного или нескольких бросков) у него
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
            Игроку, сидящему в яме, болты <span className="font-medium">не записываются</span>
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 pb-2 text-2xl font-semibold">7. Правило обгона</h2>
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
          <li>
            Обгон действует для всех:
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>для игроков, сидящих в яме;</li>
              <li>для игроков, сидящих на бочке.</li>
            </ul>
          </li>
        </ul>
        <p>Таким образом, обогнав соперника, можно сбросить его с бочки или вытолкнуть из ямы вниз.</p>
      </section>

      {/* 8. Ямы */}
      <section className="mb-12">
        <h2 className="mb-6 pb-2 text-2xl font-semibold">8. Ямы</h2>
        <p className="mb-4">
          Яма — это заранее определённый промежуток очков. В классическом варианте игры есть две ямы: 200–300&nbsp;очков
          и 700–800&nbsp;очков.
        </p>
        <p className="mb-4">
          Если итоговый счёт игрока становится больше или равен начальной точке ямы и меньше или равен конечной точке
          ямы, то игрок за один ход должен выбросить очков не меньше, чем разница между его текущим счётом и краем ямы.
        </p>
        <div className="mt-4 ml-4 border-l-4 border-gray-200 pl-4 italic">
          <p>
            Пример: игрок&nbsp;А после своего хода имеет счёт&nbsp;720. Он попал в яму. Теперь ему нужно выбросить не
            менее&nbsp;81&nbsp;очка за один ход, чтобы выбраться из ямы. Если он выбросил меньше, очки не начисляются и
            он остаётся в яме.
          </p>
        </div>
        <ul className="mt-4 list-disc space-y-2 pl-8">
          <li>Болты в ямах не записываются.</li>
          <li>
            В яму можно попасть не только по результату своего хода, но и в результате:
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>штрафа после обгона;</li>
              <li>третьего записанного болта.</li>
            </ul>
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 pb-2 text-2xl font-semibold">9. «Самосвал»</h2>
        <p className="mb-6">Если игрок набирает ровно&nbsp;555&nbsp;очков, его итоговый счёт обнуляется.</p>
        <ul className="list-disc space-y-3 pl-8">
          <li>Попасть на самосвал можно и в результате штрафов после обгона или болтов.</li>
          <li>После самосвала входить в игру заново не нужно, хоть это и слабое утешение для игрока.</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-6 pb-2 text-2xl font-semibold">10. Завершение игры</h2>
        <p>Игра заканчивается, когда один из игроков набирает&nbsp;1000&nbsp;и более очков.</p>
      </section>
    </div>
  );
};
