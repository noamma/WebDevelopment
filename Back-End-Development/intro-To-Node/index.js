var superheroes = require("superheroes");
var supervillains = require("supervillains");

var mySuperHeroName = superheroes.random();
var mySuperVillainName  = supervillains.random();

console.log(mySuperHeroName + " vs. " + mySuperVillainName);
