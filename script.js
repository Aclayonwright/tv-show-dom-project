//You can edit ALL of the code here

async function fetchEpisodes() {
    const response = await fetch("https://api.tvmaze.com/shows/82/episodes");
    const data = response.json();
    return data
}


async function setup() {

    const allEpisodes = await fetchEpisodes();
    searchInputCreate(allEpisodes);
    makePageForEpisodes(allEpisodes);
    episodeSelectorSearch(allEpisodes);
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

function searchInputCreate(allEpisodes) {
    const div = document.createElement("div");
    div.classList.add("input-container");

    episodeSelector(allEpisodes, div);
    const para = document.createElement("p");
    para.setAttribute("id", "display-episode");

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
    const para = document.querySelector("#display-episode");
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
    const select = document.createElement("select");
    select.setAttribute("id", "dropdown-episodes");
    div.appendChild(select);

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

function episodeSelectorSearch(allEpisodes) {
    document.querySelector("#dropdown-episodes").addEventListener("change", (e) => {
        console.log(e.target);
        const filter = e.target.value.toUpperCase();
        if (filter === "ALL EPISODES") {
            return makePageForEpisodes(allEpisodes);
        }
        allEpisodes.map((episode) => {
            if (episode.name.toUpperCase().indexOf(filter) > -1) {
                return makePageForEpisodes([episode])
            }

        })
    })
};

























window.onload = setup;