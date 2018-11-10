import { Meteor } from 'meteor/meteor';
import React from 'react';
import {expect} from 'chai';
import sinon from 'sinon';
import {mountRoute } from '../utils/router-wrapper';
import { NoteListHeader } from '../../imports/ui/NoteListHeader';


if (Meteor.isClient) {
  describe('NoteListHeader', () => {
    it('should call Meteor.call with notes.insert', () => {
      const spy = sinon.fake();
      const wrapper = mountRoute(<NoteListHeader meteorCall={spy}/>);

      wrapper.find('button').simulate('click');

      expect(spy.getCall(0).args[0]).to.be.equal('notes.insert');
    });
  });
}