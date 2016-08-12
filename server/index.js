// EXTERNAL MODULES //
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session';
import schedule from 'node-schedule';
import massive from 'massive';

// PASSPORT //
import passport from './services/passport';

// CONFIG //
import config from './config';

// CONTROLLERS
import UserCtrl from './controllers/UserCtrl';
import ApptsCtrl from './controllers/ApptsCtrl';
import PaymentsCtrl from './controllers/PaymentsCtrl';
import NotesCtrl from './controllers/NotesCtrl';

// POLICIES //
let isAuthed = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json();
    } else {
        return next();
    }
};

let isAdmin = (req, res, next) => {
    if (req.user.type !== 'admin') {
        return res.status(401);
    } else {
        return next();
    }
};

// EXPRESS APP //
const app = module.exports = express();

// PSQL CONNECTION //
const massiveInstance = massive.connectSync({
    connectionString: config.CONNECTIONSTRING,
    scripts: 'C:\\Users\\Donovan\\WebDev\\Projects\\OrthoApp_MassiveJs\\db'
    // scripts: './/..//db'
});
app.set('db', massiveInstance);
let db = app.get('db');
// console.log(db);
// db.orthotest.find({
//   // type: 'dog',
//   'description like': 'scary%'
// }, function(err, result) {
//   console.log(result);
// });

app.use(express.static(__dirname + './../public'));
app.use(session({
    secret: config.SESSIONSECRET,
    saveUninitialized: false,
    resave: false
}));
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

// GET
app.get('/logout', UserCtrl.logout);
app.get('/checkAuth', UserCtrl.checkAuth);
app.get('/me', isAuthed, UserCtrl.me);
app.get('/users/pending', isAuthed, UserCtrl.getPending);
app.get('/users/:id', isAdmin, UserCtrl.getUser);
app.get('/payments', isAuthed, PaymentsCtrl.getPayments);
app.get('/notes', isAuthed, NotesCtrl.getNotes);

// POST
app.post('/login', passport.authenticate('local', {
    successRedirect: '/me'
}));
app.post('/users', UserCtrl.register);
app.post('/users/search', UserCtrl.getAllUsers);
app.post('/payments', isAuthed, PaymentsCtrl.makePayment);
app.post('/notes', isAuthed, NotesCtrl.createNote, UserCtrl.createNote);
app.post('/appointments', isAuthed, ApptsCtrl.getAppointments);
app.post('/schedule', isAuthed, isAdmin, ApptsCtrl.getSchedule);
//cancel appointment
app.post('/appointments/:id', isAuthed, ApptsCtrl.cancelAppointment, UserCtrl.cancelAppointment);

// PUT
app.put('/users/:id', isAuthed, UserCtrl.update);
//schedule appointment
app.put('/appointments/:id', isAuthed, ApptsCtrl.scheduleAppointment, UserCtrl.me);
app.put('/notes/:id', isAuthed, NotesCtrl.updateNote);

// let createAppointmentsScheduler = schedule.scheduleJob({
//     hour: '00',
//     minute: '01'
// }, () => {
//     console.log('time to update');
//     ApptsCtrl.createAppointments();
// });
// ApptsCtrl.createAppointments();

// CONNECTIONS //
const port = config.PORT;

app.listen(port, () => {
    console.log('server started succesfully on port ' + config.PORT);
});
