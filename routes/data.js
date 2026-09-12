const express = require('express');

const requestLog = [];
const router = express.Router();

const users = [
  {
    id: 1,
    name: 'Olivia Chen',
    email: 'olivia.chen@example.com',
    department: 'Engineering',
    role: 'Manager',
    status: 'active',
    joinedDate: '2023-02-14'
  },
  {
    id: 2,
    name: 'Marcus Rivera',
    email: 'marcus.rivera@example.com',
    department: 'Design',
    role: 'Lead',
    status: 'active',
    joinedDate: '2023-04-03'
  },
  {
    id: 3,
    name: 'Priya Patel',
    email: 'priya.patel@example.com',
    department: 'Marketing',
    role: 'Analyst',
    status: 'active',
    joinedDate: '2023-06-21'
  },
  {
    id: 4,
    name: 'James Thompson',
    email: 'james.thompson@example.com',
    department: 'Finance',
    role: 'Manager',
    status: 'inactive',
    joinedDate: '2023-08-09'
  },
  {
    id: 5,
    name: 'Aisha Khan',
    email: 'aisha.khan@example.com',
    department: 'HR',
    role: 'Lead',
    status: 'active',
    joinedDate: '2023-10-16'
  },
  {
    id: 6,
    name: 'Ethan Brooks',
    email: 'ethan.brooks@example.com',
    department: 'Engineering',
    role: 'Engineer',
    status: 'active',
    joinedDate: '2023-11-27'
  },
  {
    id: 7,
    name: 'Sofia Martinez',
    email: 'sofia.martinez@example.com',
    department: 'Design',
    role: 'Designer',
    status: 'inactive',
    joinedDate: '2024-01-12'
  },
  {
    id: 8,
    name: 'Noah Williams',
    email: 'noah.williams@example.com',
    department: 'Marketing',
    role: 'Analyst',
    status: 'active',
    joinedDate: '2024-03-05'
  },
  {
    id: 9,
    name: 'Grace Kim',
    email: 'grace.kim@example.com',
    department: 'Finance',
    role: 'Lead',
    status: 'active',
    joinedDate: '2024-05-20'
  },
  {
    id: 10,
    name: 'Daniel Foster',
    email: 'daniel.foster@example.com',
    department: 'HR',
    role: 'Manager',
    status: 'inactive',
    joinedDate: '2024-09-02'
  }
];

router.get('/data', (req, res) => {
  requestLog.push({ ts: Date.now(), query: req.query });
  res.json({ success: true, users });
});

router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
