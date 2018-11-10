import { Meteor } from 'meteor/meteor';
import React from 'react';
import {expect} from 'chai';
import sinon from 'sinon';
import {mountRoute } from '../utils/router-wrapper';
import { NoteListItem } from '../../imports/ui/NoteListItem';
import moment from 'moment';
import { notes } from '../fixtures/fixtures';


if ( Meteor.isClient) {
  describe('NoteListItem', () => {
    it('should display the title and updatedAt', () => {
      const wrapper = mountRoute(<NoteListItem note={notes[0]}/>);

      expect(wrapper.find('h5').text()).to.be.equal(notes[0].title);
      expect(wrapper.find('p').text()).to.be.equal(moment(notes[0].updatedAt).format('M/DD/YYYY'));
    });

    it('should display untitled note if there is not a title', () => {
      const wrapper = mountRoute(<NoteListItem note={{title: ''}}/>);

      expect(wrapper.find('h5').text()).to.be.equal('Untitled Note');
    });
  });
}

