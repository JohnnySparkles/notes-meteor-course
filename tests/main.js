import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import {} from './enzyme-configuration.js';
import {} from './api/users.test';
import {} from './api/notes.test';
import {} from './ui/PrivateHeader.test';
import {} from './ui/Login.test';
import {} from './ui/Signup.test';
import {} from './ui/NoteListHeader.test';
import {} from './ui/NoteList.test';
import {} from './ui/NoteListItem.test';


describe("notes", function () {
  it("package.json has correct name", async function () {
    const { name } = await import("../package.json");
    expect(name).to.be.equal("notes");
  });

  if (!Meteor.isServer) {
    it("client is not server", function () {
      expect(Meteor.isServer).to.be.equal(false);
    });
  }

  if (Meteor.isServer) {
    it("server is not client", function () {
      expect(Meteor.isClient).to.be.equal(false);
    });
  }
});
