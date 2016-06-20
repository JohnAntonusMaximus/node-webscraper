var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var port = process.env.PORT || '3000' ;

app.get('/scrape', function(req , res){
    url= 'http://www.imdb.com/title/tt0364725/';
    request(url, function (error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            
            var title, release, rating;
            var json = {title: "", release: "", rating: ""};
            
            $('h1').filter(function(){
                var data = $(this);
                
                title = data.text();
                release = data.children().first().text();
                
                json.title = title.trim();
                json.release = release;
            })
            
            $('.subtext').filter(function(){
                var data = $(this);
                
                rating = data.text();
                ratingParsed =rating.substring(21,26);
                json.rating = ratingParsed.trim();
            })
            
            
        } //if(!err)
      
            fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
           
                console.log('File successfully written! - Check your project directory for the output.json file');
                
            }) // fs.writeFile()
               
                res.send('Check your console!')
            
        });  // request()
}) // app.get()

app.listen(port);
console.log('Let the magic begin...');
exports = module.exports = app;

