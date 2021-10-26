//You can edit ALL of the code here
function setup() {
    const allEpisodes = getAllEpisodes();
    makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {

    const rootElem = document.getElementById("root");

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



window.onload = setup;