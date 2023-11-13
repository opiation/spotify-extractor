import { useCallback, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { SpotifyClient } from "./spotify";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const clientIdInput = useRef<HTMLInputElement>(null)
  const clientSecretInput = useRef<HTMLInputElement>(null)
  const userIdInput = useRef<HTMLInputElement>(null)
  const [playlists, setPlaylists] = useState<any[] | undefined>(undefined)

  const getPlaylists = useCallback(
    async () => {
      const clientId = clientIdInput.current!.value;
      const clientSecret = clientSecretInput.current!.value;
      const userId = userIdInput.current!.value;

      const client = new SpotifyClient(clientId, clientSecret)
      console.debug(`Created SpotifyClient: `, client);

      const playlists = await client.getSpotifyPlaylists(userId);
      console.debug(`Got Spotify playlists for user ${userId}: `, playlists);

      setPlaylists(playlists);
    },
    [clientIdInput, clientSecretInput, userIdInput, setPlaylists]
  )

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <input placeholder="Spotify Client ID" ref={clientIdInput} /><br />
      <input placeholder="Spotify Client Secret" ref={clientSecretInput} /><br />
      <input placeholder="Spotify User ID" ref={userIdInput} /><br />
      <br />
      <button onClick={getPlaylists}>Get my playlists</button>
      {Array.isArray(playlists) && (
	<div>
	  {playlists.map(pl => (
	    <div>{JSON.stringify(pl, null, 2)}</div>
	  ))}
			   </div>
      )
      }
    </>
  )
}

export default App
