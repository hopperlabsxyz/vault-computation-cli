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

  private protocolDefaultRate: number = 0;

  private protocolCustomRate: number = 0;

  private customRateActivated: boolean = false;

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

  public handleDefaultRateUpdated(rate: number ) {
    this.protocolDefaultRate = rate;
  }

  public handleCustomRateUpdated(event: {rate: number, isActivated: boolean }) {
    this.protocolCustomRate = event.rate;
    this.customRateActivated = event.isActivated;
  }

  public getProtocolRate(): number {
    return this.customRateActivated ? this.protocolCustomRate : this.protocolDefaultRate;
  }

  
}

