declare class Spy {
    calls: Array<Array<any>>;
    reset: () => void;
    callCount: () => number;
    wasCalled: () => boolean;
    wasNotCalled: () => boolean;
    firstCall: () => Array<any>;
    lastCall:  () => Array<any>;
    thatThrows: (error:Error) => Spy;
    thatReturns: (returnValue:any) => Spy;
    thatCalls: (fn:() => any) => Spy;
}

export function createSpy(fn?:(...args: any[])=> any): Spy;