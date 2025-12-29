import { Token } from 'markdown-it';
import { Config } from './types';
export declare class TokenCollector {
    private readonly config;
    private tokens;
    private currentGroupID;
    private currentGroupIndex;
    private list;
    private get isGroupClosed();
    constructor(config: Config);
    addToken(token: Token): void;
    addTokenIntoCurrentGroup(token: Token, title: string, closeGroupAfterAddingToken: boolean): void;
    startNewGroup(level: number, closePreviousBeforeStartANewOne: boolean): void;
    closeCurrentGroup(level: number): void;
    getTokens(): Token[];
}
