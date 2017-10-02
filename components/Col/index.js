import React, { PropTypes } from 'react'
import Media from 'react-media'

export default function Col({ style, width, fill, mobileMediaQuery, ...rest }) {
  return (
    <Media query={mobileMediaQuery}>
      {isMobile => {
        let flexProp

        // Mobile, take up the full container width
        if (isMobile) {
          flexProp = '0 0 100%'
        // Specified width, fill mode
        } else if (width && fill) {
          flexProp = `1 1 ${width}`
        // Specified width, no fill
        } else if (width) {
          flexProp = `0 0 ${width}`
        // Leave the sizing to flex
        } else {
          flexProp = '1 1 0'
        }

        return (
          <div
            style={{
              ...{ flex: flexProp },
              ...style,
            }}
            {...rest}
          />
        )
      }}
    </Media>
  )
}

Col.propTypes = {
  style: PropTypes.object,
  width: PropTypes.string,
  fill: PropTypes.bool, // Injected by Grid parent
  mobileMediaQuery: PropTypes.object, // Injected by Grid parent
}
