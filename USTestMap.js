var thisMap;

var thisMap2;
/*jslint browser: true*/
/*global $, state_abbreviations, gradientMap*/

function drawTheUSMap(min_color, max_color){

	var getStateValuesFunction = function(data, stateName) {
        var i = 0;
		var dataState;
		var stateAbbr = state_abbreviations[stateName];

		for (i = 0; i < data.length; i++) {
            //Grab state name
            dataState = data[i].state;

            //Grab data value, and convert from string to float
            if (dataState === stateAbbr) {
            	return parseFloat(data[i].poke_ratio);
        	}

		}
	};

	var getCountyValuesFunction = function(data, countyName) {
		//Merge the ag. data and GeoJSON
        //Loop through once for each ag. data value
        var i = 0;
        var dataCounty;
        var part;
        var len;
        var str;
        var k;

        for (i = 0; i < data.length; i++) {
            //Grab state name
            dataCounty = data[i].county;

            part = dataCounty.split(" ");

            // if the last thing is county/borough get rid of it
            len = part.length;
            if (part[len-1] === "County" || part[len-1] === "Borough" || part[len-1] === "Parish") {
                str = "";
                for (k = 0; k < len-1; k++) {
                    str += part[k];
                    if (k !== len-2) {
                        str += " ";
                    }
                }
                dataCounty = str;
            }
            else if (part[len-2] === "Census") {
                str = "";
                for (k = 0; k < len-2; k++) {
                    str += part[k];
                    if (k !== len-3) {
                        str += " ";
                    }
                }
                dataCounty = str;
            }

            if (dataCounty.toLowerCase() === countyName.toLowerCase()) {
            	//Grab data value, and convert from string to float
            	return parseFloat(data[i].poke_ratio);
            }
           
        }
	};

    // Ignore jslint for state names with multiple words
	var state_abbreviations = {};
	state_abbreviations["Alabama"] = "AL";
	state_abbreviations["Alaska"] = "AK";
	state_abbreviations["Arizona"] = "AZ";
	state_abbreviations["Arkansas"] = "AR";
	state_abbreviations["California"] = "CA";
	state_abbreviations["Colorado"] = "CO";
	state_abbreviations["Connecticut"] = "CT";
	state_abbreviations["Delaware"] = "DE";
	state_abbreviations["District of Columbia"] = "DC";
	state_abbreviations["Florida"] = "FL";
	state_abbreviations["Georgia"] = "GA";
	state_abbreviations["Hawaii"] = "HI";
	state_abbreviations["Idaho"] = "ID";
	state_abbreviations["Illinois"] = "IL";
	state_abbreviations["Indiana"] = "IN";
	state_abbreviations["Iowa"] = "IA";
	state_abbreviations["Kansas"] = "KS";
	state_abbreviations["Kentucky"] = "KY";
	state_abbreviations["Louisiana"] = "LA";
	state_abbreviations["Maine"] = "ME";
	state_abbreviations["Maryland"] = "MD";
	state_abbreviations["Massachusetts"] = "MA";
	state_abbreviations["Michigan"] = "MI";
	state_abbreviations["Minnesota"] = "MN";
	state_abbreviations["Mississippi"] = "MS";
	state_abbreviations["Missouri"] = "MO";
	state_abbreviations["Montana"] = "MT";
	state_abbreviations["Nebraska"] = "NE";
	state_abbreviations["Nevada"] = "NV";
	state_abbreviations["New Hampshire"] = "NH";
	state_abbreviations["New Jersey"] = "NJ";
	state_abbreviations["New Mexico"] = "NM";
	state_abbreviations["New York"] = "NY";
	state_abbreviations["North Carolina"] = "NC";
	state_abbreviations["North Dakota"] = "ND";
	state_abbreviations["Ohio"] = "OH";
	state_abbreviations["Oklahoma"] = "OK";
	state_abbreviations["Oregon"] = "OR";
	state_abbreviations["Pennsylvania"] = "PA";
	state_abbreviations["Rhode Island"] = "RI";
	state_abbreviations["South Carolina"] = "SC";
	state_abbreviations["South Dakota"] = "SD";
	state_abbreviations["Tennessee"] = "TN";
	state_abbreviations["Texas"] = "TX";
	state_abbreviations["Utah"] = "UT";
	state_abbreviations["Vermont"] = "VT";
	state_abbreviations["Virginia"] = "VA";
	state_abbreviations["Washington"] = "WA";
	state_abbreviations["West Virginia"] = "WV";
	state_abbreviations["Wisconsin"] = "WI";
	state_abbreviations["Wyoming"] = "WY";
	state_abbreviations["Puerto Rico"] = "PR";
	
	//Create file paths. Used in setPaths function
	var us_poke_data_file = " json/poke_ratio_correct2.csv";
	var map_json_file = "json/us-states.json";
	var county_path_file = "json/stateJSON/";
	var county_poke_data_file = "json/countyPokes/";
	
	//Build map
	var map = gradientMap.setColors(min_color, max_color)
				.setFeature("poke_ratio")
				.setRestFileName("poke.csv")
				//.setDrawCounties(drawCounties)
				.setFunctions(getStateValuesFunction, getCountyValuesFunction)
				.setStateAbbreviations(state_abbreviations)
				.setPaths(map_json_file, us_poke_data_file, county_path_file, county_poke_data_file)
				.setStartingGradient(-1)
				.createNewMap();
				//.setup();
				
	thisMap = jQuery.extend(true, {}, map);
	
	//console.log(thisMap);
				
	//Draw map
	//thisMap.drawMap(map_json_file, us_poke_data_file);
}

function drawTheTestMap(min_color, max_color){
	/*jslint browser: true*/
	/*global $, state_abbreviations, gradientMap*/

	var getStateValuesFunction = function(data, stateName) {

		var stateAbbr = state_abbreviations[stateName];
		var i;
		var dataState;

		for (i = 0; i < data.length; i++) {
            //Grab state name
            dataState = data[i].state;

            //Grab data value, and convert from string to float
            if (dataState === stateAbbr) {
            	return parseFloat(data[i].test);
        	}

		}
	};

	var getCountyValuesFunction = function(data, countyName, featureName) {
		//Merge the ag. data and GeoJSON
        //Loop through once for each ag. data value
		var i;
		var k;
		var dataCounty;
		var part;
		var len;
		var str;
        for (i = 0; i < data.length; i++) {
            //Grab state name
            dataCounty = data[i].county;

            part = dataCounty.split(" ");

            // if the last thing is county/borough get rid of it
            len = part.length;
            if (part[len-1] === "County" || part[len-1] === "Borough" || part[len-1] === "Parish") {
                str = "";
                for (k = 0; k < len-1; k++) {
                    str += part[k];
                    if (k !== len-2) {
                        str += " ";
                    }
                }
                dataCounty = str;
            }
            else if (part[len-2] === "Census") {
            	str = "";
                for (k = 0; k < len-2; k++) {
                    str += part[k];
                    if (k !== len-3) {
                        str += " ";
                    }
                }
                dataCounty = str;
            }

            if (dataCounty === countyName) {
            	//Grab data value, and convert from string to float
            	return parseFloat(data[i][featureName]);
            }
           
        }
	};
	var map;
	var state_abbreviations = {};
	state_abbreviations["Alabama"] = "AL";
	state_abbreviations["Alaska"] = "AK";
	state_abbreviations["Arizona"] = "AZ";
	state_abbreviations["Arkansas"] = "AR";
	state_abbreviations["California"] = "CA";
	state_abbreviations["Colorado"] = "CO";
	state_abbreviations["Connecticut"] = "CT";
	state_abbreviations["Delaware"] = "DE";
	state_abbreviations["District of Columbia"] = "DC";
	state_abbreviations["Florida"] = "FL";
	state_abbreviations["Georgia"] = "GA";
	state_abbreviations["Hawaii"] = "HI";
	state_abbreviations["Idaho"] = "ID";
	state_abbreviations["Illinois"] = "IL";
	state_abbreviations["Indiana"] = "IN";
	state_abbreviations["Iowa"] = "IA";
	state_abbreviations["Kansas"] = "KS";
	state_abbreviations["Kentucky"] = "KY";
	state_abbreviations["Louisiana"] = "LA";
	state_abbreviations["Maine"] = "ME";
	state_abbreviations["Maryland"] = "MD";
	state_abbreviations["Massachusetts"] = "MA";
	state_abbreviations["Michigan"] = "MI";
	state_abbreviations["Minnesota"] = "MN";
	state_abbreviations["Mississippi"] = "MS";
	state_abbreviations["Missouri"] = "MO";
	state_abbreviations["Montana"] = "MT";
	state_abbreviations["Nebraska"] = "NE";
	state_abbreviations["Nevada"] = "NV";
	state_abbreviations["New Hampshire"] = "NH";
	state_abbreviations["New Jersey"] = "NJ";
	state_abbreviations["New Mexico"] = "NM";
	state_abbreviations["New York"] = "NY";
	state_abbreviations["North Carolina"] = "NC";
	state_abbreviations["North Dakota"] = "ND";
	state_abbreviations["Ohio"] = "OH";
	state_abbreviations["Oklahoma"] = "OK";
	state_abbreviations["Oregon"] = "OR";
	state_abbreviations["Pennsylvania"] = "PA";
	state_abbreviations["Rhode Island"] = "RI";
	state_abbreviations["South Carolina"] = "SC";
	state_abbreviations["South Dakota"] = "SD";
	state_abbreviations["Tennessee"] = "TN";
	state_abbreviations["Texas"] = "TX";
	state_abbreviations["Utah"] = "UT";
	state_abbreviations["Vermont"] = "VT";
	state_abbreviations["Virginia"] = "VA";
	state_abbreviations["Washington"] = "WA";
	state_abbreviations["West Virginia"] = "WV";
	state_abbreviations["Wisconsin"] = "WI";
	state_abbreviations["Wyoming"] = "WY";
	state_abbreviations["Puerto Rico"] = "PR";
	
	//Create file paths. Used in setPaths function
	var us_poke_data_file = " json/poke_ratio_correct2-test.csv";
	var map_json_file = "json/us-states.json";
	var county_path_file = "json/stateJSON/";
	var county_poke_data_file = "test_files/";
	
	//Build map
	map = gradientMap.setColors(min_color,max_color)
				.setFeature("test")
				.setRestFileName("2.csv")
				.setFunctions(getStateValuesFunction, getCountyValuesFunction)
				.setStateAbbreviations(state_abbreviations)
				.setPaths(map_json_file, us_poke_data_file, county_path_file, county_poke_data_file)
				.setStartingGradient(-1)
				.createNewMap();
				//.setup();
				
	thisMap2 = jQuery.extend(true, {}, map);
	
	//console.log(thisMap);
	
	//console.log(thisMap2);
				
	//Draw map
	//thisMap2.drawMap(map_json_file, us_poke_data_file);
	
	//thisMap.drawMap(map_json_file, us_poke_data_file);
	
	//console.log(thisMap2.svg);
}



function removeUSMap(){
	
	thisMap.removeMap();
	
}

function drawMaps() {
    
    drawTheUSMap('#EBF5FF','#002966');
    drawTheTestMap('#EBF5FF','#002966');
    
}