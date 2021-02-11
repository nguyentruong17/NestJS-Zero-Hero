import { JwtPayload } from "./jwt-payload.interface";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private _userRepo;
    constructor(_userRepo: UserRepository);
    validate(payload: JwtPayload): Promise<User>;
}
export {};
