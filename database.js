var bookSchema = {
  id: Number,
  title: String,
  author: String,
  desc: String,
  coverUrl: String,
}

var userSchema = {
  id: Number,
  login: String,
  isEmployee: Boolean,
}

var orderSchema = {
  id: Number,
  userId: Number,
  bookId: Number,
  start: String,
  end: String,
}

var defaultDb = JSON.stringify({
    user: 0,
    books: [
      {
        id: 0,
        title: 'Book from videogame',
        author: 'nobody',
        desc: 'test',
        coverUrl: 'https://vignette.wikia.nocookie.net/2007scape/images/7/7a/Mage%27s_book_detail.png/revision/latest?cb=20180310083825',
      },
      {
        id: 1,
        title: 'Происхождение',
        author: 'Дэн Браун',
        desc: `Объем: 530 стр. 18 иллюстраций
        Жанр: Детективная фантастика, Зарубежные детективы, Триллеры
        Теги: Древние артефакты, Загадочные явления, Знаки и символы, Искусственный интеллект, Научные открытия, Тайны прошлого
        Перевод: на латышский`,
        coverUrl: 'https://cv9.litres.ru/pub/c/elektronnaya-kniga/cover_415/27624091-den-braun-proishozhdenie-27624091.jpg',
      },
      {
        id: 2,
        title: 'Тайные виды на гору Фудзи',
        author: 'Виктор Пелевин',
        desc: `В этом романе Виктор Пелевин поднимает две любимых темы – о Древнем Востоке и нынешней России. Писатель мастерски изображает различные явления нашей действительности, а также пытается постичь извечную проблему всего человечества – постоянную погоню за счастьем.
        В книге, богатой афоризмами и аллюзиями, вы найдете неподражаемую сатиру на олигархов и сколковских стартаперов. Насладитесь тонким юмором и забавными словесными формулировками. Восхититесь неповторимостью сюжета и отточенностью композиций.
        Книга написана в традициях лучших произведений неподражаемого мастера. А значит, она расширяет границы сознания и надолго врезается в память.`,
        coverUrl: 'https://cv1.litres.ru/pub/c/elektronnaya-kniga/cover_415/37672212-viktor-pelevin-taynye-vidy-na-goru-fudzi.jpg',
      },
      {
        id: 3,
        title: 'Звезды и Лисы',
        author: 'Татьяна Устинова',
        desc: `Известный рэпер Александр или Сандро Галицкий, больше известный как ПараDon’tOzz, просыпается после бурной вечеринки из-за того, что за ним приходят бравые полицейские. Но слуги закона зашли не затем, чтобы поругать буйную молодежь, доставлявшую беспокойство соседям. Они надевают на певца наручники, везут в отделение, а затем предъявляют обвинение в убийстве! Вскоре в полицию доставляют и брата Александра – Николая или Ника, сотрудника одного из московских научных институтов.`,
        coverUrl: 'https://cv8.litres.ru/pub/c/elektronnaya-kniga/cover_415/36301088-tatyana-ustinova-zvezdy-i-lisy.jpg',
      },
    ],
    orders: [],
    users: [
      {
        id: 0,
        login: 'emil',
        isEmployee: true,
      },
      {
        id: 1,
        login: 'Виктор Пелевин',
        isEmployee: true,
      },
      {
        id: 2,
        login: 'Михаил',
        isEmployee: false,
      },
      {
        id: 3,
        login: 'Евгения',
        isEmployee: false,
      }
    ],
    page: 'books'
})

var lang = {
  "processing": "Подождите...",
  "search": "Поиск:",
  "lengthMenu": "Показать _MENU_ записей",
  "info": "Записи с _START_ до _END_ из _TOTAL_ записей",
  "infoEmpty": "Записи с 0 до 0 из 0 записей",
  "infoFiltered": "(отфильтровано из _MAX_ записей)",
  "infoPostFix": "",
  "loadingRecords": "Загрузка записей...",
  "zeroRecords": "Записи отсутствуют.",
  "emptyTable": "В таблице отсутствуют данные",
  "paginate": {
    "first": "Первая",
    "previous": "Предыдущая",
    "next": "Следующая",
    "last": "Последняя"
  },
  "aria": {
    "sortAscending": ": активировать для сортировки столбца по возрастанию",
    "sortDescending": ": активировать для сортировки столбца по убыванию"
  }
}

var dts = {
  books: $('#books').DataTable({ data: [], columns: [
    { title: 'Id' },
    { title: 'Title' },
    { title: 'Author' },
    { title: 'Description' },
    { title: 'Cover URL' },
  ], language: lang }),
  orders: $('#orders').DataTable({ data: [], columns: [
    { title: 'Id' },
    { title: 'User' },
    { title: 'Book' },
    { title: 'Start' },
    { title: 'End' },
  ], language: lang }),
  customers: $('#customers').DataTable({ data: [], columns: [
    { title: 'Id' },
    { title: 'Login' },
  ], language: lang }),
  nice: $('#nice').DataTable({ data: [], columns: [
    { title: '' },
    { title: 'Книга' },
    { title: 'Была взята' },
    { title: 'Нужно вернуть' },
  ], language: lang }),
}
