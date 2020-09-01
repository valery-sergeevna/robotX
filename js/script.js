'use strict';

//animation on scroll
AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 80, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 400, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: true, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});

//jquery
$(document).ready(function () {

    //slick-slider
    $('.main-slider').slick({
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        dots: true,
        pauseOnHover: false,
        pauseOnDotsHover: true,
        fade: true,
    });

    //anchor smooth scrolling
    $("a.nav__link").on("click", function (e) {
        e.preventDefault();
        let anchor = $(this).attr('href');
        $('html, body').stop().animate({
            scrollTop: $(anchor).offset().top - 60
        }, 800);
    });

    //scrolling to up
    $(function () {
        $("#up").hide();

        $(window).scroll(function () {
            if ($(this).scrollTop() > $('.header').innerHeight()) {
                $("#up").fadeIn();
            } else {
                $("#up").fadeOut();
            }
        });

        $("#up").click(function () {
            $("body,html").animate({
                scrollTop: 0
            }, 800);
            return false;
        });
    });

});


window.addEventListener("DOMContentLoaded", () => {

    //phone mask
    const elements = document.querySelectorAll('#phone');
    for (let i = 0; i < elements.length; i++) {
        new IMask(elements[i], {
            mask: '+{38} (000) 000-00-00',
        });
    }

    //add active class 
    const addActiveClass = (parentSelector, itemsSelector, className, nameTag) => {
        const parent = document.querySelector(parentSelector),
            items = document.querySelectorAll(itemsSelector);

        parent.addEventListener('click', (e) => {
            const target = e.target;
            if (target.tagName === nameTag) {
                items.forEach(item => item.classList.remove(className));
                target.classList.add(className);
            }
        });
    };

    //add active class to nav__link while scrolling

    window.addEventListener('scroll', () => {
        let scrollDistance = window.scrollY;
        document.querySelectorAll('.scroll').forEach((el, i) => {
            if (el.offsetTop - document.querySelector('.header__inner').clientHeight <= scrollDistance) {
                document.querySelectorAll('.nav__link').forEach((el) => {
                    if (el.classList.contains('nav__link_active')) {
                        el.classList.remove('nav__link_active');
                    }
                });
                document.querySelectorAll('.nav__link')[i].classList.add('nav__link_active');
            }
        });
    });

    const headerLink = document.querySelector(".header__link"),
        headerForm = document.querySelector(".header-form"),
        content = headerLink.innerHTML;

    // header-form opens/hides
    const openForm = (form) => {
        if (form.classList.contains('open')) {
            form.classList.remove('open');
            headerLink.innerHTML = content;
        } else {
            form.classList.add('open');
            headerLink.innerHTML = '<i class="fas fa-times"></i>';
            //if header-form is opened, burger-menu closed
            menu.classList.remove('active');
            burgerBtn.classList.remove('active');
        }
    };

    //hamburger-menu
    const burgerBtn = document.querySelector('.nav-toggle'),
        menu = document.querySelector('.nav');

    const changeVisibilityMenu = () => {
        if (menu.classList.contains('active')) {
            menu.classList.remove('active');
        } else {
            menu.classList.add('active');
            //if menu is opened, header-form closed
            headerForm.classList.remove('open');
            headerLink.innerHTML = content;
        }
    };

    burgerBtn.addEventListener('click', () => {
        burgerBtn.classList.toggle('active');
        changeVisibilityMenu();
    });

    //filter elements
    const galleryLink = document.querySelector('.gallery__link'),
        galleryItems = galleryLink.querySelectorAll('.gallery__item'),
        btnAll = galleryLink.querySelector('.all'),
        btnCorporate = galleryLink.querySelector('.corporate'),
        btnResponsive = galleryLink.querySelector('.responsive'),
        btnMobile = galleryLink.querySelector('.mobile'),
        btnWordpress = galleryLink.querySelector('.wordpress'),
        btnHosting = galleryLink.querySelector('.hosting'),
        galleryPhotography = document.querySelector('.gallery__photography'),
        markAll = galleryPhotography.querySelectorAll('.all'),
        markCorporate = galleryPhotography.querySelectorAll('.corporate'),
        markResponsive = galleryPhotography.querySelectorAll('.responsive'),
        markMobile = galleryPhotography.querySelectorAll('.mobile'),
        markWordpress = galleryPhotography.querySelectorAll('.wordpress'),
        markHosting = galleryPhotography.querySelectorAll('.hosting');

    const typeFilter = (markType) => {
        markAll.forEach(mark => {
            mark.style.display = "none";
            mark.classList.remove('fadeIn');
        });

        if (markType) {
            markType.forEach(mark => {
                mark.style.display = 'block';
                mark.classList.add('fadeIn');
            });
        }
    };

    btnAll.addEventListener('click', () => {
        typeFilter(markAll);
    });

    btnCorporate.addEventListener('click', () => {
        typeFilter(markCorporate);
    });

    btnResponsive.addEventListener('click', () => {
        typeFilter(markResponsive);
    });

    btnMobile.addEventListener('click', () => {
        typeFilter(markMobile);
    });

    btnWordpress.addEventListener('click', () => {
        typeFilter(markWordpress);
    });

    btnHosting.addEventListener('click', () => {
        typeFilter(markHosting);
    });

    //add/remove active class
    addActiveClass('.gallery__link', '.gallery__item', 'gallery__item_active', 'P');

    //work with formData using fetch
    const forms = () => {
        const form = document.querySelectorAll('form'),
            inputs = document.querySelectorAll('input'),
            textArea = document.querySelectorAll('textarea');

        const message = {
            loading: "Loading...",
            success: "Thanks, we will call you in 10 minutes!",
            failure: "It was failure..",
        };

        const postData = async (url, data) => {
            document.querySelector('.status').textContent = message.loading;

            let res = await fetch(url, {
                method: "POST",
                body: data,
            });

            return await res.text();
        };

        //clear inputs
        const clearInputs = () => {
            inputs.forEach(item => {
                item.value = '';
            });
            textArea.forEach(item => {
                item.value = '';
            });
        };

        form.forEach(item => {
            item.addEventListener('submit', (e) => {
                e.preventDefault();

                let statusMessage = document.createElement('div');
                statusMessage.classList.add('status');
                item.appendChild(statusMessage);

                const formData = new FormData(item);

                postData('server.php', formData)
                    .then(res => {
                        console.log(res);
                        statusMessage.textContent = message.success;
                    })
                    .catch(() => statusMessage.textContent = message.failure)
                    .finally(() => {
                        clearInputs();
                        setTimeout(() => {
                            statusMessage.remove();
                            headerForm.classList.remove('open');
                            headerLink.remove();
                            document.querySelector('.pageup').classList.add('position');
                        }, 5000);
                    });

            });
        });
    };

    headerLink.addEventListener('click', () => {
        openForm(headerForm);
    });

    forms();

});



