const searchForm = document.querySelector('form');
const movieContainer = document.querySelector('.movie-container');
const searchBtn = document.querySelector('.searchBtn');
const inputBox = document.querySelector('.inputBox');

//fuction to fetch movie details using omdb api
const getMovieinfo =async (movie) =>{
    try {
        const myapikey = "82c23400";
        const url = `http://www.omdbapi.com/?apikey=${myapikey}&t=${movie}`
    
        const response =await fetch(url);
        if(!response.ok){
            throw new error("Unable to fetch movie data");
        }
        const data = await response.json();
        showMovieData(data);
        
    } catch (error) {
        showErrorMessage("No Movie Found!!")
    }
   
}

//function to show movie data on screen
const showMovieData = (data) =>{
    //use destructuring assignment to extract properties fromo data object
    movieContainer.innerHTML = "";
    movieContainer.classList.remove('noBackground')
    const {Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster} = data;
    const movieElement = document.createElement('div')
    movieElement.classList.add('movie-info')
    movieElement.innerHTML= `<h2>${Title}</h2>
    <p><strong>Rating: &#11088;</strong>${imdbRating}</p>`

    const movieGenreElement = document.createElement('div')
    movieGenreElement.classList.add('movie-genre')
    Genre.split(",").forEach(element => {
        const p = document.createElement('p')
        p.innerText = element;
        movieGenreElement.appendChild(p);
    });

    movieElement.appendChild(movieGenreElement)

    movieElement.innerHTML += `<p><strong>Released Date:</strong>${Released}</p> <p><strong>Duration:</strong>${Runtime}</p> <p><strong>Cast:</strong>${Actors}</p>
    <p><strong>Plot:</strong>${Plot}</p>`

    //creating a div for movie poster
    const moviePosterElement = document.createElement('div');
    moviePosterElement.classList.add('movie-poster')

    moviePosterElement.innerHTML=`<img src="${Poster}"/>`;
    movieContainer.appendChild(moviePosterElement)

    movieContainer.appendChild(movieElement)
}

//function to display error

const showErrorMessage = (message)=>{
    movieContainer.innerHTML= `<h2>${message}</h2>`
}

//function to handle form submission

const handleFormSubmission = (e)=>{
    e.preventDefault();
    const movieName = inputBox.value.trim();
    if(movieName !==''){
        getMovieinfo(movieName);
        showErrorMessage("fetching movie information...")
    }
    else{
        movieContainer.innerHTML= `<h2>"Enter movie name to get input "</h2>`
        movieContainer.classList.add('noBackground')
    }
}
//adding event listener to search form
searchForm.addEventListener('submit' ,handleFormSubmission);