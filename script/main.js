// const $ = require( "jquery" );
// const axios = require('axios').default;

$(() => {
    $('form').on('submit', event => {
        const searchText = $('input').val();
        getMovies(searchText);
        event.preventDefault();
    });

    const getMovies = searchText => {
        axios.get(`http://www.omdbapi.com/?apikey=1951be3e&s=${searchText}`)
            .then(result => {
                // console.log(result.data.Search)
                let movies = result.data.Search;
                let output = '';
                $.each(movies, (index, movie) => {
                    output += `
                        <div class="frame">
                            <div class="wrapper">
                                <img alt="${movie.Title}" src="${movie.Poster}">
                                <h4>${movie.Title}</h4>
                                <a onclick="movieSelected('${movie.imdbID}')" href="#">Movie Details</a>
                            </div>
                        </div>
                    `
                })

                $("#movie-list").html(output)
            })
            .catch(err => console.error(err));
    };
});

const movieSelected = (id) => {
    sessionStorage.setItem('movieID', id);
    window.location = 'movie.html'
    return false;
};

const getMovie = () => {
    const movieID = sessionStorage.getItem("movieID");

    axios.get(`http://www.omdbapi.com/?apikey=1951be3e&i=${movieID}`)
            .then(result => {
                console.log(result.data);
                const movie = result.data;

                const output = `
                    <div id="section1">
                        <div id="image">
                            <img alt="${movie.Title}" src="${movie.Poster}">
                        </div>
                        <div id="about">
                            <h1>${movie.Title}</h1>
                            <ul>
                                <li><strong>Genre:</strong> ${movie.Genre}</li>
                                <li><strong>Released:</strong> ${movie.Released}</li>
                                <li><strong>Rated:</strong> ${movie.Rated}</li>
                                <li><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                                <li><strong>Director:</strong> ${movie.Director}</li>
                                <li><strong>Writer:</strong> ${movie.Writer}</li>
                                <li><strong>Actors:</strong> ${movie.Actors}</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div id="section2">
                        <h2>Plot</h2>
                        <p>${movie.Plot}</p>
                        <hr>
                        <div>
                            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank">View IMDB</a>
                            <a href="index.html">Go Back To Search</a>
                        </div>
                    </div>
                `;

                $('#movie').html(output)
            })
            .catch(err => console.error(err));
}