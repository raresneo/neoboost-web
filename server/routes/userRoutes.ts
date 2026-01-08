import { Router } from 'express';
import express from 'express';
import { getUserProfile, updateMembershipStatus } from '../controllers/userController';

const router = Router();

router.get('/:userId', getUserProfile);
router.post('/update-status', express.json(), updateMembershipStatus);

export default router;
