import { request, gql } from 'graphql-request';

const countQuery = gql`
query episodesCount {
  episodes {
    info {
      count
    }
  }
}
`;

const episodeQuery = gql`
query getEpisode($id: ID!) {
  episode(id: $id) {
    id
    name
    air_date
    episode
  }
}
`;

const episodesByIdQuery = gql`
query episodesById($ids: [ID!]!) {
  episodesByIds(ids: $ids) {
    id
    name
    episode
    air_date
  }
}
`;

const completeEpisodeQuery = gql`
query getCompleteEpisode($id: ID!) {
  episode(id: $id) {
    id
    name
    air_date
    episode
    characters {
      id
      name
      image
      status
      species
      type
      gender
    }
  }
}
`;

export async function getEpisodesCount() {
  const data = await request(import.meta.env.VITE_RM_API, countQuery);
  return data.episodes.info.count;
}

export async function getEpisodeByID(ids) {
  const data = await request(import.meta.env.VITE_RM_API, episodesByIdQuery, { ids });
  return data.episodesByIds;
}

export async function getEpisode(id) {
  const data = await request(import.meta.env.VITE_RM_API, episodeQuery, { id });
  return data.episode;
}

export async function getCompleteEpisode(id) {
  const data = await request(import.meta.env.VITE_RM_API, completeEpisodeQuery, { id });
  return data.episode;
}
