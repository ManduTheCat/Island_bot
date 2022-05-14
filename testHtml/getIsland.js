const axios = require("axios");
const cheerio = require("cheerio");

const getHtml = async () =>{
	try{
		console.log("it is lowawa" + await axios.get("https:/loawa.com"))
		return await axios.get("https://loawa.com/");
	}
	catch(error){

		console.log("error in axios"+error)
	}
};

getHtml()
	.then(html =>{
		let islandList =[];
		const $ = cheerio.load(html.data);
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

