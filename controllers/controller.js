const fetch = require('node-fetch');
// const Bluebird = require("bluebird");
// fetch.Promise = Bluebird;

exports.getIndex = (req, res) => {
    fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
            "x-rapidapi-key": "789161a8a1msh31d70a3452e231fp173400jsnb786c8f7e35a"
        }
    })
    .then(res => res.json())
    .then(body => {
        res.render("index", {
            title : "Covid-19 Tracker App",
            datas : body.countries_stat,
            userInput : null
        })
    })
    .catch(err => console.log(err));
}

exports.getSearchController = (req, res) => {
    let userInput;
    let indexNum;
    let condition = false;
    req.body.userInput ? userInput = req.body.userInput : userInput = null;
    fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
            "x-rapidapi-key": "789161a8a1msh31d70a3452e231fp173400jsnb786c8f7e35a"
        }
    })
    .then(res => res.json())
    .then(body => {
        body.countries_stat.forEach((data, index) => {
            if(data.country_name === userInput){
                indexNum = index;
                condition = true
            }
        })
        res.render("searchCountry", {
            title : "Covid-19 Tracker App",
            data : body.countries_stat[indexNum],
            userInput : userInput,
            condition : condition
        })
    })
    .catch(err => console.log(err));
}

exports.getLatestCase = (req, res, err) => {
    fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
            "x-rapidapi-key": "789161a8a1msh31d70a3452e231fp173400jsnb786c8f7e35a"
        }
    })
    .then(res => res.json())
    .then(body => {
        res.render("totalCase", {
            title : "World Total Case",
            data : body,
            userInput : null
        })
    })
    .catch(err => {
        console.log(err);
    });
}

exports.getCheckWithDate = (req, res, err) => {
    const country = req.query.country;
    const date = req.query.date;
    if(country && date){
        fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/history_by_country_and_date.php?country="+country+"&date="+date, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                "x-rapidapi-key": "789161a8a1msh31d70a3452e231fp173400jsnb786c8f7e35a"
            }
        })
        .then(res => res.json())
        .then(body => {
            res.render("checkWithDate", {
                title : "Check With Date",
                userInput : null,
                country : country,
                date : date,
                country_name : country.toUpperCase(),
                datas : body.stat_by_country
            })
        })
        .catch(err => {
            console.log(err);
        });
    } else {
        res.render("checkWithDate", {
            title : "Check With Date",
            userInput : null,
            country : null,
            date : null,
            country_name : null,
            datas : []
        })
    }
    
}