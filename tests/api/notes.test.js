import expect from 'expect';
import { Meteor } from 'meteor/meteor';
import { Notes } from '../../imports/api/notes';

if (Meteor.isServer) {
  describe('notes', function () {
    const noteOne = {
        _id: 'testNoteId1',
        userId: 'testUserId1',
        title: 'My Title',
        body: 'My Body for note',
        updatedAt: 0,
    };
    const noteTwo = {
        _id: 'testNoteId2',
        userId: 'testUserId2',
        title: 'Things to buy',
        body: 'Couch',
        updatedAt: 0,
    };

    beforeEach(function() {
      Notes.remove({});
      Notes.insert(noteOne);
      Notes.insert(noteTwo);
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
      const _id = Meteor.server.method_handlers['notes.remove'].apply({userId: noteOne.userId}, [noteOne._id]);
      expect(Notes.findOne({_id: noteOne._id})).not.toBeTruthy();
    });

    it('should not delete the note if no userId', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.remove']();
      }).toThrow();
    });

    it('should not delete the note if it is not owned by the user', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({userId: 'testUserId2'}, [noteOne._id]);
      }).toThrow();
    });

    it('should update the note', function() {
      const title = "This is the new title";
      Meteor.server.method_handlers['notes.update'].apply({
        userId: noteOne.userId
      }, [
        noteOne._id,
        { title }
      ]);

      const note = Notes.findOne({_id: noteOne._id});
      expect(note.updatedAt).toBeGreaterThan(noteOne.updatedAt);
      expect(note).toMatchObject({
            title,
            body: noteOne.body
      });
    });

    it('should throw error if extra updates', function() {
      const newTitle = "This is the new title";
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({
            userId: noteOne.userId
          },
          [
            noteOne._id,
            {
              title: newTitle,
              name: "Johnnie"
            }
          ])}).toThrow();
    });

    it('should throw an error if the user doesn\'t own the note', function() {
      const newTitle = "This is the new title";
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({
          userId: 'aUserId2',
        },
        [
          noteOne._id,
          {
            title: newTitle,
          }
        ])
      }).toThrow();
      expect(Notes.findOne({_id: noteOne._id}).title).toBe(noteOne.title);
    });

    it('should not update the note if unauthenticated', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({},
        [
          noteOne._id,
          {
            title: "A new title"
          }
        ])
      }).toThrow();
    });

    it('should not update note if an invalid _id', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({
          userId: noteOne.userId
        }
        [
          'aBadId1',
          {
            title: "A new title"
          }
        ])
      }).toThrow();
    });

    it('should return a users notes', function() {
      const res = Meteor.server.publish_handlers.notes.apply({userId: noteOne.userId});
      const notes = res.fetch();
      expect(notes.length).toBe(1);
      expect(notes[0]).toMatchObject(noteOne);
    });

    it('should return zero notes for a user that has no notes', function() {
      const res = Meteor.server.publish_handlers.notes.apply({userId: 'notAUser'});
      const notes = res.fetch();
      expect(notes.length).toBe(0);
    });

    it('should not return any notes when there is no user', function() {
      expect(() => {
        const res = Meteor.server.publish_handlers.notes.apply({});
        res.fetch();
      }).toThrow();
    });
  });
}

