import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/schemas/user.js';
import SignUPVerifyOTP from '../models/schemas/signup-verifyotp.js';
import crypto from 'crypto';
import sendOTP from '../utils/sendOTP.js';

const router = express.Router();

router.post('/signup-req', (req, res) => {
    const { email } = req.body;

    // check if email already exists, if exists, send error response else create otp verifyotp for 10 mins and send uuid back to user
    User.findOne({ email })
        .then((existingUser) => {
            if (existingUser) {
                return res.status(400).json({ message: 'Email already exists' });
            }

            SignUPVerifyOTP.findOne({ email })
                .then((existingVerifyOtp) => {
                    if (existingVerifyOtp) {
                        // reset the 10 min expiry on this email otp
                        existingVerifyOtp.expiresAt = Date.now() + 10 * 60 * 1000;

                        existingVerifyOtp.save()
                            .then(() => {
                                console.log(`OTP for ${email} is ${existingVerifyOtp.otp}`);
                                sendOTP(email, existingVerifyOtp.otp);
                                return res.status(400).json({ message: 'OTP sent to email', uuid: existingVerifyOtp.uuid });
                            })
                            .catch((err) => {
                                console.error(err);
                                return res.status(500).json({ message: 'Internal server error' });
                            });
                    }

                    const otp = Math.floor(100000 + Math.random() * 900000).toString().padStart(6, '0');
                    const uuid = crypto.randomUUID();
                    const verifyOtp = new SignUPVerifyOTP({
                        email,
                        otp,
                        uuid,
                        createdTime: Date.now(),
                        expiresAt: Date.now() + 10 * 60 * 1000
                    });
                    verifyOtp.save()
                        .then(() => {
                            console.log(`OTP for ${email} is ${otp}`);
                            sendOTP(email, otp);
                            return res.status(200).json({ message: 'OTP sent to email', uuid: uuid });
                        }
                        )
                        .catch((err) => {
                            console.error(err);
                            return res.status(500).json({ message: 'Internal server error' });
                        });
                }
                )
                .catch((err) => {
                    console.error(err);
                    return res.status(500).json({ message: 'Internal server error' });
                });
        }
        )
        .catch((err) => {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        });
}
);

router.post('/resend-otp', (req, res) => {
    const { uuid } = req.body;
    // check if uuid exists in verifyotp collection

    SignUPVerifyOTP.findOne({ uuid })
        .then((verifyOtp) => {
            if (!verifyOtp) {
                return res.status(400).json({ message: 'Invalid UUID', type: 'Not Exist' });
            }

            // reset the 10 min expiry on this email otp
            verifyOtp.expiresAt = Date.now() + 10 * 60 * 1000;

            verifyOtp.save()
                .then(() => {
                    console.log(`OTP for ${verifyOtp.email} is ${verifyOtp.otp}`);
                    sendOTP(verifyOtp.email, verifyOtp.otp);
                    return res.status(200).json({ message: 'OTP sent to email', uuid: uuid });
                })
                .catch((err) => {
                    console.error(err);
                    return res.status(500).json({ message: 'Internal server error' });
                });
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        });

}
);

router.post('/verify-otp', (req, res) => {
    const { uuid, otp, firstname, lastname, email, password } = req.body;

    SignUPVerifyOTP.findOne({ uuid })
        .then((verifyOtp) => {
            if (!verifyOtp) {
                return res.status(400).json({ message: 'Invalid UUID', type: 'Not Exist' });
            }

            if (verifyOtp.otp !== otp) {
                return res.status(400).json({ message: 'Invalid OTP', type: 'Not Match' });
            }

            if (verifyOtp.expiresAt < Date.now()) {
                return res.status(400).json({ message: 'OTP expired', type: 'Expired' });
            }

            // create user in user collection and delete the otp/uuid from verifyotp collection
            const user = new User({
                firstname,
                lastname,
                email,
                password,
                loginType: 'manual',
                createdTime: Date.now(),
                lastLoginTime: Date.now(),
            });

            user.save()
                .then(() => {
                    SignUPVerifyOTP.deleteOne({ uuid })
                        .then(() => {
                            return res.status(200).json({ message: 'User created successfully' });
                        })
                        .catch((err) => {
                            console.error(err);
                            return res.status(500).json({ message: 'Internal server error' });
                        });
                })
                .catch((err) => {
                    console.error(err);
                    return res.status(500).json({ message: 'Internal server error' });
                });
        }

        )
        .catch((err) => {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        );
}
);

export default router;