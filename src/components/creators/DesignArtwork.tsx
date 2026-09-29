import { DESIGN_HEIGHT, DESIGN_WIDTH, SHAPE_PATHS, type DesignElement } from "@/data/designs";

type Props = {
  elements: DesignElement[];
  x?: number;
  y?: number;
  width?: number | string;
  height?: number | string;
};

function rotation(el: DesignElement) {
  return el.angle ? `rotate(${el.angle} ${el.left} ${el.top})` : undefined;
}

/** Renderiza uma estampa como SVG (espelha o que o estúdio monta com Fabric.js). */
export default function DesignArtwork({ elements, x, y, width = "100%", height = "100%" }: Props) {
  return (
    <svg x={x} y={y} width={width} height={height} viewBox={`0 0 ${DESIGN_WIDTH} ${DESIGN_HEIGHT}`} aria-hidden="true">
      {elements.map((el, i) => {
        switch (el.type) {
          case "text":
            return (
              <text
                key={i}
                x={el.left}
                y={el.top}
                transform={rotation(el)}
                opacity={el.opacity}
                fill={el.fill}
                fontSize={el.fontSize}
                fontFamily={el.fontFamily ?? "sans-serif"}
                fontWeight={el.fontWeight}
                fontStyle={el.fontStyle}
                textAnchor="middle"
                dominantBaseline="central"
              >
                {el.text}
              </text>
            );
          case "rect":
            return (
              <rect
                key={i}
                x={el.left - el.width / 2}
                y={el.top - el.height / 2}
                width={el.width}
                height={el.height}
                rx={el.radius}
                fill={el.fill}
                stroke={el.stroke}
                strokeWidth={el.strokeWidth}
                transform={rotation(el)}
                opacity={el.opacity}
              />
            );
          case "circle":
            return <circle key={i} cx={el.left} cy={el.top} r={el.radius} fill={el.fill} opacity={el.opacity} />;
          case "shape": {
            const shape = SHAPE_PATHS[el.shape];
            return (
              <path
                key={i}
                d={shape.d}
                fill={el.fill}
                opacity={el.opacity}
                transform={`translate(${el.left} ${el.top}) rotate(${el.angle ?? 0}) scale(${el.scale}) translate(${-shape.cx} ${-shape.cy})`}
              />
            );
          }
        }
      })}
    </svg>
  );
}
