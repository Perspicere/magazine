import React from 'react'

const Loader = props => (
  <svg width={24} height={24} {...props}>
    <path fill="#333" d="M0 0h4v7H0z">
      <animateTransform
        attributeType="xml"
        attributeName="transform"
        type="scale"
        values="1,1; 1,3; 1,1"
        begin="0s"
        dur="0.6s"
        repeatCount="indefinite"
      />
    </path>
    <path fill="#333" d="M10 0h4v7h-4z">
      <animateTransform
        attributeType="xml"
        attributeName="transform"
        type="scale"
        values="1,1; 1,3; 1,1"
        begin="0.2s"
        dur="0.6s"
        repeatCount="indefinite"
      />
    </path>
    <path fill="#333" d="M20 0h4v7h-4z">
      <animateTransform
        attributeType="xml"
        attributeName="transform"
        type="scale"
        values="1,1; 1,3; 1,1"
        begin="0.4s"
        dur="0.6s"
        repeatCount="indefinite"
      />
    </path>
  </svg>
)

export default Loader
