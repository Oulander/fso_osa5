import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'
import Togglable from './Togglable'
import Login from './Login'

// const blogContent = {
//   author: "Robert C. Martin",
//   id: "5bf6ffd5cfc1c61fbd9e1330",
//   likes: 7,
//   title: "Type wars",
//   url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
//   user: {
//     _id: "5bf6ffd4cfc1c61fbd9e1329",
//     name: "marja",
//     username: "user1"
//   }
// }
//
// const handleLike = jest.fn()
// const handleDelete = jest.fn()
// const showDeleteButton = true
// const blog = <Blog blog={blogContent},
//               handleLike={handleLike},
//               handleDelete={handleDelete},
//               showDeleteButton={showDeleteButton}>

describe('Check if <Togglable> content performs as expected', () => {
  let togglableComponent

  beforeEach(() => {
    togglableComponent = shallow(
      <Togglable showButtonLabel="show" hideButtonLabel="hide">
        <div className="testDiv" />
      </Togglable>
    )
  })

  it('renders its children', () => {
    expect(togglableComponent.contains(<div className="testDiv" />)).toEqual(true)
  })

  it('doesn\'t show children at start', () => {
      const div = togglableComponent.find('.togglableContent')
      expect(div.getElement().props.style).toEqual({ display: 'none'})
  })

  it('shows children after a click', () => {
    const button = togglableComponent.find('button')
    button.at(0).simulate('click')

    const div = togglableComponent.find('.togglableContent')
    expect(div.getElement().props.style).toEqual({ display: ''})

  })
})
