import http from 'k6/http';
import { sleep } from 'k6';
 
export default function() {
  http.get('http://localhost:4000/products');
  // http.get('http://localhost:4000/products/:product_id');
  // http.get('http://localhost:4000/products/:product_id/styles');
  // http.get('http://localhost:4000/products/:product_id/related');
  sleep(1);
}

