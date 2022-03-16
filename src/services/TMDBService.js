export default async function getEpisodefromTMDB(season, episode) {
  const response = await fetch(`https://api.themoviedb.org/3/tv/60625/season/${season}/episode/${episode}?api_key=${process.env.REACT_APP_TMDB_TOKEN}`);
  const data = await response.json();
  return data;
}

export async function getImagefromTMDB(season, episode, imageURL) {
  const response = await fetch(`https://api.themoviedb.org/3/tv/60625/season/${season}/episode/${episode}${imageURL}?api_key=${process.env.REACT_APP_TMDB_TOKEN}`);
  const data = response.blob();
  return URL.createObjectURL(data);
}
