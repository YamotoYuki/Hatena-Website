document.addEventListener("DOMContentLoaded", function() {
    const openBtn = document.querySelector('.openbtn');
    const gNav = document.getElementById('g-nav');

    openBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        gNav.classList.toggle('panelactive');
    });

    document.querySelectorAll('#g-nav a').forEach(link => {
        link.addEventListener('click', function() {
            openBtn.classList.remove('active');
            gNav.classList.remove('panelactive');
        });
    });

    // スクロールでボタンの表示を変更
    const scrollTopButton = document.querySelector('.js-scroll');
    const pageTopButton = document.querySelector('.js-pagetop');

    function checkScrollPosition() {
        if (window.scrollY > 100) {
            scrollTopButton.classList.remove('scroll-view');
            pageTopButton.classList.add('scroll-view');
        } else {
            scrollTopButton.classList.add('scroll-view');
            pageTopButton.classList.remove('scroll-view');
        }
    }

    window.addEventListener('scroll', checkScrollPosition);
    window.addEventListener('load', checkScrollPosition);

    // スムーズスクロール
    document.querySelectorAll('.scroll-top a').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});
