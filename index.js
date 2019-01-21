function updateDb() {
  localStorage.setItem('libraryDb', JSON.stringify(db))
}

function loadTable() {
  if (db.page === 'orders')
    loadOrders()
  else if (db.page === 'customers')
    loadCustomers()
  else if (db.page === 'books')
    loadBooksTable()
  else
    loadNice()
}

function loadBooksTable() {
  var data = []
  for (var i = 0; i < db.books.length; i++) {
    var book = db.books[i]
    data.push([book.id, book.title, book.author, book.desc, '<img height=128 src="' + book.coverUrl + '">'])
  }
  $('.table-container').hide()
  $('#books').parent().parent().show()
  dts.books.clear()
  dts.books.rows.add(data)
  dts.books.draw()
}

function loadCustomers() {
  var data = []
  for (var i = 0; i < db.users.length; i++) {
    var user = db.users[i]
    if (!user.isEmployee)
      data.push([user.id, user.login])
  }
  $('.table-container').hide()
  $('#customers').parent().parent().show()
  dts.customers.clear()
  dts.customers.rows.add(data)
  dts.customers.draw()
}

function loadOrders() {
  var data = []
  for (var i = 0; i < db.orders.length; i++) {
    var order = db.orders[i]
    data.push([order.id, order.userId, order.bookId, order.start, order.end])
  }
  $('.table-container').hide()
  $('#orders').parent().parent().show()
  dts.orders.clear()
  dts.orders.rows.add(data)
  dts.orders.draw()
}

function loadNice() {
  var data = []
  for (var i = 0; i < db.orders.length; i++) {
    var order = db.orders[i]
    if (order.userId != db.user) continue
    var book = null
    $(db.books).each(function (i, bk) {
      if (bk.id != order.bookId) return
      book = bk
    })
    data.push(['<img height=128 src="' + book.coverUrl + '">', book.author + ' - ' + book.title, order.start, order.end])
  }
  $('.table-container').hide()
  $('#nice').parent().parent().show()
  dts.nice.clear()
  dts.nice.rows.add(data)
  dts.nice.draw()
}

function deleteEntity() {
  var q = ({
    customers: 'Какого читателя удалить? (ID)',
    books: 'Какую книгу удалить? (ID)',
    orders: 'Какой заказ удалить? (ID)',
  })[db.page]
  var table = ({
    customers: db.users,
    books: db.books,
    orders: db.orders
  })[db.page]
  var id = parseInt(prompt(q))
  if (isNaN(id) || id >= table.length || id < 0) return
  table.splice(id, 1)
  updateDb()
  loadTable()
}

function addEntity() {
  var scheme = ({
    customers: [['Введите логин', 'login']],
    orders: [['Пользователь (ID)', 'userId'], ['Книга (ID)', 'bookId']],
    books: [['Название', 'title'], ['Автор', 'author'], ['Описание', 'desc'], ['Обложка', 'coverUrl']],
  }[db.page])
  var endDate = new Date()
  endDate.setMonth(endDate.getMonth() + 1)
  var ent = ({
    customers: { isEmployee: false },
    orders: { start: new Date().toLocaleString('ru'), end: endDate.toLocaleString('ru') },
    books: {},
  })[db.page]
  var table = ({
    customers: db.users,
    books: db.books,
    orders: db.orders
  })[db.page]
  ent.id = table.length
  for (var i = 0; i < scheme.length; i++) {
    var qf = scheme[i]
    var q = qf[0]
    var field = qf[1]
    var answer = prompt(q)
    if (answer === null) return
    ent[field] = ~['bookId', 'userId'].indexOf(field) ? Number(answer) : answer
  }
  table.push(ent)
  updateDb()
  loadTable()
}

function loadUser() {
  var user = db.users[db.user]
  $('.greet-name').text(user.login)
  $('.greet-role').text(user.isEmployee ? 'сотрудник' : 'читатель')
  if (user.isEmployee) {
    $('.navbar, .buttons').show()
  } else {
    $('.navbar, .buttons').hide()
  }
  updateDb()
}

function loadPage() {
  $('.body').removeClass('loaded')
  $('.nav[data-nav=' + db.page + ']').addClass('selected')
  updateDb()
  loadUser()
  loadTable()
  $('.body').addClass('loaded')
}

$('.nav').click(function() {
  $('.nav').removeClass('selected')
  db.page = $(this).addClass('selected').data('nav')
  updateDb()
  loadTable()
})

$('.greet-name').click(function() {
  var login = prompt('Представьтесь, пожалуйста')
  if (login === null) return
  if (login === 'clr') {
    localStorage.clear('libraryDb')
    location.reload()
    return
  }
  var found = false
  db.user = db.users.length
  $(db.users).each(function (i, user) {
    if (user.login !== login) return
    db.user = i
    found = true
  })
  if (!found) db.users.push({
    id: db.users.length,
    login: login,
    isEmployee: false,
  })
  db.page = db.users[db.user].isEmployee ? 'books' : 'nice'
  loadPage()
})

$('#add').click(addEntity)
$('#remove').click(deleteEntity)

if (!localStorage) alert('Ваш браузер устарел, приложение будет работать некорректно')

var db = JSON.parse(localStorage.getItem('libraryDb') || defaultDb)
loadPage()
