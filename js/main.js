$(function() {
	var pos = location.href.indexOf("index.html")
	var baseDr = location.href.substring(0, pos);
	var imgsDr = "img/";

	var htmlMap = {};
	var lastImgYear;
	var lastImgMonth;
	for ( var time in imgList) {
		var strs = time.split("-");
		var year = strs[0];
		var smonth = simpleMonthList[strs[1]];
		var fmonth = fullMonthList[strs[1]];
		var day = strs[2];
		var imgs = imgList[time];

		var html = "<section class='archives-wrap'><div class='archive-year-wrap'><div class='archive-year'>"
				+ year + "</div></div><div class='archives'>";
		if (!htmlMap[year]) {
			htmlMap[year] = html;
		}
		if (lastImgYear == year && lastImgMonth == fmonth) {
			htmlMap[year] += "<article class='archive-article archive-type-post'><div class='archive-article-inner'><header class='archive-article-header'><div class='archive-article-date'><time datetime='"
					+ time
					+ "' itemprop='datePublished'>"
					+ smonth
					+ " "
					+ day
					+ "</time></div>";
		} else {
			htmlMap[year] += "<article  class='archive-article archive-type-post'><div class='archive-article-inner'><header class='archive-article-header'><div id='"
					+ year
					+ fmonth
					+ "' class='archive-article-date'><time datetime='"
					+ time
					+ "' itemprop='datePublished'>"
					+ smonth
					+ " "
					+ day
					+ "</time></div>";

			var space = "";
			for (var i = 0; i < 15 - fmonth.length - year.length; i++) {
				space += "&nbsp;";
			}
			$("#production").append(
					"<li class='archive-list-item'><a class='archive-list-link' href='#"
							+ year + fmonth + "'>" + fmonth + space + year
							+ "</a></li>");
		}

		for ( var i in imgs) {
			var img = imgs[i][0];
			var desc = imgs[i][1];
			var imgSrc = baseDr + imgsDr + time + "/" + img;
			htmlMap[year] += "<a class='example-image-link' href='" + imgSrc
					+ "'data-lightbox='example-set' data-title='" + desc
					+ "'><img src='" + imgSrc
					+ "'alt='' width='72' height='72' /></a>";
		}
		htmlMap[year] += "</header></div></article>";
		if (lastImgYear != year && lastImgYear != null) {
			htmlMap[lastImgYear] += "</div></section>"
		}
		lastImgMonth = fmonth;
		lastImgYear = year;
	}
	for ( var x in htmlMap) {
		$("#main").append(htmlMap[x])
	}
})