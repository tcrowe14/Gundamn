const express = require('express');
const axios = require('axios');
const app = express();

app.get('/proxy', async (req, res) => {
  const imageUrl = req.query.url;

  try {
    // Fetch the image from the source
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

    // Forward the image with the appropriate content type
    res.set('Content-Type', response.headers['content-type']);
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching the image:', error.message);
    res.status(500).send('Error fetching the image');
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
