import SparkMD5 from 'spark-md5';

// if the URL changes, update this variable
const url = 'https://gamesmith-assets.gamesmith.com/games/';

function hexHash(gameID) {
  return SparkMD5.hash(gameID);
}

export function getGameURLFromId(gameID, dimensions) {
  return `${url.replace(/^http:\/\//i, 'https://')}${hexHash(gameID)}/${dimensions}.jpg`;
}
