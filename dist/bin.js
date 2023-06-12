#!/usr/bin/env node
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var meow = require("meow");
var _1 = require(".");
var cli = meow("\nUsage: \n  $ get-graphql-schema ENDPOINT_URL > schema.graphql\n\nFetch and print the GraphQL schema from a GraphQL HTTP endpoint (Outputs schema in IDL syntax by default).\n\nOptions:\n  --header, -h    Add a custom header (ex. 'X-API-KEY=ABC123'), can be used multiple times\n  --json, -j      Output in JSON format (based on introspection query)\n  --method        Use method (GET,POST, PUT, DELETE)\n  --output       Save schema to file.\n", {
    flags: {
        header: {
            type: 'string',
            alias: 'h',
        },
        json: {
            type: 'boolean',
            alias: 'j',
            default: false,
        },
        method: {
            type: 'string',
            default: 'POST',
        },
        output: {
            type: 'string',
        },
        fromJson: {
            type: 'boolean',
            default: false,
        }
    },
});
/* istanbul ignore next */
if (process.env.NODE_ENV !== 'test')
    main(cli);
/**
 * Main
 */
function main(cli) {
    return __awaiter(this, void 0, void 0, function () {
        var endpoint, defaultHeaders, headers, schema;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    endpoint = cli.input[0];
                    if (!endpoint) {
                        console.warn('No endpoint provided');
                        return [2 /*return*/];
                    }
                    defaultHeaders = {
                        'Content-Type': 'application/json',
                    };
                    headers = _1.getHeadersFromInput(cli).reduce(function (acc, _a) {
                        var key = _a.key, value = _a.value;
                        var _b;
                        return (__assign({}, acc, (_b = {}, _b[key] = value, _b)));
                    }, defaultHeaders);
                    return [4 /*yield*/, _1.getRemoteSchema(endpoint, {
                            method: cli.flags.method,
                            headers: headers,
                            json: cli.flags.json,
                            fromJson: cli.flags.fromJson,
                        })];
                case 1:
                    schema = _a.sent();
                    if (schema.status === 'err') {
                        console.warn(schema.message);
                        return [2 /*return*/];
                    }
                    if (cli.flags.output !== undefined) {
                        _1.printToFile(cli.flags.output, schema.schema);
                    }
                    else {
                        console.log(schema.schema);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.main = main;
//# sourceMappingURL=bin.js.map