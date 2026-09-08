"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderType = exports.OrderSide = exports.CSuiteRole = exports.SectorType = exports.MacroRegime = exports.AccountType = void 0;
var AccountType;
(function (AccountType) {
    AccountType["ASSET"] = "ASSET";
    AccountType["LIABILITY"] = "LIABILITY";
    AccountType["EQUITY"] = "EQUITY";
    AccountType["REVENUE"] = "REVENUE";
    AccountType["EXPENSE"] = "EXPENSE";
})(AccountType || (exports.AccountType = AccountType = {}));
var MacroRegime;
(function (MacroRegime) {
    MacroRegime["BOOM"] = "BOOM";
    MacroRegime["EXPANSION"] = "EXPANSION";
    MacroRegime["STAGFLATION"] = "STAGFLATION";
    MacroRegime["RECESSION"] = "RECESSION";
    MacroRegime["DEPRESSION"] = "DEPRESSION";
})(MacroRegime || (exports.MacroRegime = MacroRegime = {}));
var SectorType;
(function (SectorType) {
    SectorType["FINTECH_CRYPTO"] = "FINTECH_CRYPTO";
    SectorType["BIG_TECH_AI"] = "BIG_TECH_AI";
    SectorType["COMMERCIAL_REAL_ESTATE"] = "COMMERCIAL_REAL_ESTATE";
    SectorType["MANUFACTURING"] = "MANUFACTURING";
    SectorType["MEDIA_ENTERTAINMENT"] = "MEDIA_ENTERTAINMENT";
    SectorType["GREY_MARKET"] = "GREY_MARKET";
})(SectorType || (exports.SectorType = SectorType = {}));
var CSuiteRole;
(function (CSuiteRole) {
    CSuiteRole["CEO"] = "CEO";
    CSuiteRole["CFO"] = "CFO";
    CSuiteRole["CTO"] = "CTO";
    CSuiteRole["COO"] = "COO";
    CSuiteRole["CMO"] = "CMO";
    CSuiteRole["CSO"] = "CSO";
})(CSuiteRole || (exports.CSuiteRole = CSuiteRole = {}));
var OrderSide;
(function (OrderSide) {
    OrderSide["BUY"] = "BUY";
    OrderSide["SELL"] = "SELL";
})(OrderSide || (exports.OrderSide = OrderSide = {}));
var OrderType;
(function (OrderType) {
    OrderType["LIMIT"] = "LIMIT";
    OrderType["MARKET"] = "MARKET";
    OrderType["SHORT"] = "SHORT";
})(OrderType || (exports.OrderType = OrderType = {}));
