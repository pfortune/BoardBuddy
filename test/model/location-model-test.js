import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testLocations, geoffs } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Location Model tests", () => {
  setup(async () => {
    db.init("mongo");
    await db.locationStore.deleteAllLocations();
    for (let i = 0; i < testLocations.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testLocations[i] = await db.locationStore.addLocation(testLocations[i]);
    }
  });

  test("create a location", async () => {
    const location = await db.locationStore.addLocation(geoffs);
    assertSubset(geoffs, location);
    assert.isDefined(location._id);
  });

  test("delete all locations", async () => {
    let returnedLocations = await db.locationStore.getAllLocations();
    assert.equal(returnedLocations.length, 3);
    await db.locationStore.deleteAllLocations();
    returnedLocations = await db.locationStore.getAllLocations();
    assert.equal(returnedLocations.length, 0);
  });

  test("get locations by category - success", async () => {
    const bars = await db.locationStore.getLocationsByCategory("Bar");
    assert.equal(bars.length, 1);
    assertSubset({ title: "Revolutions", category: "Bar" }, bars[0]);

    const cafes = await db.locationStore.getLocationsByCategory("Cafe");
    assert.equal(cafes.length, 1);
    assertSubset({ title: "The White Rabbit", category: "Cafe" }, cafes[0]);
  });

  test("get locations by category - no results", async () => {
    const ghostCategory = await db.locationStore.getLocationsByCategory("Ghost");
    assert.isArray(ghostCategory);
    assert.equal(ghostCategory.length, 0);
  });

  test("get a location - success", async () => {
    const location = await db.locationStore.addLocation(geoffs);
    const returnedLocation = await db.locationStore.getLocationById(location._id);
    assertSubset(geoffs, location);
  });

  test("delete One Location - success", async () => {
    const id = testLocations[0]._id;
    await db.locationStore.deleteLocationById(id);
    const returnedLocations = await db.locationStore.getAllLocations();
    assert.equal(returnedLocations.length, testLocations.length - 1);
    const deletedLocation = await db.locationStore.getLocationById(id);
    assert.isNull(deletedLocation);
  });

  test("get a location - bad params", async () => {
    assert.isNull(await db.locationStore.getLocationById(""));
    assert.isNull(await db.locationStore.getLocationById());
  });

  test("delete One Location - fail", async () => {
    await db.locationStore.deleteLocationById("bad-id");
    const allLocations = await db.locationStore.getAllLocations();
    assert.equal(testLocations.length, allLocations.length);
  });
});
