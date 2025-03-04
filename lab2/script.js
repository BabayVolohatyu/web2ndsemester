//1
function MinMax(arr) {
    let min = arr[0];
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i];
        }
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return {min, max};
}

array = [-8, 10, 22, -90, 6];
result = MinMax(array);
console.log(`Result of 1.1:Min: ${result.min}, Max: ${result.max}`);

function compareObjects(obj1, obj2) {
    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (let key of keys1) {
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }

    return true;
}

objA = {type: "Fruit", name: "Banana"};
objB = {type: "Vegetable", name: "Tomato"};
console.log(`First result of 1.2:${compareObjects(objA, objB)}`);
console.log(`Second result of 1.2:${compareObjects(objA, objA)}`);

//2

function isInRange(number, min, max) {
    return number >= min && number <= max;
}

console.log(`First result of 2.1:${isInRange(5, 1, 10)}`);
console.log(`Second result of 2.1:${isInRange(15, 1, 10)}`);

let isActive = true;
isActive = !isActive;
console.log(`Result of 2.2:${isActive}`);

//3

function getGradeDescription(grade) {
    if (grade >= 90) {
        return "Excellent";
    } else if (grade >= 70) {
        return "Good";
    } else if (grade >= 50) {
        return "Passed";
    } else{
        return "Not passed";
    }
}

console.log(`Results of 3.1(95,80,65,49):`);
console.log(getGradeDescription(95));
console.log(getGradeDescription(80));
console.log(getGradeDescription(65));
console.log(getGradeDescription(49));

//3

function getSeason(month) {
    if (month >= 3 && month <= 5) {
        return "Spring";
    } else if (month >= 6 && month <= 8) {
        return "Summer";
    } else if (month >= 9 && month <= 11) {
        return "Autumn";
    } else {
        return "Winter";
    }
}
console.log(`Result of 3.3(4,7,10,12):`);
console.log(getSeason(4));
console.log(getSeason(7));
console.log(getSeason(10));
console.log(getSeason(12));