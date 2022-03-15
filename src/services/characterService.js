import { request, gql } from 'graphql-request';

const countQuery = gql`
query charactersCount {
  characters {
    info {
      count
    }
  }
}
`;

const characterQuery = gql`
query getCharacter($id: ID!){
  character(id: $id) {
    id
    name
    status
    species
    type
    gender
    image
  }
}
`;

const charactersByIdQuery = gql`
query charactersById($ids: [ID!]!) {
  charactersByIds(ids: $ids) {
    id
    name
    status
    species
    type
    gender
    image
  }
}
`;

const completeCharacterQuery = gql`
query getCharacter($id: ID!){
  character(id: $id) {
    id
    name
    status
    species
    type
    gender
    image
    episode {
      id
      name
      episode
    }
    location {
      id
      name
      dimension
    }
    origin {
      id
      name
      dimension
    }
  }
}
`;

export async function getCharactersCount() {
  const data = await request('https://rickandmortyapi.com/graphql', countQuery);
  return data.characters.info.count;
}

export async function getCharactersByID(ids) {
  const data = await request('https://rickandmortyapi.com/graphql', charactersByIdQuery, { ids });
  return data.charactersByIds;
}

export async function getCharacter(id) {
  const data = await request('https://rickandmortyapi.com/graphql', characterQuery, { id });
  return data.character;
}

export async function getCompleteCharacter(id) {
  const data = await request('https://rickandmortyapi.com/graphql', completeCharacterQuery, { id });
  return data.character;
}
