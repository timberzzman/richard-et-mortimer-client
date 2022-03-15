import { request, gql } from 'graphql-request';

const countQuery = gql`
query locationsCount {
  locations {
    info {
      count
    }
  }
}
`;

const locationQuery = gql`
query getLocation($id: ID!){
  location(id: $id) {
    id
    name
    type
    dimension
  }
}
`;

const locationsByIdQuery = gql`
query locationById($ids: [ID!]!) {
  locationsByIds(ids: $ids) {
    id
    name
    type
    dimension
  }
}
`;

const completeLocationQuery = gql`
query getLocation($id: ID!){
  location(id: $id) {
    id
    name
    type
    dimension
    residents {
      id
      name
      image
    }
  }
}
`;

export async function getLocationsCount() {
  const data = await request('https://rickandmortyapi.com/graphql', countQuery);
  return data.locations.info.count;
}

export async function getLocationsByID(ids) {
  const data = await request('https://rickandmortyapi.com/graphql', locationsByIdQuery, { ids });
  return data.locationsByIds;
}

export async function getLocation(id) {
  const data = await request('https://rickandmortyapi.com/graphql', locationQuery, { id });
  return data.location;
}

export async function getCompleteLocation(id) {
  const data = await request('https://rickandmortyapi.com/graphql', completeLocationQuery, { id });
  return data.location;
}
