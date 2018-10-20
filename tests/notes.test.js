import expect from 'expect';
import { Meteor } from 'meteor/meteor';
import { Notes } from './../imports/api/notes';

if (Meteor.isServer) {
  describe('notes', function () {
    it('should insert a new note', function () {
      const userId = 'testId';
      const _id = Meteor.server.method_handlers['notes.insert'].apply({userId: userId});

      expect(Notes.findOne({_id, userId: userId})).toBeTruthy();
    });

    it('should not insert a new note when there is no userId', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.insert']();
      }).toThrow();
    });
  });
}


