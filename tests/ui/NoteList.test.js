import { Meteor } from 'meteor/meteor';
import React from 'react';
import {expect} from 'chai';
import sinon from 'sinon';
import {mountRoute } from '../utils/router-wrapper';
import { NoteList } from '../../imports/ui/NoteList';
import { NoteListItem } from '../../imports/ui/NoteListItem';
import moment from 'moment';
import { NoteListEmptyItem } from '../../imports/ui/NoteListEmptyItem';


if (Meteor.isClient) {
  describe('NoteList', () => {
    const notes = [
      {
        title: "Note1",
        body: "Body1",
        userId: "UserId1",
        updatedAt: moment().valueOf()
      },
      {
        title: "Note2",
        body: "Body2",
        userId: "UserId2",
        updatedAt: moment().valueOf()
      }
    ];

    it('should print list of notes', () => {
      const wrapper = mountRoute(<NoteList notes={notes}/>);

      expect(wrapper.find(NoteListItem).length).to.be.equal(2);
      expect(wrapper.find(NoteListEmptyItem).length).to.be.equal(0);
    });

    it('should display NoteListEmptyItem', () => {
      const wrapper = mountRoute(<NoteList notes={{}}/>);

      expect(wrapper.find(NoteListItem).length).to.be.equal(0);
      expect(wrapper.find(NoteListEmptyItem).length).to.be.equal(1);
    });
  });
}