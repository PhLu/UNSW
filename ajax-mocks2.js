var dataList=[
	{faculty:'IT',	Program:'Program_1', 	school:"software",		year:[2013,2014]},
	{faculty:'IT',	Program:'Program_2',	school:"software",		year:[2013,2014]},
	{faculty:'IT',	Program:'Program_3',	school:"engineering",	year:[2010,2015]},
	{faculty:'Law',	Program:'Program_4',	school:"law",			year:[2010,2012]},
	{faculty:'Law',	Program:'Program_5',	school:"legal",			year:[2011,2012]},
	{faculty:'Law',	Program:'Program_6',	school:"law",			year:[2012,2013]},
	{faculty:'BZ',	Program:'Program_7',	school:"management",	year:[2014,2015]},
	{faculty:'BZ',	Program:'Program_8',	school:"management",	year:[2012,2013,2016]},
	{faculty:'BZ',	Program:'Program_9',	school:"finance",		year:[2012,2013,2015]}];

/* faculty - faculty   program - model  school - school  year - year*/	

function getPrograms(faculty,school,year) {
	return $.grep(dataList,function(item,index){
								var s=true,r=true,st=true;
								if(faculty){s=item.faculty==faculty;}
								if(school){r=item.school==school;}
								if(year){st=item.year.indexOf(year)>-1;}
								return!!(s&&r&&st);
				});
}

function getFaculties(school,year) {
	var programs=getPrograms(null,school,year);
	var faculties=$.map(programs,function(program){
										return program.faculty;
						});
	faculties.sort(asc);
	return arrayUnique(faculties);
}

	           function getSchools(faculty,year){var programs=getPrograms(faculty,null,year);var schools=$.map(programs,function(program){return program.school;});schools.sort(asc);return arrayUnique(schools);}
	           function getYears(faculty,school){var programs=getPrograms(faculty,school,null);var years=[];$.each(programs,function(index,item){years=arrayUnique(years.concat(item.year));});years.sort(asc);return years;}
	           function arrayUnique(array){var a=array.concat();for(var i=0;i<a.length;++i){for(var j=i+1;j<a.length;++j){if(a[i]===a[j])
	           a.splice(j--,1);}}
	           return a;}
	           
function asc(a,b){
	if ( a.attr < b.attr )
		return -1;
	if ( a.attr > b.attr )
		return 1;
	return 0;
}
	           
$.mockjax({url:'/api/faculties',contentType:'application/json; charset=utf-8',responseTime:1000,
	response:function(settings){this.responseText=JSON.stringify(
			getFaculties(settings.data.school,parseFloat(settings.data.year))
			);}
	});
$.mockjax({url:'/api/schools',contentType:'application/json; charset=utf-8',responseTime:1000,
	response:function(settings){this.responseText=JSON.stringify(
			getSchools(settings.data.faculty,parseFloat(settings.data.year))
			);}
	});
$.mockjax({url:'/api/years',contentType:'application/json; charset=utf-8',responseTime:1000,
	response:function(settings){this.responseText=JSON.stringify(
			getYears(settings.data.faculty, settings.data.school)
			);}
	});
$.mockjax({url:'/api/programs',contentType:'application/json; charset=utf-8',responseTime:1000,
	response:function(settings){this.responseText=JSON.stringify(
			getPrograms(settings.data.faculty,settings.data.school,parseFloat(settings.data.year))
			);}
});

