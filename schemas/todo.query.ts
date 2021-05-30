import { Field, ObjectType, InputType } from 'type-graphql';
// import {
//     GraphQLObjectType,
// } from 'graphql';

@ObjectType()
// @GraphQLObjectType
export class Todo {
    constructor( id: number, titile: string, description: string, status: boolean) {
        // Initialization inside the constructor
        this.id = id;
        this.description = description;
        this.status = status;
        this.title = titile;

    }
    @Field()
    id: number;

    @Field()
    title: string;

    @Field()
    description: string;

    @Field()
    status: boolean
}

@InputType()
export class TodoInput implements Partial<Todo> {

    constructor( title: string, description: string) {
        // Initialization inside the constructor
        this.title = title;
        this.description = description;

    }
    @Field()
    title: string;

    @Field()
    description: string;
}