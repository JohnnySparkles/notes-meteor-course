import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';

export const Notes = new Mongo.Collection('notes');

if (Meteor.isServer) {
  Meteor.publish('notes', function() {
    return Notes.find({userId: this.userId});
  })
}

Meteor.methods({
  'notes.insert': function() {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Notes.insert({
      title: '',
      body: '',
      userId: this.userId,
      updatedAt: moment().valueOf()
    })
  },
  'notes.remove': function(_id) {
    if (!this.userId) {
      throw new Meteor.Error('not-authenticated');
    }

    const note = Notes.findOne({_id});

    if (this.userId !== note.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Notes.remove({_id});
  }
});


