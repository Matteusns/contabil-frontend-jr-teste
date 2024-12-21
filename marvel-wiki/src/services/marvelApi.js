import axios from "axios";

import md5 from 'crypto-js/md5';
const baseURL = "https://gateway.marvel.com/v1/public/characters";

const ts = 1;
export const publicKey = "f17fdf27e28b5222126c90241ffef0bd";
export const privateKey = "30b5430e0e3f180787f38879d42b977eb46778b7";

const hash = md5(ts + privateKey + publicKey).toString();
  
export const getCharacters = () => {
  return axios.get(`${baseURL}?ts=1&apikey=${publicKey}&hash=${hash}&limit=10`);
};

export const getCharacterById = (id) => {
  return axios.get(`${baseURL}/${id}?apikey=${apikey}`);
};
