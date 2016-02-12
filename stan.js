function parseZipCountyDB() {
  // session.logEvent(dbResult);
  var returnArray = {};
  var splitArray = new Array();
  var tempArray = new Array();
  var hashEmpty = true;
  var dbResult = "OK,0,0,19043,HOLMES,PHILADELPHIAv,42045,PA,398998,753073";
  splitArray = dbResult.split(",");
  // session.logEvent('county = ' + splitArray[5]);
  if (splitArray[0] == "ERROR")
    return 'error';

  function setConcept(ctvar,value) {
    console.log('value is %s', value);
  }
  if (splitArray[0] == "NONE") {
    setConcept('CTCountyCode','07')
    return 'successER';
  }
  
  if (splitArray[0] == "OK") {
    if (splitArray.length < 6) {
      return 'notfound';
    } else {
      var county = splitArray[5];
      county = county.toUpperCase();
      if (county == 'BUCKS')
        setConcept('CTCountyCode','01');
      else if (county == 'PHILADELPHIA')
        setConcept('CTCountyCode','02');
      else if (county == 'CHESTER')
        setConcept('CTCountyCode','03');
      else if (county == 'DELAWARE')
        setConcept('CTCountyCode','04');
      else if (county == 'MONTGOMERY')
        setConcept('CTCountyCode','05');
      else if (county == 'YORK')
        setConcept('CTCountyCode','06');
      else
        setConcept('CTCountyCode','07');
    }
    return "successZZ";
  } else
    return "maxtimeout";
}
console.log(parseZipCountyDB());