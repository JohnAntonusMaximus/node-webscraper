var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function(req,res){
    url= 'http://www.imdb.com/title/tt0364725/';
    request(url, function (error, res, html){
        if(!error){
            var $ = cheerio.load(html);
            
            var title, release, rating;
            var json = {title: "", release: "", rating: ""};
            
            $('h1').filter(function(){
                var data = $(this);
                
                title = data.text();
                release = data.children().first().text();
                
                json.title = title;
                json.release = release;
            });
            
            $('.subtext').filter(function(){
                var data = $(this);
                
                rating = data.text();
                ratingParsed =rating.substring(21,26);
                json.rating = ratingParsed;
            });
            
            console.log(json);
        }
    });
});

app.listen('8081');
console.log('Let the magic begin...');
exports = module.exports = app;