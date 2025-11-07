 AOS.init({
 	duration: 800,
 	easing: 'slide'
 });


// Subtle binary rain background for Resume section only
function createBinaryRainForResume() {
  const container = document.querySelector('.binary-bg-container');
  const canvas = document.getElementById('binary-resume-canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;
  canvas.style.position = 'absolute';
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.zIndex = 0;

  const fontSize = 48; // bigger font
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);
  const binaryChars = ['0', '1'];

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // subtle fade for trail effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(0, 191, 255, 0.15)'; // faded light blue
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = binaryChars[Math.floor(Math.random() * binaryChars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }

      drops[i] += 0.2; // slow falling
    }

    requestAnimationFrame(draw);
  }

  draw();

  window.addEventListener('resize', () => {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  createBinaryRainForResume();
});



(function($) {

	"use strict";

	$(window).stellar({
    responsive: true,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: 'scroll'
  });


	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	// loader
	var loader = function() {
		setTimeout(function() { 
			if($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

	// Scrollax
   $.Scrollax();



   // Burger Menu
	var burgerMenu = function() {

		$('body').on('click', '.js-fh5co-nav-toggle', function(event){

			event.preventDefault();

			if ( $('#ftco-nav').is(':visible') ) {
				$(this).removeClass('active');
			} else {
				$(this).addClass('active');	
			}

			
			
		});

	};
	burgerMenu();


	var onePageClick = function() {


		$(document).on('click', '#ftco-nav a[href^="#"]', function (event) {
	    event.preventDefault();

	    var href = $.attr(this, 'href');

	    $('html, body').animate({
	        scrollTop: $($.attr(this, 'href')).offset().top - 70
	    }, 500, function() {
	    	// window.location.hash = href;
	    });
		});

	};

	onePageClick();
	

	var carousel = function() {
		$('.home-slider').owlCarousel({
	    loop:true,
	    autoplay: true,
	    margin:0,
	    animateOut: 'fadeOut',
	    animateIn: 'fadeIn',
	    nav:false,
	    autoplayHoverPause: false,
	    items: 1,
	    navText : ["<span class='ion-md-arrow-back'></span>","<span class='ion-chevron-right'></span>"],
	    responsive:{
	      0:{
	        items:1
	      },
	      600:{
	        items:1
	      },
	      1000:{
	        items:1
	      }
	    }
		});
	};
	carousel();

	$('nav .dropdown').hover(function(){
		var $this = $(this);
		// 	 timer;
		// clearTimeout(timer);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		// $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
		$this.find('.dropdown-menu').addClass('show');
	}, function(){
		var $this = $(this);
			// timer;
		// timer = setTimeout(function(){
			$this.removeClass('show');
			$this.find('> a').attr('aria-expanded', false);
			// $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
			$this.find('.dropdown-menu').removeClass('show');
		// }, 100);
	});


	$('#dropdown04').on('show.bs.dropdown', function () {
	  console.log('show');
	});

	// scroll
	var scrollWindow = function() {
		$(window).scroll(function(){
			var $w = $(this),
					st = $w.scrollTop(),
					navbar = $('.ftco_navbar'),
					sd = $('.js-scroll-wrap');

			if (st > 150) {
				if ( !navbar.hasClass('scrolled') ) {
					navbar.addClass('scrolled');	
				}
			} 
			if (st < 150) {
				if ( navbar.hasClass('scrolled') ) {
					navbar.removeClass('scrolled sleep');
				}
			} 
			if ( st > 350 ) {
				if ( !navbar.hasClass('awake') ) {
					navbar.addClass('awake');	
				}
				
				if(sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			if ( st < 350 ) {
				if ( navbar.hasClass('awake') ) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if(sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
		});
	};
	scrollWindow();

	

	var counter = function() {
		
		$('#section-counter, .hero-wrap, .ftco-counter, .ftco-about').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.number').each(function(){
					var $this = $(this),
						num = $this.data('number');
						console.log(num);
					$this.animateNumber(
					  {
					    number: num,
					    numberStep: comma_separator_number_step
					  }, 7000
					);
				});
				
			}

		} , { offset: '95%' } );

	}
	counter();


	var contentWayPoint = function() {
		$('.ftco-animate').waypoint(function(direction) {
			// Always trigger the animation when the element comes into view
			if (!$(this.element).hasClass('ftco-animated')) {
				$(this.element).addClass('item-animate');
				setTimeout(function() {
					$('body .ftco-animate.item-animate').each(function(k) {
						var el = $(this);
						setTimeout(function() {
							var effect = el.data('animate-effect');
							if (effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if (effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if (effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						}, k * 50, 'easeInOutExpo');
					});
				}, 100);
			} else {
				// Reset the animation classes if the element goes out of view
				$(this.element).removeClass('fadeIn ftco-animated fadeInLeft fadeInRight fadeInUp');
				$(this.element).addClass('ftco-animate'); // Reset to original state for re-triggering
			}
	
		}, { offset: '95%' });
	};
	contentWayPoint();

	// magnific popup
	$('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
     gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });

  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });





})(jQuery);


$(document).ready(function() {
    // Dynamic movement for project tiles
    const projectTileMovement = function() {
        // Query all elements with the class 'project-tile'
        const projectTiles = document.querySelectorAll('.project-tile');

        // Add mousemove event to each tile
        projectTiles.forEach(tile => {
            tile.addEventListener('mousemove', (e) => {
                // Get the tile's dimensions and position
                const tileRect = tile.getBoundingClientRect();

                // Calculate relative mouse position within the tile
                const xPos = e.clientX - tileRect.left;
                const yPos = e.clientY - tileRect.top;

                // Calculate the transformation amount based on mouse position (adjusting the sensitivity here)
                const moveX = (xPos / tileRect.width - 0.5) * 20; // Horizontal movement
                const moveY = (yPos / tileRect.height - 0.5) * 20; // Vertical movement

                // Apply the transformation (translate)
                tile.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });

            // Reset the transform when the mouse leaves the tile
            tile.addEventListener('mouseleave', () => {
                tile.style.transform = 'translate(0, 0)';
            });
        });
    };

    // Call the function when the document is ready
    projectTileMovement();
});


document.addEventListener('DOMContentLoaded', () => {
    createStars('.starry-background'); // Create stars for the bottom container
});

function createStars(containerSelector) {
    const starryBackground = document.querySelector(containerSelector);
    const numberOfStars = 100; // Adjust as needed

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // Randomize the position of the star within the container
        const xPos = Math.random() * window.innerWidth;
        const yPos = Math.random() * starryBackground.clientHeight; // Limit y position to container height

        // Randomize the size of the star
        const starSize = Math.random() * 3 + 1; // Size between 1 and 4 pixels

        // Apply styles
        star.style.width = `${starSize}px`;
        star.style.height = `${starSize}px`;
        star.style.left = `${xPos}px`;
        star.style.top = `${yPos}px`;

        // Randomize the animation delay for twinkling
        const randomDelay = Math.random() * 4; // Random delay between 0 and 4 seconds
        star.style.animation = `twinkle ${randomDelay}s infinite ease-in-out, move 3s infinite alternate`; // Apply twinkle animation

        // Append the star to the background
        starryBackground.appendChild(star);
    }
}


document.addEventListener('DOMContentLoaded', () => {
  const target = document.getElementById('bg-img-col');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add class to animate
        target.classList.add('visible');
      } else {
        // Remove class so animation can restart when re-entering viewport
        target.classList.remove('visible');
      }
    });
  });

  observer.observe(target);
});

function createShootingStar() {
    const starContainer = document.querySelector('.starry-background');
    if (!starContainer) return;

    const shootingStar = document.createElement('div');
    shootingStar.classList.add('shooting-star');

    // Random starting position near top-left
    const startX = Math.random() * window.innerWidth * 0.5;
    const startY = Math.random() * window.innerHeight * 0.3;

    shootingStar.style.left = startX + 'px';
    shootingStar.style.top = startY + 'px';

    starContainer.appendChild(shootingStar);

    // Remove star after animation
    shootingStar.addEventListener('animationend', () => {
        shootingStar.remove();
    });
}

// Create a shooting star every 5–10 seconds randomly
setInterval(createShootingStar, Math.random() * 5000 + 5000);



document.addEventListener('DOMContentLoaded', () => {
    const gamingModelContainer = document.getElementById('gaming-model-container');
    const hint = document.getElementById('gaming-interaction-hint');

    if (gamingModelContainer && hint) {
        gamingModelContainer.addEventListener('click', () => {
            hint.style.display = 'none';
        });
    }
});
