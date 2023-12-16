// This file is responsible for processing the raw stock data we receive from the server
// before the Graph component renders it.

import {ServerRespond} from './DataStreamer';

export interface Row {
    //step four
    //update to match the new schema.
    price_abc: number,
    price_def: number,
    ratio: number,
    timestamp: Date,
    upper_bound: number,
    lower_bound: number,
    trigger_alert: number | undefined,
    //This change is necessary because it determines the structure of the object
    // returned by the generateRow function
    // This return object must correspond to the schema of the table in the Graph
    // component
}


export class DataManipulator {
    static generateRow(serverRespond: ServerRespond[]): Row {
        //step five
        const priceABC = (serverRespond[0].top_ask.price + serverRespond[0].top_bid.price)/2;
        const priceDEF = (serverRespond[1].top_ask.price + serverRespond[1].top_bid.price)/2;
        //we’re able to access serverRespond as an array wherein the
        // first element is stock ABC and the second element is stock DEF
        const ratio = priceABC/priceDEF;
        const upperBound = 1 + 0.10;
        const lowerBound = 1 - 0.10;
        return {
            //return single Row object to match table.update in Graph.tsx
            price_abc: priceABC,
            price_def: priceDEF,
            ratio,
            timestamp: serverRespond[0].timestamp > serverRespond[1].timestamp ?
                serverRespond[0].timestamp : serverRespond[1].timestamp,
            upper_bound: upperBound,
            lower_bound: lowerBound,
            trigger_alert: (ratio > upperBound || ratio < lowerBound) ? ratio : undefined
        }
    }
}
