import { assert } from "chai";
import { buddyService } from "./buddy-service.js";
import { testLocations, testGames, dooleys, geoffs, chess } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Game API tests", () => {
  let dooleysId = null;

  setup(async () => {
    await buddyService.deleteAllLocations();
    await buddyService.deleteAllGames();
    const dooleysLocation = await buddyService.createLocation(dooleys);
    dooleysId = dooleysLocation._id;
    // eslint-disable-next-line no-restricted-syntax
    for (const game of testGames) {
      // eslint-disable-next-line no-await-in-loop
      await buddyService.createGame(dooleysId, game);
    }
  });

  test("create single game", async () => {
    const geoffsLocation = await buddyService.createLocation(geoffs);
    const newGame = await buddyService.createGame(geoffsLocation._id, chess);
    assert.isNotNull(newGame._id);
    assertSubset(chess, newGame);
  });

  test("get multiple games", async () => {
    const games = await buddyService.getGamesByLocation(dooleysId);
    assert.equal(games.length, testGames.length);
  });

  test("delete all games", async () => {
    let games = await buddyService.getAllGames();
    assert.equal(testGames.length, games.length);
    await buddyService.deleteAllGames();
    games = await buddyService.getAllGames();
    assert.equal(0, games.length);
  });

  test("get a game - success", async () => {
    const geoffsLocation = await buddyService.createLocation(geoffs);
    const newGame = await buddyService.createGame(geoffsLocation._id, chess);
    const fetchedGame = await buddyService.getGame(newGame._id);
    assertSubset(chess, fetchedGame);
  });

  test("delete one game - success", async () => {
    const gameToDelete = testGames[0]; // Assuming this has been updated with an _id from creation
    await buddyService.deleteGame(gameToDelete._id);
    const gamesAfterDelete = await buddyService.getAllGames();
    assert.equal(gamesAfterDelete.length, testGames.length - 1);
    const deletedGame = await buddyService.getGame(gameToDelete._id);
    assert.isNull(deletedGame);
  });

  test("get a game - bad params", async () => {
    const invalidGame = await buddyService.getGame("invalid-id");
    assert.isNull(invalidGame);
  });

  test("delete one game - fail", async () => {
    await buddyService.deleteGame("bad-id");
    const games = await buddyService.getAllGames();
    assert.equal(games.length, testGames.length);
  });
});
