import http from 'k6/http'
import { sleep } from 'k6'

export const options = {
  iterations: 10,
}

export default function () {
  const url = 'http://localhost:3000/swagger/login';
  const payload = JSON.stringify({
    username: 'michelleyonezawa',
    password: '123456',
  })

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const resposta = http.post(url, payload, params);

  sleep(1)
}