import { InputType, Field } from "type-graphql";

//import { ValidationError } from "class-validator";
@InputType()
export class UsernamePasswordInput {
    @Field()
    email: string;
    @Field()
    username: string;
    @Field()
    password: string;
}
