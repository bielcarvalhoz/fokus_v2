// Função para carregar e tocar a música ao clicar
export default function playSong(songUrl: string) {
    const audioPlayer = document.getElementById('audio-player') as HTMLAudioElement;
    audioPlayer.src = songUrl;  // Define a URL do áudio
    audioPlayer.play();         // Começa a tocar a música
}