import DeezerResponse from "../interfaces/DezzerResponse.js";
import DeezerTrack from "../interfaces/DezzerTrack.js";
import playSong from "./play-song-component.js";

async function searchMusic(): Promise<void> {
    const inputElement = document.getElementById("searchInput") as HTMLInputElement;
    const resultsDiv = document.getElementById("searchResults") as HTMLDivElement;

    const query: string = inputElement.value;
    if (query.length < 3) return;

    try {
        const response = await fetch(`http://localhost:3000/search?q=${query}`);
        const data: DeezerResponse = await response.json();

        console.log(data);

        resultsDiv.innerHTML = ""; // Limpa os resultados anteriores

        data.data.forEach((track: DeezerTrack) => {
            const resultItem = document.createElement("div");
            resultItem.classList.add("result");
            resultItem.innerHTML = `
                <img src="${track.album.cover_small}" alt="Capa do álbum">
                <span>${track.title} - ${track.artist.name}</span>
            `;

            // Adiciona o evento de clique para tocar a música
            resultItem.addEventListener("click", () => playSong(track.preview));

            resultsDiv.appendChild(resultItem);
        });
    } catch (error) {
        console.error("Erro ao buscar músicas:", error);
    }
}

// Adiciona evento ao input para chamar a função ao digitar
document.addEventListener("DOMContentLoaded", () => {
    const inputElement = document.getElementById("searchInput") as HTMLInputElement;
    inputElement.addEventListener("keyup", searchMusic);
});
