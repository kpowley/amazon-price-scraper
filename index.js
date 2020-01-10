// Packages
require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const nightmare = require('nightmare')();

// Initial SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Capture variables from CLI input
const args = process.argv.slice(2);
const url = args[0];
const maxPrice = args[1];

// Run Function
checkPrice();

// Price check function
async function checkPrice() {
  try {
    const priceString = await nightmare
      // URL to visit from CLI input
      .goto(url)
      // Wait for DOM element with price value in it
      .wait('#priceblock_ourprice')
      // Capture the text from the above item
      .evaluate(() => document.getElementById('priceblock_ourprice').innerText)
      .end();
    // Take the string from above and remove the £ sign
    const priceNumber = parseFloat(priceString.replace('£', ''));
    // If the actual price is below the max price from the CLI
    if (priceNumber < maxPrice) {
      // Send an email with the below content - comment out to not use email
      sendEmail(
        `It is cheap at: £${priceNumber}`,
        `The price on ${url} has dropped below ${maxPrice}! It is currenlty £${priceNumber}`
      );
      console.log(
        `It is cheap at: £${priceNumber}, the price on ${url} has dropped below ${maxPrice}! It is currenlty £${priceNumber}`
      );
    }
  } catch (e) {
    // If there is an error send an email with the error - comment out to not use email
    sendEmail('Amazon price checker error', e.message);
    throw e;
  }
}

// Send email function
function sendEmail(subject, body) {
  const email = {
    // The destination of the email
    to: 'youremail@gmail.com',
    from: 'amazonpricechecker@example.com',
    subject: subject,
    text: body,
    html: body
  };

  return sgMail.send(email);
}
