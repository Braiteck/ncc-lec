$(() => {
	// Ширина окна для ресайза
	WW = $(window).width()


	// Карусель товаров
	const productsSliders = []

	$('.products .swiper').each(function (i) {
		$(this).addClass('products_s' + i)

		let options = {
			loop: true,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			breakpoints: {
				0: {
					spaceBetween: 10,
					slidesPerView: 2
				},
				768: {
					spaceBetween: 24,
					slidesPerView: 3
				},
				1024: {
					spaceBetween: 24,
					slidesPerView: 4
				}
			},
			on: {
				init: swiper => {
					setTimeout(() => {
						productHeight($(this), $(swiper.$el).find('.product').length)
					})
				},
				resize: swiper => {
					setTimeout(() => {
						productHeight($(this), $(swiper.$el).find('.product').length)
					})
				}
			}
		}

		productsSliders.push(new Swiper('.products_s' + i, options))
	})


	// Галерея
	const gallerySliders = []

	$('.gallery .swiper').each(function (i) {
		$(this).addClass('gallery_s' + i)

		let options = {
			loop: true,
			speed: 500,
			spaceBetween: 10,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			breakpoints: {
				0: {
					slidesPerView: 1
				},
				480: {
					slidesPerView: 2
				},
				768: {
					slidesPerView: 3
				}
			}
		}

		gallerySliders.push(new Swiper('.gallery_s' + i, options))
	})


	// Страница товара
	if ($('.product_info .images').length) {
		const productSlider = new Swiper('.product_info .images .swiper', {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 24,
			slidesPerView: 1,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			},
			on: {
				slideChange: swiper => {
					setTimeout(() => {
						$('.product_info .images .thumbs button').removeClass('active')
						$('.product_info .images .thumbs button').eq(swiper.activeIndex).addClass('active')
					})
				}
			}
		})

		$('.product_info .images .thumbs button').click(function (e) {
			e.preventDefault()

			productSlider.slideTo($(this).data('slide-index'), 500)
		})
	}


	// Поиск
	$('.search .input').keydown(function () {
		let _self = $(this),
			parent = _self.closest('.search')

		setTimeout(() => {
			_self.val().length > 2
				? parent.find('.clear_btn').addClass('show')
				: parent.find('.clear_btn').removeClass('show')
		})
	})

	$('.search .clear_btn').click(function (e) {
		e.preventDefault()

		let parent = $(this).closest('.search')

		parent.find('.input').val('')
		$(this).removeClass('show')
	})


	// Мини всплывающие окна
	$('.mini_modal_btn').click(function (e) {
		e.preventDefault()

		const modalId = $(this).data('modal-id')

		if ($(this).hasClass('active')) {
			$(this).removeClass('active')
			$('.mini_modal').removeClass('active')

			if (is_touch_device()) $('body').css('cursor', 'default')
		} else {
			$('.mini_modal_btn').removeClass('active')
			$(this).addClass('active')

			$('.mini_modal').removeClass('active')
			$(modalId).addClass('active')

			if (is_touch_device()) $('body').css('cursor', 'pointer')
		}
	})

	// Закрываем всплывашку при клике за её пределами
	$(document).click((e) => {
		if ($(e.target).closest('.modal_cont').length === 0) {
			$('.mini_modal, .mini_modal_btn').removeClass('active')

			if (is_touch_device()) $('body').css('cursor', 'default')
		}
	})


	// Моб. меню
	$('.mob_header .menu_btn').click((e) => {
		e.preventDefault()

		$('.mob_header .menu_btn').toggleClass('active')
		$('body').toggleClass('menu_open')
		$('.mob_menu').toggleClass('show')
		$('.mob_catalog').removeClass('show')
	})

	$('.mob_menu .menu .catalog_btn').click((e) => {
		e.preventDefault()

		$('.mob_catalog').toggleClass('show')
	})


	// Боковая колонка - Фильтр
	$('.sort .filter_btn').click(function (e) {
		e.preventDefault()

		$(this).toggleClass('active')
		$('aside').slideToggle(500)
	})

	$('.filter .spoler_btn').click(function (e) {
		e.preventDefault()

		let parent = $(this).closest('.data')

		$(this).toggleClass('active')
		parent.find('.hide').slideToggle(300)
	})

	$('.filter .reset_btn').click(function () {
		$('.filter input').removeAttr('checked')
	})


	// Сортировка
	$('.sort .btn').click(function (e) {
		e.preventDefault()

		if ($(this).hasClass('down')) {
			$('.sort .btn').removeClass('down up')
			$(this).addClass('up')
			return false
		}

		if ($(this).hasClass('up')) {
			$('.sort .btn').removeClass('down up')
			return false
		}

		if (!$(this).hasClass('up') && !$(this).hasClass('down')) {
			$('.sort .btn').removeClass('down up')
			$(this).addClass('down')
		}
	})


	// Маска ввода
	$('input[type=tel]').inputmask('+7 (999) 999-99-99')

	// Выбор файла
	$('body').on('change', '.form input[type=file]', function (e) {
		$(this).closest('.file').find('label span').text($(this).val())
	})


	// Изменение количества товара
	$('body').on('click', '.amount .minus', function (e) {
		e.preventDefault()

		const $parent = $(this).closest('.amount'),
			$input = $parent.find('.input'),
			inputVal = parseFloat($input.val()),
			minimum = parseFloat($input.data('minimum')),
			step = parseFloat($input.data('step')),
			unit = $input.data('unit')

		if (inputVal > minimum) $input.val(inputVal - step + unit)
	})

	$('body').on('click', '.amount .plus', function (e) {
		e.preventDefault()

		const $parent = $(this).closest('.amount'),
			$input = $parent.find('.input'),
			inputVal = parseFloat($input.val()),
			maximum = parseFloat($input.data('maximum')),
			step = parseFloat($input.data('step')),
			unit = $input.data('unit')

		if (inputVal < maximum) $input.val(inputVal + step + unit)
	})

	$('.amount .input').keydown(function () {
		const _self = $(this),
			maximum = parseInt(_self.data('maximum'))

		setTimeout(() => {
			if (_self.val() == '' || _self.val() == 0) _self.val(parseInt(_self.data('minimum')))
			if (_self.val() > maximum) _self.val(maximum)
		})
	})


	// Fancybox
	Fancybox.defaults.autoFocus = false
	Fancybox.defaults.dragToClose = false
	Fancybox.defaults.l10n = {
		CLOSE: "Закрыть",
		NEXT: "Следующий",
		PREV: "Предыдущий",
		MODAL: "Вы можете закрыть это модальное окно нажав клавишу ESC"
	}

	Fancybox.defaults.template = {
		closeButton: '<svg><use xlink:href="images/sprite.svg#ic_close"></use></svg>',
	}

	// Всплывающие окна
	$('body').on('click', '.modal_btn', function (e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: $(this).data('modal'),
			type: 'inline'
		}])
	})

	// Увеличение картинки
	Fancybox.bind('.fancy_img', {
		Image: {
			zoom: false,
		},
		Thumbs: {
			autoStart: false,
		}
	})
})



$(window).on('resize', () => {
	if (typeof WW !== 'undefined' && WW != $(window).width()) {
		// Моб. версия
		if (!firstResize) {
			$('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=1, maximum-scale=1')
			if ($(window).width() < 360) $('meta[name=viewport]').attr('content', 'width=360, user-scalable=no')

			firstResize = true
		} else {
			firstResize = false
		}


		// Перезапись ширины окна
		WW = $(window).width()
	}
})



$(window).on('load', () => {
	// Выравнивание элементов в сетке
	$('.products .row').each(function () {
		productHeight($(this), parseInt($(this).css('--products_count')))
	})
})



$(window).resize(() => {
	// Выравнивание элементов в сетке
	$('.products .row').each(function () {
		productHeight($(this), parseInt($(this).css('--products_count')))
	})
})



// Выравнивание товаров
function productHeight(context, step) {
	let start = 0,
		finish = step,
		$products = context.find('.product_wrap')

	$products.height('auto')
	$products.find('.name, .price').height('auto')

	$products.each(function () {
		setHeight($products.slice(start, finish).find('.name'))
		setHeight($products.slice(start, finish).find('.price'))
		setHeight($products.slice(start, finish))

		start = start + step
		finish = finish + step
	})
}