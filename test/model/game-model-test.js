import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testLocations, testGames, dooleys, geoffs, chess, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Game Model tests", () => {
  let dooleysList = null;

  setup(async () => {
    db.init("mongo");
    await db.locationStore.deleteAllLocations();
    await db.gameStore.deleteAllGames();
    dooleysList = await db.locationStore.addLocation(dooleys);
    for (let i = 0; i < testGames.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testGames[i] = await db.gameStore.addGame(dooleysList._id, testGames[i]);
    }
  });

  test("create single game", async () => {
    const geoffsList = await db.locationStore.addLocation(geoffs);
    const game = await db.gameStore.addGame(geoffsList._id, chess)
    assert.isDefined(game._id);
    assertSubset (chess, game);
  });

  test("get multiple games", async () => {
    const games = await db.gameStore.getGamesByLocationId(dooleysList._id);
    assert.equal(games.length, testGames.length)
  });

  test("delete all games", async () => {
    const games = await db.gameStore.getAllGames();
    assert.equal(testGames.length, games.length);
    await db.gameStore.deleteAllGames();
    const newGames = await db.gameStore.getAllGames();
    assert.equal(0, newGames.length);
  });

  test("get a game - success", async () => {
    const geoffsList = await db.locationStore.addLocation(geoffs);
    const game = await db.gameStore.addGame(geoffsList._id, chess)
    const newGame = await db.gameStore.getGameById(game._id);
    assertSubset (chess, newGame);
  });

  test("delete One Game - success", async () => {
    await db.gameStore.deleteGame(testGames[0]._id);
    const games = await db.gameStore.getAllGames();
    assert.equal(games.length, testLocations.length - 1);
    const deletedGame = await db.gameStore.getGameById(testGames[0]._id);
    assert.isNull(deletedGame);
  });

  test("get a game - bad params", async () => {
    assert.isNull(await db.gameStore.getGameById(""));
    assert.isNull(await db.gameStore.getGameById());
  });

  test("delete one game - fail", async () => {
    await db.gameStore.deleteGame("bad-id");
    const games = await db.gameStore.getAllGames();
    assert.equal(games.length, testLocations.length);
  });
});