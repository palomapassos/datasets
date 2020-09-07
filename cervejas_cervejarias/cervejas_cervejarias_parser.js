const fs = require('fs');
const stream_cervejarias = fs.createReadStream('breweries.csv');
const stream_cervejas = fs.createReadStream('beers.csv');
const csvParser = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

let conteudo_cervejarias = [], conteudo_cervejas = [];

//id,name,city,state

stream_cervejarias.pipe(csvParser()).on("data", (data) => {
    conteudo_cervejarias.push(
        {
            id: Number(data.id),
            name: data.name.trim().replace(/\'/g,"").replace(/"`"/g,""),
            city: data.city.trim().replace(/\'/g,"").replace(/"`"/g,""),
            state: data.state.trim()
        }
    )
})

stream_cervejarias.on("end", () => {
    const csvWriter_cervejarias = createCsvWriter({
        path: 'cervejarias.csv',
        header: [
            {id: "id", title: "id"},
            {id: "name", title: "nome_cervejaria"},
            {id: "city", title: "cidade"},
            {id: "state", title: "estado"}
        ]
    })

    csvWriter_cervejarias.writeRecords(conteudo_cervejarias);
})

//id,abv,ibu,national_id,name,style,brewery_id,ounces

stream_cervejas.pipe(csvParser()).on("data", (data) => {
    conteudo_cervejas.push(
        {
            id: Number(data.id),
            abv: Number(data.abv),
            ibu: Number(data.ibu),
            national_id: Number(data['national_id']),
            name: data.name.replace(/\'/g,"").replace(/\"/g,"").replace(/\`/g,""),
            style: data.style.replace(/\'/g,"").replace(/\"/g,"").replace(/\`/g,""),
            brewery_id: Number(data['brewery_id']),
            ounces: Number(data.ounces)
        }
    )
});

stream_cervejas.on("end", () => {
    const csvWriter_cervejas = createCsvWriter({
        path: 'cervejas.csv',
        header: [
            {id: "id", title: "id"},
            {id: "abv" , title: "abv"},
            {id: "ibu" , title: "ibu"},
            {id: "national_id" , title: "id_nacional"},
            {id: "name" , title: "nome_cerveja"},
            {id: "style" , title: "estilo"},
            {id: "brewery_id" , title: "cervejaria"},
            {id: "ounces" , title: "ounces"}
        ]
    })

    csvWriter_cervejas.writeRecords(conteudo_cervejas);
});



