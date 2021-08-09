
var User = require("./Model/User")

var data = [
  { Gender: 'Male', HeightCm: 171, WeightKg: 96 },
  { Gender: 'Male', HeightCm: 161, WeightKg: 85 },
  { Gender: 'Male', HeightCm: 180, WeightKg: 77 },
  { Gender: 'Female', HeightCm: 166, WeightKg: 62 },
  { Gender: 'Female', HeightCm: 150, WeightKg: 70 },
  { Gender: 'Female', HeightCm: 167, WeightKg: 82 },
]


function seedDB () {
    User.deleteMany({}, (err) => {
        if(err) {
            console.log(err);
        }
        console.log(`Removed persons`.yellow.strikethrough);
    data.forEach((seed) => {
        User.create(seed, (err, state) => {
            if(err) {
                console.log(err)
            }
            else {
                console.log(`Added New user`.blue.italic)
            }
        })
    });
    });
}

console.log("Server Started")
module.exports = seedDB;