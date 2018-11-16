import { createElement } from 'react'
import PropTypes from 'prop-types'

const mergeAll = (...args) => args.reduce((acc, currentProps) => ({ ...acc, ...currentProps }), {})

const ComposeUnaryRenderProps = ({
  children,
  components = [],
  onReceiveProps = mergeAll,
  onPassProps = mergeAll,
  ...initialProps
}) => {
  const reducer = (child, Component) => parentProps =>
    createElement(Component, onReceiveProps(initialProps, parentProps), childProps => child(onPassProps(initialProps, parentProps, childProps)))

  return components.reduceRight(reducer, children)()
}

ComposeUnaryRenderProps.propTypes = {
  children: PropTypes.func.isRequired,
  components: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.string])),
  onReceiveProps: PropTypes.func,
  onPassProps: PropTypes.func
}

export default ComposeUnaryRenderProps
