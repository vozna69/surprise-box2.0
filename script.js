document.getElementById("orderForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Останавливаем стандартное поведение формы

  // Считываем значения из формы
  const name = document.querySelector('#name').value.trim();
  const email = document.querySelector('#email').value.trim();
  const message = document.querySelector('#message').value.trim();

  // Проверка на пустые поля
  if (!name || !email || !message) {
    showMessage("Будь ласка, заповніть всі поля!", "red");
    return;
  }

  // Telegram-данные
  const chatId = "711662255"; // Ваш Chat ID
  const token = "7644373911:AAF4Ey4kw_LMoz7NJlLaQENw9ZJ15luaUo8"; // Ваш токен бота

  // Формируем сообщение
  const text = `Замовлення:\nІм'я: ${name}\nЕлектронна пошта: ${email}\nКоментар: ${message}`;

  // Отправка сообщения через Telegram API
  fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: text
    })
  })
    .then(response => response.json())
    .then(data => {
      if (data.ok) {
        showMessage("Замовлення успішно відправлено!", "green");
        document.getElementById("orderForm").reset(); // Очистить форму
      } else {
        showMessage(`Не вдалося надіслати замовлення: ${data.description}`, "red");
      }
    })
    .catch(error => {
      showMessage("Сталася помилка. Спробуйте пізніше.", "red");
      console.error("Помилка:", error);
    });
});

// Функция для отображения статуса
function showMessage(message, color) {
  const statusMessage = document.getElementById("statusMessage");
  statusMessage.textContent = message;
  statusMessage.style.color = color;
}
