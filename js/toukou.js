document.addEventListener("DOMContentLoaded", function() {
    // ハンバーガーメニューの開閉
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

    // 投稿フォームの送信処理
    document.getElementById('newsForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const imageFile = document.getElementById('image').files[0];

        if (!title || !content || !imageFile) {
            alert('すべての項目を入力してください');
            return;
        }

        // 画像のアップロード処理
        const imageUrl = await uploadToGitHub(imageFile);

        const newsData = {
            title: title,
            content: content,
            image: imageUrl,  // GitHubにアップロードされた画像のURL
            date: new Date().toLocaleString()
        };

        let newsList = JSON.parse(localStorage.getItem('news')) || [];
        newsList.push(newsData);
        localStorage.setItem('news', JSON.stringify(newsList));

        alert('投稿が完了しました！');
        window.location.href = "news.html"; // 投稿後にニュースページへ
    });

    // GitHubに画像をアップロードする関数
    async function uploadToGitHub(file) {
        const GITHUB_USERNAME = "あなたのGitHubユーザー名";
        const REPO_NAME = "リポジトリ名";
        const TOKEN = "GitHubのPersonal Access Token";  // **安全な方法で管理！**
        const FILE_NAME = `uploads/${Date.now()}_${file.name}`;

        const reader = new FileReader();
        reader.readAsDataURL(file);

        return new Promise((resolve, reject) => {
            reader.onload = async function() {
                const base64Data = reader.result.split(',')[1];  // `data:image/png;base64,xxx` を削除

                const response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${FILE_NAME}`, {
                    method: "PUT",
                    headers: {
                        "Authorization": `token ${TOKEN}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        message: "Upload image",
                        content: base64Data
                    })
                });

                const result = await response.json();
                resolve(result.content.download_url);
            };
        });
    }
});
