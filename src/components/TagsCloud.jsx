import React from 'react';
import { TagCloud } from 'react-tagcloud'

const data = [
    { value: 'JavaScript', count: 38 },
    { value: 'React', count: 30 },
    { value: 'Nodejs', count: 28 },
    { value: 'Express.js', count: 25 },
    { value: 'HTML5', count: 28 },
    { value: 'MongoDB', count: 18 },
    { value: 'CSS3', count: 20 },
  ]

const TagsCloud = () => (
    <TagCloud
      minSize={14}
      maxSize={35}
      tags={data}
      onClick={tag => alert(`'${tag.value}' was selected!`)}
    />
  )
export default TagsCloud;