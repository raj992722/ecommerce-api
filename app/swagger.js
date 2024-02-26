const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

module.exports = async (app)=> {


    // swagger definion
    const swaggerDefinition = {
        openapi : "3.0.0",
        info: {
            title: "E-Commerce API",
            version: "1.0.0",
            description: "Basic e-commerce API with express and postgres",
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT}`,
                description: "Development Server"
            }
        ],
        components : {
            securitySchemes: {
                bearerJWT: {
                    type: "apiKey",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                },
                cookieJWT: {
                    type: "apiKey",
                    in : "cookie",
                    name: "access_token"
                }
            }
        },
        tags : [
            "Shop",
            "Auth",
            "Account",
            "Checkout"
        ]
    };

    // options for the swagger docs
     const options = {
        // import swaggerDefinition
        swaggerDefinition: swaggerDefinition,
        // path to the API docs
        apis : [
            "./routes/shop/home.js",
            "./routes/shop/products.js",
            "./routes/shop/*.js",
            "./routes/auth/register.js",
            "./routes/auth/*.js",
            "./routes/account/index.js",
            "./routes/account/*.js",
            "./routes/checkout/index.js",
            "./routes/checkout/auth.js",
            "./routes/checkout/shipping.js",
            "./routes/checkout/payment",
            "./routes/checkout/*.js"
        ],
     };


     // initialize swagger-jsdoc
     const swaggerSpec= swaggerJSDoc(options);

     // serve swagger.json
     app.get('/swagger.json',(req,res)=>{
        res.setHeader("Content-Type",  "application/json");
        res.send(swaggerSpec);
     });


     // serve swagger UI
     app.use("/api-docs",swaggerUi.serve, swaggerUi.setup(swaggerSpec));
     

}