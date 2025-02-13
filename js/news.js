document.addEventListener("DOMContentLoaded", function() {
    // ナビゲーションの開閉処理
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

    // ニュース表示処理
    const newsContainer = document.querySelector('.news-grid');
    let newsList = JSON.parse(localStorage.getItem('news')) || [];

    function renderNews() {
        newsContainer.innerHTML = newsList.map((news, index) => `
            <article class="news-card">
                <img src="${news.image}" alt="ニュース画像">
                <h3>${news.title}</h3>
                <p>${news.content}</p>
                <small>${news.date}</small>
                <button class="delete-btn" onclick="deletePost(${index})">削除</button>
            </article>
        `).join('');
    }

    // 削除処理
    window.deletePost = function(index) {
        if (confirm('本当に削除しますか？')) {
            newsList.splice(index, 1);
            localStorage.setItem('news', JSON.stringify(newsList));
            renderNews();
        }
    };

    renderNews();
});
