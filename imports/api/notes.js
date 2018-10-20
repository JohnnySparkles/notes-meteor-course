import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

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

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({_id});

    return Notes.remove({_id});
  },
  'notes.update': function(_id, updates) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      title: {
        type: String,
        optional: true
      },
      body: {
        type: String,
        optional: true
      }
    }).validate({
      _id : _id,
      ...updates
    });

    console.log('updates:', updates);
    console.log('now', moment().valueOf());
    Notes.update(_id, {
      $set: {
        updatedAt: moment().valueOf(),
        ...updates
      }
    });
  }
});


