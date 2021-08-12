import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  rps: 1000
};

export default function() {
  http.get('http://localhost:4000/products');
  sleep(1);
}

