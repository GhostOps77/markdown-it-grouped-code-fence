import { Token } from 'markdown-it';
export declare const RULE_NAME = "GROUPED_CODE_FENCE";
export declare const TOKEN_TYPE = "GROUPED_CODE_FENCE_TYPE";
export declare enum Nesting {
    open = 1,
    close = -1,
    selfClose = 0
}
export type Attrs = [string, string][];
export type TokenObject = {
    type: string;
    tag: string;
    nesting: Nesting;
    map?: [number, number] | null;
    attrs?: Attrs;
    level?: number;
    children?: Token[] | null;
    content?: string;
    markup?: string;
    info?: string;
    meta?: any;
    block?: boolean;
    hidden?: boolean;
};
export interface TokenInfo {
    scope: string | null;
    title: string;
}
export interface Config {
    className: {
        container: string;
        navigationBar: string;
        labelRadio: string;
        fenceRadio: string;
    };
}
