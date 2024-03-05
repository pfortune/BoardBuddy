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
    for(let i = 0; i < testGames.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testGames[i] = await buddyService.createGame(testGames[i]);
    }
  });

  test("create single game", async () => {
    const geoffsLocation = await buddyService.createLocation(geoffs);
    const newGame = await buddyService.createGame(geoffsLocation._id, chess);
    assert.isNotNull(newGame._id);
    assertSubset(chess, newGame);
  });

  test("update a game", async () => {
    const gameToUpdate = testGames[0]; 
    const updatedGame = { ...gameToUpdate, title: "New Title" };
    const newGame = await buddyService.updateGame(gameToUpdate._id, updatedGame);
    assertSubset(updatedGame, newGame);
  });

  test("get multiple games", async () => {
    const games = await buddyService.getAllGames();
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
    await buddyService.deleteGame(testGames[1]._id);
    const gamesAfterDelete = await buddyService.getAllGames();
    assert.equal(gamesAfterDelete.length, testGames.length - 1);
  });

  test("get a game - bad id", async () => {
    try {
      const returnedGame = await buddyService.getGame("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Game with this id");
      assert.equal(error.response.data.statusCode, 503);
    }
  });

  test("get a game - deleted game", async () => {
    await buddyService.deleteGame(testGames[1]._id);
    try {
      const returnedGame = await buddyService.getGame(testGames[1]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Game with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });

  test("delete one game - fail", async () => {
    await buddyService.deleteGame("bad-id");
    const games = await buddyService.getAllGames();
    assert.equal(games.length, testGames.length);
  });


});
