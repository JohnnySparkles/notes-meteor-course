import { Meteor } from 'meteor/meteor';
import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { Signup } from '../../imports/ui/Signup';
import { mountRoute } from '../utils/router-wrapper';


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

    it('should call createUser with the form data', () => {
      const email = 'john@test.com';
      const password = 'password123';
      const spy = sinon.fake();
      const wrapper = mountRoute(<Signup createUser={spy}/>);

      wrapper.ref('email').value = email;
      wrapper.ref('password').value = password;
      wrapper.find('form').simulate('submit');

      expect(spy.getCall(0).args[0]).to.be.deep.equal({email, password});
    });
  });
}


