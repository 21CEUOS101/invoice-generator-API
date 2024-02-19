const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');
const puppeteer = require('puppeteer');
const fs = require("fs");
const app = express();
const PORT = 3000;
const PDF_PATH = path.join(__dirname, './output.pdf');
const EJS_PATH = path.join(__dirname, './views/invoice.ejs');
const cors = require('cors');
const chromium = require('chrome-aws-lambda')
app.use(cors());
require('dotenv').config();

// Middleware
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.post('/generate-pdf', async (req, res) => {

  console.log(req.body);

  const products = [];

  products.push(...req.body.products.flat());

  let totalAmount = 0;
  let totalQuantity = 0;

  const t_price = [];

  products.map((p) => {
    totalAmount += (p?.price * p?.quantity);
    totalQuantity += p?.quantity;
    t_price.push(p?.price * p?.quantity);
  });

  

  const invoiceData = {
      billDate: req.body.billDate,
      billNumber: req.body.billNumber,
      products: products,
      totalQuantity: totalQuantity,
      totalAmount: totalAmount,
      t_price : t_price,
      paymentType: req.body.paymentType,
    transactionDetails: req.body.transactionDetails,
      username : req.body.username,
    };
  try {
      
        const browser = await chromium.puppeteer.launch({
          args: chromium.args,
          executablePath: process.env.NODE_ENV === 'production' ? process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath(),
          ignoreHTTPSErrors: true,
          headless: "new"
        });
        // Open a new page
        const page = await browser.newPage();
        const ejsContent = fs.readFileSync(EJS_PATH, 'utf-8');
      
        // Compile EJS template with data
        const compiledTemplate = ejs.compile(ejsContent);
        const htmlContent = compiledTemplate(invoiceData);

        // Set the HTML content of the page
        await page.setContent(htmlContent);

        // Generate PDF
        await page.pdf({ path: PDF_PATH, format: 'A4' });

        // Close the browser
        await browser.close();

        // Set response headers for a PDF file
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="invoice.pdf"');

        // Pipe the PDF file to the response stream
        const stream = fs.createReadStream(PDF_PATH);
        stream.pipe(res);
            
            // Delete the PDF file after piping it to the response
        stream.on('end', () => {
          fs.unlink(PDF_PATH, (err) => {
            if (err) {
              console.error('Error deleting PDF file:', err);
            } else {
              console.log('PDF file deleted successfully.');
            }
          });
        });
    
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
