var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import playSong from "./play-song-component.js";
function searchMusic() {
    return __awaiter(this, void 0, void 0, function* () {
        const inputElement = document.getElementById("searchInput");
        const resultsDiv = document.getElementById("searchResults");
        const query = inputElement.value;
        if (query.length < 3)
            return;
        try {
            const response = yield fetch(`http://localhost:3000/search?q=${query}`);
            const data = yield response.json();
            console.log(data);
            resultsDiv.innerHTML = ""; // Limpa os resultados anteriores
            data.data.forEach((track) => {
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
        }
        catch (error) {
            console.error("Erro ao buscar músicas:", error);
        }
    });
}
// Adiciona evento ao input para chamar a função ao digitar
document.addEventListener("DOMContentLoaded", () => {
    const inputElement = document.getElementById("searchInput");
    inputElement.addEventListener("keyup", searchMusic);
});
