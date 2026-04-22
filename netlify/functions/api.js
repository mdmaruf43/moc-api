const express = require('express');
const serverless = require('serverless-http');
const app = express();
const router = express.Router();

// Mock Data
const linkPointsData = [
    {
        userId: 'U12345',
        memberTier: 'PLUS',
        totalPoints: 2850,
        availablePoints: 2200,
        pendingPoints: 650,
        pointsExpiry: '2026-12-31',
    },
    {
        userId: 'U12346',
        memberTier: 'SILVER',
        totalPoints: 850,
        availablePoints: 850,
        pendingPoints: 0,
        pointsExpiry: '2026-09-15',
    },
    {
        userId: 'U12347',
        memberTier: 'GOLD',
        totalPoints: 12400,
        availablePoints: 11000,
        pendingPoints: 1400,
        pointsExpiry: '2027-01-20',
    },
    {
        userId: 'U12348',
        memberTier: 'PLATINUM',
        totalPoints: 45200,
        availablePoints: 45000,
        pendingPoints: 200,
        pointsExpiry: '2026-11-30',
    },
    {
        userId: 'U12349',
        memberTier: 'BASIC',
        totalPoints: 50,
        availablePoints: 50,
        pendingPoints: 0,
        pointsExpiry: '2026-05-10',
    },
];

const ordersData = [
    {
        orderId: 'ORD10001',
        status: 'Out for Delivery',
        friendlyStatus: 'Your order is on the way!',
        estimatedDelivery: '2026-04-22T18:00:00Z',
        courier: 'NTUC Logistics',
    },
    {
        orderId: 'ORD10002',
        status: 'Processing',
        friendlyStatus: 'We are preparing your items.',
        estimatedDelivery: '2026-04-24T12:00:00Z',
        courier: 'Pending',
    },
    {
        orderId: 'ORD10003',
        status: 'Shipped',
        friendlyStatus: 'Your package has left our warehouse.',
        estimatedDelivery: '2026-04-23T14:30:00Z',
        courier: 'NinjaVan',
    },
    {
        orderId: 'ORD10004',
        status: 'Delivered',
        friendlyStatus: 'Your order was dropped off at your doorstep.',
        estimatedDelivery: '2026-04-21T10:15:00Z',
        courier: 'GrabExpress',
    },
    {
        orderId: 'ORD10005',
        status: 'Cancelled',
        friendlyStatus: 'This order has been cancelled.',
        estimatedDelivery: 'N/A',
        courier: 'N/A',
    },
];

// Routes
router.get('/linkpoints/:id', (req, res) => {
    const user = linkPointsData.find((u) => u.userId === req.params.id);
    user
        ? res.json({ status: 'success', data: user })
        : res.status(404).json({ error: 'Not found' });
});

router.get('/orders/:id', (req, res) => {
    const order = ordersData.find((o) => o.orderId === req.params.id);
    order
        ? res.json({ status: 'success', data: order })
        : res.status(404).json({ error: 'Not found' });
});

// Netlify path prefix
app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);
