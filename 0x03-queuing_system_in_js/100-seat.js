const express = require('express');
const redis = require('redis');
const kue = require('kue');
const { promisify } = require('util');

// Create Redis client
const client = redis.createClient();
const reserveSeat = (number) => client.set('available_seats', number);
const getAsync = promisify(client.get).bind(client);

// Set initial number of available seats to 50
reserveSeat(50);

// Initialize reservationEnabled to true
let reservationEnabled = true;

// Create Kue queue
const queue = kue.createQueue();

// Create Express server
const app = express();
const port = 1245;

app.get('/available_seats', async (req, res) => {
    const availableSeats = await getAsync('available_seats');
    res.json({ numberOfAvailableSeats: availableSeats });
});

app.get('/reserve_seat', async (req, res) => {
    if (!reservationEnabled) {
        return res.json({ status: 'Reservation are blocked' });
    }
    
    const job = queue.create('reserve_seat').save((err) => {
        if (!err) {
            return res.json({ status: 'Reservation in process' });
        } else {
            return res.json({ status: 'Reservation failed' });
        }
    });
    
    job.on('complete', () => {
        console.log(`Seat reservation job ${job.id} completed`);
    }).on('failed', (err) => {
        console.log(`Seat reservation job ${job.id} failed: ${err.message}`);
    });
});

app.get('/process', (req, res) => {
    res.json({ status: 'Queue processing' });
    
    queue.process('reserve_seat', async (job, done) => {
        const availableSeats = await getAsync('available_seats');
        const seats = parseInt(availableSeats, 10);
        
        if (seats <= 0) {
            reservationEnabled = false;
            return done(new Error('Not enough seats available'));
        }
        
        reserveSeat(seats - 1);
        const newAvailableSeats = await getAsync('available_seats');
        
        if (newAvailableSeats <= 0) {
            reservationEnabled = false;
        }
        
        done();
    });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
