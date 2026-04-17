
const request = require('request') 


const newsInfo = (search, callback) => {

    const url = "https://newsapi.org/v2/everything?q=tesla&from=2026-03-15&sortBy=publishedAt&apiKey=b5b8fb769e304f879142e2d45b0eeb40"

    request({ url: url, json: true, headers: { 'User-Agent': 'ZNews-App' } }, (error, response, newData) => {
        //console.log(response.body)
        //console.log(newData.articles.length) 
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (newData.articles.length <= 0 ) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            console.log(search) 

            callback(undefined, {
                newsAllInfo : newData.articles, 
            })
        }
    })
}

//newsInfo((err, data) => {if (err) {return console.log(err)}console.log(data)})
        
module.exports = newsInfo 