const API_URL = "https://www.omdbapi.com/?apikey=24dbe027&s=";
const API_URL_SEARCH = "https://www.omdbapi.com/?apikey=24dbe027&i=";

const searchInput = document.getElementById("search-input");
const cardContainer = document.querySelector(".movie-cards");
const searchButton = document.querySelector(".search");


// Search on button click
searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
        getMovies(API_URL + query);
    } else {
        cardContainer.innerHTML = "<p>Please enter a movie name.</p>";
    }
});

// Optional: Search on Enter key
searchInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        searchButton.click();
    }
});

async function getMovies(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.Search) {
            showMovies(data.Search);
        } else {
            cardContainer.innerHTML = "<p>No results found.</p>";
        }
    } catch (error) {
        console.error("Error fetching movie data:", error);
        cardContainer.innerHTML = "<p>Error fetching movie data.</p>";
    }
}

function showMovies(movies) {
    cardContainer.innerHTML = "";
    movies.forEach(async (movie) => {
        try {
            const response = await fetch(API_URL_SEARCH + movie.imdbID);
            const movieData = await response.json();
            displayMovie(movieData);
        } catch (error) {
            console.error("Error fetching movie details:", error);
        }
    });
}

function displayMovie(movie) {
    const movieEl = document.createElement("div");
    movieEl.classList.add("card");

    // Fallback image
    const poster = movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x300?text=No+Image";

    movieEl.innerHTML = `
        <img src="${poster}" alt="Poster" width="300" height="300">
        <div class="movie-description">
            <span><b>Title:</b> <span class="value">${movie.Title}</span></span>
            <span><b>Rating:</b> <span class="value">${movie.imdbRating}</span></span>
            <span><b>Director:</b> <span class="value">${movie.Director}</span></span>
            <span><b>Released:</b> <span class="value">${movie.Released}</span></span>
            <span><b>Genre:</b> <span class="value">${movie.Genre}</span></span>
            <span><b>director:</b> <span class="value">${movie.Director}</span></span> 
             
           

        </div>
    `;
    cardContainer.appendChild(movieEl);
}
