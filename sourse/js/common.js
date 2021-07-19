let div = document.createElement('div');

div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px';

// мы должны вставить элемент в документ, иначе размеры будут равны 0
document.body.append(div);

let scrollWidth = div.offsetWidth - div.clientWidth;
div.remove();
const JSCCommon = {

	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	btnToggleForm: [].slice.call(document.querySelectorAll(" .toggle-form--js")),
	form: document.querySelector(".form-modal"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),
 
	toggleMenu() {
		const toggle = this.btnToggleMenuMobile;
		const menu = this.menuMobile;
		document.addEventListener("click", function (event) {
			const toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(el => el.classList.toggle("on"));
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed"));
			document.querySelector("html").style.marginRight = scrollWidth + 'px';
		}, { passive: true });
	},
	closeMenu() {
		let menu = this.menuMobile;
		if (!menu) return;
		if (menu.classList.contains("active")) {
			this.btnToggleMenuMobile.forEach(element => element.classList.remove("on"));
			this.menuMobile.classList.remove("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed"));
			document.querySelector("html").style.marginRight = null
		}

	},
	mobileMenu() {
		if (!this.menuMobileLink) return;
		this.toggleMenu();
		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(".menu-mobile--js.active"); // (1)
			let link = event.target.closest(".navMenu__link"); // (1)
			if (!container || link) this.closeMenu();
		}, { passive: true });

		window.addEventListener('resize', () => {
			if (window.matchMedia("(min-width: 992px)").matches) this.closeMenu();
		}, { passive: true });
	},
	// /mobileMenu
 
 
	closeForm() {
		let menu = this.form;
		if (!menu) return;
		if (menu.classList.contains("active")) {
			// this.btnToggleMenuMobile.forEach(element => element.classList.remove("on"));
			this.form.classList.remove("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixedd"));
			document.querySelector("html").style.marginRight = null
		}

	},
	mobileForm() {
		if (!this.menuMobileLink) return; 
		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(".form-modal.active");  
			if (!container) this.closeForm();
		}, { passive: true });
		$(".toggle-form--js").click(() =>this.closeForm())
 
	},
	// /mobileMenu

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},

	sendForm() {
		var gets = (function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");
			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}
			return b;
		})();
		// form
		$(document).on('submit', "form", function (e) {
			e.preventDefault();
			const th = $(this);
			var data = th.serialize();
			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data,
			}).done(function (data) {

				$.fancybox.close();
				$.fancybox.open({
					src: '#modal-thanks',
					type: 'inline'
				});
				// window.location.replace("/thanks.html");
				setTimeout(function () {
					// Done Functions
					th.trigger("reset");
					// $.magnificPopup.close();
					// ym(53383120, 'reachGoal', 'zakaz');
					// yaCounter55828534.reachGoal('zakaz');
				}, 4000);
			}).fail(function () { });

		});
	},
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {

		$(document).on('click', " .menu a", function () {
			const elementClick = $(this).attr("href");
			const destination = $(elementClick).offset().top;

			$('html, body').animate({ scrollTop: destination }, 1100);

			return false;
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	}
};
// const $ = jQuery;

function eventHandler() { 
	JSCCommon.mobileMenu();
	// JSCCommon.inputMask();
	JSCCommon.sendForm();
	JSCCommon.mobileForm();
	JSCCommon.heightwindow();
	// JSCCommon.animateScroll();
	JSCCommon.getCurrentYear('.current-year');
  
	$(".toggle-form-text").click(function(e){
		e.preventDefault();
		$(".form-modal").addClass("active")
		$("body").addClass("fixedd")
	})


	function setFixedNav() {
		let topNav = document.querySelector('.top-nav  ');
		if (!topNav) return;
		window.scrollY > 0
			? topNav.classList.add('fixed')
			: topNav.classList.remove('fixed');
	}

	function whenResize() {
		setFixedNav();
	}

	window.addEventListener('scroll', () => {
		setFixedNav();

	}, { passive: true })
	window.addEventListener('resize', () => {
		whenResize();
	}, { passive: true });

	whenResize();

	
	
	
	if (window.matchMedia("(min-width: 992px)").matches) {
		var controller = new ScrollMagic.Controller();
		
		
			// new ScrollMagic.Scene({ triggerElement: "#sWays" })
			// 	.setClassToggle(`[href="#sWays"]`, "active") // add class toggle
			// 	// .addIndicators() // add indicators (requires plugin)
			// 	.addTo(controller);
			// new ScrollMagic.Scene({ triggerElement: "#sCompositions" })
			// 	.setClassToggle(`[href="#sCompositions"]`, "active") // add class toggle
			// 	// .addIndicators() // add indicators (requires plugin)
			// 	.addTo(controller);
			// new ScrollMagic.Scene({ triggerElement: "#sServises" })
			// 	.setClassToggle(`[href="#sServises"]`, "active") // add class toggle
			// 	// .addIndicators() // add indicators (requires plugin)
			// 	.addTo(controller);
			// new ScrollMagic.Scene({ triggerElement: "#sContact" })
			// 	.setClassToggle(`[href="#sContact"]`, "active") // add class toggle
			// 	// .addIndicators() // add indicators (requires plugin)
			// 	.addTo(controller);
			// new ScrollMagic.Scene({ triggerElement: "#sWays" })
			// 	.setClassToggle(`[href="#sWays"]`, "active") // add class toggle
			// 	// .addIndicators() // add indicators (requires plugin)
			// 	.addTo(controller);

	let height = window.innerHeight;


	var tween = new TimelineMax()
		.add([
			TweenMax.to(".picture-block--1", 1000, {x:-200,  y: -400, rotation:  -30, duration: 500,   ease: Linear.easeNone}),
			TweenMax.to(".picture-block--2", 1000, { x: 200, y: -200, rotation:  30, duration: 500,   ease: Linear.easeNone}),
			TweenMax.to(".picture-block--3", 1000, { x: 200, y: 100, rotation:  30, duration: 500,   ease: Linear.easeNone}),
			TweenMax.to(".text--1", 500, { opacity:0, duration: 200,   ease: Linear.easeNone}),
			TweenMax.to(".text--2", 500, { opacity:1, duration: 200,   ease: Linear.easeNone}),
		]) 
		.add([
			TweenMax.to(".picture-block--4", 1000, {  scale: .8, duration: 500,   ease: Linear.easeNone}),
			TweenMax.to(".picture-block--1", 1000, { x:-200,   y: -600, rotation:  -60, duration: 150,   ease: Linear.easeNone}),
			TweenMax.to(".picture-block--2", 1000, { x:200,   y: -800, rotation:  60, duration: 150,   ease: Linear.easeNone}),
			TweenMax.to(".picture-block--3", 1000, {x: 1000,  y: 100, rotation:  60, duration: 150,   ease: Linear.easeNone}),
			TweenMax.to(".text--2", 500, { opacity:0, duration: 100,   ease: Linear.easeNone}),
			TweenMax.to(".text--3", 500, { opacity:1, duration: 100,   ease: Linear.easeNone}),
		])
		.add([
			// TweenLite.set(".sAbout", 2000, { className: '+=section-show'}),
			TweenMax.to(".picture-block--4", 3000, { scale: 1, left: -100, top: '14%', duration: 450, ease: "slow(0.5, 0.8, true)"}),
			TweenMax.to(".headerBlock__block", 1000, {opacity:0, duration: 50, ease: Power1.easeIn }),
			TweenMax.from(".sAbout", 2000, { y: '50%', opacity: 0, duration: 250, ease: Linear.easeNone }),
			// TweenMax.from(".sAbout", 1000, {y: '100%', opacity:0, duration: 500, ease: Linear.easeNone }),
		])
		.add([
			TweenMax.to(".picture-block--4", 2000, { x: '-50%', duration: 150, ease: Linear.easeNone}),
			TweenMax.to(".sAbout", 2000, {y: '-50%', opacity: .5, duration: 250, ease: Linear.easeNone }),
			// TweenMax.from(".sAbout", 1000, {y: '100%', opacity:0, duration: 500, ease: Linear.easeNone }),
		])
		.add([
			TweenMax.to(".picture-block--4", 1000, { x: '-150%', rotation: -60, duration: 150, ease: Linear.easeNone}),
			TweenMax.to(".sAbout", 2000, {y: '-200%', opacity: 0, duration: 50, ease: Linear.easeNone }),
			// TweenMax.from(".sAbout", 1000, {y: '100%', opacity:0, duration: 500, ease: Linear.easeNone }),
			TweenMax.from(".sContent__text", 2500, { y: '200%', opacity: 0, delay: 100,  duration:450, ease: Linear.easeNone}),
			TweenMax.from(".content-picture", 2000, { y: '-10%', opacity: 0, delay: 100,  duration: 550, ease: Power2.easeInOut }),
		])
		// .add([
		// 	// TweenMax.to(".picture-block--4", 1000, { x: '-200%', rotation: -60, delay: -100,  duration: 1500, ease: Linear.easeNone }),
		// 	// TweenMax.from(".sAbout", 1000, {y: '100%', opacity:0, duration: 500, ease: Linear.easeNone }),
		// ])
		.add([
			TweenMax.to(".sContent", 3000, { x: '-100%', opacity:0, duration: 150, ease: Linear.easeNone}),
			// TweenMax.from(".sAbout", 1000, {y: '100%', opacity:0, duration: 500, ease: Linear.easeNone }),
			TweenMax.from(".sWays", 4000, { y: '100%',  duration: 250, ease: Power3.easeInOut}),
		])
		.add([
			TweenMax.to(".sWays", 3000, { y: '-100%', opacity: .8,  duration: 450, ease: Linear.easeNone}),
			TweenMax.to(".sCompositions", 4500, { opacity: 1, delay: -100,   duration: 350, ease: Linear.easeNone}),
			// TweenMax.from(".sAbout", 1000, {y: '100%', opacity:0, duration: 500, ease: Linear.easeNone }),
		])
		.add([
			TweenMax.to(".sCompositions", 3000, { y: '-90%',  delay: -500, duration: 350, ease: Linear.easeNone }),
		])
		.add([
			TweenMax.to(".sCompositions", 1000, { y: '-100%', opacity: 0,   duration: 150, ease: Linear.easeNone }),
			TweenMax.from(".sServises", 2000, { y: '100%',  delay: -1500, duration: 750, ease: Linear.easeNone }),
			TweenMax.to(".picture-block--4", 1000, { rotation: 0,  duration: 150, ease: Power2.easeInOut }),
		])
		.add([
			TweenMax.to(".picture-block--4", 3000, { x: '10%',  duration: 150, ease: Power2.easeInOut }),
			TweenMax.to(".sServises", 2000, { x: '50%', duration: 70, ease: Linear.easeNone }),
		])
		.add([
			TweenMax.to(".picture-block--4", 3000, { x: '10%',  duration: 50, ease: Power2.easeInOut }),
			TweenMax.to(".sServises", 2000, { x: '50%', l: 0,   duration: 70, ease: Linear.easeNone }),
		])
		.add([
			TweenMax.to(".sContact", 2000, { x: '0', l:0,  duration: 50, delay: -1000, ease: Power2.easeInOut }),
			TweenMax.to(".picture-block--4", 2000, { x: '-80%', left: '100%',  duration: 0, delay: -1000, ease: Power2.easeInOut }),
			TweenMax.to(".sServises", 2000, { x: '100%', duration: 0, delay: -1000, ease: Linear.easeNone }),
		])
		// .add([
		// 	TweenMax.to(".picture-block--4", 1000, {
		// 		x: '-50%', rotation: -60, duration: 1500, ease: SteppedEase.config(12),  }),
		// 	TweenMax.to(".sAbout", 2000, {y: '-100%', opacity: .5, duration: 3500, ease: Linear.easeNone }),
		// 	// TweenMax.from(".sAbout", 1000, {y: '100%', opacity:0, duration: 500, ease: Linear.easeNone }),
		// ])
	
		
	// build scene

	

		var scene = new ScrollMagic
		.Scene({ triggerElement: ".main-wrapper", triggerHook: "onLeave", duration: '1500%', offset: '0%' })
		.setTween(tween)
		.setPin(".main-wrapper")
			// .addIndicators({ name: "1 (duration: 0)" })
		.addTo(controller);

		// get the current scene progress
		var start = scene.scrollOffset();
		var end = scene.scrollOffset() + scene.duration();

 



		// change behaviour of controller to animate scroll instead of jump
		// controller.scrollTo(function (newpos) {
		// 	TweenMax.to(window, 0.5, { scrollTo: { y: newpos } });
		// });

	
		$('[href="#sWays"]').click(function (e) {
			e.preventDefault();
			end = document.querySelector('.headerBlock').offsetHeight  + document.querySelector('.sAbout').offsetHeight   	+ document.querySelector('.sContent').offsetHeight ;
						console.log(end);
			$('html, body').animate({ scrollTop: 6800 }, 1000);
			// var offset = $("#sCompositions").offset().top;
			// TweenLite.to(window, 1, { scrollTo: { y: offset } });
		}); 
		var triggerPosition = scene;
		console.log(triggerPosition);
		//  bind scroll to anchor links
		$('[href="#sContact"]').click(function(e){
			$('html, body').animate({ scrollTop: end }, 1000);
			console.log(triggerPosition);
		})
		$('[href="/"]').click(function(e){
			e.preventDefault();
			$('html, body').animate({ scrollTop: 0 }, 1000);
			console.log(triggerPosition);
		})

	}

window.addEventListener("scroll", function(){
	var scrollPos = controller.info("scrollPos");
	console.log(scrollPos);
})


	window.onload = function () {
	$("body").removeClass("loaded_hiding")
	}


};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}





// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }