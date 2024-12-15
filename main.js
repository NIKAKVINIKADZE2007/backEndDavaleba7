//!task 1

// import fs from 'fs/promises';
// import fetch from 'node-fetch';

// async function main() {
//   const response = await fetch('https://dummyjson.com/users');

//   const data = await response.json();

//   await fs.writeFile('data.json', JSON.stringify(data, null, 2));
// }

// main();

//!task 2

// import http from 'http';
// import fs from 'fs/promises';

// async function main() {
//   const server = http.createServer(async (req, res) => {
//     if (req.url == '/users') {
//       const rawData = await fs.readFile('data.json', 'utf-8');
//       const data = JSON.parse(rawData);

//       res.setHeader('Content-Type', 'application/json');
//       res.write(JSON.stringify(data));
//       res.end();
//     }

//     res.write('hello');
//     res.end();
//   });

//   server.listen(3000, () => {
//     console.log('server is running on port http://localhost:3000');
//   });
// }

// main();

import http from 'http';
import url from 'url';
import queryString from 'querystring';
import fs from 'fs/promises';

async function main() {
  const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url);
    const queryParams = queryString.parse(parsedUrl.query);

    if (parsedUrl.pathname === '/users') {
      const rawData = await fs.readFile('data.json', 'utf-8');
      const data = JSON.parse(rawData);

      let filteredData = data.users;

      if (queryParams.age) {
        filteredData = filteredData.filter(
          (el) => el.age == Number(queryParams.age)
        );
      }

      if (queryParams.gender) {
        filteredData = filteredData.filter(
          (el) => el.gender.toLowerCase() == queryParams.gender.toLowerCase()
        );
      }

      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(filteredData));
      res.end();
    } else {
      res.write('hello go to /users');
      res.end();
    }
  });

  server.listen(3000, () => {
    console.log('server is running on port http://localhost:3000');
  });
}

main();
