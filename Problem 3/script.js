"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var WalletPage = function (props) {
    var children = props.children, rest = __rest(props, ["children"]);
    var balances = useWalletBalances();
    var prices = usePrices();
    var getPriority = function (blockchain) {
        // Use a lookup table to map the blockchain values to their priority values.
        var priorityLookup = {
            Osmosis: 100,
            Ethereum: 50,
            Arbitrum: 30,
            Zilliqa: 20,
            Neo: 20,
        };
        return priorityLookup[blockchain] || -99;
    };
    var sortedBalances = (0, react_1.useMemo)(function () {
        return balances.filter(function (balance) {
            var balancePriority = getPriority(balance.blockchain);
            return balancePriority > -99 && balance.amount > 0;
        });
    }, [balances, prices]);
    var rows = sortedBalances.map(function (balance, index) {
        var usdValue = prices[balance.currency] * balance.amount;
        // Format the balance's amount here, instead of in a separate array.
        var formattedAmount = balance.amount.toFixed();
        return className = { classes: classes, : .row };
        key = { index: index };
        amount = { balance: balance, : .amount };
        usdValue = { usdValue: usdValue };
        formattedAmount = { formattedAmount: formattedAmount }
            /  >
        ;
    });
};
return __assign({}, rest) > { rows: rows } < /div>;;
;
