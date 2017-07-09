jQuery(function() {

	const today = moment();
	setDate(today);
	
	function getToday(isodate) {
    let today = moment();
    if (isodate.format("YYYY/MM/DD") === today.format("YYYY/MM/DD")) {
      return isodate.format('Сегодня, D MMMM YYYY года');
    }
    return isodate.format('D MMMM YYYY года');
  }
  
	function setDate(momentDate) {
	  let date = momentDate.format("YYYY/MM/DD");
		jQuery.ajax({ type: "GET",
			url: "http://api.calendar.drevle.com/" + date,
			dataType: 'json',
			success : function(cal) {
				if (jQuery("#drevleCalendarTop").length) {
					
					jQuery("#gregorianDate").html(getToday(momentDate));
					jQuery("#dayOfWeek").html(cal.day.dayOfWeek);
					jQuery("#julianDate").html(cal.day.julianDate);
					jQuery("#tone").html(cal.day.tone);
					
					jQuery("#dailyFeast").html(cal.day.dailyFeast);
					jQuery("#saints").html(cal.day.saints);
					jQuery("#readMore").attr("href", "http://calendar.drevle.com/#/" + date);

					jQuery("#fast").html(cal.day.fast+"<br />" + cal.day.bows);
          
				}
			}
		});
	}
	
	jQuery("#calendarRight").click(function () {
		let next = today.add(1, 'd');
		setDate(next);
	});
	
  jQuery("#today").click(function () {
		setDate(today);
	});

	jQuery("#calendarLeft").click(function () {
		let previews = today.subtract(1, 'd');
		setDate(previews);
	});
});