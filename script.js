

const inputElement = document.createElement('input');
const teacherElement = document.createElement('input');
const enterKey = document.getElementById('enterInput')
inputElement.type = 'text';
if (!document.cookie) {
    document.cookie = "text=course 1,course 2,course 3,course 4,course 5; expires=Thu, 18 Dec 2800 12:00:00 UTC"; }

let count = 1;
let ulCount = 1;
let ulCountTwo = 1;

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

var allPreviousInnerHtml;

inputElement.addEventListener('keydown', function(event){
    console.log(event.key);
    if (event.key === 'Enter') {
        let inputVal = document.getElementById("input").value;
        isBool = checkIsCommand(inputVal);
        putBool = checkPutCommand(inputVal);
        printBool = checkPrintCommand(inputVal);
        displayBool = checkDisplayCommand(inputVal);
        console.log(isBool)


        if (isBool) {
            inputVal = inputVal.replace("is ", "")
            invalidBool = false;
        }

        if (putBool) {
            inputVal = inputVal.replace("put",'');
            invalidBool = false;
        }

        if (printBool) {
            inputVal = inputVal.replace("print ",'');
            invalidBool = false;
            console.log(inputVal)
            console.log(inputVal === "courselist")
        }

        if (displayBool){
            inputVal = inputVal.replace("display",'');
            invalidBool = false;
            console.log(inputVal)
        }
        if (putBool === false && isBool === false && printBool === false && displayBool === false){
            invalidBool = true; 
        }


        console.log(inputVal)
        if (inputVal == "student" && isBool === true) {
                ulCount = ulCount + 1;
                document.body.removeChild(arrowLabel);
                document.body.removeChild(inputElement);
                previous =  document.createTextNode(">is " + inputVal);
                allPrevious.appendChild(previous);
                document.body.appendChild(allPrevious);
                console.log("five")
                document.body.appendChild(para);
                inputVal = "Welcome Student";
                studentBool = true;
                teacherBool = false;
                document.body.appendChild(arrowLabel);
                inputElement.value = ""
                document.body.appendChild(inputElement);
            }
        if (inputVal == "teacher" && isBool === true) {
                ulCount = ulCount + 1;
                document.body.removeChild(arrowLabel);
                document.body.removeChild(inputElement);
                previous =  ">is " + inputVal;
                newList(previous);
                document.body.appendChild(arrowLabel);
                inputElement.value = ""
                document.body.appendChild(inputElement);
                teacherBool = true;
                studentBool = false;
            }

        if (isBool === true && inputVal != "teacher" && inputVal != "student") {
            ulCount = ulCount + 1;
            console.log("yes")
            document.body.removeChild(arrowLabel);
            document.body.removeChild(inputElement);
            previous =  "> is " + inputVal;
            newList(previous);
            previous =  "The syntax of the command is incorrect.";
            newList(previous);
            document.body.appendChild(arrowLabel);
            inputElement.value = ""
            document.body.appendChild(inputElement);
        }

        if (teacherBool === true && putBool === true) {
            ulCount = ulCount + 1;
            document.body.removeChild(arrowLabel);
            document.body.removeChild(inputElement);
            previous =  ">put " + inputVal;
            newList(previous);
            document.body.appendChild(arrowLabel);
            inputElement.value = ""
            document.body.appendChild(inputElement);
            document.cookie = `text=${inputVal}; expires=Thu, 18 Dec 2800 12:00:00 UTC`;
        }

        if (displayBool) {
            ulCount = ulCount + 1;
            if (inputVal === '') {
                document.body.removeChild(arrowLabel);
                document.body.removeChild(inputElement);
                previous =  ">display ";
                newList(previous);
                console.log(`${tableCount - 1}`);
                document.body.appendChild(createCourseListTable(undefined));
                document.body.appendChild(arrowLabel);
                inputElement.value = ""
                document.body.appendChild(inputElement);
            }
            else {
                ulCount = ulCount + 1;
                document.body.removeChild(arrowLabel);
                document.body.removeChild(inputElement);
                previous =  ">display " + inputVal;
                newList(previous);
                previous =  "The syntax of the command is incorrect.";
                newList(previous);
                document.body.appendChild(arrowLabel);
                inputElement.value = ""
                document.body.appendChild(inputElement);
            }
        }

        if (invalidBool){
            ulCount = ulCount + 1;
            document.body.removeChild(arrowLabel);
            document.body.removeChild(inputElement);
            previous =  ">" + inputVal;
            newList(previous);
            previous =  "\'" + inputVal + "\'" + " is not recognized as a valid command.";
            newList(previous);
            document.body.appendChild(arrowLabel);
            inputElement.value = ""
            document.body.appendChild(inputElement);
        }

        if (printBool){
            console.log(inputVal === "courselist")
            if (inputVal === "courselist") {
                console.log('here')
                const divPage = document.createElement('div')
                divPage.setAttribute("id", "wholePage")
                document.body.appendChild(divPage)
                divPage.appendChild(createCourseListTable(undefined))
                window.print();
                document.body.removeChild(divPage);
                ulCount = ulCount + 1;
                document.body.removeChild(arrowLabel);
                document.body.removeChild(inputElement);
                previous =  ">print " + inputVal;
                newList(previous);
                document.body.appendChild(arrowLabel);
                inputElement.value = ""
                document.body.appendChild(inputElement);
            }
            else if (inputVal == "page") {
                window.print();
                ulCount = ulCount + 1;
                document.body.removeChild(arrowLabel);
                document.body.removeChild(inputElement);
                previous =  ">print " + inputVal;
                newList(previous);
                document.body.appendChild(arrowLabel);
                inputElement.value = ""
                document.body.appendChild(inputElement);
            }
            else {
                ulCount = ulCount + 1;
                document.body.removeChild(arrowLabel);
                document.body.removeChild(inputElement);
                previous =  ">print " + inputVal;
                newList(previous);
                previous =  "The syntax of the command is incorrect.";
                newList(previous);
                document.body.appendChild(arrowLabel);
                inputElement.value = ""
                document.body.appendChild(inputElement);
            }
        }

        inputElement.scrollIntoView(false);
    } 

})

setInterval(visibleFunc, 1000)



function printCourseList(htmlCourseList) {
    const newWindow = window.open('', '_blank');
    newWindow.document.open();
    newWindow.document.write(htmlCourseList);
    newWindow.document.close(); 
    newWindow.onload = () => {
      newWindow.focus(); 
      newWindow.print();
      newWindow.close(); 
    };
  }


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
    if (ulCount > ulCountTwo){
        ulCountTwo = ulCountTwo + 1;
        allPrevious = document.createElement('ul')
        allPrevious.setAttribute("id", "Unordered" + ulCount)
    }
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

function checkPrintCommand(inputVal) {
    return inputVal.startsWith("print");
}

function checkDisplayCommand(inputVal) {
    return inputVal.startsWith("display");
}

function createCourseListTable(courseListText) {
    if (courseListText === undefined){
        courseListText = document.cookie;
    }
    const table = document.createElement('table');
    table.id = tableCount;
    var rowInsert = table.insertRow();
    var cellInsert = rowInsert.insertCell();
    
    courseListText = courseListText.replace("text=", "")
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
    tableCount = tableCount + 1;
    return(table)
}