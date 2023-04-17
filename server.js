const express = require("express")
const app = express()
const PORT = 3000;

app.use(express.static('static'))
const bodyParser = require("body-parser")
const path = require("path")

const hbs = require('express-handlebars');
app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));   // domyślny layout, potem można go zmienić
app.set('view engine', 'hbs');                           // określenie nazwy silnika szablonów
app.use(express.json());
//



const Datastore = require('nedb')


const collAuta = new Datastore({
    filename: 'kolekcjaAuta.db',
    autoload: true
});


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT )
})

app.get("/", function (req, res){
    res.render('index.hbs')
})

app.get("/add", function (req, res){
    res.render('add.hbs')
})

var object = {}
collAuta.find({ }, function (err, docs) {     
        object = {
            arr: docs.slice()
        }

    })

app.get("/edit", function (req, res){

        res.render('edit.hbs', object);

})
app.get("/list", function (req, res){
    collAuta.find({ }, function (err, docs) {
        obj = {
            arr: docs.slice()
        }
        res.render('list.hbs', obj);
});

})




app.post("/handleForm", function (req, res) {
    data = req.body
    console.log(data)
    collAuta.insert(data, function (err, newDoc) {
        res.send(newDoc)
    });
    collAuta.find({ }, function (err, docs) {     
            object = {
                arr: docs.slice()
            }
    })
});


app.post("/delete", function ( req, res)
{
    data = req.body;
    console.log("help"+ data.id)
    collAuta.remove({_id:data.id }, { multi: true }, function (err, numRemoved) {
    console.log("usunięto dokumentów: ",numRemoved)
    });
    collAuta.find({ }, function (err, docs) {     
        object = {
            arr: docs.slice()
        }
        res.render('edit.hbs', object);

    })
})


app.post("/edit", function ( req, res)
{
    data = req.body;
    console.log("help"+ data.id)

        collAuta.find({ }, function (err, docs) {
        object = {
            arr: docs.slice()
        }

          for (const property in object.arr) {
                if(object.arr[property]._id == data.id)
                {
                    object.arr[property].edit="nie"
                }          
            }
        res.render('edit.hbs', object);
        console.log("renderuje edit")
        console.log(object)
        
    })
})


app.post("/cancel", function ( req, res)
{
    
    data = req.body;
    console.log("help"+ data.id)

        collAuta.find({ }, function (err, docs) {
        object = {
            arr: docs.slice()
        }
        res.render('edit.hbs', object);
        
    })
})



app.post("/edit2", function ( req, res)
{
    data = req.body
    collAuta.update({ _id: data.id}, { $set: data }, {}, function (err, numUpdated) {
        console.log("zaktualizowano " + numUpdated)

          collAuta.find({ }, function (err, docs) {
        object = {
            arr: docs.slice()
        }
        res.render('edit.hbs', object);
        
        })
    });

    

})