const axios = require('axios');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const Product = require('../model/product');
const Request = require('../model/request');

async function processImages(requestId, products, hostUrl) {
  try {
    await Request.findOneAndUpdate({ requestId }, { status: 'processing' });

    for (const product of products) {
      const outputUrls = await Promise.all(product.inputImageUrls.map(async (url) => {
        const imageResponse = await axios.get(url, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(imageResponse.data, 'binary');

        // Detect the format of the input image
        const imageFormat = (await sharp(buffer).metadata()).format;

        // Compress the image (keeping the same format)
        const compressedBuffer = await sharp(buffer)
          .toFormat(imageFormat)
          .jpeg({ quality: 50 })  // You can adjust this based on the format
          .toBuffer();

        // Generate a unique file name with the correct extension
        const outputFileName = `${uuidv4()}.${imageFormat}`;
        const outputPath = path.join(__dirname, '..', 'uploads', outputFileName);

        // Save the compressed image to the uploads folder
        fs.writeFileSync(outputPath, compressedBuffer);

        // Generate the full URL for the output image
        const outputUrl = `${hostUrl}/uploads/${outputFileName}`;
        return outputUrl;
      }));

      product.outputImageUrls = outputUrls;
      await product.save();
    }

    await Request.findOneAndUpdate({ requestId }, { status: 'completed' });
  } catch (error) {
    await Request.findOneAndUpdate({ requestId }, { status: 'failed' });
    console.error('Image processing failed', error);
  }
}

module.exports = processImages;
