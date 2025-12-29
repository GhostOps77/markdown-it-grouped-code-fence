import Token from 'markdown-it/lib/token.mjs';
import { TokenObject, TokenInfo, Attrs } from './types';
export declare const filterTokenInfo: (info: string) => TokenInfo;
export declare function makeToken({ type, tag, nesting, ...restValue }: TokenObject): Token & {
    map?: [number, number] | null;
    attrs?: Attrs;
    level?: number;
    children?: import("markdown-it").Token[] | null;
    content?: string;
    markup?: string;
    info?: string;
    meta?: any;
    block?: boolean;
    hidden?: boolean;
};
export declare function makeNestedToken({ token, nestLevel, }: {
    token: Token;
    nestLevel: number;
}): any;
export declare function tokenMaker(defaultTokenValue: TokenObject): (tokenValue: Partial<TokenObject>) => Token & {
    map?: [number, number] | null;
    attrs?: Attrs;
    level?: number;
    children?: import("markdown-it").Token[] | null;
    content?: string;
    markup?: string;
    info?: string;
    meta?: any;
    block?: boolean;
    hidden?: boolean;
};
export declare function getInputID(groupID: number, listCount: number): string;
export declare function getInputName(groupID: number): string;
export declare function makeRadioToken({ level, attrs: { id, name, className, checked }, }: {
    level: number;
    attrs: {
        id: string;
        name: string;
        className: string;
        checked?: boolean;
    };
}): Token & {
    map?: [number, number] | null;
    attrs?: Attrs;
    level?: number;
    children?: import("markdown-it").Token[] | null;
    content?: string;
    markup?: string;
    info?: string;
    meta?: any;
    block?: boolean;
    hidden?: boolean;
};
export declare function makeLabelTokens({ inputID, inputName, labelText, level, radioClassName, isCheckedByDefault, }: {
    inputID: string;
    inputName: string;
    labelText: string;
    level: number;
    radioClassName: string;
    isCheckedByDefault?: boolean;
}): Token[];
