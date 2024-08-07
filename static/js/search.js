<script src="https://cdnjs.cloudflare.com/ajax/libs/lunr.js/2.3.9/lunr.min.js"></script>

document.addEventListener("DOMContentLoaded", function () {
    var idx = lunr(function () {
        this.field('title')
        this.field('content')
        this.field('tags')
        this.ref('id')
    });

    fetch('/index.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(function (doc) {
                idx.add(doc)
            });
        });

    const searchInput = document.querySelector("#search-input");
    const resultsDiv = document.querySelector("#search-results");

    searchInput.addEventListener("input", function () {
        const query = searchInput.value;
        const results = idx.search(query);
        resultsDiv.innerHTML = "";

        results.forEach(function (result) {
            const doc = data.find(d => d.id === result.ref);
            const item = document.createElement("div");
            item.classList.add("result-item");
            item.innerHTML = `<a href="${doc.url}">${doc.title}</a>`;
            resultsDiv.appendChild(item);
        });
    });
});
