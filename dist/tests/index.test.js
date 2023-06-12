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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var fetch = require("jest-fetch-mock");
var fs = require("fs");
var mkdirp = require("mkdirp");
jest.setMock('node-fetch', fetch);
describe('core function works as expected', function () {
    beforeEach(function () {
        jest.restoreAllMocks();
    });
    /**
     * getHeadersFromInput
     */
    test('getHeadersFromInput gets correct headers', function () { return __awaiter(_this, void 0, void 0, function () {
        var noheader, singleHeader, multipleHeaders, complexHeader, multipleComplexHeaders;
        return __generator(this, function (_a) {
            noheader = __1.getHeadersFromInput({
                flags: {
                    header: undefined,
                },
            });
            singleHeader = __1.getHeadersFromInput({
                flags: {
                    header: 'key=pass',
                },
            });
            multipleHeaders = __1.getHeadersFromInput({
                flags: {
                    header: ['key=pass', 'key=pass'],
                },
            });
            complexHeader = __1.getHeadersFromInput({
                flags: {
                    header: 'token=123fadshfkj=$',
                },
            });
            multipleComplexHeaders = __1.getHeadersFromInput({
                flags: {
                    header: ['token=123fadshfkj=$', 'token=123fadshfkj=$'],
                },
            });
            expect(noheader).toEqual([]);
            expect(singleHeader).toEqual([{ key: 'key', value: 'pass' }]);
            expect(multipleHeaders).toEqual([
                { key: 'key', value: 'pass' },
                { key: 'key', value: 'pass' },
            ]);
            expect(complexHeader).toEqual([{ key: 'token', value: '123fadshfkj=$' }]);
            expect(multipleComplexHeaders).toEqual([
                { key: 'token', value: '123fadshfkj=$' },
                { key: 'token', value: '123fadshfkj=$' },
            ]);
            return [2 /*return*/];
        });
    }); });
    /**
     * getRemoteSchema
     */
    // TODO
    /**
     * printToFile
     */
    test("printToFile creates directory if it's missing", function () { return __awaiter(_this, void 0, void 0, function () {
        var fsExistsSyncMock, mkdirpSyncMock, fsWriteFileSyncMock, res;
        return __generator(this, function (_a) {
            fsExistsSyncMock = jest.spyOn(fs, 'existsSync').mockReturnValue(false);
            mkdirpSyncMock = jest
                .spyOn(mkdirp, 'sync')
                .mockImplementation(function () { });
            fsWriteFileSyncMock = jest
                .spyOn(fs, 'writeFileSync')
                .mockImplementation(function () { });
            res = __1.printToFile('/pass', 'schema');
            /**
             * Tests
             */
            expect(fsExistsSyncMock).toBeCalledWith('/pass');
            expect(mkdirpSyncMock).toBeCalledWith('/pass');
            expect(fsWriteFileSyncMock).toBeCalledWith('/pass', 'schema');
            expect(res).toEqual({ status: 'ok', path: '/pass' });
            return [2 /*return*/];
        });
    }); });
    test("printToFile doesn't create directory if it already exists", function () { return __awaiter(_this, void 0, void 0, function () {
        var fsExistsSyncMock, mkdirpSyncMock, fsWriteFileSyncMock, res;
        return __generator(this, function (_a) {
            fsExistsSyncMock = jest.spyOn(fs, 'existsSync').mockReturnValue(true);
            mkdirpSyncMock = jest
                .spyOn(mkdirp, 'sync')
                .mockImplementation(function () { });
            fsWriteFileSyncMock = jest
                .spyOn(fs, 'writeFileSync')
                .mockImplementation(function () { });
            res = __1.printToFile('/pass', 'schema');
            /**
             * Tests
             */
            expect(fsExistsSyncMock).toBeCalledWith('/pass');
            expect(mkdirpSyncMock).toBeCalledTimes(0);
            expect(fsWriteFileSyncMock).toBeCalledWith('/pass', 'schema');
            expect(res).toEqual({ status: 'ok', path: '/pass' });
            return [2 /*return*/];
        });
    }); });
    test('printToFile returns error message on error', function () { return __awaiter(_this, void 0, void 0, function () {
        var fsExistsSyncMock, mkdirpSyncMock, fsWriteFileSyncMock, res;
        return __generator(this, function (_a) {
            fsExistsSyncMock = jest.spyOn(fs, 'existsSync').mockReturnValue(true);
            mkdirpSyncMock = jest.spyOn(mkdirp, 'sync');
            fsWriteFileSyncMock = jest
                .spyOn(fs, 'writeFileSync')
                .mockImplementation(function () {
                throw new Error('pass');
            });
            res = __1.printToFile('/pass', 'schema');
            /**
             * Tests
             */
            expect(fsExistsSyncMock).toBeCalledWith('/pass');
            expect(mkdirpSyncMock).toBeCalledTimes(0);
            expect(fsWriteFileSyncMock).toBeCalledTimes(1);
            expect(res).toEqual({ status: 'err', message: 'pass' });
            return [2 /*return*/];
        });
    }); });
});
//# sourceMappingURL=index.test.js.map