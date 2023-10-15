var listArray = [];
var count = 0;
async function search() {
    const nm = document.getElementById("movieName").value
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
        const list = await data.d;
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
    count = 1;
}
let ItemsPerPage = 4;
let CurrentPage = 1;

async function table() {
    if (count === 0) {
        await search();
    }
    // Pagination starts here 
    const pages = [];

    for (let i = 0; i <= Math.ceil(listArray.length / ItemsPerPage); i++) {
        pages.push(i);
    }

    const IndexOfLastPage = CurrentPage * ItemsPerPage;

    const IndexOfFirstPage = IndexOfLastPage - ItemsPerPage;

    const CurrentItems = listArray.slice(IndexOfFirstPage, IndexOfLastPage);



    const display = document.querySelector(".movies");
    display.innerHTML = CurrentItems;
}
table();

// Next and prev button functions

const prevBtn = () => {
    if ((CurrentPage - 1) * ItemsPerPage) {
        CurrentPage--;
        table();
    }
}

const nextBtn = () => {
    if ((CurrentPage * ItemsPerPage) <= listArray.length) {
        CurrentPage++;
        table();
    }
}