import { Meteor } from 'meteor/meteor';
import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { mountRoute, router } from '../utils/router-wrapper';
import { NoteListItem } from '../../imports/ui/NoteListItem';
import moment from 'moment';
import { notes } from '../fixtures/fixtures';
import { Link } from 'react-router-dom';


if ( Meteor.isClient) {
  describe('NoteListItem', () => {
    let Session;

    beforeEach(() => {
      Session = {
        set: sinon.fake()
      };
    });

    it('should display the title and updatedAt', () => {
      const wrapper = mountRoute(<NoteListItem note={notes[0]}/>);

      expect(wrapper.find('h5').text()).to.be.equal(notes[0].title);
      expect(wrapper.find('p').text()).to.be.equal(moment(notes[0].updatedAt).format('M/DD/YYYY'));
    });

    it('should display untitled note if there is not a title', () => {
      const wrapper = mountRoute(<NoteListItem note={notes[1]}/>);

      expect(wrapper.find('h5').text()).to.be.equal('Untitled Note');
    });

    it('should change route to /dashboard/:id on click', () => {
      const pushSpy = sinon.spy(router.history, "push");
      const wrapper = mountRoute(<NoteListItem note={notes[0]}/>);

      wrapper.find('a').simulate('click', { button : 0 });

      expect(pushSpy.getCall(0).args[0]).to.be.equal('/dashboard/' + notes[0]._id);
    });
  });
}

