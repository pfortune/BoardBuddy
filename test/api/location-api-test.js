import { EventEmitter } from "events";
import { assert } from "chai";
import { buddyService } from "./buddy-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, maggieCredentials, geoffs, testLocations } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Location API tests", () => {
  let user = null;

  setup(async () => {
    buddyService.clearAuth();
    user = await buddyService.createUser(maggie);
    await buddyService.authenticate(maggieCredentials);
    await buddyService.deleteAllLocations();
    await buddyService.deleteAllUsers();
    user = await buddyService.createUser(maggie);
    await buddyService.authenticate(maggieCredentials);
    geoffs.userid = user._id;
  });

  teardown(async () => {});

  test("create location", async () => {
    const returnedLocation = await buddyService.createLocation(geoffs);
    assert.isNotNull(returnedLocation);
    assertSubset(geoffs, returnedLocation);
  });

  test("delete a location", async () => {
    const location = await buddyService.createLocation(geoffs);
    const response = await buddyService.deleteLocation(location._id);
    assert.equal(response.status, 204);
    try {
      const returnedLocation = await buddyService.getLocation(location.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Location with this id", "Incorrect Response Message");
    }
  });

  test("create multiple locations", async () => {
    for (let i = 0; i < testLocations.length; i += 1) {
      testLocations[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await buddyService.createLocation(testLocations[i]);
    }
    let returnedLists = await buddyService.getAllLocations();
    assert.equal(returnedLists.length, testLocations.length);
    await buddyService.deleteAllLocations();
    returnedLists = await buddyService.getAllLocations();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant location", async () => {
    try {
      const response = await buddyService.deleteLocation("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Location with this id", "Incorrect Response Message");
    }
  });
});
