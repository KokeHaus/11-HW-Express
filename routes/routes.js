const fs = require('fs');
const util = require('util');
const path = require('path');

module.exports = app => {

    const readFileAsync = util.promisify(fs.readFile);

    readFileAsync("db/db.json","utf8").then(function(data) {
        function update() {
            fs.writeFile("db/db.json", JSON.stringify(notes,'\t'), err => {
                if(err) 
                    return console.log(err);
                return true;
            });
        }
        var notes = JSON.parse(data);
        var id = notes.length;
       
        ////////////////////////////////////////////////////////////////////
        app.get("/api/notes", function(req, res) {
            res.json(notes);
        });
        ////////////////////////////////////////////////////////////////////
        app.post("/api/notes", function(req, res) {
            let newNote = req.body;
            notes[id++] = newNote;
            update();
            return console.log("Added new note: "+newNote.title);

        });
        ////////////////////////////////////////////////////////////////////
        app.get("/api/notes/:id", function(req,res) {
            res.json(notes[req.params.id]);
        });
        ////////////////////////////////////////////////////////////////////
        app.delete("/api/notes/:id", function(req, res) {
            delete notes[req.params.id];
            update();
            console.log("Deleted note with id "+req.params.id);
        });
        ////////////////////////////////////////////////////////////////////
        app.get('/notes', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });
        ////////////////////////////////////////////////////////////////////
        app.get('*', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });
        ////////////////////////////////////////////////////////////////////
      

    });

}