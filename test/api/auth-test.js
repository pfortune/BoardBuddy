import { assert } from "chai";
import { buddyService } from "./buddy-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { maggie, maggieCredentials } from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    buddyService.clearAuth();
    await buddyService.createUser(maggie);
    await buddyService.authenticate(maggieCredentials);
    await buddyService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await buddyService.createUser(maggie);
    const response = await buddyService.authenticate(maggieCredentials);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await buddyService.createUser(maggie);
    const response = await buddyService.authenticate(maggieCredentials);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });

  test("check Unauthorized", async () => {
    buddyService.clearAuth();
    try {
      await buddyService.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }
  });
});
