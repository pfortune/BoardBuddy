import Handlebars from "handlebars";

Handlebars.registerHelper("isEqual", function(arg1, arg2, options) {
  return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper("toTitleCase", (str) => str.toLowerCase().split(" ").map((word) => (word.charAt(0).toUpperCase() + word.slice(1))).join(" "));

Handlebars.registerHelper("listGames", (games) => {
  if (!games || !games.length) return "No games listed for this location.";
  
  const gameTitles = games.map(game => game.title);
  let gamesText = gameTitles.slice(0, 3).join(", ");
  if (gameTitles.length > 3) {
    gamesText += ", and more.";
  }

  return gamesText;
});
