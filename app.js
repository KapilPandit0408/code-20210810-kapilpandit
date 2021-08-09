const express           = require("express")
const morgan            = require("morgan");
const bodyParser        = require('body-parser');
const path              = require('path');
const cors              = require('cors');
const swaggerjsDoc      = require("swagger-jsdoc");
const swaggerui         = require("swagger-ui-express");
const mainRoute         = require("./Router/mainRoute")
const connectDB         = require("./config/db")
const seedDB            = require("./seeds")
const colors            = require('colors');
const app               = require('express')();


if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

require("dotenv").config({
  path: "./config/config.env",
});
connectDB();

const swaggerOptions = {
    swaggerDefinition: {
      swagger: "2.0",
      info: { 
        title:"Swagger APIs Documentation",
        openapi: "3.0.1",
        summary:"Assesment",
        version: "1.0.0",
        description:" API information, You can find out more about Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).",
        contact: {
          email:"kapilpandit0408@gmail.com",
          phone_no:"8087706502",
        },
        servers:["http://localhost:3000"],
        components: {
          securitySchemes: {
            bearerAuth: {
              type:"http",
              scheme:"bearer",
              bearerFormat: "JWT",
            },
          },
        },
      },
      schemes: [
      "http", 
      "https" ],
    },
    host: "user.swagger.io",
    apis:["app.js"],
  }


/** 
 * @swagger
 *  definitions:
 *      user:
 *        type: object
 *        properties:
 *          Gender:
 *            type: string
 *          HeightCm:
 *            type: integer
 *          WeightKg:
 *            type: integer
 *          BMI_Category:
 *            type: string
 *          Health_Risk:
 *            type: string
 *          BMI:
 *            type: integer
 *        xml:
 *          name: "user"
 * */

/** 
 * @swagger
 * /api/People_BMI_details:
 *  get:
 *    summary: Get people health Details API
 *    tags:
 *      - name: User
 *    description: people BMI Details 
 *    responses:
 *      '200':
 *        description:Success
 * */  

/** 
 * @swagger
 * /api/get_overweight_people_count:
 *  get:
 *    summary: Get overweight people count API
 *    tags:
 *      - name: User
 *    description: Number of overweight people
 *    responses:
 *      '200':
 *        description:Success
 * */  

seedDB ();

app.use(express.urlencoded({extended:true}));
app.use(cors({credentials: true, origin: true}));

const swaggerDocs = swaggerjsDoc(swaggerOptions);
app.use("/api-docs", swaggerui.serve, swaggerui.setup(swaggerDocs))

app.use("/api", mainRoute)

let  port = process.env.PORT || 3000
app.listen(port,'localhost', ()=> {
  console.log(`Server started on ${port}`)
});