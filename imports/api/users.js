import SimpleSchema  from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';

export const validateNewUser = (user) => {
  const email = user.emails[0].address;

  new SimpleSchema({
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.email
    }
  }).validate({email});

  return true;
};


Accounts.validateNewUser(validateNewUser);

