#!/usr/bin/env node
"use strict";
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
var node_fetch_1 = require("node-fetch");
var fs = require("fs");
var path = require("path");
var mkdirp = require("mkdirp");
var introspectionQuery_1 = require("graphql/utilities/introspectionQuery");
var buildClientSchema_1 = require("graphql/utilities/buildClientSchema");
var schemaPrinter_1 = require("graphql/utilities/schemaPrinter");
var query = require("querystringify");
console.log('I am ACTUALLY RUNNING');
/**
 *
 * Normalizes header input from CLI
 *
 * @param cli
 */
function getHeadersFromInput(cli) {
    switch (typeof cli.flags.header) {
        case 'string': {
            var keys = query.parse(cli.flags.header);
            var key = Object.keys(keys)[0];
            return [{ key: key, value: keys[key] }];
        }
        case 'object': {
            return cli.flags.header.map(function (header) {
                var keys = query.parse(header);
                var key = Object.keys(keys)[0];
                return { key: key, value: keys[key] };
            });
        }
        default: {
            return [];
        }
    }
}
exports.getHeadersFromInput = getHeadersFromInput;
/**
 *
 * Fetch remote schema and turn it into string
 *
 * @param endpoint
 * @param options
 */
function getRemoteSchema(endpoint, options) {
    return __awaiter(this, void 0, void 0, function () {
        var data, response, response, schema, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    data = void 0;
                    if (!options.fromJson) return [3 /*break*/, 2];
                    return [4 /*yield*/, fetchJsonSchema(endpoint, options)];
                case 1:
                    response = _a.sent();
                    data = response.data;
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, fetchIntrospectionQuery(endpoint, options)];
                case 3:
                    response = _a.sent();
                    data = response.data;
                    if (response.errors) {
                        return [2 /*return*/, { status: 'err', message: JSON.stringify(response.errors, null, 2) }];
                    }
                    _a.label = 4;
                case 4:
                    if (options.json) {
                        return [2 /*return*/, {
                                status: 'ok',
                                schema: JSON.stringify(data, null, 2),
                            }];
                    }
                    else {
                        schema = buildClientSchema_1.buildClientSchema(data);
                        return [2 /*return*/, {
                                status: 'ok',
                                schema: schemaPrinter_1.printSchema(schema),
                            }];
                    }
                    return [3 /*break*/, 6];
                case 5:
                    err_1 = _a.sent();
                    return [2 /*return*/, { status: 'err', message: err_1.message }];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.getRemoteSchema = getRemoteSchema;
function fetchIntrospectionQuery(endpoint, options) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, node_fetch_1.default(endpoint, {
                        method: options.method,
                        headers: options.headers,
                        body: JSON.stringify({ query: introspectionQuery_1.introspectionQuery }),
                    }).then(function (res) { return res.json(); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function fetchJsonSchema(endpoint, options) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, node_fetch_1.default(endpoint, {
                        method: options.method,
                        headers: options.headers,
                    }).then(function (res) { return res.json(); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
/**
 *
 * Prints schema to file.
 *
 * @param dist
 * @param schema
 */
function printToFile(dist, schema) {
    try {
        var output = path.resolve(process.cwd(), dist);
        if (!fs.existsSync(output)) {
            mkdirp.sync(output);
        }
        fs.writeFileSync(output, schema);
        return { status: 'ok', path: output };
    }
    catch (err) {
        return { status: 'err', message: err.message };
    }
}
exports.printToFile = printToFile;
//# sourceMappingURL=index.js.map