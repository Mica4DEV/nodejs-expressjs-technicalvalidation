import express from 'express';

import sampleController from './sample-controller';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: req.originalUrl,
  });
});

router.use('/sample-controller', sampleController);

export default router;
