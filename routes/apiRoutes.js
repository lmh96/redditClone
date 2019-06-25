const axios = require("axios");
const cheerio = require("cheerio");

module.exports = function(app) {
    app.get("/api/scrape", function (req, res) {
        axios.get("https://old.reddit.com/").then(function (response) {
            var $ = cheerio.load(response.data);
            var results = [];

            $("p.title").each(function (i, element) {
                var title = $(element).text();
                var link = $(element).children().attr("href");

                results.push({
                    title: title,
                    link: link
                });
            });
            res.json(results);
        });
    });

    app.get("/api/scrape/:id", function (req, res) {
        axios.get("https://old.reddit.com/r/" + req.params.id + "/").then(function (response) {
            var $ = cheerio.load(response.data);
            var results = [];

            $("p.title").each(function (i, element) {
                var title = $(element).text();
                var link = $(element).children().attr("href");

                results.push({
                    title: title,
                    link: link
                });
            });
            res.json(results);
        });
    });

    app.get('/api/get', function (req, res) {

    });

    app.get('api/get/:id', function (req, res) {

    });
}