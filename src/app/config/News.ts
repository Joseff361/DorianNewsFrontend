export class News{
	
	constructor(public id: Number,
				public sourceName: String,
				public author: String,
				public title: String,
				public description: String,
				public url:String,
				public urlToImage: String,
				public publishedAt: Date,
				public content: String){}
}