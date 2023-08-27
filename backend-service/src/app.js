import 'dotenv/config';
import express from 'express';
import compression from 'compression';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import cors from "cors";
import routerConfig from './routes/config.js'
import { DBconnection } from './config/database.js'

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.use(
  cors({
    origin: (origin, cb) => cb(null, true),
    credentials: true,
    preflightContinue: true,
    exposedHeaders: [
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept",
      "X-Password-Expired"
    ],
    optionsSuccessStatus: 200
  })
)

function logResponseTime(req, res, next) {
  const startHrTime = process.hrtime();
  res.on('finish', () => {
    const elapsedHrTime = process.hrtime(startHrTime);
    const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
    const message = `${req.method} ${res.statusCode} ${elapsedTimeInMs}ms\t${req.path}`;
    console.log(message)
  });
  next();
}

app.use(logResponseTime);
app.use(compression());

let envVariable = process.env.DOMAIN_URL || '';
let domainUrl = envVariable.split('//');
const options = {
  openapi: '3.0.0',
  definition: {
    info: {
      version: 'v1.0.0',
      title: "api-service API's",
      description: 'This lists and describes the API-Service endpoints',
    },
    host: `${domainUrl[1]}`,
    basePath: '/',
    schemes: ['http', 'https'],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJSDoc(options);
//Documentation
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

routerConfig.forEach((rou) => {
  let route = rou[0]
  let router = rou[1]
  app.use(route, router)
})

DBconnection()

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

const PORT = process.env.PORT;
app.listen(PORT, () => { 
  console.log(`🌏 Server started at http://localhost:${PORT}`)
});
