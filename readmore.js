/*!
 * Readmore.js v2.0.0 - JavaScript plugin
 * Author: @RoS (CORGRAS)
 * Project home: https://corgras.github.io/readmore/
 * Github: https://github.com/corgras/Readmore.js
 * Licensed under the MIT license
 */
function initReadMore(selector, userOptions = {}) {
	const defaults = {
		// Default collapsed height
		// Высота по умолчанию при сворачивании
		// Висота за замовчуванням при згортанні
		collapsedHeight: 200,

		// Animation speed in ms
		// Скорость анимации в миллисекундах
		// Швидкість анімації в мілісекундах
		speed: 100,

		// Default 'Read More' link
		// Ссылка "Читать больше" по умолчанию
		// Посилання "Читати більше" за замовчуванням
		moreLink: '<span>Read More</span>',

		// Default 'Close' link
		// Ссылка "Закрыть" по умолчанию
		// Посилання "Закрити" за замовчуванням
		lessLink: '<span>Close</span>',

		// Breakpoints for responsive design
		// Точки останова для адаптивного дизайна
		// Точки зупинки для адаптивного дизайну
		breakpoints: {},

		// Lazy load option
		//Опция ленивой загрузки
		// Опція лінійного завантаження
		lazyLoad: false,

		// Option to hide collapse button
		// Опция скрыть кнопку сворачивания
		// Опція приховати кнопку згортання
		hideButtonCollapse: false,

		// Animation mode (CSS or JS)
		// Режим анимации (CSS или JS)
		// Режим анімації (CSS або JS)
		animationMode: 'js',

		// Callback before toggle (expand/collapse)
		beforeToggle: null,

		// Callback after toggle (expand/collapse)
		afterToggle: null,

		// Block processed callback
		blockProcessed: null
	};

	const options = { ...defaults, ...userOptions };
	const elements = document.querySelectorAll(selector);

	// Function to get options based on current screen width
	// Функція для отримання налаштувань для поточної ширини
	// Функция для получения настроек для текущей ширины
	function getOptionsForWidth(width) {
		const breakpoints = options.breakpoints;
		const breakpointKeys = Object.keys(breakpoints).map(Number).sort((a, b) => b - a);

		for (let key of breakpointKeys) {
			if (width <= key) {
				return { ...options, ...breakpoints[key] };
			}
		}
		return options;
	}

	// Resize handler with slight delay for optimization
	// Обработчик изменения размера с небольшой задержкой для оптимизации
	// Обробник зміни розміру з невеликою затримкою для оптимізації
	let resizeTimeout;
	function handleResize() {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(() => {
			const windowWidth = window.innerWidth;
			const currentOptions = getOptionsForWidth(windowWidth);

			elements.forEach(element => {
				initializeReadMore(element, currentOptions);
			});
		}, 100);
	}

	// Main logic for initializing Read More functionality
	// Основная логика инициализации функции Read More
	// Головна логіка ініціалізації функції Read More
	function initializeReadMore(element, currentOptions) {
		let isExpanded = false;

		// Full content inside the element
		// Полный контент внутри элемента
		// Повний контент всередині елемента
		const fullContent = element.innerHTML;

		// Height of the content
		// Высота контента
		// Висота контенту
		const contentHeight = element.scrollHeight;

		// Collapsed height from options
		// Высота сворачивания из настроек
		// Висота згортання з налаштувань
		const collapsedHeight = currentOptions.collapsedHeight;

		// Animation speed from options
		// Скорость анимации из настроек
		// Швидкість анімації з налаштувань
		const speed = currentOptions.speed;

		// 'Read More' link from options
		// Ссылка "Читать больше" из настроек
		// Посилання "Читати більше" з налаштувань
		const moreLink = currentOptions.moreLink;

		// 'Close' link from options
		// Ссылка "Закрыть" из настроек
		// Посилання "Закрити" з налаштувань
		const lessLink = currentOptions.lessLink;

		// Hide collapse button option from options
		// Опция скрыть кнопку сворачивания из настроек
		// Опція приховати кнопку згортання з налаштувань
		const hideButtonCollapse = currentOptions.hideButtonCollapse;

		// Animation mode from options
		// Режим анимации из настроек
		// Режим анімації з налаштувань
		const animationMode = currentOptions.animationMode;

		const adjustedHeight = contentHeight;

		// Create "Read More" button
		// Создание кнопки "Читать больше"
		// Створення кнопки "Читати більше"
		const buttonWrapper = document.createElement('div');
		buttonWrapper.classList.add('cs_readmore-btn-wrapper');

		const toggleBtn = document.createElement('button');
		toggleBtn.innerHTML = sanitizeHTML(moreLink);
		toggleBtn.classList.add('cs_readmore-btn');
		toggleBtn.setAttribute('data-readmore-btn-toggle', 'collapsed');
		toggleBtn.type = 'button';
		buttonWrapper.appendChild(toggleBtn);

		// Initial styles and height adjustments
		// Начальные стили и корректировка высоты
		// Початкові стилі та коригування висоти
		element.style.overflow = 'hidden';
		element.style.height = collapsedHeight + 'px';
		element.setAttribute('data-readmore-block-toggle', 'collapsed');

		if (animationMode === 'css') {
			element.classList.add('cs_readmore-animation');
		} else {
			element.style.transition = `height ${speed}ms ease-in-out`;
		}

		if (!element.nextElementSibling || !element.nextElementSibling.classList.contains('cs_readmore-btn-wrapper')) {
			element.parentNode.insertBefore(buttonWrapper, element.nextSibling);
		}

		// Check if content height is less than or equal to collapsedHeight
		// Проверяем, если высота контента меньше или равна высоте сворачивания
		// Перевіряємо, чи висота контенту менша або дорівнює висоті згортання
		if (adjustedHeight <= collapsedHeight) {
			// Hide the "Read More" button and set height to auto
			// Скрываем кнопку "Читать далее" и устанавливаем высоту в auto
			// Приховуємо кнопку "Читати більше" та встановлюємо висоту в auto
			buttonWrapper.style.display = 'none';

			// Set height to auto to show the full content
			// Устанавливаем высоту в auto, чтобы показать весь контент
			// Встановлюємо висоту в auto, щоб показати весь контент
			element.style.height = 'auto';
		}

		// Button click handler
		// Обработчик клика по кнопке
		// Обробник кліка по кнопці
		toggleBtn.addEventListener('click', (e) => {
			e.preventDefault();
			isExpanded = !isExpanded;

			// Trigger beforeToggle event
			// Триггер события beforeToggle
			// Запуск події beforeToggle
			if (currentOptions.beforeToggle) {
				currentOptions.beforeToggle(toggleBtn, element, isExpanded);
			}
			element.dispatchEvent(new CustomEvent('readmore:beforeToggle'));

			// Perform the toggle action
			// Выполнение действия переключения
			// Виконання дії перемикання
			if (isExpanded) {
				element.style.height = adjustedHeight + 'px';
				toggleBtn.innerHTML = sanitizeHTML(lessLink);
				element.setAttribute('data-readmore-block-toggle', 'expanded');
				toggleBtn.setAttribute('data-readmore-btn-toggle', 'expanded');

				if (hideButtonCollapse) {
					buttonWrapper.style.display = 'none';
				}
			} else {
				element.style.height = collapsedHeight + 'px';
				toggleBtn.innerHTML = sanitizeHTML(moreLink);
				element.setAttribute('data-readmore-block-toggle', 'collapsed');
				toggleBtn.setAttribute('data-readmore-btn-toggle', 'collapsed');
			}

			// Trigger afterToggle event
			// Триггер события afterToggle
			// Запуск події afterToggle
			if (currentOptions.afterToggle) {
				currentOptions.afterToggle(toggleBtn, element, isExpanded);
			}
			element.dispatchEvent(new CustomEvent('readmore:afterToggle'));
		});

		// Block processed callback
		// Обработка блока завершена
		// Обробка блоку завершена
		if (currentOptions.blockProcessed) {
			currentOptions.blockProcessed(element, adjustedHeight > collapsedHeight);
		}
	}

	// Lazy load initialization
	// Инициализация для ленивой загрузки
	// Ініціалізація для лінійного завантаження
	if (options.lazyLoad) {
		const observer = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				if (entry.isIntersecting && !entry.target.hasAttribute('data-readmore-processed')) {
					if (entry.target.matches('img, video, audio')) {
						// For multimedia: loading the corresponding data
						// Для мультимедиа: загрузка соответствующих данных
						// Для мультимедіа: завантаження відповідних даних
						const lazySource = entry.target.getAttribute('data-src');
						if (lazySource) {
							entry.target.src = lazySource;
						}
						if (entry.target.tagName === 'VIDEO' || entry.target.tagName === 'AUDIO') {
							entry.target.load();
						}
					} else {
						// For content (eg text)
						// Для контента (например, текста)
						// Для контенту (наприклад, тексту)
						initializeReadMore(entry.target, getOptionsForWidth(window.innerWidth));
					}
					entry.target.setAttribute('data-readmore-processed', 'true');
				}
			});
		});

		elements.forEach(element => observer.observe(element));
	} else {
		elements.forEach(element => {
			if (element.matches('img, video, audio')) {
				// Load media immediately
				// Сразу загружаем мультимедиа
				// Відразу завантажуємо мультимедіа
				const lazySource = element.getAttribute('data-src');
				if (lazySource) {
					element.src = lazySource;
				}
				if (element.tagName === 'VIDEO' || element.tagName === 'AUDIO') {
					element.load();
				}
			} else {
				// Initialize the content immediately
				// Сразу инициализируем контент
				// Відразу ініціалізуємо контент
				initializeReadMore(element, options);
			}
		});
	}

	// Resize event listener
	// Обработчик изменения размера
	// Обробник зміни розміру
	window.addEventListener('resize', handleResize);
	handleResize();

	// HTML sanitization function to remove unsafe attributes
	// Функция очистки HTML от небезопасных атрибутов
	// Функція очищення HTML від небезпечних атрибутів
	function sanitizeHTML(inputHTML) {
		const tempDiv = document.createElement('div');
		tempDiv.innerHTML = inputHTML;
		let sanitizedHTML = tempDiv.innerHTML;
		sanitizedHTML = sanitizedHTML.replace(/on\w+="[^"]*"/g, '').replace(/javascript:/g, '');
		return sanitizedHTML;
	}
}