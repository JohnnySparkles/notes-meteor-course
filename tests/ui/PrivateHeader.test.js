import { Meteor } from 'meteor/meteor';
import React from 'react';
import chai from 'chai';
import sinon from 'sinon';
import { mount } from 'enzyme';
import PrivateHeader from './../../imports/ui/PrivateHeader';

if (Meteor.isClient) {
  describe('PrivateHeader', function() {
    it('should set button text to logout', function() {
      const wrapper = mount(<PrivateHeader title="Test title" handleLogout={() => {}}/>);

      chai.expect(wrapper.find('button').text()).to.equal('Logout');
    });

    it('should set the title', function() {
      const title = "This is the title";
      const wrapper = mount(<PrivateHeader title={title} handleLogout={() => {}}/>);

      chai.expect(wrapper.find('h1').text()).to.equal(title);
    });

    it('should call the function', function() {
      const spy =  sinon.fake();
      spy(1, 2, 3);
      chai.expect(spy.called).to.equal(true);
    });

    it('should call handle logout on click', function() {
      const spy = sinon.fake();
      const wrapper = mount(<PrivateHeader title="Title" handleLogout={spy} />);
      
      wrapper.find('button').simulate('click');      

      chai.expect(spy.called).to.equal(true);
      chai.expect(spy.getCalls().length).to.equal(1);
    });
  });
}






