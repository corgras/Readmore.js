/*!
 * Readmore.js v2.2.0 - JavaScript plugin
 * Author: @RoS (CORGRAS)
 * Project home: https://corgras.github.io/readmore/
 * Github: https://github.com/corgras/readmore.js
 * Licensed under the MIT license
 */

(function (global, factory) {
	// UMD wrapper to support different environments (AMD, CommonJS, browser globals)
	// UMD-обёртка для поддержки разных сред (AMD, CommonJS, глобальные переменные браузера)
	// UMD-обгортка для підтримки різних середовищ (AMD, CommonJS, глобальні змінні браузера)
	if (typeof define === 'function' && define.amd) {
		// AMD
		define([], factory);
	} else if (typeof exports !== 'undefined') {
		// Node.js / CommonJS
		module.exports = factory();
	} else {
		// Browser globals
		global.initReadMore = factory();
	}
})(typeof self !== 'undefined' ? self : this, function () {
	'use strict';

	// Main function to initialize the "Read More" plugin
	// Основная функция для инициализации плагина "Читать дальше"
	// Основна функція для ініціалізації плагіна "Читати далі"
	function initReadMore(selector, userOptions = {}) {
		// Default configuration options for the "Read More" functionality
		// Конфигурация по умолчанию для функционала "Читать дальше"
		// Конфігурація за замовчуванням для функціоналу "Читати далі"
		const defaults = {
			collapsedHeight: 250,
			speed: 300,
			moreLink: '<span>Read More</span>',
			lessLink: '<span>Close</span>',
			breakpoints: {},
			hideButtonCollapse: false,
			disableCollapse: false,
			animationMode: 'js', // 'js' - 'css'
			animationType: 'ease-in-out', // For JS / Для JS: 'linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'
			scrollToTopOnCollapse: true,
			beforeToggle: null,
			afterToggle: null,
			blockProcessed: null
		};

		// Merge default and user options with error handling
		// Объединение опций по умолчанию и пользовательских с обработкой ошибок
		// Об’єднання опцій за замовчуванням та користувацьких з обробкою помилок
		const options = Object.assign({}, defaults, userOptions);

		// Select all elements matching the provided selector
		// Выбор всех элементов, соответствующих указанному селектору
		// Вибір усіх елементів, що відповідають заданому селектору
		const elements = document.querySelectorAll(selector);
		if (!elements.length) {
			console.error('No elements found for selector:', selector);
			return;
		}

		// Optimized resize handler with debounce to prevent excessive updates
		// Оптимизированный обработчик изменения размера с debounce для предотвращения лишних обновлений
		// Оптимізований обробник зміни розміру з debounce для запобігання надмірним оновленням
		let resizeTimeout;
		const handleResize = () => {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(() => {
				const currentOptions = getOptionsForWidth(window.innerWidth);
				elements.forEach(element => updateElement(element, currentOptions));
			}, 100);
		};

		// Get options based on current window width (handles responsive breakpoints)
		// Получение опций на основе текущей ширины окна (обработка адаптивных точек останова)
		// Отримання опцій на основі поточної ширини вікна (обробка адаптивних точок зупинки)
		const getOptionsForWidth = (width) => {
			const breakpoints = options.breakpoints;
			const breakpointKeys = Object.keys(breakpoints)
				.map(Number)
				.filter(key => !isNaN(key))
				.sort((a, b) => a - b);

			// If no breakpoints, return general options
			// Если нет breakpoints, возвращаем общие опции
			// Якщо немає breakpoints, повертаємо загальні опції
			if (!breakpointKeys.length) {
				return options;
			}

			// If screen width is greater than the maximum breakpoint, disable script
			// Если ширина экрана больше максимальной точки, скрипт не применяется
			// Якщо ширина екрана більша за максимальну точку, скрипт не застосовується
			const maxBreakpoint = breakpointKeys[breakpointKeys.length - 1];
			if (width > maxBreakpoint) {
				return null;
			}

			// Find the appropriate breakpoint
			// Находим подходящую точку останова
			// Знаходимо відповідну точку зупинки
			let selectedBreakpoint = null;
			for (const key of breakpointKeys) {
				if (width <= key) {
					selectedBreakpoint = key;
					break;
				}
			}

			// If width is less than the smallest breakpoint, use the smallest
			// Если ширина меньше минимальной точки, используем минимальную
			// Якщо ширина менша за мінімальну точку, використовуємо мінімальну
			if (selectedBreakpoint === null) {
				selectedBreakpoint = breakpointKeys[0];
			}

			// Merge general options with breakpoint-specific options
			// Объединяем общие опции с опциями для выбранной точки останова
			// Об'єднуємо спільні опції з опціями для обраної точки зупинки
			return Object.assign({}, options, breakpoints[selectedBreakpoint]);
		};

		// Main function to update each element’s "Read More" behavior
		// Основная функция обновления поведения "Читать дальше" для каждого элемента
		// Основна функція оновлення поведінки "Читати далі" для кожного елемента
		const updateElement = (element, currentOptions) => {
			if (element.dataset.readmoreProcessed) cleanupElement(element);

			// If currentOptions is null or disableCollapse is true, skip processing
			// Если currentOptions === null или disableCollapse === true, скрипт не применяется
			// Якщо currentOptions === null або disableCollapse === true, скрипт не застосовується
			if (!currentOptions || currentOptions.disableCollapse) {
				element.style.height = 'auto';
				element.removeAttribute('aria-hidden');
				cleanupElement(element);
				return;
			}

			// Check if the content is effectively empty
			// Проверка, является ли содержимое фактически пустым
			// Перевірка, чи є вміст фактично порожнім
			const content = element.innerHTML.trim();
			const isEmpty = !content || /^(?:<p>(?:\s*|<br\s*\/?>)<\/p>|<br\s*\/?>|\s+)$/i.test(content);

			if (isEmpty) {
				element.style.height = 'auto';
				element.removeAttribute('aria-hidden');
				return;
			}

			const fullHeight = element.scrollHeight;
			const collapsedHeight = Math.min(currentOptions.collapsedHeight, fullHeight);
			const needsToggle = fullHeight > collapsedHeight;

			const buttonWrapper = createButtonWrapper(currentOptions, needsToggle);
			const toggleBtn = buttonWrapper.querySelector('.cs_readmore-btn');

			initializeStyles(element, collapsedHeight, currentOptions);

			if (!needsToggle) {
				element.style.height = 'auto';
				element.removeAttribute('aria-hidden');
				buttonWrapper.style.display = 'none';
				return;
			}

			if (!element.nextElementSibling?.classList?.contains('cs_readmore-btn-wrapper')) {
				element.after(buttonWrapper);
			}

			setupToggleHandler(element, toggleBtn, currentOptions, collapsedHeight);

			element.dataset.readmoreProcessed = 'true';
			element.setAttribute('aria-expanded', 'false');
			currentOptions.blockProcessed?.(element, needsToggle);
		};

		// Create the button wrapper and toggle button
		// Создание обёртки кнопки и кнопки переключения
		// Створення обгортки кнопки та кнопки перемикання
		const createButtonWrapper = (currentOptions, needsToggle) => {
			const wrapper = document.createElement('div');
			wrapper.className = 'cs_readmore-btn-wrapper';

			const btn = document.createElement('button');
			btn.innerHTML = sanitizeHTML(currentOptions.moreLink);
			btn.className = 'cs_readmore-btn';
			btn.type = 'button';
			btn.setAttribute('aria-expanded', 'false');
			btn.setAttribute('aria-controls', `readmore-${Math.random().toString(36).slice(2, 11)}`);
			btn.dataset.readmoreBtnToggle = 'collapsed';
			wrapper.appendChild(btn);

			if (!needsToggle) wrapper.style.display = 'none';
			return wrapper;
		};

		// Apply initial styles to the element for collapsing
		// Применение начальных стилей к элементу для сворачивания
		// Застосування початкових стилів до елемента для згортання
		const initializeStyles = (element, collapsedHeight, currentOptions) => {
			Object.assign(element.style, {
				overflow: 'hidden',
				height: `${collapsedHeight}px`,
				transition: currentOptions.animationMode === 'js' 
					? `height ${currentOptions.speed}ms ${currentOptions.animationType}`
					: ''
			});

			element.dataset.readmoreBlockToggle = 'collapsed';
			element.setAttribute('role', 'area');
			if (currentOptions.animationMode === 'css') {
				element.classList.add('cs_readmore-animation');
			}
		};

		// Smooth scrolling function to scroll to an element
		// Функция плавной прокрутки к элементу
		// Функція плавного прокручування до елемента
		const smoothScrollTo = (element, duration) => {
			const start = window.scrollY;
			const target = element.getBoundingClientRect().top + start;
			const startTime = performance.now();

			const animation = (currentTime) => {
				const elapsed = currentTime - startTime;
				const progress = Math.min(elapsed / duration, 1);
				const ease = progress * (2 - progress);
				window.scrollTo(0, start + (target - start) * ease);
				if (progress < 1) requestAnimationFrame(animation);
			};

			requestAnimationFrame(animation);
		};

		// Set up the toggle button click handler for expanding/collapsing
		// Настройка обработчика клика кнопки для разворачивания/сворачивания
		// Налаштування обробника кліку кнопки для розгортання/згортання
		const setupToggleHandler = (element, toggleBtn, currentOptions, collapsedHeight) => {
			let isExpanded = false;

			toggleBtn.addEventListener('click', (e) => {
				e.preventDefault();
				isExpanded = !isExpanded;

				currentOptions.beforeToggle?.(toggleBtn, element, isExpanded);
				element.dispatchEvent(new CustomEvent('readmore:beforeToggle'));

				const fullHeight = (() => {
					const clone = element.cloneNode(true);
					Object.assign(clone.style, {
						height: 'auto',
						position: 'absolute',
						visibility: 'hidden'
					});
					document.body.appendChild(clone);
					const height = clone.scrollHeight;
					document.body.removeChild(clone);
					return height;
				})();

				if (currentOptions.animationMode === 'css') {
					// CSS mode: control via classes, height via JS
					// Режим CSS: управление через классы, высота через JS
					// Режим CSS: керування через класи, висота через JS
					if (isExpanded) {
						element.style.height = `${fullHeight}px`;
						element.classList.add('cs_readmore-expanded');
						setTimeout(() => {
							element.style.height = 'auto';
							element.removeAttribute('aria-hidden');
						}, currentOptions.speed);
					} else {
						element.style.height = `${element.scrollHeight}px`;
						element.classList.remove('cs_readmore-expanded');
						setTimeout(() => {
							element.style.height = `${collapsedHeight}px`;
							element.setAttribute('aria-hidden', 'true');
						}, 0);
						if (currentOptions.scrollToTopOnCollapse) {
							smoothScrollTo(element, 200);
						}
					}
				} else {
					// JS mode: control via transition, collapsing twice as fast
					// Режим JS: управление через transition, сворачивание в 2 раза быстрее
					// Режим JS: керування через transition, згортання вдвічі швидше
					const speed = isExpanded ? currentOptions.speed : currentOptions.speed / 2;

					element.style.transition = `height ${speed}ms ${currentOptions.animationType}`;
					element.style.height = isExpanded ? `${fullHeight}px` : `${collapsedHeight}px`;

					setTimeout(() => {
						if (isExpanded) {
							element.style.height = 'auto';
							element.removeAttribute('aria-hidden');
						} else {
							element.setAttribute('aria-hidden', 'true');
							if (currentOptions.scrollToTopOnCollapse) smoothScrollTo(element, 200);
						}
					}, speed);
				}

				toggleBtn.innerHTML = sanitizeHTML(isExpanded ? currentOptions.lessLink : currentOptions.moreLink);
				element.dataset.readmoreBlockToggle = isExpanded ? 'expanded' : 'collapsed';
				toggleBtn.dataset.readmoreBtnToggle = isExpanded ? 'expanded' : 'collapsed';

				const ariaExpanded = isExpanded.toString();
				element.setAttribute('aria-expanded', ariaExpanded);
				toggleBtn.setAttribute('aria-expanded', ariaExpanded);

				toggleBtn.parentElement.style.display = 
					isExpanded && currentOptions.hideButtonCollapse ? 'none' : 'block';

				currentOptions.afterToggle?.(toggleBtn, element, isExpanded);
				element.dispatchEvent(new CustomEvent('readmore:afterToggle'));
			});
		};

		// Clean up styles and event listeners from an element
		// Очистка стилей и слушателей событий с элемента
		// Очищення стилів та слухачів подій з елемента
		const cleanupElement = (element) => {
			const wrapper = element.nextElementSibling;
			if (wrapper?.classList.contains('cs_readmore-btn-wrapper')) wrapper.remove();

			element.style.cssText = '';
			element.classList.remove('cs_readmore-animation', 'cs_readmore-expanded');
			['aria-expanded', 'aria-hidden', 'role'].forEach(attr => element.removeAttribute(attr));
			delete element.dataset.readmoreProcessed;
			delete element.dataset.readmoreBlockToggle;
		};

		// Sanitize HTML to prevent XSS attacks
		// Очистка HTML для предотвращения XSS-атак
		// Очищення HTML для запобігання XSS-атакам
		const sanitizeHTML = (html) => {
			try {
				const temp = document.createElement('div');
				temp.innerHTML = html;
				return temp.innerHTML
					.replace(/on\w+="[^"]*"/g, '')
					.replace(/javascript:/g, '');
			} catch (error) {
				console.error('Error sanitizing HTML:', error);
				return html;
			}
		};

		// Initialize the "Read More" functionality and attach resize listener
		// Инициализация функционала "Читать дальше" и подключение слушателя изменения размера
		// Ініціалізація функціоналу "Читати далі" та підключення слухача зміни розміру
		const initialOptions = getOptionsForWidth(window.innerWidth);
		if (initialOptions && !initialOptions.disableCollapse) {
			elements.forEach(element => updateElement(element, initialOptions));
		}

		window.addEventListener('resize', handleResize);

		// Return an object with a destroy method to clean up
		// Возвращение объекта с методом destroy для очистки
		// Повернення об’єкта з методом destroy для очищення
		return {
			destroy: () => {
				window.removeEventListener('resize', handleResize);
				elements.forEach(cleanupElement);
			}
		};
	}

	return initReadMore;
});