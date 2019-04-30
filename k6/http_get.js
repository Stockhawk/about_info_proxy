import http from "k6/http";
import { Counter } from "k6/metrics";
import convertBaseCharacter from "./convert.js";

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const requests = new Counter('requests');

export default function() {
  let random;
  let symbol;

  for (let i = 0; i < 1e7; i++) {
    random = Math.random() * 1e7;
    symbol = convertBaseCharacter(random, alphabet, 5);
    http.get(`http://localhost:3000/stocks/${symbol}`);
    requests.add(1);
  }
}