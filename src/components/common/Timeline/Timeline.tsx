import React from 'react';
import {
  animated, useTrail, interpolate,
} from 'react-spring';
import { useMeasure } from 'react-use';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;

  &:before {
    content: '';
    background: black;
    width: 2px;
    height: ${props => props.lineHeight}px;
    position: absolute;
  }
`;

const Cap = styled.span`
  border: 1px solid black;
  width: 10px;
  z-index: 1;
`;

const ContentContainerWrapper = styled(animated.div)`
  overflow: hidden;
`;

const ContentContainer = styled(animated.div)`
  /* width: 1000px; */
  /* height: 150px; */
  /* text-align: center; */
  /* border: 1px solid lightgrey; */
  /* border-radius: 8px; */
  margin-bottom: 50px;
  /* background-color: white; */

  &:first-of-type {
    margin-top: 20px;
  }
  &:last-of-type {
    margin-bottom: 20px;
  }
`;

const Timeline = props => {
  const [ref, { height: containerHeight }] = useMeasure();
  const [toggle, set] = React.useState(true);

  const containerTrail = useTrail(props.children.length, {
    config: {
      mass: 50, // 5
      tension: 2000, // 2000
      friction: 400, // 200
    },
    delay: 500,
    opacity: toggle ? 1 : 0, // In percent decimal
    offsetY: toggle ? 0 : 100, // In percent
    maxHeight: '300px',
    from: {
      opacity: 0,
      offsetY: 100,
      maxHeight: '0px',
    },
  });

  return (
    <React.Fragment>
      <Container ref={ ref } lineHeight={ containerHeight }>
        <Cap />
        {containerTrail.map(({
          offsetY, opacity, maxHeight,
        }, index) => (
          <ContentContainerWrapper
            // Entry indexes should not change in this case so index-based keys are safe
            // eslint-disable-next-line react/no-array-index-key
            key={ index }
            style={ { maxHeight } }
          >
            <ContentContainer style={ { opacity, transform: interpolate([offsetY], y => `translateY(${y}%)`) } }>
              {props.children[index]}
            </ContentContainer>
          </ContentContainerWrapper>
        ))}
        <Cap />
      </Container>
    </React.Fragment>
  );
};

export default Timeline;
