// The first argument is a string of the format "[H]H:MM {AM|PM}" 
// the second argument is an integer
// Assume the integer is the number of minutes to add to the string.
// The return value of the function should be a string of the same format as the first argument.
// For example AddMinutes ("9:13 AM", 10) would return "9:23 AM"

// integrity checks:
//   fits general pattern
//   AM or PM
//   digits, 0 or 1-12 for hours
//   digits, 00-59 for minutes
//   integer argument, any kind of sanity check? +/-, size, etc?
//   switch AM/PM based on value changes, e.g. 11:59 AM + 1 = 12:00 PM
//   mod 12 check for large values of n
//   would need to track AM/PM for large values as well

// argument collector for node app from cli
// 
// generic matcher -- be sure to check for out-of-bounds values as above
//[ '9:13 AM', [0]
//  '09',      [1]
//  '13',      [2]
//  'AM',      [3]
//  index: 0,
//  input: '9:13 AM' ]
//
//  new minutes = minutes + delta % 60 // as in 59+2 to 1 minute
//   the number of hours to add is Math.floor ((minutes + delta - 60) / 60) + 1  = #of-hours-to-add
//   then hours must be normalized via modulo 12 and the AM/PM thing figured out
//
//   hours + #of-hours-to-add % 12 = new hours
//   Math.floor ((delta + hours - 12) / 12) + 1 = even or odd #
//        then toggle on odd
// 
//  see addMinutes.md for latest code from jsbin
//  ideas for inputMatcher from: http://stackoverflow.com/questions/11032052/regular-expression-for-determining-time

var inputMatcher = /^(\d+):(\d{2}) ([AP]M)$/; //changed from \d\d to \d{2}
//console.log(process.argv);
// var inputTime  = process.argv[2]; //"09:13 AM";
// var timeArr = inputTime.match(inputMatcher);

// // exit on bad input string
// if (!timeArr) {console.log("bad input string, try again"); return 0};

// var deltaMinutes = parseInt(process.argv[3]); //59; // from cli arguments
// var minutes = parseInt(timeArr[2]);
// var hours = parseInt(timeArr[1]);
// var amPM = timeArr[3];
// //console.log(timeArr,deltaMinutes);

function getHoursToAdd (delta, minutes) {
  return Math.floor((delta + minutes - 60)/ 60) + 1;
}
function getNewMinutes (delta, minutes) {
  var newMinutes = (delta + minutes) % 60;
  if (newMinutes < 0) newMinutes = 60 + newMinutes;
  return  newMinutes;
}
function getNewHours (hoursToAdd, oldHours, oldAMPM) {
  // mod 12 to the new hours "normalizes" the hours to between 1 and 12
// what is the best way to do the above normalization
// the mod 12 gives results between 0 and 11, with 12 -> 0 others yielding themselves
// larger than 12 yields the same, 24 -> 0 everything else gives 1-11
// since 12 and its multiples give 0, then prolly should + 12 them
// whatabout converting hours to 24 hr clock to determine am/pm then subtracting 12 when > 12?
// so if oldHours is PM, add 12 unless alraedy 12 ->(12-23)
//    if oldHours is AM, subtract 12 if already 12 ->(0-11)
//    then add hoursToAdd
//    if > 24 or < -24 then mod 24 the result
//    if neg add 24
  // var newHours = (hoursToAdd + hours) % 12;
  // backing out change from this morning
  // if (newHours < 0) newHours = 12 + newHours;
  // the old code above fixes some of the -delta issues but causes 12:13 +10 to become 0:23
  // if (newHours < 1) newHours = 12 + newHours;
  var hours24 = oldHours;
  if (oldAMPM == "PM") {
    if (oldHours != 12) {
      hours24 = oldHours + 12;
     }
  }
  else { // AM
    if (oldHours == 12)
      hours24 = oldHours - 12;
  }
//    then add
  hours24 = hours24 + hoursToAdd;
//    if > 24 or < -24 then mod 24 the result
//    if neg add 24
  if (hours24 <= -24 || hours24 >= 24) hours24 = hours24 % 24;
  if (hours24 < 0) hours24 = hours24 + 24;
  console.log("hours24:",hours24, "adding: ", hours24+hoursToAdd);
  return hours24;
}
function toggleAMPM (hoursToAdd, hours) {
  // this is broken for some negative deltas
  // 12:13 AM, -15 gives 11:58 AM
  // the original idea was to see if the hoursDelta was even or odd, odd meant toggleAMPM
  // i tried doing Math.abs(hoursToAdd), which fixed the simple case of -1, but larger negatives are still borked
  // what need to be checked is if the newHours (oldHours + hoursToAdd) lands in a diff. 12 hour division
  // i was doing this by seeing if the floor(hoursToAdd + oldHours - 12 / 12) + 1 was odd or even
  var hoursDelta = Math.floor((Math.abs(hoursToAdd) + hours - 12) / 12) + 1;
  console.log("hours delta: ", hoursDelta);
  return (hoursDelta % 2 == 1); // returns boolean for AM/PM toggle
}
function getNewAMPM(toggleAMPM, amPM) {
  var newAMPM = "amPM";

  if (amPM == "AM")
    newAMPM = ("AM" && toggleAMPM) ? "PM" : "AM";
  else
    newAMPM = ("PM" && toggleAMPM) ? "AM" : "PM";

  return newAMPM;
}
exports.addMinutes = function (_inputTime, _deltaMinutes){
  var inputTime = _inputTime;
  var deltaMinutes = parseInt(_deltaMinutes);
  var timeArr = inputTime.match(inputMatcher);

  // exit on bad input string
  if (!timeArr) {console.log("bad input string, try again"); return 0};

  var minutes = parseInt(timeArr[2]);
  var hours = parseInt(timeArr[1]);
  var amPM = timeArr[3];

  var newMinutes = getNewMinutes(deltaMinutes, minutes);
  var hoursToAdd = getHoursToAdd(deltaMinutes, minutes);
  var hours24 = getNewHours(hoursToAdd, hours, amPM);

  var newAMPM;
  if (hours24 >= 12) newAMPM = "PM"; else newAMPM = "AM";

  var newHours;
  if (hours24 > 12) newHours = hours24 - 12; else newHours = hours24;
  if (hours24 == 0) newHours = 12; // for midnight

// testing would be, mk?
// how would you test
//   regex matcher
//   individual functions
//   addMinutes
// generative testing for all time values from 12:00 am thru 11:59 pm?
//   deltas from -999 to +999 for instance
//   test against builtin time functions
//   so moment.js has everything i need to test against
//    as simple as: 
var a = m({h:12, m:0}).format('h:mm A') //-> '12:00 PM'
// where 
m = require('moment.js')
//after an 'npm install moment'
//then
a.subtract(1,'m').format("h:mm A") // will subtract 1 minute and display result: '11:59 AM'

// 
//  var toggleAMPMBool = toggleAMPM(hoursToAdd, hours);
  //console.log(newMinutes,hoursToAdd,newHours,toggleAMPMBool);
//  var newAMPM = getNewAMPM(toggleAMPMBool, amPM);
//  console.log(deltaMinutes,minutes,newMinutes,hoursToAdd,newHours,toggleAMPMBool,newAMPM);

  var newTime = newHours + ":" + ((newMinutes < 10) ? "0" + newMinutes : "" + newMinutes) + " " + newAMPM;
  return (inputTime + " +" + deltaMinutes + " => " + newTime);
}

var foo = function(hta, oldh, oldap) {
  var hr24 = oldh;
  if (oldap == "PM") {
    if (oldh != 12) {
      hr24 = oldh + 12;
     }
  }
  else { // PM
    if (oldh == 12)
      hr24 = oldh - 12;
  }
//    then add
  hr24 = hr24 + hta;
//    if > 24 or < -24 then mod 24 the result
//    if neg add 24
  if (hr24 <= -24 || hr24 >= 24) hr24 = hr24 % 24;
  if (hr24 < 0) hr24 = hr24 + 24;
  console.log("hr24:",hr24, "adding: ", hr24+hta);
// to get back to am/pm
// if hr24 > 12 i.e. pm
  var newAMPM;
  if (hr24 >= 12) newAMPM = "PM"; else newAMPM = "AM";
  var newHours;
  if (hr24 > 12) newHours = hr24 - 12; else newHours = hr24;
  if (hr24 == 0) newHours = 12; // for midnight
  var newMinutes = 0;
  var newTime = newHours + ":" + ((newMinutes < 10) ? "0" + newMinutes : "" + newMinutes) + " " + newAMPM;
  return newTime;
}
