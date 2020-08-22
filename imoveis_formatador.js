const csvParser = require('csv-parser');
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const fs = require("fs");
const stream = fs.createReadStream("houses.csv");

let conteudo = [];

stream.pipe(csvParser()).on('data', (data) => {
    conteudo.push({
        id: conteudo.length + 1,
        city: data.city.trim(),
        area: Number(data.area.replace(",",".")),
        rooms: Number(data.rooms),
        bathroom: Number(data.bathroom),
       'parking spaces': Number(data['parking spaces']),
        floor: data.floor === "-" ? 0 : Number(data.floor),
        animal: data.animal,
        furniture: data.furniture,
        hoa: Number(data.hoa)*100,
       'rent amount': Number(data['rent amount'].replace(",","."))*100,
       'property tax': Number(data['property tax'].replace(",","."))*100,
       'fire insurance': Number(data['fire insurance'].replace(",","."))*100,
        total: Number(data.total.replace(",","."))*100
    });
})
//city,area,rooms,bathroom,parking spaces,floor,animal,furniture,hoa,rent amount,property tax,fire insurance,total
stream.on("end", () => {
    console.log(conteudo);

    const csvWriter = createCsvWriter({
        path: 'houses_formatado.csv',
        header: [
            {id: 'id', title: 'id'},
            {id: 'city', title: 'cidade'},
            {id: 'area', title: 'area'},
            {id: 'rooms', title: 'quartos'},
            {id: 'bathroom', title: 'banheiros'},
            {id: 'parking spaces', title: 'vagas de estacionamento'},
            {id: 'floor', title: 'andar'},
            {id: 'animal', title: 'animal'},
            {id: 'furniture', title: 'mobilia'},
            {id: 'hoa', title: 'condominio'}, 
            {id: 'rent amount', title: 'aluguel'},
            {id: 'property tax', title: 'imposto'},
            {id: 'fire insurance', title: 'seguro contra incendio'},
            {id: 'total', title: 'total'}
        ]
    });

    csvWriter.writeRecords(conteudo);
})