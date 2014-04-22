module.exports = function(app, connection) {
  app.get('/api/stories', function(req, res) {
    var query = 'SELECT * FROM stories';
    connection.query(query, function(err, rows) {
      if (err) console.log(err);
      res.json(rows);
    });
  });

  // temporary section, mocked login, will be moved
  app.post('/api/login', function(req, res) {
    res.json({
      email     : "vorobyovmark@gmail.com",
      firstName : "Mark",
      lastName  : "Vorobyov",
      token     : "asdf1234asdf1234"
    });
  });
  
  app.post('/api/signup', function(req, res) {
    res.json({
      email     : "vorobyovmark@gmail.com",
      firstName : "Mark",
      lastName  : "Vorobyov",
      token     : "asdf1234asdf1234"
    });
  });

  app.post('/api/logout', function(req, res) {
    res.send();
  });
  // end of temporary section

  app.get('*', function(req, res) {
    res.sendfile('./public/views/index.html');
  });
}