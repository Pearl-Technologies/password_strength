const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors")
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 5000;

app.use(bodyParser.json());
const url = 'mongodb+srv://Santhosh:Santhosh123@cluster1.rjkyl.mongodb.net/';
const dbName = 'passwords';
app.use(cors());

const savePassword = async (password, steps) => {
  const client = new MongoClient(url, { useUnifiedTopology: true });

  try {
    await client.connect().then;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    await collection.insertOne({ password, steps });
  } finally {
    await client.close();
  }
};

app.post('/api/password', async (req, res) => {
  const password = req.body.password;
  const steps = calculateStrength(password);

  try {
    await savePassword(password, steps);
    res.json({ steps });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const calculateStrength = (password) => {
  let steps = 0;

  if (password.length < 6) {
    steps += 6 - password.length;
  } else if (password.length > 20) {
    steps += password.length - 20;
  }

  if (!/[a-z]/.test(password)) {
    steps++;
  }

  if (!/[A-Z]/.test(password)) {
    steps++;
  }

  if (!/\d/.test(password)) {
    steps++;
  }

  if (/(\w)\1\1/.test(password)) {
    steps++;
  }

  return steps;
};
