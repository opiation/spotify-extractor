export class SpotifyClient {
  constructor(
    readonly clientId: string,
    readonly clientSecret: string,
    readonly baseURL = "https://api.spotify.com/v1"
  ) {}

  #cachedToken: string | undefined;

  async getAccessToken(): Promise<string> {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      body: "grant_type=client_credentials",
      headers: {
	"Authorization": `Basic ${btoa(`${this.clientId}:${this.clientSecret}`)}`,
	"Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST"
    });

    const data = await response.json();
    this.#cachedToken = data.access_token;
    return data.access_token;
  }

  async getSpotifyPlaylists(userId: string): Promise<any> {
    const token = this.#cachedToken ?? await this.getAccessToken();
    const response = await fetch(`${this.baseURL}/users/${userId}/playlists`, {
      headers: {
	"Authorization": `Bearer ${token}`
      }
    });

    const data = await response.json();
    return data.items;
  }

}
