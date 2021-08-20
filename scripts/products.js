import http from 'k6/http';
import { sleep } from 'k6';

<<<<<<< HEAD
// export let options = {
//   vus: 10,
//   duration: '30s',
// };
=======
export let options = {
  rps: 1000
};
>>>>>>> main

export default function() {
  http.get('http://localhost:4000/products');
  sleep(1);
}

