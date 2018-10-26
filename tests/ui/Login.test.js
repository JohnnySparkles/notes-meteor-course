import { Meteor } from 'meteor/meteor';
import React from 'react';
import chai from 'chai';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { Login } from './../../imports/ui/Login';
import { mountRoute } from './../utils/router-wrapper';

if (Meteor.isClient) {
  describe('Login', function() {
    it('should show error message', function() {
      const error = "This is not working";
      const wrapper = mountRoute(<Login login={() => {}}/>);

      wrapper.setState({error});
      chai.expect(wrapper.find('p').text()).to.be.equal(error);

      wrapper.setState({error: ''});
      chai.expect(wrapper.find('p').length).to.be.equal(0);
    });
  });
}
