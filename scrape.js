const getImage = (url, message) => {
  request(url, function (error, response, body) {
    if (!error) {
      try {
        let a = cheerio.load(body),
          stockname = a('title').text().split(":"),
          stockprice = a('span.pr span:nth-child(1)').text(),
          stockchange = a('span.ch').text();
        if (stockchange[0] === '+') {
          message.channel.sendMessage(":chart_with_upwards_trend: " + "**" + stockname[0] + "** - $" + stockprice + " (" + stockchange.split("(")[1]);
        } else if (stockchange[0] === '-') {
          message.channel.sendMessage(":chart_with_downwards_trend: " + "**" + stockname[0] + "** - $" + stockprice + " (" + stockchange.split("(")[1]);
        }
      } catch (err) {
        console.log(err);
      }
    }
  });
}
