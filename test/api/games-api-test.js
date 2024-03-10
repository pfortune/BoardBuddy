import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { buddyService } from "./buddy-service.js";
import { maggie, geoffs, maggieCredentials, testLocations, testGames, chess } from "../fixtures.js";

suite("Game API tests", () => {
  let user = null;
  let geoffsBar = null;

  setup(async () => {
    buddyService.clearAuth();
    user = await buddyService.createUser(maggie);
    await buddyService.authenticate(maggieCredentials);
    await buddyService.deleteAllLocations();
    await buddyService.deleteAllGames();
    await buddyService.deleteAllUsers();
    user = await buddyService.createUser(maggie);
    await buddyService.authenticate(maggieCredentials);
    geoffs.userid = user._id;
    geoffsBar = await buddyService.createLocation(geoffs);
  });

  teardown(async () => {});

  test("create game", async () => {
    const returnedGame = await buddyService.createGame(geoffsBar._id, chess);
    assertSubset(chess, returnedGame);
  });

  test("create Multiple games", async () => {
    for (let i = 0; i < testGames.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await buddyService.createGame(geoffsBar._id, testGames[i]);
    }
    const returnedGames = await buddyService.getAllGames();
    assert.equal(returnedGames.length, testGames.length);
    for (let i = 0; i < returnedGames.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const game = await buddyService.getGame(returnedGames[i]._id);
      assertSubset(game, returnedGames[i]);
    }
  });

  test("Delete Game", async () => {
    for (let i = 0; i < testGames.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await buddyService.createGame(geoffsBar._id, testGames[i]);
    }
    let returnedGames = await buddyService.getAllGames();
    assert.equal(returnedGames.length, testGames.length);
    for (let i = 0; i < returnedGames.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const game = await buddyService.deleteGame(returnedGames[i]._id);
    }
    returnedGames = await buddyService.getAllGames();
    assert.equal(returnedGames.length, 0);
  });

  test("denormalised location", async () => {
    for (let i = 0; i < testGames.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await buddyService.createGame(geoffsBar._id, testGames[i]);
    }
    const returnedLocation = await buddyService.getLocation(geoffsBar._id);
    assert.equal(returnedLocation.games.length, testGames.length);
    for (let i = 0; i < testGames.length; i += 1) {
      assertSubset(testGames[i], returnedLocation.games[i]);
    }
  });
});
