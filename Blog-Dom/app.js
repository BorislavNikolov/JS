function attachEvents() {
    const loadPostButton = document.getElementById("btnLoadPosts");
    loadPostButton.addEventListener("click", fillOptions);

    const viewButton = document.getElementById("btnViewPost");
    viewButton.addEventListener("click", showPost);

    const selectElement = document.getElementById("posts");

    function fillOptions() {
        selectElement.innerHTML = "";

        const url = "https://blog-apps-c12bf.firebaseio.com/posts.json";

        fetch(url)
            .then((response) => { return response.json() })
            .then((data) => {
                for (const [key, value] of Object.entries(data)) {
                    const title = value.title;

                    const optionElement = document.createElement("option");
                    optionElement.value = key;
                    optionElement.textContent = title;

                    selectElement.appendChild(optionElement);
                }
            });
    }

    function showPost() {
        const currentOptionId = selectElement.options[selectElement.selectedIndex].value;

        const url = `https://blog-apps-c12bf.firebaseio.com/posts/${currentOptionId}.json`;
        const commentsUrl = "https://blog-apps-c12bf.firebaseio.com/comments.json";

        let postId;

        fetch(url)
            .then((response) => { return response.json() })
            .then((data) => {
                const title = data.title;
                postId = data.id;
                const body = data.body;

                const bodyParagraph = document.createElement("p");
                bodyParagraph.textContent = body;

                const postBodyElement = document.getElementById("post-body");
                postBodyElement.innerHTML = "";

                document.getElementById("post-title").textContent = title;
                postBodyElement.appendChild(bodyParagraph);
            });

        fetch(commentsUrl)
            .then((response) => { return response.json() })
            .then((data) => {
                const commentsUL = document.getElementById("post-comments");
                commentsUL.innerHTML = "";

                for (const [key, value] of Object.entries(data)) {
                    if (value.postId === postId) {
                        const newComment = document.createElement("li");
                        newComment.textContent = value.text;

                        commentsUL.appendChild(newComment);
                    }
                }
            });
    }
}

attachEvents();