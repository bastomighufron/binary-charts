import * as confs from '../plot-bands/';

export default (contractOrTrade, lastTick) => {
    const type = contractOrTrade.type || contractOrTrade.contract_type;

    if (!contractOrTrade || !type) return [];
    
    const configFunc = confs[type.toLowerCase() + 'PlotBand'];

    if (!configFunc) throw Error('Not a known type: ' + type);
    return configFunc(contractOrTrade, lastTick);
};
