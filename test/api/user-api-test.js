import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { buddyService } from "./buddy-service.js";
import { maggie, maggieCredentials, testUsers } from "../fixtures.js";

const users = new Array(testUsers.length);

suite("User API tests", () => {
  setup(async () => {
    buddyService.clearAuth();
    await buddyService.createUser(maggie);
    await buddyService.authenticate(maggieCredentials);
    await buddyService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      users[0] = await buddyService.createUser(testUsers[i]);
    }
    await buddyService.createUser(maggie);
    await buddyService.authenticate(maggieCredentials);
  });
  teardown(async () => {});

  test("create a user", async () => {
    const newUser = await buddyService.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all user", async () => {
    let returnedUsers = await buddyService.getAllUsers();
    assert.equal(returnedUsers.length, 4);
    await buddyService.deleteAllUsers();
    await buddyService.createUser(maggie);
    await buddyService.authenticate(maggieCredentials);
    returnedUsers = await buddyService.getAllUsers();
    assert.equal(returnedUsers.length, 1);
  });

  test("delete One User - success", async () => {
    const newUser = await buddyService.createUser(maggie);
    console.log("MAGGIE", newUser._id);
    await buddyService.deleteUser(newUser._id);
    const returnedUser = await buddyService.getUser(newUser._id);
    assert.isNull(returnedUser);
  });

  test("get a user", async () => {
    const returnedUser = await buddyService.getUser(users[0]._id);
    assert.deepEqual(users[0], returnedUser);
  });

  test("get a user - bad id", async () => {
    try {
      const returnedUser = await buddyService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 503);
    }
  });

  test("get a user - deleted user", async () => {
    await buddyService.deleteAllUsers();
    await buddyService.createUser(maggie);
    await buddyService.authenticate(maggieCredentials);
    try {
      const returnedUser = await buddyService.getUser(users[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });
});
