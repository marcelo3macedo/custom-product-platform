// Estrutura declarativa de uma estampa. Usada tanto para desenhar a prévia em SVG
// (cards da loja) quanto para montar os objetos do Fabric.js no estúdio.
// Coordenadas no espaço do canvas do estúdio (DESIGN_WIDTH x DESIGN_HEIGHT),
// com `left`/`top` apontando para o centro do elemento (origem padrão do Fabric v7).

export const DESIGN_WIDTH = 280;
export const DESIGN_HEIGHT = 320;

type BaseElement = {
  left: number;
  top: number;
  angle?: number;
  opacity?: number;
};

export type TextElement = BaseElement & {
  type: "text";
  text: string;
  fontSize: number;
  fontFamily?: string;
  fontWeight?: "normal" | "bold";
  fontStyle?: "normal" | "italic";
  fill: string;
};

export type RectElement = BaseElement & {
  type: "rect";
  width: number;
  height: number;
  radius?: number;
  fill: string;
  stroke?: string;
  strokeWidth?: number;
};

export type CircleElement = BaseElement & {
  type: "circle";
  radius: number;
  fill: string;
};

export type ShapeElement = BaseElement & {
  type: "shape";
  shape: ShapeName;
  scale: number;
  fill: string;
};

export type DesignElement = TextElement | RectElement | CircleElement | ShapeElement;

export type ShapeName = "star" | "heart";

// `cx`/`cy` = centro da caixa delimitadora do path, usado para alinhar SVG e Fabric
export const SHAPE_PATHS: Record<ShapeName, { d: string; cx: number; cy: number }> = {
  star: {
    d: "M 50 0 L 63 35 L 100 35 L 70 57 L 82 92 L 50 70 L 18 92 L 30 57 L 0 35 L 37 35 Z",
    cx: 50,
    cy: 46,
  },
  heart: {
    d: "M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 z",
    cx: 50,
    cy: 50,
  },
};
