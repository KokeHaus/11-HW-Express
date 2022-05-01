
const express = require("express");
const fs = require("fs");
const app = express();
var path = require("path");
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

    ////////////////////////////////////////////////////////////////////
    app.get("/api/notes", function(req, res) {
        fs.readFile(__dirname + "/Develop/db/db.json", 'utf8', function (err, data) {
            if (err)
              return console.error(err)
            res.json(JSON.parse(data))
          })
    });
    ////////////////////////////////////////////////////////////////////
    app.post("/api/notes", function(req, res) {
        fs.readFile(__dirname + "/Develop/db/db.json", 'utf8', function (err, data) {
            if (err) 
              return console.error(err)
        notes = JSON.parse(data)
        let id = notes.length;
        let newNote = { title: req.body.title, text : req.body.text, id: id,}
        let currNote = notes.concat(newNote);
        update(currNote);
        res.json(currNote);
        })

    });
    ////////////////////////////////////////////////////////////////////
    app.get("/api/notes/:id", function(req,res) {
        res.json(notes[req.params.id]);
    });
    ////////////////////////////////////////////////////////////////////
    app.delete("/api/notes/:id", function(req, res) {
        const id = JSON.parse(req.params.id)
        fs.readFile(__dirname + "/Develop/db/db.json", 'utf8', function (err, data) {
            if (err) 
              return console.error(err)
        notes=JSON.parse(data);
        notes = notes.filter(val => val.id !== id);
        update(notes);
        res.json(notes);
        })
    });
    ////////////////////////////////////////////////////////////////////
    app.get('/notes', function(req,res) {
        res.sendFile(path.join(__dirname, "/public/notes.html"));
    });
    ////////////////////////////////////////////////////////////////////
    app.get('*', function(req,res) {
        res.sendFile(path.join(__dirname, "/public/index.html"));
    });
    ////////////////////////////////////////////////////////////////////
    function update(notes) {
        fs.writeFile(__dirname + "/Develop/db/db.json", JSON.stringify(notes,'\t'), err => {
            if(err) 
                return console.error(err);
            return true;
        });
    }

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});  