/* eslint-disable no-console */
/* eslint-disable eol-last */
import express from 'express';
import '@babel/polyfill';
import bodyParser from 'body-parser';
import router from './src/routes/index';


const app = express();
const port = process.env.PORT || 6500;
app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));


// app.use('*', cloudinaryConfig);
app.use(express.json());

app.use('/', router);

app.get('/', (req, res) => {
  return res.status(200).send({ message: 'YaY! first endpoint works' });
});

app.listen(port, () => console.log(`Server started on port ${port}`));


export default app;