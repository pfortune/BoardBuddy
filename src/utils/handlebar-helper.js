import Handlebars from "handlebars";

Handlebars.registerHelper("isEqual", function(arg1, arg2, options) {
  return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper("toTitleCase", (str) => str.toLowerCase().split(" ").map((word) => (word.charAt(0).toUpperCase() + word.slice(1))).join(" "));