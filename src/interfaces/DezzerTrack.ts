interface DeezerTrack {
    title: string;
    artist: {
        name: string;
    };
    album: {
        cover_small: string;
    }
    preview: string;
}

export default DeezerTrack;
