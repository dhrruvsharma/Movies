document.addEventListener("DOMContentLoaded", function () {
    var listArray = [];
    let list;
    var count = 0;
    const loadingAnimation = document.getElementById("loading-animation");
    const heading = document.getElementById('h');
    const hide = document.querySelector('.previous');
    const label = document.getElementById('movieName');
    label.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            document.getElementById('searchbutton').click();
        }
    })
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            document.getElementById('searchbutton').click();
        }
    })
    document.getElementById('searchbutton').addEventListener('click', table);

    function clearContainer() {
        listArray = [];
        CurrentPage = 1;
    }
    // submit.addEventListener('click', table);
    async function table() {
        loadingAnimation.style.display = 'block';
        if (count === 0) {
            await search();
        }
        count = 0;
        loadingAnimation.style.display = 'none';
        // Pagination starts here 

        const IndexOfLastPage = CurrentPage * ItemsPerPage;

        const IndexOfFirstPage = IndexOfLastPage - ItemsPerPage;

        const CurrentItems = listArray.slice(IndexOfFirstPage, IndexOfLastPage);


        const display = document.querySelector(".movies");
        display.innerHTML = CurrentItems;
    }
    async function search() {
        heading.style.display = 'none';
        hide.style.display = 'none';
        clearContainer();
        const nm = await document.querySelector("#movieName").value;
        const url = `https://online-movie-database.p.rapidapi.com/title/find?q=${nm}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'd2d0bc225dmshf6da7f55306f702p12a843jsn501e94b79d66',
                'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'

            }
        };
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            list = result.results;
            list.map((item) => {
                const title = item.title;
                const poster = item.image.url;
                const movie = `<li> <img src="${poster}"> <h2>${title}</h2></li>`
                listArray.push(movie);
            })
        } catch (error) {
            console.error(error);
        }
        document.getElementById('prev').style.display = 'inline';
        document.getElementById('next').style.display = 'inline';
        document.getElementById('download').style.display = 'block';
    }
    let ItemsPerPage = 4;
    let CurrentPage = 1;


    // Next and prev button functions

    const prevBtn = () => {
        if ((CurrentPage - 1) * ItemsPerPage) {
            CurrentPage--;
            count = 1;
            table();
        }
    }

    const nextBtn = () => {
        if ((CurrentPage * ItemsPerPage) < listArray.length) {
            CurrentPage++;
            count = 1;
            table();
        }
    }
    document.getElementById('prev').addEventListener('click', prevBtn);
    document.getElementById('next').addEventListener('click', nextBtn);
    document.getElementById('download').addEventListener('click', () => {
        downloadData(list, 'api_data.json')
    });
    function downloadData(data, filename) {
        const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
        const downloadURl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadURl;
        a.download = filename;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(downloadURl);
    }
})