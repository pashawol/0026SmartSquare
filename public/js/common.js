"use strict";

var div = document.createElement('div');
div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px'; // мы должны вставить элемент в документ, иначе размеры будут равны 0

document.body.append(div);
var scrollWidth = div.offsetWidth - div.clientWidth;
div.remove();
var JSCCommon = {
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	btnToggleForm: [].slice.call(document.querySelectorAll(" .toggle-form--js")),
	form: document.querySelector(".form-modal"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),
	toggleMenu: function toggleMenu() {
		var toggle = this.btnToggleMenuMobile;
		var menu = this.menuMobile;
		document.addEventListener("click", function (event) {
			var toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(function (el) {
				return el.classList.toggle("on");
			});
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(function (el) {
				return el.classList.toggle("fixed");
			});
			document.querySelector("html").style.marginRight = scrollWidth + 'px';
		}, {
			passive: true
		});
	},
	closeMenu: function closeMenu() {
		var menu = this.menuMobile;
		if (!menu) return;

		if (menu.classList.contains("active")) {
			this.btnToggleMenuMobile.forEach(function (element) {
				return element.classList.remove("on");
			});
			this.menuMobile.classList.remove("active");
			[document.body, document.querySelector('html')].forEach(function (el) {
				return el.classList.remove("fixed");
			});
			document.querySelector("html").style.marginRight = null;
		}
	},
	mobileMenu: function mobileMenu() {
		var _this = this;

		if (!this.menuMobileLink) return;
		this.toggleMenu();
		document.addEventListener('mouseup', function (event) {
			var container = event.target.closest(".menu-mobile--js.active"); // (1)

			var link = event.target.closest(".navMenu__link"); // (1)

			if (!container || link) _this.closeMenu();
		}, {
			passive: true
		});
		window.addEventListener('resize', function () {
			if (window.matchMedia("(min-width: 992px)").matches) _this.closeMenu();
		}, {
			passive: true
		});
	},
	// /mobileMenu
	closeForm: function closeForm() {
		var menu = this.form;
		if (!menu) return;

		if (menu.classList.contains("active")) {
			// this.btnToggleMenuMobile.forEach(element => element.classList.remove("on"));
			this.form.classList.remove("active");
			[document.body, document.querySelector('html')].forEach(function (el) {
				return el.classList.remove("fixedd");
			});
			document.querySelector("html").style.marginRight = null;
		}
	},
	mobileForm: function mobileForm() {
		var _this2 = this;

		if (!this.menuMobileLink) return;
		document.addEventListener('mouseup', function (event) {
			var container = event.target.closest(".form-modal.active");
			if (!container) _this2.closeForm();
		}, {
			passive: true
		});
		$(".toggle-form--js").click(function () {
			return _this2.closeForm();
		});
	},
	// /mobileMenu
	inputMask: function inputMask() {
		// mask for input
		var InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(function (element) {
			return element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}");
		});
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	sendForm: function sendForm() {
		var gets = function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");

			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}

			return b;
		}(); // form


		$(document).on('submit', "form", function (e) {
			e.preventDefault();
			var th = $(this);
			var data = th.serialize();
			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data
			}).done(function (data) {
				$.fancybox.close();
				$.fancybox.open({
					src: '#modal-thanks',
					type: 'inline'
				}); // window.location.replace("/thanks.html");

				setTimeout(function () {
					// Done Functions
					th.trigger("reset"); // $.magnificPopup.close();
					// ym(53383120, 'reachGoal', 'zakaz');
					// yaCounter55828534.reachGoal('zakaz');
				}, 4000);
			}).fail(function () {});
		});
	},
	heightwindow: function heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		var vh = window.innerHeight * 0.01; // Then we set the value in the --vh custom property to the root of the document

		document.documentElement.style.setProperty('--vh', "".concat(vh, "px")); // We listen to the resize event

		window.addEventListener('resize', function () {
			// We execute the same script as before
			var vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
		}, {
			passive: true
		});
	},
	animateScroll: function animateScroll() {
		$(document).on('click', "  .scroll-link", function () {
			var elementClick = $(this).attr("href");
			var destination = $(elementClick).offset().top;
			$('html, body').animate({
				scrollTop: destination
			}, 1100);
			return false;
		});
	},
	getCurrentYear: function getCurrentYear(el) {
		var now = new Date();
		var currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	}
}; // const $ = jQuery;

function eventHandler() {
	JSCCommon.mobileMenu(); // JSCCommon.inputMask();

	JSCCommon.sendForm();
	JSCCommon.mobileForm();
	JSCCommon.heightwindow();
	JSCCommon.animateScroll();
	JSCCommon.getCurrentYear('.current-year');
	$(".toggle-form-text").click(function (e) {
		e.preventDefault();
		$(".form-modal").addClass("active");
		$("body").addClass("fixedd");
	});

	if (window.matchMedia("(min-width: 992px)").matches) {
		var controller = new ScrollMagic.Controller();
		var height = window.innerHeight;
		var tween = new TimelineMax().add([TweenMax.to(".picture-block--1", 1000, {
			x: -200,
			y: -400,
			rotation: -30,
			duration: 500,
			ease: Linear.easeNone
		}), TweenMax.to(".picture-block--2", 1000, {
			x: 200,
			y: -200,
			rotation: 30,
			duration: 500,
			ease: Linear.easeNone
		}), TweenMax.to(".picture-block--3", 1000, {
			x: 200,
			y: 100,
			rotation: 30,
			duration: 500,
			ease: Linear.easeNone
		}), TweenMax.to(".text--1", 500, {
			opacity: 0,
			duration: 200,
			ease: Linear.easeNone
		}), TweenMax.to(".text--2", 500, {
			opacity: 1,
			duration: 200,
			ease: Linear.easeNone
		})]).add([TweenMax.to(".picture-block--4", 1000, {
			scale: .8,
			duration: 500,
			ease: Linear.easeNone
		}), TweenMax.to(".picture-block--1", 1000, {
			x: -200,
			y: -600,
			rotation: -60,
			duration: 150,
			ease: Linear.easeNone
		}), TweenMax.to(".picture-block--2", 1000, {
			x: 200,
			y: -800,
			rotation: 60,
			duration: 150,
			ease: Linear.easeNone
		}), TweenMax.to(".picture-block--3", 1000, {
			x: 1000,
			y: 100,
			rotation: 60,
			duration: 150,
			ease: Linear.easeNone
		}), TweenMax.to(".text--2", 500, {
			opacity: 0,
			duration: 100,
			ease: Linear.easeNone
		}), TweenMax.to(".text--3", 500, {
			opacity: 1,
			duration: 100,
			ease: Linear.easeNone
		})]).add([TweenMax.to(".picture-block--4", 3000, {
			scale: 1,
			left: -100,
			top: '14%',
			duration: 450,
			ease: "slow(0.5, 0.8, true)"
		}), TweenMax.to(".headerBlock__block", 1000, {
			opacity: 0,
			duration: 50,
			ease: Power1.easeIn
		}), TweenMax.from(".sAbout", 2000, {
			y: '50%',
			opacity: 0,
			duration: 250,
			ease: Linear.easeNone
		}) // TweenMax.from(".sAbout", 1000, {y: '100%', opacity:0, duration: 500, ease: Linear.easeNone }),
		]).add([TweenMax.to(".picture-block--4", 2000, {
			x: '-50%',
			duration: 150,
			ease: Linear.easeNone
		}), TweenMax.to(".sAbout", 2000, {
			y: '-50%',
			opacity: .5,
			duration: 250,
			ease: Linear.easeNone
		}) // TweenMax.from(".sAbout", 1000, {y: '100%', opacity:0, duration: 500, ease: Linear.easeNone }),
		]).add([TweenMax.to(".picture-block--4", 1000, {
			x: '-150%',
			rotation: -60,
			duration: 150,
			ease: Linear.easeNone
		}), TweenMax.to(".sAbout", 2000, {
			y: '-200%',
			opacity: 0,
			duration: 50,
			ease: Linear.easeNone
		}), // TweenMax.from(".sAbout", 1000, {y: '100%', opacity:0, duration: 500, ease: Linear.easeNone }),
		TweenMax.from(".sContent__text", 2500, {
			y: '200%',
			opacity: 0,
			delay: 100,
			duration: 450,
			ease: Linear.easeNone
		}), TweenMax.from(".content-picture", 2000, {
			y: '-10%',
			opacity: 0,
			delay: 100,
			duration: 550,
			ease: Power2.easeInOut
		})]) // .add([
		// 	// TweenMax.to(".picture-block--4", 1000, { x: '-200%', rotation: -60, delay: -100,  duration: 1500, ease: Linear.easeNone }),
		// 	// TweenMax.from(".sAbout", 1000, {y: '100%', opacity:0, duration: 500, ease: Linear.easeNone }),
		// ])
		.add([TweenMax.to(".sContent", 3000, {
			x: '-100%',
			opacity: 0,
			duration: 150,
			ease: Linear.easeNone
		}), // TweenMax.from(".sAbout", 1000, {y: '100%', opacity:0, duration: 500, ease: Linear.easeNone }),
		TweenMax.from(".sWays", 4000, {
			y: '100%',
			duration: 250,
			ease: Power3.easeInOut
		})]).add([TweenMax.to(".sWays", 3000, {
			y: '-100%',
			opacity: .8,
			duration: 450,
			ease: Linear.easeNone
		}), TweenMax.to(".sCompositions", 4500, {
			opacity: 1,
			delay: -100,
			duration: 350,
			ease: Linear.easeNone
		}) // TweenMax.from(".sAbout", 1000, {y: '100%', opacity:0, duration: 500, ease: Linear.easeNone }),
		]).add([TweenMax.to(".sCompositions", 3000, {
			y: '-90%',
			delay: -500,
			duration: 350,
			ease: Linear.easeNone
		})]).add([TweenMax.to(".sCompositions", 1000, {
			y: '-100%',
			opacity: 0,
			duration: 150,
			ease: Linear.easeNone
		}), TweenMax.from(".sServises", 2000, {
			y: '100%',
			delay: -1500,
			duration: 750,
			ease: Linear.easeNone
		}), TweenMax.to(".picture-block--4", 1000, {
			rotation: 0,
			duration: 150,
			ease: Power2.easeInOut
		})]).add([TweenMax.to(".picture-block--4", 3000, {
			x: '10%',
			duration: 150,
			ease: Power2.easeInOut
		}), TweenMax.to(".sServises", 2000, {
			x: '50%',
			duration: 70,
			ease: Linear.easeNone
		})]).add([TweenMax.to(".picture-block--4", 3000, {
			x: '10%',
			duration: 50,
			ease: Power2.easeInOut
		}), TweenMax.to(".sServises", 2000, {
			x: '50%',
			l: 0,
			duration: 70,
			ease: Linear.easeNone
		})]).add([TweenMax.to(".sContact", 2000, {
			x: '0',
			l: 0,
			duration: 50,
			delay: -1000,
			ease: Power2.easeInOut
		}), TweenMax.to(".picture-block--4", 2000, {
			x: '-80%',
			left: '100%',
			duration: 0,
			delay: -1000,
			ease: Power2.easeInOut
		}), TweenMax.to(".sServises", 2000, {
			x: '100%',
			duration: 0,
			delay: -1000,
			ease: Linear.easeNone
		})]); // .add([
		// 	TweenMax.to(".picture-block--4", 1000, {
		// 		x: '-50%', rotation: -60, duration: 1500, ease: SteppedEase.config(12),  }),
		// 	TweenMax.to(".sAbout", 2000, {y: '-100%', opacity: .5, duration: 3500, ease: Linear.easeNone }),
		// 	// TweenMax.from(".sAbout", 1000, {y: '100%', opacity:0, duration: 500, ease: Linear.easeNone }),
		// ])
		// build scene

		var scene = new ScrollMagic.Scene({
			triggerElement: ".main-wrapper",
			triggerHook: "onLeave",
			duration: '1500%',
			offset: '0%'
		}).setTween(tween).setPin(".main-wrapper") // .addIndicators() // add indicators (requires plugin)
		.addTo(controller); // change behaviour of controller to animate scroll instead of jump

		controller.scrollTo(function (newpos) {
			TweenMax.to(window, 0.5, {
				scrollTo: {
					y: newpos
				}
			});
		}); //  bind scroll to anchor links

		$(document).on("click", ".menu a[href^='#']", function (e) {
			console.log(this);
			var id = $(this).attr("href");

			if ($(id).length > 0) {
				e.preventDefault(); // trigger scroll

				controller.scrollTo(id);
			}
		});
	}

	window.onload = function () {
		$("body").removeClass("loaded_hiding");
	};
}

;

if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
} // window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }