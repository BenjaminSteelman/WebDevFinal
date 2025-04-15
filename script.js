

const inputElement = document.createElement('input');
const teacherElement = document.createElement('input');
const enterKey = document.getElementById('enterInput')
inputElement.type = 'text';

var para = document.createElement('p');
//courseListText = "course 1,course 2,course 3,course 4,course 5";
var courseListText;
var courseList = document.createTextNode("course 1,course 2,course 3,course 4,course 5")

var arrowLabel = document.createElement('label')
var arrow = document.createTextNode(">")

let visibilityCheck = true;

inputElement.id = "input";
inputElement.name = "input";
inputElement.placeholder = "";
inputElement.autofocus = true;

arrowLabel.appendChild(arrow)

const br = document.createElement("br");

document.body.appendChild(arrowLabel)
document.body.appendChild(inputElement)

var allPrevious = document.createElement('ul')
var previousList = document.createElement('li')
var previous = ""

var teacherBool;
var studentBool;
var isBool;
var putBool;
var invalidBool;

var tableCount = 0;

//const { createClient } = require('@supabase/supabase-js');

const supabase = window.supabase;

async function getValue() {
    const { data, error } = await supabase
  .from('CourseList')
  .select('courseList')
  .eq('id', 1)
  .single();

    if (error) {
        console.error("Error fetching data:", error);
        } 
    else if (data) {
        console.log("Fetched data:", data);
        courseListText = data;

        } 
    else {
        console.log("No data found with that ID.");
        }
}

inputElement.addEventListener('keydown', function(event){
    console.log(event.key);
    if (event.key === 'Enter') {
        let inputVal = document.getElementById("input").value;
        isBool = checkIsCommand(inputVal);
        putBool = checkPutCommand(inputVal);
        console.log(isBool)

        if (isBool) {
            inputVal = inputVal.replace("is ", "")
            invalidBool = false;
        }

        if (putBool) {
            inputVal = inputVal.replace("put",'');
            invalidBool = false;
        }

        if (putBool === false && isBool === false){
            invalidBool = true; 
        }
        
        if (inputVal == "student" && isBool === true) {
                document.body.removeChild(arrowLabel);
                document.body.removeChild(inputElement);
                previous =  document.createTextNode(">" + inputVal);
                allPrevious.appendChild(previous);
                document.body.appendChild(allPrevious);
                console.log("five")
                document.body.appendChild(para);
                inputVal = "Welcome Student";
                studentBool = true;
                teacherBool = false;
                getValue()
                createCourseListTable(courseListText);
            }
        if (inputVal == "teacher" && isBool === true) {
                document.body.removeChild(arrowLabel);
                document.body.removeChild(inputElement);
                previous =  ">is " + inputVal;
                newList(previous);
                document.body.appendChild(arrowLabel);
                inputElement.value = ""
                document.body.appendChild(inputElement);
                teacherBool = true;
                studentBool = false;
                getValue();
                createCourseListTable(courseListText);
            }

        if (teacherBool === true && putBool === true) {
            document.body.removeChild(arrowLabel);
            document.body.removeChild(inputElement);
            previous =  ">put " + inputVal;
            newList(previous);
            document.body.appendChild(arrowLabel);
            inputElement.value = ""
            document.body.appendChild(inputElement);
            courseList = document.createTextNode(inputVal);
            document.getElementById(`${tableCount - 1}`).remove();
            console.log(`${tableCount - 1}`);
            createCourseListTable(inputVal);
        }

        if (invalidBool){
            document.body.removeChild(arrowLabel);
            document.body.removeChild(inputElement);
            previous =  ">" + inputVal;
            newList(previous);
            previous =  "\'" + inputVal + "\'" + " is not recognized as a valid command.";
            newList(previous);
            document.body.appendChild(arrowLabel);
            inputElement.value = ""
            document.body.appendChild(inputElement);
            createCourseListTable(courseListText);

        }
    } 

})

setInterval(visibleFunc, 1000)


function visibleFunc() {
    if (visibilityCheck === true) {
        arrowLabel.style.visibility = "visible";
        visibilityCheck = false;
    }
    else {
        arrowLabel.style.visibility = "hidden";
        visibilityCheck = true;
    }
}

function newList(previous) {
    let count = 1;
    previousList = document.createElement('li')
    previousList.setAttribute("id", "Div" + count)
    previousList.textContent = previous;
    allPrevious.appendChild(previousList);
    document.body.appendChild(allPrevious);
    count = count + 1;
}

function checkPutCommand(inputVal) {
    return inputVal.startsWith("put");
}

function checkIsCommand(inputVal) {
    return inputVal.startsWith("is");
}

function createCourseListTable(courseListText) {
    const table = document.createElement('table');
    table.id = tableCount;
    var rowInsert = table.insertRow();
    var cellInsert = rowInsert.insertCell();
    
    var splitList = courseListText.split(",")
    var splitLength = splitList.length;
    var listCount = 0;

    while (splitLength > listCount){
        cellInsert.textContent = splitList[listCount];
        console.log(courseListText, splitList);
        rowInsert = table.insertRow();
        cellInsert = rowInsert.insertCell();
        listCount = listCount + 1;
    }

    table.style.paddingTop = '0px';
    document.body.append(table);
    tableCount = tableCount + 1;
}