import { BPS_DIVIDER } from "../utils/constants";
import type { Rates } from "./types";

export class RatesManager {
  // Do not use those value directly, rely on the feeRates function
  private _rates: Rates;
  private _oldRates: Rates = {
    management: 0,
    performance: 0,
  };
  private cooldown: number;
  private newRatesTimestamp = 0;

  constructor(rates: Rates, cooldown: number) {
    this._rates = {
      management: rates.management / Number(BPS_DIVIDER),
      performance: rates.performance / Number(BPS_DIVIDER),
    };
    this.cooldown = cooldown;
  }

  public handleRatesUpdated(event: { blockTimestamp: number; rates: Rates, blockNumber: number }) {
    this.newRatesTimestamp = Number(event.blockTimestamp) + Number(this.cooldown);
  

    const currentRates = this._rates;
    this._rates = {
      management: event.rates.management / Number(BPS_DIVIDER),
      performance: event.rates.performance / Number(BPS_DIVIDER),
    };

    this._oldRates = currentRates;
  }

  public feeRates(blockTimestamp: number) {
    
    if (Number(this.newRatesTimestamp) <= Number(blockTimestamp)) return this._rates;
    return this._oldRates;
  }
}

