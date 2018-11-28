import React from 'react'
import { shallow, render, mount } from 'enzyme'


describe.skip('Simple test', () => {

  it('runs with shallow', () => {
    shallow(<div>moi</div>)
  })

  it('runs with render', () => {
    render(<div>moi</div>)
  })

  it('runs with mount', () => {
    mount(<div>moi</div>)
  })

})
