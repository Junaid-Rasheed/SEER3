import { NextApiRequest, NextApiResponse } from 'next';
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { email, name, message } = req.body;

      const msg = {
        to: process.env.EMAIL_FROM, // Change to your recipient
        from: process.env.EMAIL_FROM, // Change to your verified sender
        subject: 'Hi there!',
        html: `<strong>Name: ${name}</strong><p>Email: ${email}</p><p>${message}</p>`
      };

      await sgMail.send(msg);
      return res.json({ success: true });
    } catch (err: any) {
      console.log(err.message);
      res.status(500);
      return res.end({ message: err?.message, success: false });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
