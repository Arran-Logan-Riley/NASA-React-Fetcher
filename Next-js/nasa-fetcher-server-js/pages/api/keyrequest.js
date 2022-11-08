// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as dotenv from 'dotenv';

// NASA KEY GETTER.
let nasaKey = process.env.NASAKEY;

export default function handler(req, res) {
  res.status(200).json({ key: nasaKey })
}


