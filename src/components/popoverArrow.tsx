import {Placement} from '@floating-ui/react-dom';
import {nanoid} from 'nanoid';
import {ForwardRefRenderFunction, HTMLAttributes, forwardRef, useMemo} from 'react';
import styled from 'styled-components';

type Props = HTMLAttributes<HTMLDivElement> & {
  size?: 's' | 'm' | 'l';
  strokeWidth?: number;
  placement?: Placement;
};

function getArrowWidth(size: Props['size']) {
  switch (size) {
    case 's':
      return 16;
    case 'l':
      return 32;
    case 'm':
    default:
      return 24;
  }
}

export function getArrowHeight(size: Props['size']) {
  return Math.round(getArrowWidth(size) / 3);
}

const Arrow: ForwardRefRenderFunction<HTMLDivElement, Props> = (
  {size = 'm', strokeWidth = 1, placement, ...props},
  ref
) => {
  /**
   * Width
   */
  const w = getArrowWidth(size);
  /**
   * Height
   */
  const h = getArrowHeight(size);

  /**
   * Stroke width
   */
  const s = strokeWidth;
  const arrowPath = [
    `M 0 ${h - s / 2}`,
    `C ${w * 0.4} ${h - s / 2} ${w * 0.45} 0 ${w / 2} 0`,
    `C ${w * 0.55} 0 ${w * 0.6} ${h - s / 2} ${w} ${h - s / 2}`,
  ].join('');

  const strokeMaskId = useMemo(() => nanoid(), []);
  const fillMaskId = useMemo(() => nanoid(), []);

  return (
    <Wrap ref={ref} placement={placement} {...props}>
      <SVG overflow="visible" width={w} viewBox={`0 0 ${w} ${h}`}>
        <defs>
          <mask id={`fill-mask-${fillMaskId}`}>
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <path d={arrowPath} vectorEffect="non-scaling-stroke" stroke="black" />
          </mask>
          <mask id={`stroke-mask-${strokeMaskId}`}>
            <rect x="0" y={-strokeWidth} width="100%" height="100%" fill="white" />
          </mask>
        </defs>

        <path
          d={`${arrowPath} V ${h} H 0 Z`}
          mask={`url(#fill-mask-${fillMaskId})`}
          className="fill"
        />
        <path
          d={arrowPath}
          mask={`url(#stroke-mask-${strokeMaskId})`}
          className="stroke"
        />
      </SVG>
    </Wrap>
  );
};

export default forwardRef(Arrow);

const Wrap = styled.div<{placement?: Placement}>`
  width: 0;
  height: 0;
  position: absolute;
  display: flex;
  align-items: end;
  justify-content: center;
  transform-origin: center bottom;

  ${p => p.placement?.startsWith('top') && `bottom: 0; transform: rotate(180deg);`}
  ${p => p.placement?.startsWith('bottom') && `top: 0;`}
  ${p => p.placement?.startsWith('left') && `right: 0; transform: rotate(90deg);`}
  ${p => p.placement?.startsWith('right') && `left: 0; transform: rotate(-90deg);`}
`;

const SVG = styled.svg`
  flex-shrink: 0;
  fill: none;
  stroke: none;

  /* Fix SVG rendering issue in Safari */
  transform: translate3d(0, 0, 0);

  path.stroke {
    stroke: ${p => p.theme.border};
  }
  path.fill {
    fill: ${p => p.theme.backgroundElevated};
  }
`;
