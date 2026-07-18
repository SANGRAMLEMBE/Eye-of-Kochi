module.exports = function handler(_request, response) {
  response.status(200).json({
    verified: true,
    category: 'other',
    severity: 1,
    confidence: 1,
    reason: 'Stub verdict for the initial CityLens shell.',
    complaint_en: 'This is a placeholder complaint.',
    complaint_ml: 'ഇത് ഒരു താൽക്കാലിക പരാതിയാണ്.'
  });
};
