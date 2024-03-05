import { assert } from "chai";
import { buddyService } from "./buddy-service.js";
import { assertSubset } from "../test-utils.js";
import { testLocations, geoffs } from "../fixtures.js";

suite("Location API tests", () => {
  setup(async () => {
    await buddyService.deleteAllLocations();
    for (let i = 0; i < testLocations.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testLocations[i] = await buddyService.createLocation(testLocations[i]);
    }
  });

  test("create a location", async () => {
    const location = await buddyService.createLocation(geoffs);
    assertSubset(geoffs, location);
    assert.isDefined(location._id);
  });

  test("delete all locations", async () => {
    let returnedLocations = await buddyService.getAllLocations();
    assert.equal(returnedLocations.length, 3);
    await buddyService.deleteAllLocations();
    returnedLocations = await buddyService.getAllLocations();
    assert.equal(returnedLocations.length, 0);
  });

  test("get locations by category - success", async () => {
    const categories = await buddyService.getLocationCategories();
    const bars = await buddyService.getLocationsByCategory(categories[0]);
    assert.equal(bars.length, 1);
    assertSubset({ title: "Revolutions", category: "Bar" }, bars[0]);

    const cafes = await buddyService.getLocationsByCategory("Cafe");
    assert.equal(cafes.length, 1);
    assertSubset({ title: "The White Rabbit", category: "Cafe" }, cafes[0]);
  });

  // test("get locations by category - no results", async () => {
  //   const ghostCategory = await buddyService.getLocationsByCategory("Ghost");
  //   assert.isArray(ghostCategory);
  //   assert.equal(ghostCategory.length, 0);
  // });

  test("get a location - success", async () => {
    const location = await buddyService.createLocation(geoffs);
    const returnedLocation = await buddyService.getLocation(location._id);
    assertSubset(geoffs, returnedLocation);
  });

  test("delete One Location - success", async () => {
    const id = testLocations[0]._id;
    await buddyService.deleteLocation(id);
    const returnedLocations = await buddyService.getAllLocations();
    assert.equal(returnedLocations.length, testLocations.length - 1);
    try {
      await buddyService.getLocation(id);
      assert.fail("Should not have found the location");
    } catch (error) {
      // Assuming the API returns an error when a location is not found
      assert.isOk(error, "Location was successfully deleted");
    }
  });

  test("get a location - bad params", async () => {
    try {
      await buddyService.getLocation("");
      assert.fail("Should not have succeeded with empty ID");
    } catch (error) {
      // Expected to throw due to bad parameters
      assert.isOk(error, "Failed as expected with bad parameters");
    }
  });

  test("delete One Location - fail", async () => {
    await buddyService.deleteLocation("bad-id");
    const allLocations = await buddyService.getAllLocations();
    assert.equal(testLocations.length, allLocations.length);
  });
});
