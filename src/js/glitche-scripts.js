$(function () {
    'use strict';

    $(window).unload(function () {
    });

    /* Set full height in blocks */
    var width = $(window).width();
    var height = $(window).height();

    $('.section.started').css({'height': height - 60});

    /* Typed preload text */
    $('.typed-load').typed({
        stringsElement: $('.typing-load'),
        loop: true
    });

    /* Preloader */
    $(window).load(function () {

        $(".preloader .pre-inner").fadeOut(800, function () {
            /* Preload hide */
            $('.preloader').fadeOut();

            $('body').addClass('loaded');

            /* Typed subtitle */
            $('.typed-subtitle').typed({
                stringsElement: $('.typing-subtitle'),
                loop: true
            });
        });
    });

    /*Menu mobile*/
    $('header').on('click', '.menu-btn', function () {
        if ($('header').hasClass('active')) {
            $('header').removeClass('active');
            $('body').addClass('loaded');
        } else {
            $('header').addClass('active');
            $('body').removeClass('loaded');
        }

        return false;
    });

    /* Hide mouse button on scroll */
    $(window).scroll(function () {
        if ($(this).scrollTop() >= 1 /*$('#blue_bor').offset().top*/) {
            $('.mouse_btn').fadeOut();
        }
        else {
            $('.mouse_btn').fadeIn();
        }
    });

    /* On click mouse button, page scroll down */
    $('.section').on('click', '.mouse_btn', function () {
        $('body,html').animate({
            scrollTop: height - 150
        }, 800);
    });

    $('body').on({
        mouseenter: function () {
            $(this).addClass('glitch-effect-white');
        },
        mouseleave: function () {
            $(this).removeClass('glitch-effect-white');
            $('.top-menu ul li.active a.btn').addClass('glitch-effect-white');
        }
    }, 'a.btn, .btn');

    /* Validate contact form */
    $("#cform").validate({
        rules: {
            name: {
                required: true
            },
            message: {
                required: true
            },
            email: {
                required: true,
                email: true
            }
        },
        success: "valid",
        submitHandler: function () {
            $.ajax({
                url: '/mailer/feedback.php',
                type: 'post',
                dataType: 'json',
                data: 'name=' + $("#cform").find('input[name="name"]').val() + '&email=' + $("#cform").find('input[name="email"]').val() + '&message=' + $("#cform").find('textarea[name="message"]').val(),
                beforeSend: function () {

                },
                complete: function () {

                },
                success: function (data) {
                    $('#cform').fadeOut();
                    $('.alert-success').delay(1000).fadeIn();
                }
            });
        }
    });

    /* Validate commect form */
    $("#comment_form").validate({
        rules: {
            name: {
                required: true
            },
            message: {
                required: true
            },
            email: {
                required: true,
                email: true
            }
        },
        success: "valid",
        submitHandler: function () {
        }
    });

    /* Initialize masonry items */
    var $container = $('.box-items');

    $container.imagesLoaded(function () {
        $container.multipleFilterMasonry({
            itemSelector: '.box-item',
            filtersGroupSelector: '.filters',
            percentPosition: true,
            gutter: 0
        });
    });

    /* Initialize masonry filter */
    $('.filters label').on('change', 'input[type="checkbox"]', function () {
        if ($(this).is(':checked')) {
            $(this).parent().addClass('glitch-effect');
        }
        else {
            $(this).parent().removeClass('glitch-effect');
        }
        /* Refresh Portfolio magnific popup */
        $('.has-popup').magnificPopup({
            type: 'inline',
            overflowY: 'auto',
            closeBtnInside: true,
            mainClass: 'mfp-fade'
        });
    });

    /* Portfolio magnific popup */
    $('.has-popup').magnificPopup({
        type: 'inline',
        overflowY: 'auto',
        closeBtnInside: true,
        mainClass: 'mfp-fade'
    });

    /* Resize function */
    $(window).resize(function () {
        var width = $(window).width();
        var height = $(window).height();

        $('.section.started').css({'height': height - 60});
    });

    if (width < 840) {
        $('.section.started').css({'height': height - 30});
    }


    var sections = $('section')
        , nav = $('.top-menu')
        , nav_height = nav.outerHeight();

    $(window).on('scroll', function () {
        var cur_pos = $(this).scrollTop();

        sections.each(function() {
            var top = $(this).offset().top - nav_height,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find('li').removeClass('active');
                sections.removeClass('active');

                $(this).addClass('active');

                nav.find('a[href="#'+$(this).attr('id')+'"]').parent().addClass('active');
            }
        });
    });
});