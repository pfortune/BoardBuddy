import { assert } from "chai";
import { buddyService } from "./buddy-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, testUsers } from "../fixtures.js";

suite("User API tests", () => {
  setup(async () => {
    await buddyService.deleteAllUsers();
    for(let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testUsers[i] = await buddyService.createUser(testUsers[i]);
    }
  });
  teardown(async () => {
  });

  test("create a user", async () => {
    const newUser = await buddyService.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all users", async() => {
    let returnedUsers = await buddyService.getAllUsers();
    assert.equal(returnedUsers.length, 3);
    await buddyService.deleteAllUsers();
    returnedUsers = await buddyService.getAllUsers();
    assert.equal(returnedUsers.length, 0);
  });

  test("get a user - success", async () => {
    const returnedUser1 = await buddyService.getUser(testUsers[0]._id);
    assert.deepEqual(testUsers[0], returnedUser1);
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
    await buddyService.deleteUser(testUsers[0]._id);
    try {
      const returnedUser = await buddyService.getUser(testUsers[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });

  test("delete One User - success", async () => {
    await buddyService.deleteUser(testUsers[1]._id);
    const returnedUsers = await buddyService.getAllUsers();
    assert.equal(returnedUsers.length, testUsers.length - 1);
  });
});