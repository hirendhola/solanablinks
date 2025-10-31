
const express = require('express');
const app = express();
const PORT = 4000;

app.use(express.json());

const webhookHistory = [];

app.post('/webhook', (req, res) => {
  const webhook = {
    receivedAt: new Date().toISOString(),
    headers: req.headers,
    body: req.body
  };

  webhookHistory.push(webhook);
w
  console.log('\n' + '='.repeat(80));
  console.log('WEBHOOK RECEIVED!');
  console.log('='.repeat(80));
  console.log('Time:', webhook.receivedAt);
  console.log('Event:', req.body.event);
  console.log('Payment ID:', req.body.paymentId);
  console.log('Account:', req.body.account);
  console.log('Amount:', req.body.amount, 'SOL');
  console.log('Recipient:', req.body.recipient);
  console.log('Network:', req.body.network);
  
  if (req.body.transactionSignature) {
    console.log('Signature:', req.body.transactionSignature);
  }
  
  console.log('\n Full Payload:');
  console.log(JSON.stringify(req.body, null, 2));
  console.log('='.repeat(80) + '\n');

  res.status(200).json({
    success: true,
    message: 'Webhook received successfully',
    receivedAt: webhook.receivedAt
  });
});

app.get('/webhooks', (req, res) => {
  res.json({
    total: webhookHistory.length,
    webhooks: webhookHistory
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', webhooksReceived: webhookHistory.length });
});

app.listen(PORT, () => {
  console.log('Webhook Test Server Running!');
  console.log('Webhook URL: http://localhost:' + PORT + '/webhook');
  console.log('View History: http://localhost:' + PORT + '/webhooks');
  console.log('Health Check: http://localhost:' + PORT + '/health');
  console.log('📝 Use this URL in your payment link webhook field:');
  console.log('   http://localhost:' + PORT + '/webhook');
  console.log('\n Waiting for webhooks...\n');
});