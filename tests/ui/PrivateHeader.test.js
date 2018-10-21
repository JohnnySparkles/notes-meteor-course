import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import PrivateHeader from './../../imports/ui/PrivateHeader';

if (Meteor.isClient) {
  describe('PrivateHeader', function() {
    it('should set button text to logout', function() {
      const wrapper = mount(<PrivateHeader/>);

      expect(wrapper.find('button').text()).toBe('Logout');
    });

    it('should set the title', function() {
      const title = "This is the title";
      const wrapper = mount(<PrivateHeader title={title}/>);

      expect(wrapper.find('h1').text()).toBe(title);
    });

    it('should call the function', function() {
    });
  });
}






