import axios from "axios";
import md5 from 'crypto-js/md5';

const baseURL = "https://gateway.marvel.com/v1/public/characters";
const ts = 1;


const publicKey = "f17fdf27e28b5222126c90241ffef0bd";
const privateKey = "30b5430e0e3f180787f38879d42b977eb46778b7";


const hash = md5(ts + privateKey + publicKey).toString();
  
export const getCharacters = (page) => {
  const offset = page && page * 15;
  return axios.get(`${baseURL}?ts=1&apikey=${publicKey}&hash=${hash}&limit=15&offset=${offset}`);
};

export const getCharacterById = (id) => {
  return axios.get(`${baseURL}/${id}?apikey=${publicKey}&hash=${hash}&ts=1`);
};