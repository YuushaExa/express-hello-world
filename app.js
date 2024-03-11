const express = require("express");
const fetch = require("node-fetch");
const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  fetch('https://v-jade-mu.vercel.app/dev/json/favfiles/activity.json')
    .then(response => response.json())
    .then(data => {
      const reversedData = data.reverse();
      const activities = reversedData.map(activity => {
        let activityHTML = '';

        if (activity.title !== undefined) {
          activityHTML += `<h3>${activity.title}</h3>`;
        }

        if (activity.image !== undefined) {
          activityHTML += `<img src="${activity.image}" alt="${activity.title}">`;
        }

        if (activity.href !== undefined) {
          activityHTML += `<a href="${activity.href}" target="_blank">${activity.href}</a>`;
        }

        if (activity.time !== undefined) {
          const date = new Date(activity.time * 1000);
          activityHTML += `<p>Time: ${date}</p>`;
        }

        if (activity.text !== undefined) {
          activityHTML += `<p>${activity.text}</p>`;
        }

        return `<div class="activity">${activityHTML}</div>`;
      });

      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Server-side Activity Display</title>
            <style>
              .activity {
                margin-bottom: 1rem;
                border: 1px solid #ccc;
                padding: 1rem;
              }
            </style>
          </head>
          <body>
            <div id="Activity1">
              ${activities.join('')}
            </div>
            <script>
              // Optional: Add any client-side JavaScript logic here if needed
            </script>
          </body>
        </html>
      `;

      res.type('html').send(html);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('An error occurred while retrieving and processing activity data.');
    });
});

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
