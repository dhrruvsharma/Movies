async function search() {
    const nm = document.getElementById("movieName").value
    const url = `https://imdb8.p.rapidapi.com/auto-complete?q=${nm}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '6a268179c9msh2799944107ed12fp1222c4jsn3fcbb1ec4f89',
            'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
        }

    };
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        const list = await data.d;
        console.log(list);
        list.map((item) => {
            const title = item.l;
            const poster = item.i.imageUrl;
            const movie = `<li> <img src="${poster}"> <h2>${title}</h2></li>`
            document.querySelector(".movies").innerHTML += movie;
        })
    } catch (error) {
        console.error(error);
    }
}
