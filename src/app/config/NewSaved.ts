import { Customer } from "./Customer";

export class NewSaved{
	id: Number;
    sourceName: String;
    author: String;
    title: String;
    description: String;
    url:String;
    urlToImage: String;
    publishedAt: Date;
    content: String;
    customer: Customer;
}