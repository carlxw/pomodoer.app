import { useState } from "react";
import MusicPlayer from "../components/MusicPlayer";
import image from "../album-cover.jpg";

const Music = () => {
    const [url, setUrl] = useState("");

    const handleSubmit = (e) => {
        // Send link to backend
        fetch("http://localhost:8000/upload", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ link: url })
        })

        // Receive data from backend
        fetch("http://localhost:8000/", {
            method: "GET",
            headers: { "Accept": "application/json" }
        }).then(
            res => { 
                return res.json();
            }
        ).then(
            data => {
                // Data contains the string from server
                console.log(data.msg);
            }
        )
        
        e.preventDefault(); // To remove
    }

    return (
        <div className="music">
            <form onSubmit={ handleSubmit }>
                <p>url:</p>
                <input 
                    type="text" 
                    placeholder="Paste URL here"
                    value={ url } 
                    onChange={ (e) => setUrl(e.target.value) } 
                    autoComplete="off"
                />
                <button type="submit">Submit</button>
            </form>

            <div className="music_source">
                <button>YouTube</button>
                <button>Spotify</button>
                <button>SoundCloud</button>
            </div>

            <MusicPlayer image={ image } track_name="NIGHT RIDER" artist_name="Joji" />
        </div>
    );
}

export default Music;