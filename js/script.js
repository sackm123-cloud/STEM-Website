/*==================================================
    AI STEM Innovation Website
    script.js
    ========= PART 1A =========
    Utilities
    DOM Ready
    Helper Functions
===================================================*/

"use strict";

/*=========================================
    DOM READY
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    App.init();

});

/*=========================================
    APPLICATION
=========================================*/

const App = {

    init() {

        Utils.cacheDOM();

        Utils.bindGlobalEvents();

        console.log("AI STEM Innovation Website Loaded");

    }

};

/*=========================================
    UTILITY MODULE
=========================================*/

const Utils = {

    elements: {},

    /*---------------------------------------
        CACHE DOM
    ---------------------------------------*/

    cacheDOM() {

        this.elements.body = document.body;
        this.elements.header = document.querySelector("header");
        this.elements.nav = document.querySelector("nav");
        this.elements.menuBtn = document.querySelector(".menu-btn");

        this.elements.scrollTop =
            document.getElementById("scrollTop");

    },

    /*---------------------------------------
        BIND EVENTS
    ---------------------------------------*/

    bindGlobalEvents() {

        window.addEventListener("resize", this.debounce(() => {

            console.log("Window resized");

        }, 300));

    },

    /*---------------------------------------
        SELECT ONE
    ---------------------------------------*/

    $(selector) {

        return document.querySelector(selector);

    },

    /*---------------------------------------
        SELECT ALL
    ---------------------------------------*/

    $$(selector) {

        return document.querySelectorAll(selector);

    },

    /*---------------------------------------
        CREATE ELEMENT
    ---------------------------------------*/

    create(tag, className = "") {

        const el = document.createElement(tag);

        if (className !== "") {

            el.className = className;

        }

        return el;

    },

    /*---------------------------------------
        SHOW
    ---------------------------------------*/

    show(element) {

        if (!element) return;

        element.style.display = "block";

    },

    /*---------------------------------------
        HIDE
    ---------------------------------------*/

    hide(element) {

        if (!element) return;

        element.style.display = "none";

    },

    /*---------------------------------------
        TOGGLE CLASS
    ---------------------------------------*/

    toggle(element, className) {

        if (!element) return;

        element.classList.toggle(className);

    },

    /*---------------------------------------
        ADD CLASS
    ---------------------------------------*/

    addClass(element, className) {

        if (!element) return;

        element.classList.add(className);

    },

    /*---------------------------------------
        REMOVE CLASS
    ---------------------------------------*/

    removeClass(element, className) {

        if (!element) return;

        element.classList.remove(className);

    },

    /*---------------------------------------
        HAS CLASS
    ---------------------------------------*/

    hasClass(element, className) {

        if (!element) return false;

        return element.classList.contains(className);

    },

    /*---------------------------------------
        SMOOTH SCROLL
    ---------------------------------------*/

    scrollTo(selector) {

        const target = this.$(selector);

        if (!target) return;

        target.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    },

    /*---------------------------------------
        RANDOM NUMBER
    ---------------------------------------*/

    random(min, max) {

        return Math.floor(

            Math.random() * (max - min + 1)

        ) + min;

    },

    /*---------------------------------------
        FORMAT DATE
    ---------------------------------------*/

    formatDate(date = new Date()) {

        return date.toLocaleDateString("en-IN", {

            day: "2-digit",

            month: "short",

            year: "numeric"

        });

    },

    /*---------------------------------------
        DEBOUNCE
    ---------------------------------------*/

    debounce(callback, delay = 300) {

        let timer;

        return (...args) => {

            clearTimeout(timer);

            timer = setTimeout(() => {

                callback(...args);

            }, delay);

        };

    },

    /*---------------------------------------
        THROTTLE
    ---------------------------------------*/

    throttle(callback, limit = 200) {

        let waiting = false;

        return (...args) => {

            if (!waiting) {

                callback(...args);

                waiting = true;

                setTimeout(() => {

                    waiting = false;

                }, limit);

            }

        };

    },

    /*---------------------------------------
        LOCAL STORAGE SAVE
    ---------------------------------------*/

    save(key, value) {

        localStorage.setItem(

            key,

            JSON.stringify(value)

        );

    },

    /*---------------------------------------
        LOCAL STORAGE LOAD
    ---------------------------------------*/

    load(key) {

        const value = localStorage.getItem(key);

        if (!value) return null;

        return JSON.parse(value);

    },

    /*---------------------------------------
        REMOVE STORAGE
    ---------------------------------------*/

    remove(key) {

        localStorage.removeItem(key);

    },

    /*---------------------------------------
        EVENT DELEGATION
    ---------------------------------------*/

    on(parent, event, selector, handler) {

        parent.addEventListener(event, function(e){

            const target = e.target.closest(selector);

            if(target){

                handler.call(target, e);

            }

        });

    },

    /*---------------------------------------
        FADE IN
    ---------------------------------------*/

    fadeIn(element){

        if(!element) return;

        element.style.opacity = 0;

        element.style.display = "block";

        let opacity = 0;

        const timer = setInterval(()=>{

            opacity += 0.05;

            element.style.opacity = opacity;

            if(opacity >= 1){

                clearInterval(timer);

            }

        },15);

    },

    /*---------------------------------------
        FADE OUT
    ---------------------------------------*/

    fadeOut(element){

        if(!element) return;

        let opacity = 1;

        const timer = setInterval(()=>{

            opacity -= 0.05;

            element.style.opacity = opacity;

            if(opacity <=0){

                clearInterval(timer);

                element.style.display="none";

            }

        },15);

    }

};

/*==================================================
    END OF PART 1A
===================================================*/
/*==================================================
    AI STEM Innovation Website
    script.js
    ========= PART 1B-1 =========
    Mobile Navigation Menu
===================================================*/

"use strict";

/*=========================================
    MOBILE MENU MODULE
=========================================*/

const MobileMenu = {

    menuBtn: null,
    nav: null,
    body: null,

    init() {

        this.menuBtn = document.querySelector(".menu-btn");
        this.nav = document.querySelector("nav");
        this.body = document.body;

        if (!this.menuBtn || !this.nav) return;

        this.bindEvents();

    },

    bindEvents() {

        /* Toggle Button */

        this.menuBtn.addEventListener(
            "click",
            this.toggleMenu.bind(this)
        );

        /* Close when clicking menu links */

        this.nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                this.closeMenu();

            });

        });

        /* Close when clicking outside */

        document.addEventListener(
            "click",
            this.handleOutsideClick.bind(this)
        );

    },

    /*=====================================
        Toggle Menu
    =====================================*/

    toggleMenu(e) {

        e.stopPropagation();

        this.nav.classList.toggle("active");

        this.menuBtn.classList.toggle("active");

        this.body.classList.toggle("menu-open");

        this.updateIcon();

    },

    /*=====================================
        Close Menu
    =====================================*/

    closeMenu() {

        this.nav.classList.remove("active");

        this.menuBtn.classList.remove("active");

        this.body.classList.remove("menu-open");

        this.updateIcon();

    },

    /*=====================================
        Outside Click
    =====================================*/

    handleOutsideClick(e) {

        if (
            !this.nav.contains(e.target) &&
            !this.menuBtn.contains(e.target)
        ) {

            this.closeMenu();

        }

    },

    /*=====================================
        Update Icon
    =====================================*/

    updateIcon() {

        const icon = this.menuBtn.querySelector("i");

        if (!icon) return;

        if (this.nav.classList.contains("active")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

            this.menuBtn.setAttribute(
                "aria-label",
                "Close Menu"
            );

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

            this.menuBtn.setAttribute(
                "aria-label",
                "Open Menu"
            );

        }

    }

};

/*=========================================
    INITIALIZE MODULE
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    MobileMenu.init();

});

/*==================================================
    END OF PART 1B-1
===================================================*/
/*==================================================
    AI STEM Innovation Website
    script.js
    ========= PART 1B-2A =========
    Sticky Header
    Header Animation
    ESC Key Support
===================================================*/

"use strict";

/*=========================================
    HEADER MODULE
=========================================*/

const Header = {

    header: null,
    menuBtn: null,
    nav: null,

    scrollOffset: 80,

    init() {

        this.header = document.querySelector("header");
        this.menuBtn = document.querySelector(".menu-btn");
        this.nav = document.querySelector("nav");

        if (!this.header) return;

        this.bindEvents();

        this.handleScroll();

    },

    /*=====================================
        EVENTS
    =====================================*/

    bindEvents() {

        window.addEventListener(
            "scroll",
            Utils.throttle(
                this.handleScroll.bind(this),
                20
            )
        );

        document.addEventListener(
            "keydown",
            this.handleKeyboard.bind(this)
        );

    },

    /*=====================================
        STICKY HEADER
    =====================================*/

    handleScroll() {

        if (window.scrollY > this.scrollOffset) {

            this.header.classList.add("sticky");
            this.header.classList.add("header-shadow");

        } else {

            this.header.classList.remove("sticky");
            this.header.classList.remove("header-shadow");

        }

    },

    /*=====================================
        ESC CLOSES MENU
    =====================================*/

    handleKeyboard(event) {

        if (event.key !== "Escape") return;

        if (!this.nav) return;

        if (!this.nav.classList.contains("active")) return;

        this.nav.classList.remove("active");

        document.body.classList.remove("menu-open");

        if (this.menuBtn) {

            this.menuBtn.classList.remove("active");

            const icon = this.menuBtn.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

            this.menuBtn.setAttribute(
                "aria-label",
                "Open Menu"
            );

            this.menuBtn.focus();

        }

    }

};

/*=========================================
    INITIALIZE
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    Header.init();

});

/*==================================================
    END OF PART 1B-2A
===================================================*/
/*==================================================
    AI STEM Innovation Website
    script.js
    ========= PART 1B-2B-1A =========
    Current Page Detection
    Active Navigation Highlighting
===================================================*/

"use strict";

const Navigation = {

    init() {

        this.highlightCurrentPage();

    },

    highlightCurrentPage() {

        const links = document.querySelectorAll("nav a");

        if (!links.length) return;

        let currentPage =
            window.location.pathname.split("/").pop();

        if (
            currentPage === "" ||
            currentPage === "/"
        ) {
            currentPage = "index.html";
        }

        links.forEach(link => {

            const href = link.getAttribute("href");

            if (!href) return;

            /* Ignore anchors, javascript, mail, tel */

            if (
                href.startsWith("#") ||
                href.startsWith("javascript:") ||
                href.startsWith("mailto:") ||
                href.startsWith("tel:")
            ) {
                return;
            }

            link.classList.remove("active");

            const normalizedHref =
                href.split("?")[0].split("#")[0];

            if (normalizedHref === currentPage) {

                link.classList.add("active");

            }

        });

    }

};

/*=========================================
    INITIALIZE
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    Navigation.init();

});

/*==================================================
    END OF PART 1B-2B-1A
===================================================*/
/*==================================================
    AI STEM Innovation Website
    script.js
    ========= PART 1B-2B-1B =========
    ARIA Current
    Hash Link Handling
    Navigation Synchronization
===================================================*/

"use strict";

const NavigationAccessibility = {

    init() {

        this.links = document.querySelectorAll("nav a");

        if (!this.links.length) return;

        this.syncAriaCurrent();
        this.bindHashLinks();

    },

    /*=====================================
        Set aria-current="page"
    =====================================*/

    syncAriaCurrent() {

        this.links.forEach(link => {

            if (link.classList.contains("active")) {

                link.setAttribute("aria-current", "page");

            } else {

                link.removeAttribute("aria-current");

            }

        });

    },

    /*=====================================
        Handle In-Page Anchor Links
    =====================================*/

    bindHashLinks() {

        this.links.forEach(link => {

            const href = link.getAttribute("href");

            if (!href || !href.startsWith("#")) return;

            link.addEventListener("click", e => {

                e.preventDefault();

                const target = document.querySelector(href);

                if (!target) return;

                target.scrollIntoView({

                    behavior: "smooth",
                    block: "start"

                });

                /* Move keyboard focus */

                if (!target.hasAttribute("tabindex")) {

                    target.setAttribute("tabindex", "-1");

                }

                target.focus({
                    preventScroll: true
                });

            });

        });

    },

    /*=====================================
        Refresh Navigation State
    =====================================*/

    refresh() {

        this.syncAriaCurrent();

    }

};

/*=========================================
    INITIALIZE
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    NavigationAccessibility.init();

});

/*==================================================
    END OF PART 1B-2B-1B
===================================================*/
/*==================================================
    AI STEM Innovation Website
    script.js
    ========= PART 1B-2B-2 =========
    Window Resize
    Accessibility
    Final Initialization
===================================================*/

"use strict";

const AppController = {

    mobileWidth: 992,

    init() {

        this.cacheDOM();
        this.bindEvents();
        this.handleResize();

    },

    /*=====================================
        Cache Elements
    =====================================*/

    cacheDOM() {

        this.header = document.querySelector("header");
        this.nav = document.querySelector("nav");
        this.menuBtn = document.querySelector(".menu-btn");

    },

    /*=====================================
        Events
    =====================================*/

    bindEvents() {

        window.addEventListener(
            "resize",
            Utils.debounce(
                this.handleResize.bind(this),
                200
            )
        );

    },

    /*=====================================
        Window Resize
    =====================================*/

    handleResize() {

        if (!this.nav) return;

        if (window.innerWidth > this.mobileWidth) {

            this.nav.classList.remove("active");

            document.body.classList.remove("menu-open");

            if (this.menuBtn) {

                this.menuBtn.classList.remove("active");

                this.menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                const icon =
                    this.menuBtn.querySelector("i");

                if (icon) {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                }

            }

            this.nav.removeAttribute("aria-hidden");

        } else {

            this.nav.setAttribute(
                "aria-hidden",
                this.nav.classList.contains("active")
                    ? "false"
                    : "true"
            );

        }

    }

};

/*==================================================
    ACCESSIBILITY HELPERS
===================================================*/

const Accessibility = {

    init() {

        this.menuBtn = document.querySelector(".menu-btn");
        this.nav = document.querySelector("nav");

        if (!this.menuBtn || !this.nav) return;

        this.setup();

    },

    setup() {

        this.menuBtn.setAttribute(
            "aria-expanded",
            "false"
        );

        this.menuBtn.setAttribute(
            "aria-controls",
            "main-navigation"
        );

        if (!this.nav.id) {

            this.nav.id = "main-navigation";

        }

    },

    /*=====================================
        Update Menu State
    =====================================*/

    update(isOpen) {

        if (!this.menuBtn || !this.nav) return;

        this.menuBtn.setAttribute(
            "aria-expanded",
            isOpen
        );

        this.nav.setAttribute(
            "aria-hidden",
            !isOpen
        );

    }

};

/*==================================================
    FINAL APPLICATION INITIALIZATION
===================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /* Utilities */
    if (typeof App !== "undefined") {
        App.init();
    }

    /* Mobile Menu */
    if (typeof MobileMenu !== "undefined") {
        MobileMenu.init();
    }

    /* Sticky Header */
    if (typeof Header !== "undefined") {
        Header.init();
    }

    /* Navigation */
    if (typeof Navigation !== "undefined") {
        Navigation.init();
    }

    /* Navigation Accessibility */
    if (typeof NavigationAccessibility !== "undefined") {
        NavigationAccessibility.init();
    }

    /* Resize Controller */
    AppController.init();

    /* Accessibility */
    Accessibility.init();

    console.log(
        "AI STEM Innovation Website Initialized Successfully"
    );

});

/*==================================================
    END OF PART 1B-2B-2
===================================================*/
/*==================================================
    AI STEM Innovation Website
    script.js
    ========= PART 1C-1 =========
    Scroll Progress Bar
    Scroll To Top Button
===================================================*/

"use strict";

const ScrollManager = {

    progressBar: null,
    scrollButton: null,

    showButtonAfter: 300,

    init() {

        this.cacheDOM();
        this.createProgressBar();
        this.bindEvents();

        this.update();

    },

    /*=========================================
        CACHE DOM
    =========================================*/

    cacheDOM() {

        this.scrollButton =
            document.getElementById("scrollTop");

        this.progressBar =
            document.getElementById("scroll-progress");

    },

    /*=========================================
        CREATE PROGRESS BAR
    =========================================*/

    createProgressBar() {

        if (this.progressBar) return;

        this.progressBar = document.createElement("div");

        this.progressBar.id = "scroll-progress";

        document.body.prepend(this.progressBar);

    },

    /*=========================================
        EVENTS
    =========================================*/

    bindEvents() {

        window.addEventListener(
            "scroll",
            Utils.throttle(
                this.update.bind(this),
                10
            )
        );

        window.addEventListener(
            "resize",
            Utils.debounce(
                this.update.bind(this),
                200
            )
        );

        if (this.scrollButton) {

            this.scrollButton.addEventListener(
                "click",
                this.scrollToTop.bind(this)
            );

        }

    },

    /*=========================================
        UPDATE
    =========================================*/

    update() {

        this.updateProgressBar();

        this.updateScrollButton();

    },

    /*=========================================
        PROGRESS BAR
    =========================================*/

    updateProgressBar() {

        const scrollTop =
            window.pageYOffset ||
            document.documentElement.scrollTop;

        const scrollHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        let percent = 0;

        if (scrollHeight > 0) {

            percent =
                (scrollTop / scrollHeight) * 100;

        }

        this.progressBar.style.width =
            percent + "%";

    },

    /*=========================================
        SCROLL BUTTON
    =========================================*/

    updateScrollButton() {

        if (!this.scrollButton) return;

        if (
            window.pageYOffset >
            this.showButtonAfter
        ) {

            this.scrollButton.style.display =
                "flex";

            requestAnimationFrame(() => {

                this.scrollButton.style.opacity = "1";
                this.scrollButton.style.transform =
                    "translateY(0)";

            });

        } else {

            this.scrollButton.style.opacity = "0";

            this.scrollButton.style.transform =
                "translateY(20px)";

            setTimeout(() => {

                if (
                    window.pageYOffset <=
                    this.showButtonAfter
                ) {

                    this.scrollButton.style.display =
                        "none";

                }

            }, 250);

        }

    },

    /*=========================================
        SCROLL TO TOP
    =========================================*/

    scrollToTop() {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }

};

/*=========================================
    INITIALIZE
=========================================*/

document.addEventListener(
    "DOMContentLoaded",
    () => {

        ScrollManager.init();

    }
);

/*==================================================
    END OF PART 1C-1
===================================================*/
/*==================================================
    AI STEM Innovation Website
    script.js
    ========= PART 1C-2A =========
    Smooth Scrolling
    Fixed Header Offset
    Accessibility Focus
===================================================*/

"use strict";

const SmoothScroll = {

    headerHeight: 80,

    init() {

        this.cacheDOM();
        this.bindEvents();

    },

    /*=========================================
        CACHE DOM
    =========================================*/

    cacheDOM() {

        this.header = document.querySelector("header");

        this.links = document.querySelectorAll(
            'a[href^="#"]:not([href="#"])'
        );

    },

    /*=========================================
        EVENTS
    =========================================*/

    bindEvents() {

        this.links.forEach(link => {

            link.addEventListener(
                "click",
                this.handleClick.bind(this)
            );

        });

    },

    /*=========================================
        CLICK
    =========================================*/

    handleClick(event) {

        const href =
            event.currentTarget.getAttribute("href");

        if (!href) return;

        const target =
            document.querySelector(href);

        if (!target) return;

        event.preventDefault();

        this.scrollTo(target);

    },

    /*=========================================
        SCROLL
    =========================================*/

    scrollTo(target) {

        const headerHeight =
            this.header
                ? this.header.offsetHeight
                : this.headerHeight;

        const position =
            target.getBoundingClientRect().top +
            window.pageYOffset -
            headerHeight;

        window.scrollTo({

            top: position,

            behavior: "smooth"

        });

        this.moveFocus(target);

        history.pushState(
            null,
            "",
            "#" + target.id
        );

    },

    /*=========================================
        ACCESSIBILITY
    =========================================*/

    moveFocus(target) {

        if (!target.hasAttribute("tabindex")) {

            target.setAttribute(
                "tabindex",
                "-1"
            );

        }

        setTimeout(() => {

            target.focus({
                preventScroll: true
            });

        }, 450);

    }

};

/*=========================================
    INITIALIZE
=========================================*/

document.addEventListener(
    "DOMContentLoaded",
    () => {

        SmoothScroll.init();

    }
);

/*==================================================
    END OF PART 1C-2A
===================================================*/
/*==================================================
    AI STEM Innovation Website
    script.js
    ========= PART 1C-2B-1 =========
    Scroll Position Memory
    Restore on Reload
===================================================*/

"use strict";

const ScrollMemory = {

    storageKey: "ai-stem-scroll-position",

    init() {

        this.restorePosition();
        this.bindEvents();

    },

    /*=========================================
        EVENTS
    =========================================*/

    bindEvents() {

        window.addEventListener(
            "scroll",
            Utils.throttle(() => {

                this.savePosition();

            }, 200)
        );

        window.addEventListener(
            "beforeunload",
            () => {

                this.savePosition();

            }
        );

    },

    /*=========================================
        SAVE POSITION
    =========================================*/

    savePosition() {

        /* Don't overwrite if user is using anchors */

        if (window.location.hash) return;

        const position = {

            x: window.scrollX,

            y: window.scrollY,

            page: window.location.pathname

        };

        sessionStorage.setItem(

            this.storageKey,

            JSON.stringify(position)

        );

    },

    /*=========================================
        RESTORE POSITION
    =========================================*/

    restorePosition() {

        /* Browser should handle anchors */

        if (window.location.hash) return;

        const saved = sessionStorage.getItem(

            this.storageKey

        );

        if (!saved) return;

        const position = JSON.parse(saved);

        /* Restore only on same page */

        if (
            position.page !==
            window.location.pathname
        ) {
            return;
        }

        window.history.scrollRestoration = "manual";

        window.addEventListener(
            "load",
            () => {

                requestAnimationFrame(() => {

                    window.scrollTo({

                        left: position.x,

                        top: position.y,

                        behavior: "auto"

                    });

                });

            },
            { once: true }
        );

    }

};

/*=========================================
    INITIALIZE
=========================================*/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        ScrollMemory.init();

    }

);

/*==================================================
    END OF PART 1C-2B-1
===================================================*/
/*==================================================
    AI STEM Innovation Website
    script.js
    ========= PART 1C-2B-2 =========
    Browser History Handling
    Popstate Support
    Session Cleanup
    Final Initialization
===================================================*/

"use strict";

const HistoryScroll = {

    storageKey: "ai-stem-scroll-position",

    init() {

        this.setScrollRestoration();

        this.bindEvents();

    },

    /*=========================================
        BROWSER SCROLL CONTROL
    =========================================*/

    setScrollRestoration() {

        if ("scrollRestoration" in window.history) {

            window.history.scrollRestoration = "manual";

        }

    },

    /*=========================================
        EVENTS
    =========================================*/

    bindEvents() {

        window.addEventListener(
            "popstate",
            this.handleHistoryChange.bind(this)
        );


        window.addEventListener(
            "pagehide",
            this.saveCurrentPosition.bind(this)
        );


        window.addEventListener(
            "pageshow",
            this.restoreAfterHistory.bind(this)
        );

    },

    /*=========================================
        BACK / FORWARD BUTTON
    =========================================*/

    handleHistoryChange() {

        setTimeout(() => {

            this.restoreScroll();

        }, 100);

    },

    /*=========================================
        SAVE CURRENT POSITION
    =========================================*/

    saveCurrentPosition() {

        const data = {

            page: window.location.pathname,

            x: window.scrollX,

            y: window.scrollY,

            time: Date.now()

        };


        sessionStorage.setItem(

            this.storageKey,

            JSON.stringify(data)

        );

    },

    /*=========================================
        RESTORE AFTER HISTORY EVENT
    =========================================*/

    restoreAfterHistory(event) {

        if (event.persisted) {

            this.restoreScroll();

        }

    },

    /*=========================================
        RESTORE SCROLL
    =========================================*/

    restoreScroll() {

        if (window.location.hash) return;


        const saved =
            sessionStorage.getItem(
                this.storageKey
            );


        if (!saved) return;


        try {

            const data =
                JSON.parse(saved);


            if (
                data.page !==
                window.location.pathname
            ){

                return;

            }


            window.scrollTo({

                left:data.x,

                top:data.y,

                behavior:"auto"

            });


        } catch(error){

            console.warn(
                "Scroll restore error:",
                error
            );

            this.clear();

        }

    },

    /*=========================================
        CLEAR STORAGE
    =========================================*/

    clear(){

        sessionStorage.removeItem(
            this.storageKey
        );

    }

};


/*==================================================
    FINAL SCROLL MEMORY INITIALIZATION
===================================================*/

document.addEventListener(
    "DOMContentLoaded",
    () => {

        HistoryScroll.init();

    }
);


/*==================================================
    END OF PART 1C-2B-2
===================================================*/
/*==================================================
    AI STEM Innovation Website
    script.js
    ========= PART 1C-3 =========
    Active Section Detection
    Scroll Spy Navigation
    Intersection Observer
===================================================*/

"use strict";

const ScrollSpy = {

    sections: [],
    navLinks: [],

    activeClass: "active",

    observerOptions: {

        root: null,

        rootMargin: "-120px 0px -60% 0px",

        threshold: 0

    },

    init() {

        this.cacheDOM();

        if (!this.sections.length) return;

        this.bindObserver();

    },

    /*=========================================
        CACHE ELEMENTS
    =========================================*/

    cacheDOM() {

        this.sections =
            document.querySelectorAll(
                "section[id]"
            );

        this.navLinks =
            document.querySelectorAll(
                'nav a[href^="#"]'
            );

    },


    /*=========================================
        INTERSECTION OBSERVER
    =========================================*/

    bindObserver() {

        const observer =
            new IntersectionObserver(

                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            this.updateActiveLink(
                                entry.target.id
                            );

                        }

                    });

                },

                this.observerOptions

            );


        this.sections.forEach(section => {

            observer.observe(section);

        });

    },


    /*=========================================
        UPDATE ACTIVE LINK
    =========================================*/

    updateActiveLink(id) {


        this.navLinks.forEach(link => {


            const href =
                link.getAttribute("href");


            link.classList.remove(
                this.activeClass
            );


            link.removeAttribute(
                "aria-current"
            );


            if (
                href === "#" + id
            ) {


                link.classList.add(
                    this.activeClass
                );


                link.setAttribute(
                    "aria-current",
                    "true"
                );


            }


        });


    }

};


/*==================================================
    REVEAL ANIMATION ON SCROLL
===================================================*/

const RevealAnimation = {


    elements: [],


    init(){


        this.elements =
            document.querySelectorAll(
                ".reveal, .fade-in, .slide-up"
            );


        if(!this.elements.length)
            return;


        this.observe();


    },


    observe(){


        const observer =
            new IntersectionObserver(

                entries => {


                    entries.forEach(entry=>{


                        if(
                            entry.isIntersecting
                        ){

                            entry.target.classList.add(
                                "show"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }


                    });


                },

                {

                    threshold:0.15

                }

            );


        this.elements.forEach(el=>{


            observer.observe(el);


        });


    }


};


/*==================================================
    SCROLL SPY + REVEAL INITIALIZATION
===================================================*/

document.addEventListener(
    "DOMContentLoaded",
    ()=>{


        ScrollSpy.init();


        RevealAnimation.init();


    }
);


/*==================================================
    END OF PART 1C-3
===================================================*/
/*==================================================
    AI STEM Innovation Website
    script.js
    ========= PART 2A =========
    Hero Animations
    Typing Effect
    Floating Elements
    Animated Counters
===================================================*/

"use strict";


/*==================================================
    HERO ANIMATION MODULE
===================================================*/

const HeroAnimation = {

    hero: null,

    init(){

        this.hero =
            document.querySelector(".hero");

        if(!this.hero) return;

        this.startAnimation();

    },


    startAnimation(){

        const elements =
            this.hero.querySelectorAll(
                ".hero-content > *"
            );


        elements.forEach(
            (element,index)=>{


                element.style.opacity="0";

                element.style.transform =
                    "translateY(30px)";


                setTimeout(()=>{


                    element.style.transition =
                    "all .6s ease";


                    element.style.opacity="1";


                    element.style.transform =
                    "translateY(0)";


                },index * 150);


            }
        );


    }

};


/*==================================================
    TYPING EFFECT
===================================================*/

const TypingEffect = {


    elements: [],


    speed:100,


    init(){


        this.elements =
            document.querySelectorAll(
                "[data-type]"
            );


        if(!this.elements.length)
            return;


        this.elements.forEach(
            element=>{


                const text =
                    element.dataset.type;


                element.textContent="";


                this.type(
                    element,
                    text
                );


            }
        );


    },


    type(element,text,index=0){


        if(index < text.length){


            element.textContent +=
                text.charAt(index);


            setTimeout(()=>{


                this.type(
                    element,
                    text,
                    index+1
                );


            },this.speed);


        }


    }


};


/*==================================================
    FLOATING ELEMENTS
===================================================*/

const FloatingElements = {


    init(){


        const items =
            document.querySelectorAll(
                ".floating"
            );


        if(!items.length)
            return;


        items.forEach(
            (item,index)=>{


                item.style.animationDelay =
                    `${index * .5}s`;


                item.classList.add(
                    "floating-active"
                );


            }
        );


    }


};


/*==================================================
    COUNTER ANIMATION
===================================================*/

const CounterAnimation = {


    counters: [],


    init(){


        this.counters =
            document.querySelectorAll(
                "[data-counter]"
            );


        if(!this.counters.length)
            return;


        this.observe();


    },


    observe(){


        const observer =
            new IntersectionObserver(

                entries=>{


                    entries.forEach(
                        entry=>{


                            if(
                                entry.isIntersecting
                            ){


                                this.animate(
                                    entry.target
                                );


                                observer.unobserve(
                                    entry.target
                                );


                            }


                        }
                    );


                },

                {
                    threshold:.5
                }

            );


        this.counters.forEach(
            counter=>{


                observer.observe(
                    counter
                );


            }
        );


    },


    animate(element){


        const target =
            parseInt(
                element.dataset.counter
            );


        let current = 0;


        const duration = 2000;


        const increment =
            target /
            (duration / 16);


        const timer =
            setInterval(()=>{


                current += increment;


                if(
                    current >= target
                ){


                    current = target;


                    clearInterval(
                        timer
                    );


                }


                element.textContent =
                    Math.floor(current);


            },16);


    }


};


/*==================================================
    INITIALIZATION
===================================================*/

document.addEventListener(
    "DOMContentLoaded",
    ()=>{


        HeroAnimation.init();


        TypingEffect.init();


        FloatingElements.init();


        CounterAnimation.init();


    }
);


/*==================================================
    END OF PART 2A
===================================================*/
/*==================================================
    AI STEM Innovation Website
    script.js
    ========= PART 2B =========
    Gallery Filter
    Image Lightbox
    Image Navigation
    Lazy Loading
===================================================*/

"use strict";


/*==================================================
    GALLERY FILTER MODULE
===================================================*/

const GalleryFilter = {


    buttons: [],
    items: [],


    init(){


        this.buttons =
            document.querySelectorAll(
                ".gallery-filter button"
            );


        this.items =
            document.querySelectorAll(
                ".gallery-item"
            );


        if(
            !this.buttons.length ||
            !this.items.length
        ){

            return;

        }


        this.bindEvents();


    },


    bindEvents(){


        this.buttons.forEach(
            button=>{


                button.addEventListener(
                    "click",
                    ()=>{


                        this.filter(
                            button.dataset.filter
                        );


                        this.setActive(
                            button
                        );


                    }
                );


            }
        );


    },


    filter(category){


        this.items.forEach(
            item=>{


                const itemCategory =
                    item.dataset.category;


                if(
                    category==="all" ||
                    itemCategory===category
                ){


                    item.style.display =
                        "block";


                    setTimeout(()=>{

                        item.classList.add(
                            "show"
                        );

                    },50);


                }
                else{


                    item.style.display =
                        "none";


                    item.classList.remove(
                        "show"
                    );


                }


            }
        );


    },


    setActive(button){


        this.buttons.forEach(btn=>{

            btn.classList.remove(
                "active"
            );

        });


        button.classList.add(
            "active"
        );


    }


};


/*==================================================
    LIGHTBOX MODULE
===================================================*/

const LightBox = {


    images: [],
    currentIndex:0,
    overlay:null,


    init(){


        this.images =
            document.querySelectorAll(
                ".gallery-item img"
            );


        if(!this.images.length)
            return;


        this.create();


        this.bindEvents();


    },


    create(){


        this.overlay =
            document.createElement(
                "div"
            );


        this.overlay.className =
            "lightbox";


        this.overlay.innerHTML = `

            <button class="lightbox-close">
                &times;
            </button>

            <button class="lightbox-prev">
                &#10094;
            </button>

            <img class="lightbox-image">

            <button class="lightbox-next">
                &#10095;
            </button>

        `;


        document.body.appendChild(
            this.overlay
        );


    },


    bindEvents(){


        this.images.forEach(
            (image,index)=>{


                image.addEventListener(
                    "click",
                    ()=>{


                        this.open(index);


                    }
                );


            }
        );


        this.overlay
            .querySelector(
                ".lightbox-close"
            )
            .addEventListener(
                "click",
                ()=>this.close()
            );


        this.overlay
            .querySelector(
                ".lightbox-next"
            )
            .addEventListener(
                "click",
                ()=>this.next()
            );


        this.overlay
            .querySelector(
                ".lightbox-prev"
            )
            .addEventListener(
                "click",
                ()=>this.previous()
            );


        document.addEventListener(
            "keydown",
            e=>{


                if(
                    !this.overlay.classList.contains(
                        "active"
                    )
                ){

                    return;

                }


                if(e.key==="Escape")
                    this.close();


                if(e.key==="ArrowRight")
                    this.next();


                if(e.key==="ArrowLeft")
                    this.previous();


            }
        );


    },


    open(index){


        this.currentIndex=index;


        this.showImage();


        this.overlay.classList.add(
            "active"
        );


        document.body.classList.add(
            "lightbox-open"
        );


    },


    close(){


        this.overlay.classList.remove(
            "active"
        );


        document.body.classList.remove(
            "lightbox-open"
        );


    },


    showImage(){


        const image =
            this.images[
                this.currentIndex
            ];


        const lightImage =
            this.overlay.querySelector(
                ".lightbox-image"
            );


        lightImage.src =
            image.src;


        lightImage.alt =
            image.alt;


    },


    next(){


        this.currentIndex++;


        if(
            this.currentIndex >=
            this.images.length
        ){

            this.currentIndex=0;

        }


        this.showImage();


    },


    previous(){


        this.currentIndex--;


        if(
            this.currentIndex < 0
        ){

            this.currentIndex =
                this.images.length-1;

        }


        this.showImage();


    }


};


/*==================================================
    LAZY IMAGE LOADING
===================================================*/

const LazyImages = {


    init(){


        const images =
            document.querySelectorAll(
                "img[data-src]"
            );


        if(!images.length)
            return;


        const observer =
            new IntersectionObserver(

                entries=>{


                    entries.forEach(
                        entry=>{


                            if(
                                entry.isIntersecting
                            ){


                                const img =
                                    entry.target;


                                img.src =
                                    img.dataset.src;


                                img.removeAttribute(
                                    "data-src"
                                );


                                observer.unobserve(
                                    img
                                );


                            }


                        }
                    );


                },

                {
                    rootMargin:"100px"
                }

            );


        images.forEach(
            img=>
                observer.observe(img)
        );


    }


};


/*==================================================
    INITIALIZATION
===================================================*/

document.addEventListener(
    "DOMContentLoaded",
    ()=>{


        GalleryFilter.init();


        LightBox.init();


        LazyImages.init();


    }
);


/*==================================================
    END OF PART 2B
===================================================*/
/*==================================================
    AI STEM Innovation Website
    script.js
    ========= PART 2C =========
    FAQ Accordion
    Course Search Filter
    Event Card Interaction
    Final Part 2 Initialization
===================================================*/

"use strict";


/*==================================================
    FAQ ACCORDION MODULE
===================================================*/

const FAQAccordion = {


    items: [],


    init(){


        this.items =
            document.querySelectorAll(
                ".faq-item"
            );


        if(!this.items.length)
            return;


        this.bindEvents();


    },


    bindEvents(){


        this.items.forEach(
            item=>{


                const question =
                    item.querySelector(
                        ".faq-question"
                    );


                if(!question)
                    return;


                question.addEventListener(
                    "click",
                    ()=>{


                        this.toggle(item);


                    }
                );


            }
        );


    },


    toggle(activeItem){


        this.items.forEach(
            item=>{


                if(
                    item !== activeItem
                ){

                    item.classList.remove(
                        "active"
                    );

                }


            }
        );


        activeItem.classList.toggle(
            "active"
        );


    }


};


/*==================================================
    COURSE SEARCH / FILTER MODULE
===================================================*/

const CourseFilter = {


    searchBox:null,
    courses:[],


    init(){


        this.searchBox =
            document.querySelector(
                "#courseSearch"
            );


        this.courses =
            document.querySelectorAll(
                ".course-card"
            );


        if(
            !this.searchBox ||
            !this.courses.length
        ){

            return;

        }


        this.bindEvents();


    },


    bindEvents(){


        this.searchBox.addEventListener(
            "input",
            Utils.debounce(
                ()=>{
                    this.search(
                        this.searchBox.value
                    );
                },
                200
            )
        );


    },


    search(value){


        const keyword =
            value
            .toLowerCase()
            .trim();


        this.courses.forEach(
            course=>{


                const text =
                    course.textContent
                    .toLowerCase();


                if(
                    text.includes(keyword)
                ){


                    course.style.display =
                        "block";


                }
                else{


                    course.style.display =
                        "none";


                }


            }
        );


    }


};


/*==================================================
    EVENT CARD INTERACTION
===================================================*/

const EventInteraction = {


    cards:[],


    init(){


        this.cards =
            document.querySelectorAll(
                ".event-card"
            );


        if(!this.cards.length)
            return;


        this.bindEvents();


    },


    bindEvents(){


        this.cards.forEach(
            card=>{


                card.addEventListener(
                    "mouseenter",
                    ()=>{

                        card.classList.add(
                            "hover"
                        );

                    }
                );


                card.addEventListener(
                    "mouseleave",
                    ()=>{

                        card.classList.remove(
                            "hover"
                        );

                    }
                );


                card.addEventListener(
                    "click",
                    ()=>{


                        const link =
                            card.querySelector(
                                "a"
                            );


                        if(link){

                            link.click();

                        }


                    }
                );


            }
        );


    }


};


/*==================================================
    COURSE CARD ANIMATION
===================================================*/

const CourseAnimation = {


    init(){


        const cards =
            document.querySelectorAll(
                ".course-card"
            );


        if(!cards.length)
            return;


        cards.forEach(
            (card,index)=>{


                card.style.animationDelay =
                    `${index * 100}ms`;


                card.classList.add(
                    "course-visible"
                );


            }
        );


    }


};


/*==================================================
    FAQ SEARCH SUPPORT
===================================================*/

const FAQSearch = {


    init(){


        const input =
            document.querySelector(
                "#faqSearch"
            );


        const items =
            document.querySelectorAll(
                ".faq-item"
            );


        if(
            !input ||
            !items.length
        )
            return;


        input.addEventListener(
            "input",
            ()=>{


                const value =
                    input.value
                    .toLowerCase();


                items.forEach(
                    item=>{


                        const text =
                            item.textContent
                            .toLowerCase();


                        item.style.display =
                            text.includes(value)
                            ? "block"
                            : "none";


                    }
                );


            }
        );


    }


};


/*==================================================
    PART 2 INITIALIZATION
===================================================*/

document.addEventListener(
    "DOMContentLoaded",
    ()=>{


        FAQAccordion.init();


        CourseFilter.init();


        EventInteraction.init();


        CourseAnimation.init();


        FAQSearch.init();


        console.log(
            "Part 2 Modules Loaded"
        );


    }
);


/*==================================================
    END OF PART 2C
===================================================*/
