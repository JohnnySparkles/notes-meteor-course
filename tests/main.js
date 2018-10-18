import { Meteor } from 'meteor/meteor';
import assert from "assert";
import {} from './users.test';

describe("notes", function () {
  it("package.json has correct name", async function () {
    const { name } = await import("../package.json");
    assert.strictEqual(name, "notes");
  });

  it("runs another test", async function() {
    assert.strictEqual(true, true);
  });

  if (!Meteor.isServer) {
    it("client is not server", function () {
      assert.strictEqual(Meteor.isServer, false);
    });
  }

  if (Meteor.isServer) {
    it("server is not client", function () {
      assert.strictEqual(Meteor.isClient, false);
    });
  }
});
