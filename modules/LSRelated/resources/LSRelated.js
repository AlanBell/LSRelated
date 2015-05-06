        function updateNavCount(){
             $('.nav-pills li').each(function(n,item){
                var url=$(item).attr("data-url");
                requestdata=url.split("&").reduce(function(s,c){var t=c.split('=');s[t[0]]=t[1];return s;},{})
                if (requestdata['mode'] && requestdata['mode']=="showRelatedList"){
                        var params={};
                        params['record'] = requestdata['record'];
                        params['action'] = 'RelationAjax';
                        params['module'] = app.getModuleName;
                        params['relatedModule'] = requestdata['relatedModule'];
                        params['mode'] = 'getRelatedListPageCount';
                        AppConnector.request(params).then(
                        function(response){
                                if(response.success){
					//if there is a count we update it
					if($(item).find('.count').length){
						$(item).find('.count').text("("+response.result.numberOfRecords+")");
					}else{
                                        	$(item).find('a').append("<span class='count'>("+response.result.numberOfRecords+")</span>");
					}
                                }
                        }
                );

                }
        });
	}
$(function(){
	view=$('#view').attr("value");
	if (view=="Detail"){
		updateNavCount();
	        //when the user adds stuff to a related list we need to update our count
	        var header=Vtiger_Header_Js.getInstance();
		header.registerQuickCreateCallBack(updateNavCount);
	}
})
