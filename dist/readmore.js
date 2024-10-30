/*!
 * Readmore.js v1.2.0 - JavaScript plugin
 * Author: @RoS (CORGRAS)
 * Project home: https://corgras.github.io/readmore/
 * Github: https://github.com/corgras/Readmore.js
 * Licensed under the MIT license
 */
function initReadMore(selector, options, maxWidth) {
	var elements = document.querySelectorAll(selector);

	// Функция для обработки изменения медиа-запроса
	// Функція для обробки зміни медіа-запиту
	// Function to handle media query changes
	function handleMediaChange(mediaQueryList) {
		if (!maxWidth || mediaQueryList.matches) {
			elements.forEach(function (element) {
				var isExpanded = false;
				var height = options.collapsedHeight || 200;
				var speed = options.speed || 100;
				var heightMargin = options.heightMargin || 16;
				var moreLink = options.moreLink || '<a href="#">Read More</a>';
				var lessLink = options.lessLink || '<a href="#">Close</a>';

				// Получаем полный контент элемента
				// Отримуємо повний вміст елемента
				// Get the full content of the element
				var fullContent = element.innerHTML;

				// Вычисляем фактическую высоту контента
				// Обчислюємо фактичну висоту вмісту
				// Calculate the actual height of the content
				var contentHeight = element.scrollHeight;

				// Создаем кнопку "Читать далее"
				// Створюємо кнопку "Читати далі"
				// Create the "Read More" button
				var readMoreButton = document.createElement('div');
				readMoreButton.innerHTML = moreLink;
				readMoreButton.classList.add('readmore-button');

				// Устанавливаем стили для элемента
				// Встановлюємо стилі для елемента
				// Set styles for the element
				element.style.overflow = 'hidden';
				element.style.height = height + 'px';
				element.style.transition = 'height ' + speed + 'ms ease-in-out';

				// Вставляем кнопку "Читать далее" после элемента
				// Вставляємо кнопку "Читати далі" після елемента
				// Insert the "Read More" button after the element
				element.parentNode.insertBefore(readMoreButton, element.nextSibling);

				// Проверяем, если контент короче или равен height, скрываем кнопку "Читать далее"
				// Перевіряємо, чи вміст коротший, ніж максимальна висота
				// Check if the content is shorter than the maximum height
				if (contentHeight <= height) {
				readMoreButton.style.display = 'none'; // Приховуємо кнопку "Читати далі"
				}

				// Обработчик клика по кнопке "Читать далее"
				// Обробник кліка по кнопці "Читати далі"
				// Click handler for the "Read More" button
				readMoreButton.addEventListener('click', function (event) {
					event.preventDefault();
					isExpanded = !isExpanded;

					if (isExpanded) {
						element.style.height = contentHeight + heightMargin + 'px';
						readMoreButton.innerHTML = lessLink;
					} else {
						element.style.height = height + 'px';
						readMoreButton.innerHTML = moreLink;
					}
				});

				// Полный контент доступен для поисковых роботов
				// Повний вміст доступний для пошукових роботів
				// Full content is accessible to search engines
				element.innerHTML = fullContent;
			});
		} else {
			elements.forEach(function (element) {
				var readMoreButton = element.nextElementSibling;
				if (readMoreButton && readMoreButton.classList.contains('readmore-button')) {
					element.parentNode.removeChild(readMoreButton);
				}
			});
		}
	}

	var mediaQueryList;
	if (maxWidth) {
		mediaQueryList = window.matchMedia('(max-width: ' + maxWidth + 'px)');
		mediaQueryList.addListener(handleMediaChange);
		handleMediaChange(mediaQueryList);
	} else {
		handleMediaChange({ matches: true });
	}
}
