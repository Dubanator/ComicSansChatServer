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
var pg_1 = require("pg");
var client;
exports.connect = function () { return __awaiter(_this, void 0, void 0, function () {
    var connectionString;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                connectionString = process.env.DATABASE_URL;
                client = new pg_1.Client({
                    connectionString: connectionString,
                    ssl: true
                });
                return [4 /*yield*/, client.connect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.disconnect = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client.end()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.getChats = function (UserID) { return __awaiter(_this, void 0, void 0, function () {
    var res, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, client.query('SELECT DISTINCT * FROM public."Chats", public."Members" WHERE "User_ID" = $1 AND public."Chats"."ID" = public."Members"."Chat_ID"', [UserID])];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.rows];
            case 2:
                err_1 = _a.sent();
                console.error('ERROR GETTING CHATS!!!');
                console.error(err_1);
                return [2 /*return*/, []];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUsers = function () { return __awaiter(_this, void 0, void 0, function () {
    var res, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, client.query('SELECT * FROM public."Users"')];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.rows];
            case 2:
                err_2 = _a.sent();
                console.error('ERROR GETTING USERS!!!');
                console.error(err_2);
                return [2 /*return*/, []];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createChat = function (chat_name, members, owner) { return __awaiter(_this, void 0, void 0, function () {
    var res_1, err_3;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, client.query('INSERT INTO public."Chats"(chat_name, owner) VALUES ($1, $2) RETURNING "ID";', [chat_name, owner])];
            case 1:
                res_1 = _a.sent();
                members.forEach(function (member) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, client.query('INSERT INTO public."Members"("Chat_ID", "User_ID") VALUES ($1, $2);', [res_1.rows[0].ID, member])];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                console.error('ERROR CREATING CHATS!!!');
                console.error(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getMessages = function (chat_id) { return __awaiter(_this, void 0, void 0, function () {
    var res, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, client.query('SELECT DISTINCT * FROM public."Messages", public."Users" WHERE "Chat_ID" = $1 AND public."Messages"."Owner" = public."Users"."ID" ORDER BY "Time_Sent";', [chat_id])];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.rows];
            case 2:
                err_4 = _a.sent();
                console.error('ERROR GETTING MESSAGES!!!');
                console.error(err_4);
                return [2 /*return*/, []];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createMessage = function (chat_id, owner, message) { return __awaiter(_this, void 0, void 0, function () {
    var res, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, client.query('INSERT INTO public."Messages"("Owner", "Message", "Chat_ID") VALUES ($1, $2, $3) RETURNING *;', [owner, message, chat_id])];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.rows[0]];
            case 2:
                err_5 = _a.sent();
                console.error('ERROR CREATING MESSAGE!!!');
                console.error(err_5);
                return [2 /*return*/, {}];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getMemberForUser = function (chat_id, user) { return __awaiter(_this, void 0, void 0, function () {
    var res, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, client.query('SELECT DISTINCT * FROM public."Chats", public."Members" WHERE "User_ID" = $1 AND public."Chats"."ID" = $2;', [user, chat_id])];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.rows];
            case 2:
                err_6 = _a.sent();
                console.error('ERROR GETTING MEMBER!!!');
                console.error(err_6);
                return [2 /*return*/, []];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUsersForChat = function (chat_id) { return __awaiter(_this, void 0, void 0, function () {
    var res, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, client.query('SELECT DISTINCT * FROM public."Members" WHERE "Chat_ID" = $1;', [chat_id])];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.rows];
            case 2:
                err_7 = _a.sent();
                console.error('ERROR GETTING USERS FOR CHAT!!!');
                console.error(err_7);
                return [2 /*return*/, []];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUser = function (user_id) { return __awaiter(_this, void 0, void 0, function () {
    var res, err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, client.query('SELECT * FROM public."Users" WHERE "ID" = $1;', [user_id])];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.rows[0]];
            case 2:
                err_8 = _a.sent();
                console.error('ERROR GETTING USER!!!');
                console.error(err_8);
                return [2 /*return*/, {}];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createUser = function (user_id, name, profile_picture) { return __awaiter(_this, void 0, void 0, function () {
    var res, err_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, client.query('INSERT INTO public."Users" ("ID", name, profile_picture, last_login) VALUES ($1, $2, $3, NOW());', [user_id, name, profile_picture])];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.rows[0]];
            case 2:
                err_9 = _a.sent();
                console.error('ERROR CREATING USER!!!');
                console.error(err_9);
                return [2 /*return*/, {}];
            case 3: return [2 /*return*/];
        }
    });
}); };
