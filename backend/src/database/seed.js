"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
exports.__esModule = true;
require("dotenv/config");
var models_1 = require("./models");
var minioService_1 = require("../services/minioService");
var SeedUsers = function () { return __awaiter(void 0, void 0, void 0, function () {
    var userSeedData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Beginning seed");
                userSeedData = [
                    { email: "test@gmail.com", password: "123456" },
                    { email: "test2@email.com", password: "password" },
                ];
                // force true will drop the table if it already exists
                // such that every time we run seed, we start completely fresh
                return [4 /*yield*/, models_1.User.sync({ force: true })];
            case 1:
                // force true will drop the table if it already exists
                // such that every time we run seed, we start completely fresh
                _a.sent();
                console.log('Tables have synced!');
                return [4 /*yield*/, models_1.User.bulkCreate(userSeedData, { validate: true })
                        .then(function () {
                        console.log('Users created');
                    })["catch"](function (err) {
                        console.log('failed to create seed users');
                        console.log(err);
                    })];
            case 2:
                _a.sent();
                return [4 /*yield*/, models_1.User.create({ email: "athirdemail@aol.com", password: "123456" })
                        .then(function () {
                        console.log("Created single user");
                    })["catch"](function (err) {
                        console.log('failed to create seed users');
                        console.log(err);
                    })];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var SeedMessages = function () { return __awaiter(void 0, void 0, void 0, function () {
    var messageSeedData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Beginning seed messages");
                messageSeedData = [
                    { message_text: "hi from first seed message", sender_id: 1, receiver_id: 2 },
                    { message_text: "hi from second seed message", sender_id: 2, receiver_id: 1 },
                    { message_text: "hi from third seed message", sender_id: 1, receiver_id: 2 },
                ];
                // force true will drop the table if it already exists
                // such that every time we run seed, we start completely fresh
                return [4 /*yield*/, models_1.Message.sync({ force: true })];
            case 1:
                // force true will drop the table if it already exists
                // such that every time we run seed, we start completely fresh
                _a.sent();
                console.log('Messages table created');
                return [4 /*yield*/, models_1.Message.bulkCreate(messageSeedData, { validate: true })
                        .then(function () {
                        console.log('Messages seeded');
                    })["catch"](function (err) {
                        console.log('failed to create seed messages');
                        console.log(err);
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var SeedMinio = function () { return __awaiter(void 0, void 0, void 0, function () {
    var doggrObjs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, minioService_1.minioClient.bucketExists("doggr")];
            case 1:
                if (!_a.sent()) return [3 /*break*/, 4];
                return [4 /*yield*/, minioService_1.minioClient.listObjects("doggr")];
            case 2:
                doggrObjs = _a.sent();
                minioService_1.minioClient.removeObjects(doggrObjs);
                return [4 /*yield*/, minioService_1.minioClient.removeBucket("doggr")];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                minioService_1.minioClient.makeBucket("doggr", "localhost", function (err) {
                    if (err)
                        console.log("Couldn't make bucket", err);
                    else
                        console.log("Made bucket");
                });
                return [2 /*return*/];
        }
    });
}); };
function SeedProfiles() {
    return __awaiter(this, void 0, void 0, function () {
        var userSeedData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Seeding profiles");
                    // force true will drop the table if it already exists
                    // such that every time we run seed, we start completely fresh
                    return [4 /*yield*/, models_1.Profile.sync({ force: true })];
                case 1:
                    // force true will drop the table if it already exists
                    // such that every time we run seed, we start completely fresh
                    _a.sent();
                    userSeedData = [
                        { email: "test@gmail.com", password: "123456" },
                        { email: "test2@email.com", password: "password" },
                    ];
                    // console.log('Tables have synced!');
                    //
                    return [4 /*yield*/, models_1.Profile.bulkCreate(userSeedData, { validate: true })
                            .then(function () {
                            console.log('Profiles created');
                        })["catch"](function (err) {
                            console.log('failed to create seed Profiles');
                            console.log(err);
                        })];
                case 2:
                    // console.log('Tables have synced!');
                    //
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function Seed() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Beginning seed");
                    //await SeedUsers();
                    //await SeedMessages();
                    return [4 /*yield*/, SeedMinio()];
                case 1:
                    //await SeedUsers();
                    //await SeedMessages();
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
Seed()
    .then(function (res) { return models_1.db.close(); });
