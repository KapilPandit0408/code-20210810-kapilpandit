const router          = require("express").Router();
const User            = require("../Model/User")    

exports.getBmiDetails = async (req, res, next) => {
    const users = await User.find({})
    await users.forEach(async element => {
        const height = (element.HeightCm)/100;
        const mass   = element.WeightKg
        const BMI    = (mass/Math.pow(height, 2)).toFixed(1)
        var BMI_Category = "";
        var Health_Risk  = "";
        if(BMI <= 18.4) {
            BMI_Category= "Underweight";
            Health_Risk="MalnutritionRisk";
        } else if(BMI >=18.5 && BMI<= 24.9) {
            BMI_Category= "NormalWeight";
            Health_Risk="LowRisk";
        } else if(BMI >=25 && BMI<= 29.9) {
            BMI_Category= "Overweight";
            Health_Risk="EnhancedRisk";
        } else if(BMI >=30 && BMI<= 34.9) {
            BMI_Category= "ModeratelyObese";
            Health_Risk="MediumRisk";
        } else if(BMI >=35 && BMI<= 39.9) {
            BMI_Category= "SeverelyObese";
            Health_Risk="HighRisk";
        } else if(BMI >=30 && BMI<= 34.9) {
            BMI_Category= "VerySeverelyObese";
            Health_Risk="VeryHighRisk";
        }
        const id = element._id;
        var persondata = await User.findByIdAndUpdate(id, {$set:{BMI:BMI,BMI_Category:BMI_Category,Health_Risk:Health_Risk}});
    });

    await User.find({})
    .exec(function (err, foundUsers) {
    User.countDocuments().exec(function (err, count) {
        if (err) return next(err)
        res.status(200).json({
          message:"People's Details",
          data: {
            Users: foundUsers,
            Total_Users:count,
          },
          statusCode: 200
        })
        next()
      })
    })
}

exports.getCount = async (req, res, next) => {
    var count    = 0;
    const users  = await User.find({})
    users.forEach(element => {
        if(element.BMI_Category == "Overweight") {
            count = count + 1;
        }
    });
    res.status(200).json({message:`Total number of Overweight People's is ${count}` })
    next();
}
