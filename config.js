define([], function () 
{
    var config = {};
    
    config.actions = "https://bubble.labs.vu.nl/historian/actions.json"; 
    config.uploadUrl = "https://bubble.labs.vu.nl/data/add-bundle.json"; 
    config.reviewUrl = "https://bubble.labs.vu.nl/historian/user/";
	
    config.allowNoUpload = "No"; //allows participants to opt-out of the browsing data collection component of the study
    config.askIdLoad = "No"; //ask for an ID (you have given them) when the extension loads
    config.minRecords = 1; //rejects potential participants if they do not have at least this many browsing records
    config.minDays = 1; //rejects potential participants if they do not have records at least this old
    config.getDatafromURL = "Yes"; //gets a unique id from a URL string (e.g. from a panel provider)
    config.multiStudy = "No"; //run multiple studies (surveys) simultaniously
    config.multiStudyFromURL = "No"; //decide who is in which study (survey) via a URL string
    //two below only needed if getIDfromURL == "Yes"
    config.idBaseUrl = /.*vuass.eu.qualtrics.com\/jfe\/form\/SV_5jvrayzeLrKQO69.*/;
    config.otherVar = "your-second-variable-to-pass-to-svy";
        
    config.conditionUrl = function(participate, par, metadata, study, actions) {
        var url = '';
        //your survey MUST be able to accept data via URL strings to receive the ID to match the browsing data to the survey
        if (participate) {
        	//you can hard code the survey url here (example below), or have it come from the actions.json from the PDK/Django server
            url += 'https://vuass.eu.qualtrics.com/jfe/form/SV_5jvrayzeLrKQO69';
            url += '?pid=';
            url += metadata['upload_identifier'];
            // url += "&"+config.otherVar;
            // url += metadata['other_url_data'];
            
        } else { //only needed if allowNoUpload == "Yes"
            url += 'https://your.survey/?par=0' + '&conditionRcvd=';
            url += metadata['web_historian_condition'];
            url += '&idRcvd=';
            url += metadata['upload_identifier'];
        }
        
        return url;
    }
    
    //only needed if multiStudy =="Yes" - last option will be treated as a "none of the above" option
    config.studies = ['Your-study-name1','Your-study-name2','Your-study-name3'];
    config.noneStudies = "Another study";
    
    //only need if multiStudyFromURL == "Yes"
    var studyPairTxt = '{ "study" : [' +
		'{ "idKey":"Your-ID-Key1" , "studyName":"Your-study-name1" },' +
		'{ "idKey":"Your-ID-Key2" , "studyName":"your-study-name2" },' +
		'{ "idKey":"Your-ID-Key3" , "studyName":"your-study-name3" } ]}';
	config.studyPair = JSON.parse(studyPairTxt);
	
	config.studyIdBackup = function(lang,domains,langList){
		//possibly write code that can function as a backup method for determining which study the user is in if the URL string is not found
	}

    return config;
});
