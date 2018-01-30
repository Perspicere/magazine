import React, { PropTypes } from 'react'
import Media from 'react-media'

import { mediaQueries } from '../styles'

export default function FlexGrid({ style, wrap, fill, mobileMediaQuery = mediaQueries.isMobile, children, ...rest }) {
  return (
    <Media query={mobileMediaQuery}>
      {isMobile => {
        return (
          <div
            style={{
              ...{ display: 'flex', flexFlow: isMobile || wrap ? 'row wrap' : 'row nowrap' },
              ...style
            }}
            {...rest}
          >
            {React.Children.map(children, child => {
              return React.cloneElement(child, { mobileMediaQuery, fill })
            })}
          </div>
        )
      }}
    </Media>
  )
}

FlexGrid.propTypes = {
  style: PropTypes.object,
  wrap: PropTypes.bool,
  fill: PropTypes.bool,
  mobileMediaQuery: PropTypes.object, // Should be an object in the format understandable by json2mq
  children: PropTypes.node
}
