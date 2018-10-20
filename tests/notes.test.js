import expect from 'expect';
import { Meteor } from 'meteor/meteor';
import { Notes } from './../imports/api/notes';

if (Meteor.isServer) {
  describe('notes', function () {

    beforeEach(function() {
      Notes.remove({});
      Notes.insert({
        _id: 'testNoteId1',
        userId: 'testUserId1',
        title: 'My Title',
        body: 'My Body for note',
        updatedAt: 0,
      })
    });

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

    it('should delete the note', function() {
      const _id = Meteor.server.method_handlers['notes.remove'].apply({userId: 'testUserId1'}, ['testNoteId1']);
      expect(Notes.findOne({_id: 'testNoteId1'})).not.toBeTruthy();
    });

    it('should not delete the note if no userId', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.remove']();
      }).toThrow();
    });

    it('should not delete the note if it is not owned by the user', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({userId: 'testUserId2'}, ['testNoteId1']);
      }).toThrow();
    });
  });
}


