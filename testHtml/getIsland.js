const axios = require("axios");
const cheerio = require("cheerio");

const getHtml = async () =>{
	try{
		console.log("begin~~~~~~~~~~~~~~~~axios")
		const htmls = await axios.get("https://loawa.com/",{tiemeout: 3000000000});
		console.log("end axios ~~~~~~~~~~~~~~~~~~~~~return html loawa"+ htmls)
		return htmls
	}
	catch(error){

		console.log("error in axios"+error)
	}
};
const google = async () =>{
	try{
		console.log("begin~~~~~~~~~~~~~~~~google")
		const google = await axios.get("http://www.google.com/");
		console.log("end axios ~~~~~~~~~~~~~~~~~~~~~return html google"+ google)
		return google
	}
	catch{error}{
		console.log("erroe in google")
	}
}

google()
	.then(html =>{
		const $ = cheerio.load(html.data)
		console.log(`google data ` ,$())
	}
)

getHtml()
	.then(html =>{
		let islandList =[];
		const $ = cheerio.load(html.data);
		console.log(`lowa data`, $())
		const $bodyList = $("ul.today-quest-list").children("li.list");
		$bodyList.each(function(i, el) {
			islandList[i] = {
				title : $(this).find("span").text(),
				return : $(this).find("h5").text(),
				islandImgUrl : $(this).find("figure img").attr("src"),
				returnImgUrl : $(this).find("figure img:nth-child(2)").attr("src")
			};
		});

		console.log(islandList.filter(n => n.title));
	})

