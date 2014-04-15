module.exports = function(app, connection) {
  app.get('/api/stories', function(req, res) {
    var query = 'SELECT * FROM stories';
    connection.query(query, function(err, rows) {
      if (err) console.log(err);
      res.json(rows);
    });
  });

  app.get('*', function(req, res) {
    res.sendfile('./public/views/index.html');
  });
}