import { RequestHandler } from 'express';

const defaultHeaders: RequestHandler = (req, res, next): void => {
  res.set('Feature-Policy', 'accelerometer \'none\'; camera \'none\'; geolocation \'none\'; gyroscope \'none\'; magnetometer \'none\'; microphone \'none\'; payment \'none\'; usb \'none\'');
  res.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.set('Server', 'Yes');
  res.set('X-Content-Type-Options', 'nosniff');
  res.set('X-Frame-Options', 'DENY');
  res.set('X-Powered-By', 'The people at Create');
  next();
};

export default defaultHeaders;
