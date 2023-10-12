function search() {
    const nm = document.getElementById("movieName").value;
    fetch(`https://imdb.p.rapidapi.com/title/find?q=${nm}`, {
        "method": "GET",
        "headers": {
            'X-RapidAPI-Key': '6a268179c9msh2799944107ed12fp1222c4jsn3fcbb1ec4f89',
            'X-RapidAPI-Host': 'imdb8.p.rapidapi.com',
        }
    })
        .then(response => response.json())
        .then(data => {
            const list = data.results
            list.map((item) => {
                const name = item.title
                const poster = item.image.url;
                const movie = `<li> <img src="${poster}"> <h2>${name}</h2>`
                document.querySelector('.movies').innerHTML += movie;
            })
        })
        .catch(err => {
            console.error(err);
        });
}
document.getElementById("movieImage").src = poster
