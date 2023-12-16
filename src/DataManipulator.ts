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
}


export class DataManipulator {
    static generateRow(serverResponds: ServerRespond[]) {
        return serverResponds.map((el: any) => {
            return {
                stock: el.stock,
                top_ask_price: el.top_ask && el.top_ask.price || 0,
                timestamp: el.timestamp,
            };
        })
    }
}
