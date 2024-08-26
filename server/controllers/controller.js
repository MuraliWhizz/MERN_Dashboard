const Data = require('../models/data');

// Create a new document
exports.createData = async (req, res) => {
  try {
    const data = new Data(req.body);
    const result = await data.save();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

// List all documents
exports.listData = async (req, res) => {
  try {
    const data = await Data.find();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Search documents
exports.searchData = async (req, res) => {
  try {
    const query = {};
    
    // Build query object based on query parameters
    if (req.query.end_year) query.end_year = { $regex: req.query.end_year, $options: 'i' };
    if (req.query.intensity) query.intensity = req.query.intensity;
    if (req.query.sector) query.sector = { $regex: req.query.sector, $options: 'i' };
    if (req.query.topic) query.topic = { $regex: req.query.topic, $options: 'i' };
    if (req.query.insight) query.insight = { $regex: req.query.insight, $options: 'i' };
    if (req.query.url) query.url = { $regex: req.query.url, $options: 'i' };
    if (req.query.region) query.region = { $regex: req.query.region, $options: 'i' };
    if (req.query.start_year) query.start_year = { $regex: req.query.start_year, $options: 'i' };
    if (req.query.impact) query.impact = { $regex: req.query.impact, $options: 'i' };
    if (req.query.added) query.added = { $regex: req.query.added, $options: 'i' };
    if (req.query.published) query.published = { $regex: req.query.published, $options: 'i' };
    if (req.query.country) query.country = { $regex: req.query.country, $options: 'i' };
    if (req.query.relevance) query.relevance = req.query.relevance;
    if (req.query.pestle) query.pestle = { $regex: req.query.pestle, $options: 'i' };
    if (req.query.source) query.source = { $regex: req.query.source, $options: 'i' };
    if (req.query.title) query.title = { $regex: req.query.title, $options: 'i' };
    if (req.query.likelihood) query.likelihood = req.query.likelihood;

    const data = await Data.find(query);
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a document by ID
exports.getDataById = async (req, res) => {
  try {
    const data = await Data.findById(req.params._id);
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete a document by ID
exports.deleteDataById = async (req, res) => {
  try {
    const data = await Data.findByIdAndDelete(req.params._id);
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a document by ID
exports.updateDataById = async (req, res) => {
  try {
    const data = await Data.findByIdAndUpdate(req.params._id, req.body, { new: true });
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
};
