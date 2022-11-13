$(document).ready(function() {

	var mainHeader = $('.cd-auto-hide-header'),
    secondaryNavigation = $('.cd-secondary-nav'),
    //this applies only if secondary nav is below intro section
    belowNavHeroContent = $('.sub-nav-hero'),
    headerHeight = mainHeader.height();
  
  //set scrolling variables
var scrolling = false,
    previousTop = 0,
    currentTop = 0,
    scrollDelta = 10,
    scrollOffset = 150;

    mainHeader.on('click', '.nav-trigger', function(event){
    // open primary navigation on mobile
    event.preventDefault();
    mainHeader.toggleClass('nav-open');
    });

    $(window).on('scroll', function(){
      if( !scrolling ) {
        scrolling = true;
        (!window.requestAnimationFrame)
          ? setTimeout(autoHideHeader, 250)
          : requestAnimationFrame(autoHideHeader);
      }
    });

    $(window).on('resize', function(){
      headerHeight = mainHeader.height();
    });

    function autoHideHeader() {
      var currentTop = $(window).scrollTop();

      ( belowNavHeroContent.length > 0 ) 
      ? checkStickyNavigation(currentTop) // secondary navigation below intro
      : checkSimpleNavigation(currentTop);

      previousTop = currentTop;
      scrolling = false;
    }

    function checkSimpleNavigation(currentTop) {
      //there's no secondary nav or secondary nav is below primary nav
      if (previousTop - currentTop > scrollDelta) {
        //if scrolling up...
        mainHeader.removeClass('is-hidden');
      } else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
        //if scrolling down...
        mainHeader.addClass('is-hidden');
      }
    }

    function checkStickyNavigation(currentTop) {
      //secondary nav below intro section - sticky secondary nav
      var secondaryNavOffsetTop = belowNavHeroContent.offset().top - secondaryNavigation.height() - mainHeader.height();
      
      if (previousTop >= currentTop ) {
        //if scrolling up... 
        if( currentTop < secondaryNavOffsetTop ) {
          //secondary nav is not fixed
          mainHeader.removeClass('is-hidden');
          secondaryNavigation.removeClass('fixed slide-up');
          belowNavHeroContent.removeClass('secondary-nav-fixed');
        } else if( previousTop - currentTop > scrollDelta ) {
          //secondary nav is fixed
          mainHeader.removeClass('is-hidden');
          secondaryNavigation.removeClass('slide-up').addClass('fixed'); 
          belowNavHeroContent.addClass('secondary-nav-fixed');
        }
          
      } else {
          //if scrolling down...  
          if( currentTop > secondaryNavOffsetTop + scrollOffset ) {
            //hide primary nav
            mainHeader.addClass('is-hidden');
            secondaryNavigation.addClass('fixed slide-up');
            belowNavHeroContent.addClass('secondary-nav-fixed');
          } else if( currentTop > secondaryNavOffsetTop ) {
            //once the secondary nav is fixed, do not hide primary nav if you haven't scrolled more than scrollOffset 
            mainHeader.removeClass('is-hidden');
            secondaryNavigation.addClass('fixed').removeClass('slide-up');
            belowNavHeroContent.addClass('secondary-nav-fixed');
          }

        }
    }




	//Модальное окно
	$(".popup-form").magnificPopup({
		type: 'inline',
    removalDelay: 300,
    mainClass: 'my-mfp-zoom-in'
	});

	var groups = {};
	$('.popup-gallery').each(function() {
	  var id = parseInt($(this).attr('data-group'), 10);
	  
	  if(!groups[id]) {
	    groups[id] = [];
	  } 
	  
	  groups[id].push( this );
	});


	$.each(groups, function() {
	  
	  $(this).magnificPopup({
	  		delegate: 'a',
	      type: 'image',
	      closeOnContentClick: true,
	      closeBtnInside: false,
	      gallery: { enabled:true }
	  })
	  
	});



	

	
	$('.phone-mask').mask("+7(999)999-9999", {autoclear: false});

	function isValidPhone(phoneAddress) {
    var pattern = new RegExp(/\+\d{1}\(\d{3}\)\d{3}-\d{4}/g);
    return pattern.test(phoneAddress);
  }


	$( "#form-call" ).on( "submit", function(e) {
    var name = $('#form-call .name').val();
    var phone = $("#form-call .tele").val();
    var type = $("#form-call .type").val();

    if (name == ""){
        $('#form-call .name').addClass('inerror');
        setTimeout("$('#form-call .name').removeClass('inerror');", 1000);
        send_name = '0';
     }
     else{
        send_name = '1';
     }     
     if (isValidPhone(phone) == false){
         $('#form-call .tele').addClass('inerror');
         setTimeout("$('#form-call .tele').removeClass('inerror');", 1000);
         send_phone = '0';
      }
      else{ 
          send_phone = '1'; 
      }
     if (send_name == '1' && send_phone == '1'){
      
      $.ajax({
        type: 'POST',
        url: '/call.php',
        data: "name=" + name + "&phone=" + phone + "&type=" + type,
        dataType: "html",
        success: function(data) {
        	$('#popup-call .form-hidd').fadeOut(200, function() {  
			      $('#popup-call .form-success').fadeIn(200);
			    });
			    setTimeout(function() {
			      $.magnificPopup.close();
			      $('#popup-call .reset').val('');
			      $('#popup-call .form-success').fadeOut(200, function() {  
				      $('#popup-call .form-hidd').fadeIn(200);
				    });
			    }, 10000);
      	}
      });
    }
    e.preventDefault();
  });



	$( ".click_js" ).on( "click", function() {
    var title = $(this).attr('data');
    		form = $('#popup-call');
    form.find('h3').text(title);
    form.find('input[name="type"]').val(title);
  });






	//Меню при скролле
	$(window).scroll(function() {
	var w = $(window).width();
	var scrollTop = $(window).scrollTop();

	if(w > 767) {
    if (scrollTop > 1) {
      $(".header").addClass("menu-fixed");
    } else {
      $(".header").removeClass("menu-fixed");
    }
  }
  else{
  	$(".header").removeClass("menu-fixed");
  }
  });


  var swiper = new Swiper('.slider-item', {
		slidesPerView: 1,
	  navigation: {
	    nextEl: '.swiper-button-next',
	    prevEl: '.swiper-button-prev',
	  },
    pagination: {
      el: '.swiper-pagination',
    }
	});



  $( ".menu-button-opener" ).on( "click", function() {   	
   	if($(".left-menu").hasClass('open')) {
	    $('.left-menu').removeClass('open');
	    $('body').removeClass('open-menu');
	  } else {
	    $('.left-menu').addClass('open');
	    $('body').addClass('open-menu');
	  }
  });
	if($(".over").is(':visible')) {
		$( ".over" ).on( "click", function() {
			$('.left-menu').removeClass('open');
	    $('body').removeClass('open-menu');
		});
		$( ".close-menu" ).on( "click", function() {
			$('.left-menu').removeClass('open');
	    $('body').removeClass('open-menu');
		});
	}


 //Плавный скролл до якоря
	$("a.ancLinks").click(function () { 
	  var elementClick = $(this).attr("href");
	  var destination = $(elementClick).offset().top - 0;
	  $('html,body').animate( { scrollTop: destination }, 1100 );
	  return false;
	});


	//Вверх
	$('#toTop').click(function() {
		$('body,html').animate({scrollTop:0},800);
	});




});