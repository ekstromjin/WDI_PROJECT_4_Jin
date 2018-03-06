const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { db, env } = require('../config/environment');
const Bird      = require('../models/bird');

Bird.collection.drop();

// const databaseURI = 'mongodb://localhost/project-4-development';
// mongoose.connect(databaseURI, { useMongoClient: true });

const birdData = [{
  name: 'Dipper',
  image: 'http://www.birdid.co.uk/Static/Images/Img00006V002.jpg',
  color: ['black', 'brown', 'white'],
  info: 'test info'
},{
  name: 'Adult Grey Plover',
  image: 'http://www.birdid.co.uk/Static/Images/Img00010V001.jpg',
  color: ['black', 'grey'],
  info: 'test info'
},{
  name: 'Adult Herring Gull',
  image: 'http://www.birdid.co.uk/Static/Images/Img00011V001.jpg',
  color: ['grey', 'white', 'yellow'],
  info: 'test info'
},{
  name: 'Long Tailed Tit',
  image: 'http://www.birdid.co.uk/Static/Images/Img00013V001.jpg',
  color: ['black', 'pink', 'white'],
  info: 'test info'
},{
  name: 'Male Mallard',
  image: 'http://www.birdid.co.uk/Static/Images/Img00014V001.jpg',
  color: ['brown', 'green', 'yellow'],
  info: 'test info'
},{
  name: 'Female Merlin',
  image: 'http://www.birdid.co.uk/Static/Images/Img00013V001.jpg',
  color: ['brown', 'cream'],
  info: 'test info'
},{
  name: 'Skylark',
  image: 'http://www.birdid.co.uk/Static/Images/Img00019V001.jpg',
  color: ['brown', 'white', 'buff'],
  info: 'test info'
},{
  name: 'Adult Song Thrush',
  image: 'http://www.birdid.co.uk/Static/Images/Img01039V001.jpg',
  color: ['brown', 'speckled'],
  info: 'test info'
},{
  name: 'Sedge Warbler',
  image: 'http://www.birdid.co.uk/Static/Images/Img00040V001.jpg',
  color: ['brown', 'grey'],
  info: 'test info'
},{
  name: 'Adult Coot',
  image: 'http://www.birdid.co.uk/Static/Images/Img00036V001.jpg',
  color: ['black', 'white', 'red'],
  info: 'test info'
},{
  name: 'Male Merlin',
  image: 'http://www.birdid.co.uk/Static/Images/Img00040V001.jpg',
  color: ['blue', 'grey', 'orange'],
  info: 'test info'
},{
  name: 'Adult Hobby',
  image: 'http://www.birdid.co.uk/Static/Images/Img00063V001.jpg',
  color: ['brown', 'red'],
  info: 'test info'
},{
  name: 'Male Garganey',
  image: 'http://www.birdid.co.uk/Static/Images/Img00136V001.jpg',
  color: ['brown', 'blue'],
  info: 'test info'
},{
  name: 'Adult Mistle Thrush',
  image: 'http://www.birdid.co.uk/Static/Images/Img00171V002.jpg',
  color: ['brown', 'black', 'grey'],
  info: 'test info'
},{
  name: 'Male Adult Green Woodpecker',
  image: 'http://www.birdid.co.uk/Static/Images/Img00177V001.jpg',
  color: ['brown', 'black', 'grey'],
  info: 'test info'
}];


mongoose.connect(db[env])
  .then(() => Bird.create(birdData))
  .then(birds => console.log(`${birds.length} birds created!`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
