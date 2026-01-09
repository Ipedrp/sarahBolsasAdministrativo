

import axios from "axios";

const baseURL = "https://sara-bolsas-backend.onrender.com/";

/**
 * Axios público (login, rotas sem auth)
 */
export const apiPublic = axios.create({
  baseURL,
});

/**
 * Axios privado (rotas protegidas)
 */
export const apiPrivate = axios.create({
  baseURL,
});
