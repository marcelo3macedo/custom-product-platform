import { Circle, Path, Rect, Textbox, type FabricObject } from "fabric";
import { DESIGN_WIDTH, SHAPE_PATHS, type DesignElement } from "@/data/designs";

/** Converte uma estampa declarativa em objetos editáveis do Fabric.js. */
export function designToFabric(elements: DesignElement[]): FabricObject[] {
  return elements.map((el) => {
    const common = { left: el.left, top: el.top, angle: el.angle ?? 0, opacity: el.opacity ?? 1 };

    switch (el.type) {
      case "text":
        return new Textbox(el.text, {
          ...common,
          width: DESIGN_WIDTH - 20,
          fontSize: el.fontSize,
          fontFamily: el.fontFamily ?? "sans-serif",
          fontWeight: el.fontWeight ?? "normal",
          fontStyle: el.fontStyle ?? "normal",
          fill: el.fill,
          textAlign: "center",
        });
      case "rect":
        return new Rect({
          ...common,
          width: el.width,
          height: el.height,
          rx: el.radius ?? 0,
          ry: el.radius ?? 0,
          fill: el.fill,
          stroke: el.stroke,
          strokeWidth: el.strokeWidth ?? 0,
        });
      case "circle":
        return new Circle({ ...common, radius: el.radius, fill: el.fill });
      case "shape":
        return new Path(SHAPE_PATHS[el.shape].d, {
          ...common,
          scaleX: el.scale,
          scaleY: el.scale,
          fill: el.fill,
        });
    }
  });
}
