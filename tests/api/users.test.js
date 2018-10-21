import expect from 'expect';
import {validateNewUser} from "../../imports/api/users";
import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
  describe('user tests', function() {
    it('should allow valid email address', function() {
      const testUser =  {
        emails: [
          {
            address: 'test@example.com'
          }
        ]
      };

      const res = validateNewUser(testUser);

      expect(res).toBe(true);
    });

    it('should not allow invalid email address', function() {
      const testUser  = {
        emails: [
          {
            address: 'asdfasdf',
          }
        ]
      };

      expect(function () {
        validateNewUser(testUser);
      }).toThrow();
    });
  });
}
