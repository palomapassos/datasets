const fs = require('fs');
const stream = fs.createReadStream('breweries.csv');
const csvParser = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

let conteudo = [];

stream.pipe(csvParser()).on("data", (data) => {
    conteudo.push(
        {
            id: Number(conteudo.length + 1),
            name: data.name.trim().replace(/\'/g,"").replace(/"`"/g,""),
            city: data.city.trim().replace(/\'/g,"").replace(/"`"/g,""),
            state: data.state.trim()
        }
    )
})

stream.on("end", () => {
    const csvWriter = createCsvWriter({
        path: 'cervejarias.csv',
        header: [
            {id: "id", title: "id"},
            {id: "name", title: "nome_cervejaria"},
            {id: "city", title: "cidade"},
            {id: "state", title: "estado"}
        ]
    })

    csvWriter.writeRecords(conteudo);
})


