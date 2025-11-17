// Rules.tsx (часть 1)
import React from 'react';
import { Link } from 'react-router-dom';

const Rules: React.FC = () => {
  return (
    <div className="mx-auto px-4 py-8 font-sans leading-relaxed">
      <h1 className="mb-12 text-center text-3xl font-bold">Правила игры «Тысяча» на костях</h1>

      {/* 1. Общие правила и цель игры */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">1. Общие правила и цель игры</h2>
        <p className="mb-4">Цель игры — первым набрать 1000 очков.</p>
        <p className="mb-4">
          <span className="font-medium">Инвентарь:</span> 5 шестигранных игральных костей.
        </p>
        <p className="mb-4">
          <span className="font-medium">Количество игроков:</span> от 2 и более.
        </p>
        <p className="mb-4">
          <span className="font-medium">Порядок хода:</span> игроки ходят по очереди, определяя очерёдность бросков
          любым удобным способом.
        </p>
      </section>

      {/* 2. Ход игрока */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">2. Ход игрока: последовательность действий</h2>
        <ol className="list-decimal space-y-6 pl-8">
          <li>
            <span className="font-medium">Первый бросок:</span> в начале своего хода игрок бросает{' '}
            <span className="font-medium">все 5 костей</span> одновременно.
          </li>
          <li>
            <span className="font-medium">Анализ результата:</span> после броска игрок проверяет, выпали ли
            результативные комбинации.
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <span className="font-medium">Результативные кости:</span> единица (1) — 10 очков; пятёрка (5) — 5
                очков и специальные комбинации. <Link to="/combos">Подробнее о комбинациях тут.</Link>
              </li>
              <li>
                <span className="font-medium">Пять единиц на любой стадии игры приносят игроку 1000 очков и дают мгновенную победу.</span>
              </li>
            </ul>
          </li>
          <li>
            <span className="font-medium">Решение игрока:</span>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <span className="font-medium">Остановить ход:</span> зафиксировать набранные очки, записать их в общий
                счёт и передать ход следующему игроку.
              </li>
              <li>
                <span className="font-medium">Продолжить броски:</span> бросить только невыпавшие (нерезультативные)
                кости, пытаясь набрать дополнительные очки.
              </li>
            </ul>
          </li>
          <li>
            <span className="font-medium">Свободный бросок:</span> если в результате одного или нескольких бросков{' '}
            <span className="font-medium">все 5 костей оказались результативными</span>, игрок{' '}
            <span className="font-medium">обязан</span> бросить все 5 костей снова.
          </li>
          <li>
            <span className="font-medium">Нулевой результат:</span> если в очередном броске не выпадает ни одной
            результативной комбинации, все набранные в этом ходу очки «сгорают» (не записываются), а ход переходит к
            следующему игроку. При этом игроку записывается <span className="font-medium">«болт»</span> (см. раздел
            «Болты»).
          </li>
        </ol>
      </section>

      {/* 4. Вход в игру */}
      <section className="mb-12">
        <h2 className="mb-6 pb-2 text-2xl font-semibold">4. Вход в игру</h2>
        <p className="mb-6">
          Чтобы начать записывать очки, игрок должен в <span className="font-medium">одном ходе</span> набрать{' '}
          <span className="font-medium">минимум 75 очков</span>. До этого все набранные очки не учитываются.
        </p>
        <p className="mb-4 font-medium">Важные уточнения:</p>
        <ul className="list-disc space-y-3 pl-8">
          <li>
            Вход в игру возможен <span className="font-medium">только один раз за партию</span>.
          </li>
          <li>
            После входа в игру игрок <span className="font-medium">не может «выйти» из неё</span> (т. е. даже если его
            счёт упадёт до 0, повторно набирать 75 очков для входа не требуется).
          </li>
          <li>
            Игрокам, ещё не вошедшим в игру, <span className="font-medium">«болты» не записываются</span>.
          </li>
        </ul>
      </section>

      {/* 5. Бочка */}
      <section className="mb-12">
        <h2 className="mb-6 pb-2 text-2xl font-semibold">5. «Бочка» (этап финального рывка)</h2>
        <p className="mb-6">
          Когда игрок набирает <span className="font-medium">1 000 очков</span>. При этом:
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              Игрок <span className="font-medium">не может остановиться</span> — он обязан продолжать броски.
            </li>
            <li>
              Если в очередном броске нет результативных комбинаций, игрок{' '}
              <span className="font-medium">теряет все очки, набранные за ход</span>, и сходит с «бочки».
            </li>
            <li>
              Чтобы сойти с «бочки», нужно <span className="font-medium">набрать хотя бы 1 очко</span> (например,
              выбросить единицу или пятёрку).
            </li>
          </ul>
        </p>
      </section>

      {/* 6. Болты */}
      <section className="mb-12">
        <h2 className="mb-6 pb-2 text-2xl font-semibold">6. «Болты»</h2>
        <p className="mb-4">
          «Болт» записывается игроку, если в ходе у него{' '}
          <span className="font-medium">нет ни одной результативной комбинации</span> (все броски дали 0 очков).
        </p>
        <p className="mb-6">
          <span className="font-medium">Последствия:</span>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              При <span className="font-medium">первом болте</span> игрок теряет право на запись очков в текущем ходу
              (очки «сгорают»).
            </li>
            <li>
              При <span className="font-medium">втором болте подряд</span> дополнительно списывается{' '}
              <span className="font-medium">50 очков</span> из общего счёта.
            </li>
            <li>
              При <span className="font-medium">третьем болте подряд</span> списывается{' '}
              <span className="font-medium">100 очков</span>.
            </li>
          </ul>
        </p>
        <p>
          <span className="font-medium">Важно:</span> болты не накапливаются между ходами — серия прерывается, если в
          следующем ходу игрок набрал хотя бы 1 очко.
        </p>
      </section>

      {/* 7. Обгон */}
      <section className="mb-12">
        <h2 className="0 mb-6 pb-2 text-2xl font-semibold">7. Правило обгона</h2>
        <p className="mb-6">
          Если игрок в своём ходу <span className="font-medium">обгоняет соперника по очкам</span>, то:
        </p>
        <ul className="list-disc space-y-3 pl-8">
          <li>
            Обгоняемый игрок <span className="font-medium">теряет 50 очков</span> из своего счёта.
          </li>
          <li>
            Правило действует <span className="font-medium">только один раз за партию</span> для каждой пары игроков.
          </li>
          <li>
            Обгон учитывается <span className="font-medium">только при завершении хода</span> (после фиксации очков).
          </li>
        </ul>
      </section>

      {/* 8. Ямы */}
      <section className="mb-12">
        <h2 className="mb-6 pb-2 text-2xl font-semibold">8. «Ямы»</h2>
        <p className="mb-4">Некоторые пороги очков считаются «ямами»:</p>
        <ul className="list-disc space-y-2 pl-8">
          <li>
            <span className="font-medium">250 очков</span> — при попадании в этот порог игрок теряет 50 очков.
          </li>
          <li>
            <span className="font-medium">550 очков</span> — при попадании в этот порог игрок теряет 100 очков.
          </li>
          <li>
            <span className="font-medium">750 очков</span> — при попадании в этот порог игрок теряет 150 очков.
          </li>
        </ul>
        <p className="mt-4">
          <span className="font-medium">Важно:</span> штраф применяется{' '}
          <span className="font-medium">только при точном попадании</span> в порог (например, если игрок набрал 251
          очко, штраф не действует).
        </p>
      </section>

      {/* 9. Самосвал */}
      <section className="mb-12">
        <h2 className="mb-6 pb-2 text-2xl font-semibold">9. «Самосвал»</h2>
        <p className="mb-6">
          Если игрок набирает <span className="font-medium">более 1 000 очков</span> (например, 1 050), то:
        </p>
        <ul className="list-disc space-y-3 pl-8">
          <li>
            Его счёт <span className="font-medium">обнуляется</span> (становится 0 очков).
          </li>
          <li>
            Игрок <span className="font-medium">продолжает игру с нуля</span>, но уже вошёл в игру (повторно набирать 75
            очков не нужно).
          </li>
          <li>
            Все записанные ранее болты <span className="font-medium">сохраняются</span>.
          </li>
        </ul>
      </section>

      {/* 10. Конец игры */}
      <section>
        <h2 className="mb-6 pb-2 text-2xl font-semibold">10. Завершение игры</h2>
        <p>
          Игра заканчивается, когда <span className="font-medium">один из игроков набирает ровно 1 000 очков</span> (не
          более!). При этом:
        </p>
        <ul className="mt-4 list-disc space-y-3 pl-8">
          <li>
            Игрок должен <span className="font-medium">точно попасть в 1 000</span> (например, имея 980 очков, набрать
            ровно 20 очков за ход).
          </li>
          <li>Если игрок набирает больше 1 000 очков, срабатывает правило «Самосвала» (см. раздел 9).</li>
          <li>
            Победа фиксируется <span className="font-medium">только после завершения хода</span> и записи очков.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Rules;
