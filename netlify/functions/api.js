const express = require('express');
const serverless = require('serverless-http');
const app = express();
const router = express.Router();

// Mock Data
// --- UPDATED MOCK DATA WITH PHONE NUMBERS ---
const linkPointsData = [
    {
        userId: 'U12345',
        phone: '91112222',
        memberTier: 'PLUS',
        totalPoints: 2850,
        availablePoints: 2200,
    },
    {
        userId: 'U12346',
        phone: '92223333',
        memberTier: 'SILVER',
        totalPoints: 850,
        availablePoints: 850,
    },
    {
        userId: 'U12347',
        phone: '93334444',
        memberTier: 'GOLD',
        totalPoints: 12400,
        availablePoints: 11000,
    },
    {
        userId: 'U12348',
        phone: '94445555',
        memberTier: 'PLATINUM',
        totalPoints: 45200,
        availablePoints: 45000,
    },
    {
        userId: 'U12349',
        phone: '95556666',
        memberTier: 'BASIC',
        totalPoints: 50,
        availablePoints: 50,
    },
];

const ordersData = [
    {
        orderId: 'ORD10001',
        phone: '91112222',
        status: 'Out for Delivery',
        friendlyStatus: 'Your order is on the way!',
        estimatedDelivery: '2026-04-22T18:00:00Z',
    },
    {
        orderId: 'ORD10002',
        phone: '92223333',
        status: 'Processing',
        friendlyStatus: 'We are preparing your items.',
        estimatedDelivery: '2026-04-24T12:00:00Z',
    },
    {
        orderId: 'ORD10003',
        phone: '93334444',
        status: 'Shipped',
        friendlyStatus: 'Your package has left our warehouse.',
        estimatedDelivery: '2026-04-23T14:30:00Z',
    },
    {
        orderId: 'ORD10004',
        phone: '94445555',
        status: 'Delivered',
        friendlyStatus: 'Your order was dropped off at your doorstep.',
        estimatedDelivery: '2026-04-21T10:15:00Z',
    },
    {
        orderId: 'ORD10005',
        phone: '91112222',
        status: 'Cancelled',
        friendlyStatus: 'This order has been cancelled.',
        estimatedDelivery: 'N/A',
    },
];

// --- NEW ROUTE: Get All Orders ---
router.get('/orders', (req, res) => {
    res.json({
        status: 'success',
        count: ordersData.length,
        data: ordersData,
    });
});

// --- NEW ROUTE: Get All LinkPoints ---
router.get('/linkpoints', (req, res) => {
    res.json({
        status: 'success',
        count: linkPointsData.length,
        data: linkPointsData,
    });
});

// GET Orders (Search by orderId OR phoneNumber)
router.get('/orders/:identifier', (req, res) => {
    const id = req.params.identifier;
    // Search for matching ID OR matching Phone
    const order = ordersData.find((o) => o.orderId === id || o.phone === id);

    if (order) {
        res.json({ status: 'success', data: order });
    } else {
        res.status(404).json({
            status: 'error',
            message: 'No order found for this identifier.',
        });
    }
});

// GET LinkPoints (Search by userId OR phoneNumber)
router.get('/linkpoints/:identifier', (req, res) => {
    const id = req.params.identifier;
    const user = linkPointsData.find((u) => u.userId === id || u.phone === id);

    if (user) {
        res.json({ status: 'success', data: user });
    } else {
        res.status(404).json({
            status: 'error',
            message: 'No user record found.',
        });
    }
});

app.use('/api/', router); // This handles the redirected path
app.use('/.netlify/functions/api/', router); // This handles the direct path

module.exports.handler = serverless(app);
