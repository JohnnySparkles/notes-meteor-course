import { Meteor } from 'meteor/meteor';
import React from 'react';
import {expect } from 'chai';
import sinon from 'sinon';
import { Login } from './../../imports/ui/Login';
import { mountRoute } from './../utils/router-wrapper';

if (Meteor.isClient) {
  describe('Login', function() {
    it('should show error message', function() {
      const error = "This is not working";
      const wrapper = mountRoute(<Login login={() => {}}/>);

      wrapper.setState({error});
      expect(wrapper.find('p').text()).to.be.equal(error);

      wrapper.setState({error: ''});
      expect(wrapper.find('p').length).to.be.equal(0);
    });

    it('should call login with password with the form data', function() {
      const email = 'john@test.com';
      const password = 'password123';
      const loginSpy = sinon.fake();
      const wrapper = mountRoute(<Login login={loginSpy}/>);

      wrapper.ref('email').value = email;
      wrapper.ref('password').value = password;
      wrapper.find('form').simulate('submit');

      expect(loginSpy.getCall(0).args[0]).to.deep.equal({ email });
      expect(loginSpy.getCall(0).args[1]).to.be.equal(password);
    });

    it('should set loginWithPassword callback errors', function() {
      const loginSpy = sinon.fake();
      const wrapper = mountRoute(<Login login={loginSpy}/>);

      wrapper.find('form').simulate('submit');

      loginSpy.getCall(0).args[2]({reason: 'error'});
      wrapper.update();
      expect(wrapper.find(Login).at(0).state("error")).to.not.be.equal('');

      loginSpy.getCall(0).args[2]({});
    });
  });
}
