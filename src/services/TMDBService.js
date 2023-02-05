export default async function getEpisodefromTMDB(season, episode) {
  const response = await fetch(`${import.meta.env.VITE_TMDB_API}tv/60625/season/${season}/episode/${episode}?api_key=${import.meta.env.VITE_TMDB_TOKEN}`);
  return response.json();
}
