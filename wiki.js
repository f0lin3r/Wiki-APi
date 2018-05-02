$(document).ready(function(){
	let searchURL_en ='https://en.wikipedia.org/w/api.php?action=opensearch&prop=revisions&rvptop=content&format=json&search=';
	let searchURL_ru ='https://ru.wikipedia.org/w/api.php?action=opensearch&prop=revisions&rvptop=content&format=json&search=';
	
	function goWiki(){
		var userSearch = document.getElementById('input').value;
		if (navigator.language||navigator.browserLanguage === ru) {
		var url = searchURL_ru + userSearch+'&callback=?';	
		} else {
		var url = searchURL_en + userSearch+'&callback=?';	
		}
		$.ajax({
			url: url,
			async: false,
			contentType: 'application/json',
			type: 'GET',
			dataType: 'jsonp',
			success: function(data, status, jqXHR){
				$('#output').html();
				for (var i=0;i<data[1].length;i++){
					$('#output').prepend( '<div class="field"><div class="text1"><a href='+data[3][i]+
						' target="_blank"><b>'+data[1][i]+'</b></a><br>'+data[2][i]+'<hr></div></div>' );
				}
			}
		})
		.done(function() {
			console.log("success");
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	}

	$('#search').click(function(){
		goWiki();	
	});

	$(document).keypress(function(e) {
    if(e.which == 13) {
      goWiki();
    };
	});

})