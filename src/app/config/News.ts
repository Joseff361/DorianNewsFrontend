export class News{
	
	constructor(private id: Number,
				private sourceName: String,
				private author: String,
				private title: String,
				private description: String,
				private url:String,
				private urlToImage: String,
				private publishedAt: Date,
				private content: String){}
}