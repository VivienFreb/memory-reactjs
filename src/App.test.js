import React from 'react';
import { shallow } from 'enzyme';

import App from './App'
import Card from './Card'

describe('<App/>', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />);
  });
  describe('<Card/>', () => {
    it('testing onClick event', () => {
      const onClick = jest.fn();
      const wrapper = shallow(<Card card="😁" feedback="hidden" index={0} onClick={onClick} />);

      wrapper.simulate('click')
      expect(onClick).toHaveBeenCalledWith(0)
    })
  })
});