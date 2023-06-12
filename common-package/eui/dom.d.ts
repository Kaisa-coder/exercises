export declare namespace dom {

  type EasingFunction = (k: number) => number

  interface easingFuncs {
    linear: EasingFunction
    quadraticIn: EasingFunction
    quadraticOut: EasingFunction
    quadraticInOut: EasingFunction
    cubicIn: EasingFunction
    cubicOut: EasingFunction
    cubicInOut: EasingFunction
    quarticIn: EasingFunction
    quarticOut: EasingFunction
    quarticInOut: EasingFunction
    quinticIn: EasingFunction
    quinticOut: EasingFunction
  }

  interface DOMList extends Array {
    on(eventType: string, eventHandler: (e: Event) => void, option: object | boolean): DOMList;
    off(eventType: string, eventHandler: (e: Event) => void, option: object | boolean): DOMList;
    remove(): DOMList;
    clone(deep?: boolean): DOMList;
    getRaw(index: number | string): HTMLElement;
    appendTo(target: HTMLElement | DOMList): DOMList;
    insert(position: InsertPosition, dom: string): DOMList;
    insert(position: InsertPosition, dom: HTMLElement): DOMList;
    insert(position: InsertPosition, dom: DOMList): DOMList;
    append(dom: string | HTMLElement | DOMList): DOMList;
    prepend(dom: string | HTMLElement | DOMList): DOMList;
    before(dom: string | HTMLElement | DOMList): DOMList;
    after(dom: string | HTMLElement | DOMList): DOMList;
    prev(hasTextNode?: boolean): DOMList;
    next(hasTextNode?: boolean): DOMList;
    neighbor(dir: 'previous' | 'next', hasTextNode?: boolean): DOMList;
    neighborAll(dir: 'previous' | 'next', hasTextNode?: boolean): DOMList;
    siblings(): DOMList;
    prevAll(hasTextNode?: boolean): DOMList;
    nextAll(hasTextNode?: boolean): DOMList;
    html(str: undefined | string | object): DOMList | string;
    empty(): DOMList;
    show(): DOMList;
    hide(): DOMList;
    attr(key?: string, value?: string): DOMList | null | string | object;
    animate(duration: number, draw: Function, timing: Function | string, done?: Function): DOMList;
    animateTo(params: object, duration: number, timing?: string): void;
    removeClass(className: string): DOMList;
    addClass(className: string): DOMList;
    toggleClass(className: string): DOMList;
    getStyle(name: string, index: number): string | null;
    setStyle(key: string, value: string): DOMList;
    setStyles(styleObject: object): DOMList;
    hasDom(dom?: Element): boolean;
  }

  readonly function select(sel: string, ctx?: HTMLElement): DOMList;
  readonly function selectAll(sel: string, ctx?: HTMLElement): DOMList;
  readonly function create(tag: string | HTMLElement | DOMList | Array): DOMList;
  readonly function createFromSelector(selectors: string | Array): DOMList;
  readonly function parse(str: string): DOMList;
  readonly function ready(callback: Function): void;
  readonly function render(tpl: string, data: object): string;
  readonly function extendFn(name: string, func: Function): void;
  readonly function insertCSS(css: string): void;
}
