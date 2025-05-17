//  This Controller holds the function to handle logic for the route

const name = "Awesome Friend - Tyler Mott";

const getName = (req, res) => {
  // #swagger.tags = ['General']
  // #swagger.summary = 'Get author's friend'
  // #swagger.description = 'Retrieves a statically defined name by the author.'
  res.setHeader("Content-Type", "application/json");

  // Rather than send a string, I am sending a JSON since that is the defacto standard of APIs
  res.status(200).json({ name: name });
};

module.exports = {
  getName,
};
