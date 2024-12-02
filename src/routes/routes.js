import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send({ message: 'Finsible Backend' });
});

router.get('/health', (req, res) => {
    res.status(200).send({ message: 'Finsible is up and running!' });
});

export default router;
