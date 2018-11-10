import { Meteor } from 'meteor/meteor';
import React from 'react';
import {expect} from 'chai';
import sinon from 'sinon';
import {mountRoute } from '../utils/router-wrapper';
import { NoteList } from '../../imports/ui/NoteList';
import { NoteListItem } from '../../imports/ui/NoteListItem';
import { NoteListEmptyItem } from '../../imports/ui/NoteListEmptyItem';
import { notes } from '../fixtures/fixtures';


if (Meteor.isClient) {
  describe('NoteList', () => {
    it('should print list of notes', () => {
      const wrapper = mountRoute(<NoteList notes={notes}/>);

      expect(wrapper.find(NoteListItem).length).to.be.equal(2);
      expect(wrapper.find(NoteListEmptyItem).length).to.be.equal(0);
    });

    it('should display NoteListEmptyItem', () => {
      const wrapper = mountRoute(<NoteList notes={[]}/>);

      expect(wrapper.find(NoteListItem).length).to.be.equal(0);
      expect(wrapper.find(NoteListEmptyItem).length).to.be.equal(1);
    });
  });
}