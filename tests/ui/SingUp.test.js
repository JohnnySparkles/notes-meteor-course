import { Meteor } from 'meteor/meteor';
import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { Signup } from './../../imports/ui/Signup';
import { mountRoute } from './../utils/router-wrapper';


if (Meteor.isClient) {
  describe('Signup', function() { 
    it('should show error message', () => {
      const error = "This is not working";
      const wrapper = mountRoute(<Signup createUser={() => {}}/> )

      wrapper.setState({error});
      expect(wrapper.find('p').text()).to.be.equal(error);

      wrapper.setState({error: ''});
      expect(wrapper.find('p').length).to.be.equal(0);
    });
  });
}


