//You can edit ALL of the code here

let allEpisodes = [];
let allShows = [];
let showsUrl = "https://api.tvmaze.com/shows";
let episodesUrl = "https://api.tvmaze.com/shows/82/episodes";


function sortLiveData(data) {
    data.sort((a, b) => {
        if (a.name > b.name) {
            return 1
        } else {
            return -1
        }
    })

}




// async function fetchEpisodes() {
//     const response = await fetch("https://api.tvmaze.com/shows/82/episodes");
//     const data = response.json();
//     return data

function getShowsLiveData(url) {
    console.log(url);
    fetch(url).then((res) => res.json())
        .then((data) => {
            sortLiveData(data);
            getEpisodesLiveData(data, episodesUrl)
        })
        .catch((err) => {

        });
}

function getEpisodesLiveData(showsData, episodesUrl1) {
    fetch(episodesUrl1).then((res) => res.json())
        .then((episodesData) => {
            setup(episodesData, showsData);

        })
        .catch((err) => {
            console.log(err);
        });

}


function setup(episodesData, showsData) {


    allEpisodes = episodesData;
    allShows = showsData;
    console.log(allEpisodes, allShows);
    searchInputCreate();
    makePageForEpisodes(allEpisodes);
    showsSelectorSearch();
    episodeSelectorSearch();
}

function makePageForEpisodes(episodeList) {

    const rootElem = document.getElementById("root");
    rootElem.innerHTML = "";
    const div = document.createElement("div");

    episodeList.forEach(episode => {

        const { image, name, number, season, summary } = episode;

        const h1 = document.createElement("h1");
        const img = document.createElement("img");
        const container = document.createElement("div");
        const summaryContainer = document.createElement("div")
        container.classList.add("card-container");

        h1.innerHTML = `${name}-S0${season}-E0${number}`;
        img.setAttribute("src", image.original);
        summaryContainer.innerHTML = summary;
        container.appendChild(h1);
        container.appendChild(img);
        container.appendChild(summaryContainer);
        div.appendChild(container);

    });
    rootElem.appendChild(div);
}

function searchInputCreate() {

    const existDiv = document.getElementsByClassName('input-container');
    console.log(existDiv);

    if (existDiv.length !== 0) {
        changeDisplayEpisodesText(allEpisodes.length);
        episodeSelector(allEpisodes, existDiv[0]);
        return;

    }
    const div = document.createElement("div");
    div.classList.add("input-container");
    showsSelector(div, allShows);
    episodeSelector(allEpisodes, div);
    const para = document.createElement("p");
    para.setAttribute("id", "display-episodes");

    const node = document.createTextNode(`Displaying ${allEpisodes.length} episodes`);

    para.appendChild(node);
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "search-episode");
    input.setAttribute("onkeyup", "searchInput()");

    div.appendChild(input);
    div.appendChild(para);

    document.getElementsByTagName("body")[0].prepend(div);
}

function searchInput() {
    const para = document.querySelector("#display-episodes");
    const input = document.getElementById("search-episode");
    const filter = input.value.toUpperCase();
    const filteredEpisodes = [];
    getAllEpisodes().map((episode) => {
        if (episode.name.toUpperCase().indexOf(filter) > -1) {

            filteredEpisodes.push(episode);


        };
        para.textContent = `Displaying ${filteredEpisodes.length}/${getAllEpisodes().length} episodes`;

        makePageForEpisodes(filteredEpisodes);


    });
}

function episodeSelector(allEpisodes, div) {
    console.log(div);
    const existDiv = document.getElementById("dropdown-episodes");
    let select = existDiv;
    if (existDiv === null) {
        select = document.createElement("select");
        select.setAttribute("id", "dropdown-episodes");
        div.appendChild(select);
    }
    select.textContent = "";
    const seeAllEpisodes = document.createElement("option");
    seeAllEpisodes.setAttribute("value", "All Episodes");
    const textNode = document.createTextNode("All Episodes");
    seeAllEpisodes.appendChild(textNode);
    select.appendChild(seeAllEpisodes);

    allEpisodes.forEach((episode) => {
        const {
            name,
            number,
            season

        } = episode;

        const option = document.createElement("option");
        option.setAttribute("value", name);
        const textNode = document.createTextNode(`SO${season}EO${number} - ${name}`);
        option.appendChild(textNode);
        select.appendChild(option);
    });
}

function episodeSelectorSearch() {
    document.querySelector("#dropdown-episodes").addEventListener("change", (e) => {
        console.log(e.target);
        const filter = e.target.value.toUpperCase();
        if (filter === "ALL EPISODES") {
            changeDisplayEpisodesText(allEpisodes.length);
            return makePageForEpisodes(allEpisodes);
        }
        changeDisplayEpisodesText(1);


        allEpisodes.map((episode) => {
            if (episode.name.toUpperCase().indexOf(filter) > -1) {
                return makePageForEpisodes([episode])
            }

        })
    })
}

function changeDisplayEpisodesText(searchEpisodesLength) {
    const para = document.querySelector("#display-episodes");
    para.textContent = `Displaying ${searchEpisodesLength}/${allEpisodes.length}episodes`;

}

function showsSelector(div, selector) {

    const select = document.createElement("select");
    select.setAttribute("id", "dropdown-shows")
    div.appendChild(select);

    selector.forEach((shows, index) => {
        const option = document.createElement("option");
        option.setAttribute("value", shows.name);
        option.setAttribute("id", shows.id);

        const textNode = document.createTextNode(shows.name);
        option.appendChild(textNode);
        select.appendChild(option);

    })

}

function showsSelectorSearch() {


    document.querySelector("#dropdown-shows").addEventListener("change", (e) => {
        const id = e.target[e.target.selectedIndex].id;
        episodesUrl = `${showsUrl}/${id}/episodes`;
        getEpisodesLiveData(allShows, episodesUrl);

    });
}

window.onload = getShowsLiveData(showsUrl);