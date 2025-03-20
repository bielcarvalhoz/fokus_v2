// Função para carregar e tocar a música ao clicar
export default function playSong(songUrl) {
    const audioPlayer = document.getElementById('audio-player');
    audioPlayer.src = songUrl; // Define a URL do áudio
    audioPlayer.play(); // Começa a tocar a música
}
