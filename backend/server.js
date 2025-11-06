import express from 'express';
import { port, secret } from './config/config.js';
import { connect } from './config/db.js';
import { authRoutes } from './routes/auth.js';
import { dashboardRoutes } from './routes/dashboard.js';
import session from 'express-session';
import path from 'path';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(path.resolve(), 'public')));
app.use(session({
  secret: secret,
  resave: true,
  saveUninitialized: true,
}));
app.use('/auth', authRoutes());
app.use('/dashboard', dashboardRoutes());
app.listen(port, () => console.log(`server is listening to port ${port}`));
connect();