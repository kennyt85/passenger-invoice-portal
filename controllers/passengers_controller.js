var db = require("../models");

module.exports = function (app) {
  app.get('/api/passengers', function (req, res) {
    let query = {};
    if (req.query.groupId) {
      query.GroupId = req.query.groupId;
    }

    db.Passengers.findAll({
      where: query,
      include: [db.Groups]
    }).then(function (data) {
      res.json(data);
    });
  });

  app.get('/api/passenger/:passengerId', function (req, res) {
    db.Passengers.find({
      where: {
        id: req.params.passengerId
      },
      include: [db.Groups]
    }).then((data) => {
      res.json(data);
    });
  });

  app.post('/api/passenger', function (req, res) {
    db.Passengers.create(req.body).then(function (data) {
      res.json(data);
    });
  });

  app.put('/api/passenger', (req, res) => {
    db.Passengers.update(
      req.body, {
        where: {
          id: req.body.id
        }
      }).then(data => {
      res.json(data);
    });
  });

  app.delete('/api/passenger/:passengerId', function (req, res) {
    db.Passengers.destroy({
      where: {
        id: req.params.passengerId
      }
    }).then(data => {
      res.json(data);
    });
  });

}
