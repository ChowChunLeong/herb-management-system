const mysql = require('mysql');

// Connection Pool
let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

exports.view = (req, res) => {
    res.render('landing');
}

exports.dashbroad = (req, res) =>{
  res.render('home');
}

exports.login = (req, res) =>{
    let name = req.body.name;
    let password = req.body.password;
    connection.query('SELECT * FROM admin where name = ? AND password = ?', [name, password], (err, rows) => {
      if (!err && rows.length >0) {
        res.redirect('/admin/dashbroad');
      } else {
        res.render('landing', {alert:'Login Failed'});
      }
    });
}
exports.logout = (req, res) =>{
		res.redirect('/admin');
}

  exports.form = (req, res) => {
    res.render('add-herb');
  }
  
  exports.create = (req, res) => {
    const { name, description, quantity} = req.body;
  
    // User the connection
    connection.query('INSERT INTO herb SET name = ?, description = ?, quantity = ?', [name, description, quantity], (err, rows) => {
      if (!err) {
        res.render('home', { alert: 'Herb added successfully.' });
      } else {
        console.log(err);
      }
      console.log('The data from herb table: \n', rows);
    });
  }

  exports.edit = (req, res) => {
    const { id, name, description, quantity} = req.body;
    // User the connection
    connection.query('UPDATE herb SET name = ?, description = ?, quantity = ? WHERE id =?', [name, description, quantity,id], (err, rows) => {
      if (!err) {
        res.render('home', { alert: 'Herb edited successfully.' });
      } else {
        console.log(err);
      }
    });
  }

  exports.delete = (req, res) => {
    // User the connection
    connection.query('DELETE FROM herb WHERE id = ?', [req.params.id], (err, rows) => {
      if (!err) {
        res.render('home', { alert: 'Herb edited successfully.' });
      } else {
        console.log(err);
      }
    });
  }

  exports.retrieve_herb_list = (req, res) =>{
    connection.query('SELECT * FROM herb', (err, rows) => {
      console.log(err);
      if (!err) {
        res.send(rows);
      } else {
        res.send('fail');
      }
    });
  }

  