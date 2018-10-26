import { MemoryRouter } from 'react-router-dom';
import Enzyme, { shallow, mount } from 'enzyme';

import { shape } from 'prop-types';

const router = {
  history: new MemoryRouter().history,
  route: {
    location: {},
    match: {}
  },
};

const createContext = () => ({
  context: { router },
  childContextTypes: { router: shape({})}
});

export const mountRoute = (node) => {
  return mount(node, createContext());
}

export const shallowRoute = (node) => {
  return shallow(node, createContext());
}

