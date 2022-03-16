export default async function getEpisodefromTMDB(season, episode) {
  const response = await fetch(`${process.env.REACT_APP_TMDB_API}tv/60625/season/${season}/episode/${episode}?api_key=${process.env.REACT_APP_TMDB_TOKEN}`);
  const data = await response.json();
  return data;
}
