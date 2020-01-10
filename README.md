# amazon-price-scraper

Very simple amazon price scraper that sends an email if price is below set max price.
Requires a scheduler if you want to run automatically.

## To Run

In terminal enter `node index.js https://www.amazon.co.uk/Sad-Pepe-Frog-Lapel-Pin/dp/B01M9CHFDH/ 100`

Replace the url with your desired amazon product URL

Replace the end number with your desired MAX price. Any price below that will trigger the console log and email.

## SendGrid Setup

To enable SendGrid emails add a '.env' file in the root.

Sign up for a free SendGrid account and get your API Key

Add a single line to the '.env' file of SENDGRID_API_KEY=API_KEY_HERE
