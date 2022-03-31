const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;
const getHtml = async () =>{
	try{
		return await axios.get("https://loawa.com/");
	}
	catch(error){
		console.log(error);
	}
};
const timeCal = (rowEndTime) => {
	let stTime = new Date().getTime();
	let edTime = new Date(rowEndTime).getTime();
	const remainTime = edTime - stTime;
	const hours = Math.floor((remainTime % (1000 * 60 * 60 * 24)) / (1000*60*60));
	const miniutes = Math.floor((remainTime % (1000 * 60 * 60)) / (1000*60));
	const seconds = Math.floor((remainTime % (1000 * 60)) / 1000);
	remainHourTimeSec = hours + ":" +  miniutes + ":" + seconds;
	return remainHourTimeSec;
}

getHtml()
	.then(html =>{
		let islandTime =[];
		const $ = cheerio.load(html.data);
		const $timeBodyList = $("div.text-grade5");
		const apearTime = $timeBodyList.attr("data-countdown").split(" ");
		const remainTime = timeCal($timeBodyList.attr("data-countdown"));


	});

