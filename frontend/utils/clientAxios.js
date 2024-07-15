import axios from "axios";
import { URL_BACKEND } from "@env";

const clientAxios = axios.create();
clientAxios.defaults.baseURL = URL_BACKEND;
console.log("");

export default clientAxios;
