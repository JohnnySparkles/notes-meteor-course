import { Meteor } from 'meteor/meteor';
import React from 'react';
import {expect} from 'chai';
import sinon from 'sinon';
import {mountRoute } from '../utils/router-wrapper';
import { NoteListItem } from '../../imports/ui/NoteListItem';
import moment from 'moment';


if ( Meteor.isClient) {
  describe('NoteListItem', () => {
    it('should display the title and updatedAt', () => {
      const note = {
        title: "This is the title",
        body: "This is the body",
        userId: "AUserID1",
        updatedAt: moment().valueOf()
      }
      const wrapper = mountRoute(<NoteListItem note={note}/>);

      expect(wrapper.find('h5').text()).to.be.equal(note.title);
      expect(wrapper.find('p').text()).to.be.equal(moment(note.updatedAt).format('M/DD/YYYY'));
    });

    it('should display untitled note if there is not a title', () => {
      const wrapper = mountRoute(<NoteListItem note={{title: ''}}/>);

      expect(wrapper.find('h5').text()).to.be.equal('Untitled Note');
    });
  });
}

