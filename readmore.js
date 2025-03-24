/*!
 * Readmore.js v2.1.0 - JavaScript plugin
 * Author: @RoS (CORGRAS)
 * Project home: https://corgras.github.io/readmore/
 * Github: https://github.com/corgras/Readmore.js
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
		// Node.js/CommonJS
		module.exports = factory();
	} else {
		// Browser globals
		global.initReadMore = factory();
	}
})(typeof self !== 'undefined' ? self : this, function () {
	'use strict';

	function initReadMore(selector, userOptions = {}) {
		// Default configuration options for the "Read More" functionality
		// Конфигурация по умолчанию для функционала "Читать дальше"
		// Конфігурація за замовчуванням для функціоналу "Читати далі"
		const defaults = {
			collapsedHeight: 200,
			speed: 100,
			moreLink: '<span>Read More</span>',
			lessLink: '<span>Close</span>',
			breakpoints: {},
			hideButtonCollapse: false,
			animationMode: 'js',
			beforeToggle: null,
			afterToggle: null,
			blockProcessed: null
		};

		// Merge default and user options with error handling
		// Объединение опций по умолчанию и пользовательских с обработкой ошибок
		// Об’єднання опцій за замовчуванням та користувацьких з обробкою помилок
		let options;
		try {
			options = { ...defaults, ...userOptions };
		} catch (error) {
			console.error('Error merging options:', error);
			options = { ...defaults };
		}

		let elements;
		try {
			elements = Array.from(document.querySelectorAll(selector));
			if (!elements.length) throw new Error('Elements not found');
		} catch (error) {
			console.error('Error selecting elements:', error);
			return;
		}

		// Optimized resize handler with debounce to prevent excessive updates
		// Оптимизированный обработчик изменения размера с debounce для предотвращения лишних обновлений
		// Оптимізований обробник зміни розміру з debounce для запобігання надмірним оновленням
		let resizeTimeout;
		const handleResize = () => {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(() => {
				const windowWidth = window.innerWidth;
				const currentOptions = getOptionsForWidth(windowWidth);
				elements.forEach(element => updateElement(element, currentOptions));
			}, 100);
		};

		// Get options based on current window width (handles responsive breakpoints)
		// Получение опций на основе текущей ширины окна (обработка адаптивных точек останова)
		// Отримання опцій на основі поточної ширини вікна (обробка адаптивних точок зупинки)
		const getOptionsForWidth = (width) => {
			try {
				const breakpoints = options.breakpoints;
				const breakpointKeys = Object.keys(breakpoints)
					.map(Number)
					.sort((a, b) => b - a);

				for (const key of breakpointKeys) {
					if (width <= key) {
						return { ...options, ...breakpoints[key] };
					}
				}
				return options;
			} catch (error) {
				console.error('Error in getOptionsForWidth:', error);
				return options;
			}
		};

		// Main function to update each element’s "Read More" behavior
		// Основная функция обновления поведения "Читать дальше" для каждого элемента
		// Основна функція оновлення поведінки "Читати далі" для кожного елемента
		const updateElement = (element, currentOptions) => {
			try {
				if (element.dataset.readmoreProcessed) {
					cleanupElement(element);
				}

				// Check if the content is effectively empty
				const content = element.innerHTML.trim();
				const isEmpty = content === '' || 
					content === '<p></p>' || 
					content === '<p><br></p>' || 
					content === '<br>' || 
					/^\s+$/.test(content);

				if (isEmpty) {
					element.style.height = 'auto';
					element.removeAttribute('aria-hidden');
					return; // Exit early if content is empty
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

				setupToggleHandler(element, toggleBtn, currentOptions, collapsedHeight);

				if (!element.nextElementSibling?.classList?.contains('cs_readmore-btn-wrapper')) {
					element.after(buttonWrapper);
				}

				element.dataset.readmoreProcessed = 'true';
				element.setAttribute('aria-expanded', 'false');

				currentOptions.blockProcessed?.(element, needsToggle);

			} catch (error) {
				console.error('Error updating element:', error);
			}
		};

		// Create the button wrapper and toggle button
		// Создание обёртки кнопки и кнопки переключения
		// Створення обгортки кнопки та кнопки перемикання
		const createButtonWrapper = (currentOptions, needsToggle) => {
			const wrapper = document.createElement('div');
			wrapper.classList.add('cs_readmore-btn-wrapper');

			const btn = document.createElement('button');
			btn.innerHTML = sanitizeHTML(currentOptions.moreLink);
			btn.classList.add('cs_readmore-btn');
			btn.type = 'button';
			btn.setAttribute('aria-expanded', 'false');
			btn.setAttribute('aria-controls', 'readmore-' + Math.random().toString(36).substr(2, 9));
			btn.dataset.readmoreBtnToggle = 'collapsed';
			wrapper.appendChild(btn);

			if (!needsToggle) wrapper.style.display = 'none';
			return wrapper;
		};

		// Apply initial styles to the element for collapsing
		// Применение начальных стилей к элементу для сворачивания
		// Застосування початкових стилів до елемента для згортання
		const initializeStyles = (element, collapsedHeight, currentOptions) => {
			element.style.overflow = 'hidden';
			element.style.height = `${collapsedHeight}px`;
			element.dataset.readmoreBlockToggle = 'collapsed';
			element.setAttribute('role', 'region');

			if (currentOptions.animationMode === 'css') {
				element.classList.add('cs_readmore-animation');
			} else {
				element.style.transition = `height ${currentOptions.speed}ms ease-in-out`;
			}
		};

		// Set up the toggle button click handler for expanding/collapsing
		// Настройка обработчика клика кнопки для разворачивания/сворачивания
		// Налаштування обробника кліку кнопки для розгортання/згортання
		const setupToggleHandler = (element, toggleBtn, currentOptions, collapsedHeight) => {
			let isExpanded = false;

			toggleBtn.onclick = (e) => {
				e.preventDefault();
				isExpanded = !isExpanded;

				try {
					currentOptions.beforeToggle?.(toggleBtn, element, isExpanded);
					element.dispatchEvent(new CustomEvent('readmore:beforeToggle'));

					if (isExpanded) {
						const clone = element.cloneNode(true);
						clone.style.height = 'auto';
						clone.style.position = 'absolute';
						clone.style.visibility = 'hidden';
						document.body.appendChild(clone);
						const fullHeight = clone.scrollHeight;
						document.body.removeChild(clone);

						element.style.height = `${fullHeight}px`;
						setTimeout(() => {
							element.style.height = 'auto';
							element.removeAttribute('aria-hidden');
						}, currentOptions.speed);
					} else {
						element.style.height = `${collapsedHeight}px`;
						element.setAttribute('aria-hidden', 'true');
					}

					toggleBtn.innerHTML = sanitizeHTML(isExpanded ? 
						currentOptions.lessLink : 
						currentOptions.moreLink);

					element.dataset.readmoreBlockToggle = isExpanded ? 'expanded' : 'collapsed';
					toggleBtn.dataset.readmoreBtnToggle = isExpanded ? 'expanded' : 'collapsed';
					element.setAttribute('aria-expanded', isExpanded.toString());
					toggleBtn.setAttribute('aria-expanded', isExpanded.toString());

					if (isExpanded && currentOptions.hideButtonCollapse) {
						toggleBtn.parentElement.style.display = 'none';
					} else {
						toggleBtn.parentElement.style.display = 'block';
					}

					currentOptions.afterToggle?.(toggleBtn, element, isExpanded);
					element.dispatchEvent(new CustomEvent('readmore:afterToggle'));

				} catch (error) {
					console.error('Error during toggle:', error);
					isExpanded = !isExpanded;
				}
			};
		};

		// Clean up styles and event listeners from an element
		// Очистка стилей и слушателей событий с элемента
		// Очищення стилів та слухачів подій з елемента
		const cleanupElement = (element) => {
			const wrapper = element.nextElementSibling;
			if (wrapper?.classList.contains('cs_readmore-btn-wrapper')) {
				wrapper.remove();
			}
			element.style.height = '';
			element.style.transition = '';
			element.style.overflow = '';
			element.classList.remove('cs_readmore-animation');
			element.removeAttribute('aria-expanded');
			element.removeAttribute('aria-hidden');
			element.removeAttribute('role');
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
		try {
			const initialOptions = getOptionsForWidth(window.innerWidth);
			elements.forEach(element => updateElement(element, initialOptions));
			window.addEventListener('resize', handleResize);
		} catch (error) {
			console.error('Error during initialization:', error);
		}

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