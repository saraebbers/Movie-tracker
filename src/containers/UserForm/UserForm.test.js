import { UserForm, mapDispatchToProps } from './UserForm';
import * as actions from '../../actions/index';
import { shallow } from 'enzyme';
import React from 'react';

describe('UserForm', () => {
  describe('mapDispatchToProps', () => {
    it('should return a props object with the method logInUser', () => {
    //setup
      const mockDispatch = jest.fn();
      const mockUser = {name: 'bob', email: 'bob@example.com', password: 'password'}
      const action = actions.logInUser(mockUser)
    //execution
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.logInUser(mockUser)
    //expectation
      expect(mockDispatch).toHaveBeenCalledWith(action)
    })

    it('should return a props obj with the method addUser', () => {
      const mockDispatch = jest.fn()
      const mockUser = {name: 'sally', email: 'sally@example.com', password: 'passwords'}
       const action = actions.addUser(mockUser)

       const mappedProps = mapDispatchToProps(mockDispatch)
       mappedProps.addUser(mockUser)

       expect(mockDispatch).toHaveBeenCalledWith(action)
    })

  })

  describe('UserForm Component', () => {
    it('should match the snapshot', () => {
      const wrapper = shallow(<UserForm />)
      expect(wrapper).toMatchSnapshot()
    })

    it('should have the correct default state', () => {
      const expected = {
        userName: '',
        email: '',
        password: '',
        loggedIn: false
      }
      const wrapper = shallow(<UserForm/>)
      expect(wrapper.state()).toEqual(expected)
    })

    it('should change the value of state when handleChange is called', () => {
      const mockEvent = {target: {name: 'userName', value: 'sally'}}
      const wrapper = shallow(<UserForm/>)
      const expected = 'sally'
      wrapper.instance().handleChange(mockEvent)
      expect(wrapper.state().userName).toEqual(expected)
    })

    describe('handleSubmit', () => {
      it('should call logInUser', () => {
        const mockEvent = { preventDefault: jest.fn() };
        const mockLogInUser = jest.fn();
        const wrapper = shallow(<UserForm logInUser={mockLogInUser} />);
        wrapper.instance().handleSubmit(mockEvent);
        expect(mockLogInUser).toHaveBeenCalled();
      });

      it('should update state for logged in user', async () => {
        const mockEvent = { preventDefault: jest.fn() };
        const mockLogInUser = jest.fn()
        const wrapper = shallow(<UserForm logInUser={mockLogInUser} />);
        const expected = true;
        await wrapper.instance().handleSubmit(mockEvent);
        expect(wrapper.state().loggedIn).toEqual(expected);
      })
    })

  })


})