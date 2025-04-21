//  This Controller holds the function to handle logic for the route
// (in this assignment's case, getting the name - I used my wife's name)

const wife = "My Wife - Allison Topping";
const name = "Awesome Friend - Tyler Mott";

const getName = (req, res, next) => {
  res.setHeader("Content-Type", "application/json"); // Need to indicate response type

  // Rather than send a string, I am sending a JSON since that is the defacto standard of APIs
  res.status(200).json({ name: name });
};

const getWife = (req, res, next) => {
  res.setHeader("Content-Type", "application/json"); // Need to indicate response type

  // Rather than send a string, I am sending a JSON since that is the defacto standard of APIs
  res.status(200).json({ name: wife });
};

module.exports = {
  getName,
  getWife,
};
