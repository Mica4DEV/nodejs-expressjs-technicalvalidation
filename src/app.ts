import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { MongoClient, ServerApiVersion } from 'mongodb';

import * as middlewares from './middlewares';
import api from './controllers';

require('dotenv').config();

const client = new MongoClient("mongodb+srv://dbUser:dbUserPassword@cbtw-mongo-technical-va.yajbi9r.mongodb.net/?retryWrites=true&w=majority&appName=cbtw-mongo-technical-validation-1", {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to CBTW 👋',
  });
});

app.use('/api/v1', api);

app.post('/users/search', async (req, res) => {
  const query = req.body as { email: string };

  const client = new MongoClient("mongodb+srv://dbUser:dbUserPassword@cbtw-mongo-technical-va.yajbi9r.mongodb.net/?retryWrites=true&w=majority&appName=cbtw-mongo-technical-validation-1", {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  const db = client.db("sample_mflix");
  const usersCollection = db.collection("users");

  const users = await usersCollection.find(query).toArray();

  if (users) {
    let usersOutput: any = [];
    users.forEach(user => {
      usersOutput.push({
        email: user.email,
        name: user.name,
      });
    });
    res.json(usersOutput);
  } else {
    res.status(404).send('User not found');
  }
  await client.close();
});

app.post('/users', async (req, res) => {
  const user = req.body;

  const client = new MongoClient("mongodb+srv://dbUser:dbUserPassword@cbtw-mongo-technical-va.yajbi9r.mongodb.net/?retryWrites=true&w=majority&appName=cbtw-mongo-technical-validation-1", {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  const db = client.db("sample_mflix");
  const usersCollection = db.collection("users");

  const result = await usersCollection.insertOne(user);

  if (result.acknowledged) {
      res.status(201).send('User created');
  } else {
      res.status(500).send('Failed to create user');
  }
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
