"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const bcrypt = require("bcrypt");
let UserRepository = class UserRepository extends typeorm_1.Repository {
    async signUp(authCredentialsDto) {
        const { username, password } = authCredentialsDto;
        const salt = await bcrypt.genSalt();
        const user = new user_entity_1.User();
        user.username = username;
        user.password = await bcrypt.hash(password, salt);
        user.salt = salt;
        try {
            await user.save();
        }
        catch (e) {
            if (e.code === '23505') {
                throw new common_1.ConflictException(`Username ${username} already exists!`);
            }
            else {
                throw new common_1.InternalServerErrorException();
            }
        }
        return true;
    }
    async validateUserPassword(authCredentialsDto) {
        const { username, password } = authCredentialsDto;
        const found = await this.findOne({ username });
        if (found && await found.validatePassword(password)) {
            return username;
        }
        else {
            return null;
        }
    }
};
UserRepository = __decorate([
    typeorm_1.EntityRepository(user_entity_1.User)
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map