
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const processImages = require('../services/imageProcessor');
const validateCsv = require('../utils/validation/csvValidator');
const Request = require('../model/request');
const Product = require('../model/product');

const uploadCsv =  async (req, res) => {
  try {
    const filePath = path.resolve(req.file.path);
    const requestId = uuidv4();

    // Get host URL from request
    const hostUrl = `${req.protocol}://${req.get('host')}`;

    // Validate CSV
    const productsData = await validateCsv(filePath);

    // Save Request and Product records
    const request = new Request({ requestId, status: 'pending' });
    await request.save();

    const products = productsData.map(data => new Product({
      requestId,
      serialNumber: data['Serial Number'],
      productName: data['Product Name'],
      inputImageUrls: data['Input Image Urls'].split(',').map(url => url.trim())
    }));
    await Product.insertMany(products);

    // Asynchronous Image Processing with hostUrl
    processImages(requestId, products, hostUrl);

    if (req.isBrowser) {
        res.render('upload', { requestId });
    } else {
        res.json({ requestId, message: 'File uploaded successfully. Use the requestId to check status.' });
    }
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).json({ error: 'Failed to process CSV file.' });
  }
};

module.exports = {uploadCsv};
