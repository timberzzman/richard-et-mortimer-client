export function deleteFavorite(favoriteType, favoriteID) {
  let favorites = JSON.parse(localStorage.getItem('favorites'));
  favorites = favorites.filter(
    (element) => element.type !== favoriteType || element.id !== favoriteID,
  );
  if (!favorites.length) {
    localStorage.removeItem('favorites');
  } else {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}

export function addFavorite(favoriteType, favoriteID) {
  let favorites = JSON.parse(localStorage.getItem('favorites'));
  if (!favorites) {
    favorites = [];
  }
  favorites.push({ id: favoriteID, type: favoriteType });
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

export function isFavorite(favoriteType, favoriteID) {
  let result = false;
  const favorites = JSON.parse(localStorage.getItem('favorites'));
  if (favorites) {
    result = favorites.some(
      (element) => element.id === favoriteID && element.type === favoriteType,
    );
  }
  return result;
}

export function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites'));
}
