import { Model, Column, Table } from 'sequelize-typescript';

@Table
export default class Question extends Model<Question> {

    @Column
    text: String;

    @Column
    count: number;

}