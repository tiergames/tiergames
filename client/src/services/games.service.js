import axios from "axios";

export default class GamesService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_SERVER_BASE_URL}/api/games`
    });
  }

  getGames = async (limit, offset) => {
    let allGames = await this.service.get(`?offset=${offset}&limit=${limit}`);
    return allGames;
  };

  follow = async (gameID, followerID) => {
    let followRequest = await this.service.put("/follow", { gameID, followerID })
    return followRequest.data
  }

  unfollow = async (gameID, followerID) => {
    let unfollowRequest = await this.service.put("/unfollow", { gameID, followerID })
    return unfollowRequest.data
  }

  getBestRated = async (limit, offset, order) => {
    let bestRatedGames = await this.service.get(`?offset=${offset}&limit=${limit}&sorting=rating&order=${order}`);
    return bestRatedGames;
  }

  getGameName = async (gameID) => {
    let gameName = await this.service.get(`/game-name/${gameID}`)
    return gameName.data
  }

  getGameCover = async (gameID) => {
    let gameCoverUrl = await this.service.get(`/game-cover/${gameID}`)
    return gameCoverUrl.data
  }

  getReleases = async (limit, offset, period, order) => {
    let from, to;
    let fromDays, toDays;

    switch (period) {
      case 1: fromDays = -7;  toDays = 0;   break; // a week ago
      case 2: fromDays = 0;   toDays = 7;   break; // next week
      case 3: fromDays = 7;   toDays = 14;  break; // next 2 weeks
      case 4: fromDays = 14;  toDays = 30;  break; // next 30 days (month)
      case 5: fromDays = 30;  toDays = 180; break; // next 6 months
      case 6: fromDays = 180; toDays = 365; break; // next 1 year
    }

    from = Math.round(new Date().setDate(new Date().getDate() + fromDays) / 1000);
    to = Math.round(new Date().setDate(new Date().getDate() + toDays) / 1000);

    let allReleases = await this.service.get(
      `?offset=${offset}&limit=${limit}&from=${from}&to=${to}&sorting=first_release_date&order=${order}`
    );
    return allReleases;
  };

  getGameData = async (gameID) => {
    let gameData = await this.service.get(`/${gameID}`)
    return gameData.data
  }

  getGamesPerGenre = async (genre) => {
    let gamesPerGenre = await this.service.get(`/?genres=${genre}`)
    return gamesPerGenre.data
  }

  getGamesPerPlatform = async (platforms) => {
    let gamesPerPlatform = await this.service.get(`/?platforms=${platforms}`)
    return gamesPerPlatform.data
  }

  getGamesPerPlatformAndGenre = async (limit, offset, platforms, genres) => {
    let gamesPerPlatformAndGenre = await this.service.get(`/?platforms=${platforms}&genres=${genres}&offset=${offset}&limit=${limit}`)
    return gamesPerPlatformAndGenre.data
  }

  gateRelatedGames = async (relatedGamesArray) => {
    let relatedGames = await this.service.get(`/related/${relatedGamesArray}`)
    return relatedGames.data
  }

  getAlternativeNames = async (gameID) => {
    let alternativeNames = await this.service.get(`/alternative-names/${gameID}`)
    return alternativeNames.data
  }

  getRelationedContent = async (collectionID) => {
    let relationedContent = await this.service.get(`/related-content/${collectionID}`)
    return relationedContent.data
  }

  getInvolvedCompanies = async (companies) => {
    let involvedCompanies = await this.service.get(`/involved-companies/${companies}`)
    return involvedCompanies.data
  }

  getReleaseDates = async (releaseID) => {
    let releaseDates = await this.service.get(`/release-dates/${releaseID}`)
    return releaseDates.data
  }

  getWebsites = async (websitesID) => {
    let websites = await this.service.get(`/websites/${websitesID}`)
    return websites.data
  }
}
