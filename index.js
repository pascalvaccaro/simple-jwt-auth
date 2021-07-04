const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const { User, startDb } = require('./database');
const dummySecret = 'dummySecret';

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

const port = process.env.PORT || 5000;

app
.get('/', async (req, res) => {
  const token = (req.headers.authorization || '').replace('JWT ', '');
  const auth = jwt.verify(token, dummySecret);
  if (!auth) return res.status(403).send('Invalid token');

  const user = await User.findById(auth.id);
  if (!user) return res.status(404).send(`No user found with ID ${auth.id}`);
  return res.json({ user });
})
.post('/connect', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.verifyPassword(password))) return res.status(401).send('Invalid email/password');
  const token = jwt.sign({ id: user.id }, dummySecret, { expiresIn: '1h' });
  return res.json({ token });
})
.post('/register', async (req, res) => {
  try {
    const user = await User.create(req.body);
    if (!user) return res.status(400).send();
    return res.status(201).json({ user });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

startDb().then(() => app.listen(port, () => console.log('Server listening on port', port)));