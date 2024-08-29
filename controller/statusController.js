const Request = require('../model/request');
const Product = require('../model/product');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');

const getStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const request = await Request.findOne({ requestId });

    if (!request) {
      const errorResponse = { error: 'Request ID not found.' };
      return req.isBrowser ? res.render('error', errorResponse) : res.status(404).json(errorResponse);
    }

    if (request.status === 'completed') {
      const products = await Product.find({ requestId });

      const outputFileName = `${requestId}.csv`;
      const outputFilePath = path.join(__dirname, '..', 'uploads', outputFileName);

      const csvWriter = createCsvWriter({
        path: outputFilePath,
        header: [
          { id: 'serialNumber', title: 'Serial Number' },
          { id: 'productName', title: 'Product Name' },
          { id: 'inputImageUrls', title: 'Input Image Urls' },
          { id: 'outputImageUrls', title: 'Output Image Urls' },
        ],
      });

      const records = products.map((product) => ({
        serialNumber: product.serialNumber,
        productName: product.productName,
        inputImageUrls: product.inputImageUrls.join(','),
        outputImageUrls: product.outputImageUrls.join(','),
      }));

      await csvWriter.writeRecords(records);
      const hostUrl = `${req.protocol}://${req.get('host')}`;

      if (req.isBrowser) {
        res.render('output', { outputFileName,products });
      } else {
        res.json({
          status: 'completed',
          outputFileUrl: `${hostUrl}/uploads/${outputFileName}`,
          products: products.map(product => ({
            serialNumber: product.serialNumber,
            productName: product.productName,
            inputImageUrls: product.inputImageUrls,
            outputImageUrls: product.outputImageUrls,
          }))
        });
      }
    } else if (request.status === 'failed') {
      const errorResponse = { error: 'Image processing failed.' };
      return req.isBrowser ? res.render('error', errorResponse) : res.status(500).json(errorResponse);
    } else {
      const inProgressResponse = { message: 'Processing is still in progress.' };
      return req.isBrowser ? res.render('inProgress', inProgressResponse) : res.json(inProgressResponse);
    }
  } catch (error) {
    console.error('Error fetching status:', error);
    const errorResponse = { error: 'Failed to fetch request status.' };
    return req.isBrowser ? res.render('error', errorResponse) : res.status(500).json(errorResponse);
  }
};

module.exports = {
  getStatus,
};
