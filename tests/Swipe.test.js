import React from 'react';
const { describe, it } = global;
import { shallow, mount } from 'enzyme';
import { expect } from 'chai'
import {Swipe, Slide} from '../components';


describe('Swipe Component', () => {
  it('should add custom className to root element', () => {
    const wrapper = shallow(
      <Swipe className={'test'}>
        <Slide image={'a'} defaultImage={'b'}/>
      </Swipe>
    );

    expect(wrapper.find('.test')).to.have.length(1)
  })

  it('should use the same default image for all if defaultImages prop is string', () => {
    const wrapper = mount(
      <Swipe>
        <Slide image={'a.jpg'} defaultImage={'default.jpg'}/>
        <Slide image={'b.jpg'} defaultImage={'default.jpg'}/>
      </Swipe>
    )

    expect(wrapper.find(Slide)).to.have.length(2)

    expect(wrapper.find(Slide).get(0).state.image).to.equal('default.jpg')
    expect(wrapper.find(Slide).get(1).state.image).to.equal('default.jpg')
  })

  it('should use different default images if defaultImages prop is array', () => {
    const wrapper = mount(
      <Swipe>
        <Slide image={'a.jpg'} defaultImage={'c.jpg'}/>
        <Slide image={'b.jpg'} defaultImage={'d.jpg'}/>
      </Swipe>
    )

    expect(wrapper.find(Slide)).to.have.length(2)
    expect(wrapper.find(Slide).get(0).state.image).to.equal('c.jpg')
    expect(wrapper.find(Slide).get(1).state.image).to.equal('d.jpg')
  })

  it('should replace next and prev element if it is passed', () => {
    const wrapper = shallow(
      <Swipe
        next={<span>NEXT</span>}
        prev={<span>PREV</span>}
      >
        <Slide image={'a.jpg'} defaultImage={'c.jpg'}/>
        <Slide image={'b.jpg'} defaultImage={'d.jpg'}/>
      </Swipe>
    )

    expect(wrapper.find('.rs-next').find('span')).to.have.length(1)
  })
})