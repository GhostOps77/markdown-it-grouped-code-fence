import { Token } from 'markdown-it';
import { Config } from './types';
export declare class List {
    private readonly className;
    private readonly level;
    private readonly listChildLevel;
    private readonly listLevel;
    private readonly openToken;
    private readonly closeToken;
    private readonly makeListToken;
    private readonly listTokens;
    get isEmptyList(): boolean;
    get count(): number;
    constructor(className: Config['className'], level: number);
    add({ inputID, inputName, title, }: {
        title: string;
        inputID: string;
        inputName: string;
    }): void;
    get tokens(): {
        type: string;
        tag: string;
        attrs: Array<[string, string]> | null;
        map: [number, number] | null;
        nesting: Token.Nesting;
        level: number;
        children: any[] | null;
        content: string;
        markup: string;
        info: string;
        meta: any;
        block: boolean;
        hidden: boolean;
        attrIndex(name: string): number;
        attrPush(attrData: [string, string]): void;
        attrSet(name: string, value: string): void;
        attrGet(name: string): string | null;
        attrJoin(name: string, value: string): void;
    }[];
}
