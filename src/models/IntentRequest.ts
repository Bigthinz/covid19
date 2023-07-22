
export type REQUEST_TYPE = "SELECTION"|"LOCATION" | "TEXT";
export type QUERY_TYPE = string | LOCATION_REQUEST | SELECTION_REQUEST;

export interface LOCATION_REQUEST {
    latitude: number;
    longitude: number;
    query: string;
    intentQuery: string;
}

/**
 * Used to store the information of a selected item from a list
 */
export interface SELECTION_REQUEST {
      tag:string;
      intentQuery:string;
      value:string;
}

export class Selection implements SELECTION_REQUEST{
    constructor(
        public tag:string,
        public intentQuery:string,
        public value:string
    ) {
        
    }
}
export interface IIntentRequest {
    projectId: string;
    location: string;
    agentId: string;
    query: QUERY_TYPE;
    languageCode: string;
    sessionId: string;
    username?: string
    phonenumber?: string
    requestType?: REQUEST_TYPE;
}

export class IntentRequest implements IIntentRequest {
    constructor(
        public projectId: string,
        public location: string,
        public agentId: string,
        public languageCode: string,
        public sessionId: string,
        public query: QUERY_TYPE,
        public username: string,
        public phonenumber:string
    ) {
    }

    requestType: REQUEST_TYPE = "TEXT";
}
