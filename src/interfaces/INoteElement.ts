import { Drawable } from "roughjs/bin/core";
import { IPoint } from "./IPoint";

/**
 * Represents a note element
 *
 * @interface INoteElement
 * @field {IPoint} point 1 absolut startpoint 
 * @field {IPoint} point 2 absolut endpoint
 * @field {IPoint} offsetPoint offset from the canvas
 * @field {Drawable} shapeElement roughJS element
 * @field {number} seed unique seed number to redraw element in same form
 * @field {number} pageNum page on which the element is
 */

export interface INoteElement {
    point1: IPoint
    point2: IPoint
    offsetPoint: IPoint
    shapeElement: Drawable;
    color: string,
    seed: number;
    pageNum: number
}