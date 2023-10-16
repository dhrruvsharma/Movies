document.addEventListener("DOMContentLoaded", function () {
    var listArray = [];
    let list;
    var count = 0;
    const submit = document.getElementById("searchbutton");
    const loadingAnimation = document.getElementById("loading-animation");
    const container = document.getElementById('container');
    document.getElementById('searchbutton').addEventListener('click', table);
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
    document.getElementById('download').addEventListener('click', () => {
        downloadData(list, 'api_data.json')
    });
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
        clearContainer();
        const nm = await document.querySelector("#movieName").value;
        const url = `https://imdb8.p.rapidapi.com/auto-complete?q=${nm}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '412947a964mshd7e4faff2a48ea7p1c47c0jsn14fcf82218e3',
                'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
            }

        };
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            list = await data.d;
            // console.log(list.length);
            // console.log(list);
            list.map((item) => {
                const title = item.l;
                const poster = item.i.imageUrl;
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
        if ((CurrentPage * ItemsPerPage) <= listArray.length) {
            CurrentPage++;
            count = 1;
            table();
        }
    }
    document.getElementById('prev').addEventListener('click', prevBtn);
    document.getElementById('next').addEventListener('click', nextBtn);
})