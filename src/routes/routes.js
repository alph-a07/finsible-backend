import express from 'express';
import onboardingRouter from './onboardingRoutes.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send({ message: 'Finsible Backend' });
});

router.get('/health', (req, res) => {
    res.status(200).send({ message: 'Finsible is up and running!' });
});

router.use('/auth', onboardingRouter);

export default router;
