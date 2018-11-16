/* eslint-disable react/prop-types */
import React from 'react'
import { render } from 'react-testing-library'
import ComposeUnaryRenderProps from '.'

const ComponentOne = ({ children, ...props }) => <div data-level={1}>{children({ ...props, dataOne: 1 })}</div>
const ComponentTwo = ({ children, ...props }) => <div data-level={2}>{children({ ...props, dataTwo: 2 })}</div>
const ComponentThree = ({ children, ...props }) => <div data-level={3}>{children({ ...props, dataTwo: 3, dataThree: 3 })}</div>

describe('ComposeUnaryRenderProps', function () {
  it('should match snapshots', () => {
    let composedObj

    const { container } = render(
      <ComposeUnaryRenderProps
        components={[ComponentOne, ComponentTwo, ComponentThree]}
        dataZero={0}
      >
        {function (data) {
          composedObj = data
          return 'children'
        }}
      </ComposeUnaryRenderProps>
    )

    expect(container.firstChild).toMatchInlineSnapshot(`
<div
  data-level="1"
>
  <div
    data-level="2"
  >
    <div
      data-level="3"
    >
      children
    </div>
  </div>
</div>
`)
    expect(composedObj).toMatchInlineSnapshot(`
Object {
  "dataOne": 1,
  "dataThree": 3,
  "dataTwo": 3,
  "dataZero": 0,
}
`)
  })

  it('should match an example without composing', () => {
    let composedProps, uncomposedProps
    const mockInitialProps = { foo: 'bar' }
    const { container: composedContainer } = render(
      <ComposeUnaryRenderProps
        components={[ComponentOne, ComponentTwo, ComponentThree]}
        {...mockInitialProps}
      >
        {data => {
          composedProps = data
          return 'children'
        }}
      </ComposeUnaryRenderProps>
    )

    const { container: uncomposedContainer } = render(
      <ComponentOne {...mockInitialProps}>
        {propsOne => (
          <ComponentTwo {...mockInitialProps} {...propsOne}>
            {propsTwo => (
              <ComponentThree {...mockInitialProps} {...propsTwo}>
                {propsThree => {
                  uncomposedProps = propsThree
                  return 'children'
                }}
              </ComponentThree>
            )}
          </ComponentTwo>
        )}
      </ComponentOne>
    )

    expect(composedContainer.firstChild).toEqual(uncomposedContainer.firstChild)
    expect(composedProps).toEqual(uncomposedProps)
  })
})
