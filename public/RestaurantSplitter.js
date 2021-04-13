let html = "";
let tipPlace;
let diners;
function dinerCount() {
	diners = parseInt(document.getElementById("dinerCount").elements[0].value);
	if (isNaN(diners) || diners < 2 || diners > 100) {
		alert("Please enter a number between 2 and 100 to continue.");
	} else {
		tipPlace = diners + 1;
		for (let i = 0; i < diners; i += 1) {
			html += `<form id="form">
					NAME OF DINER #${i+1} :<br>\
					<input type="text"> <br>`;
		}
		html += `TAX COLLECTED: <br>
					<input type="number"><br>
					TIP COLLECTED: <br>
					<input type="number"><br>
					</form>
					<button onclick="onSubmit()">Submit</button>`
		print(html, "output");
	}

	
}




function print(message, htmlId) {
	document.getElementById(htmlId).innerHTML = message;
}

let dinerList = `<option value=""></option>`;
let dinersArray = [];
let tax;
let tip;

let html2 = "";
let submitFlag = 1;

function onSubmit() {
	submitFlag = 1;
	for (let i = 0; i < document.getElementById("form").length; i += 1) {
		if (document.getElementById("form").elements[i].value === "") {
			alert("Please make sure all fields are filled out before clicking Submit.");
			submitFlag = 2;
			break;
		}
	}
	if (submitFlag === 1) {
		tax = parseFloat(document.getElementById("form").elements[diners].value);
		tip = parseFloat(document.getElementById("form").elements[tipPlace].value);
		for (let i = 0; i < diners; i += 1) {
			let dinerName = document.getElementById("form").elements[i].value;
			let dinerObject = {
				name: dinerName,
				total: 0,
				items: []
			};
			dinersArray.push(dinerObject);
		}


		for (let i = 0; i < diners; i += 1) {
			dinerList += `<option value="${dinersArray[i].name}">${dinersArray[i].name}</option>`
		}

		html2 += `  <form id="formDeep">
						Please enter a receipt item:<br>
						<input type="text"> <br>
						Who ordered this?<br>
						<select>
							${dinerList}
						</select><br>
						How much did it cost?<br>
						<input type="number"><br>
					</form>
					<button onclick="onNext()">Add Item</button>
					<div id="div1"></div>`;
		print(html2, "deeper");
		print("", "output");
	}

	
}

let html4 = `<tr>
				<th>Item #</th>
				<th>Item</th>
				<th>Diner</th>
				<th>Price</th>
			</tr>`;
print(html4, "list");
let counter = 0;
let nextFlag = 1;
function onNext() {
	nextFlag = 1;
	for (let i = 0; i < document.getElementById("formDeep").length; i += 1) {
		if (document.getElementById("formDeep").elements[i].value === "") {
			alert("Please make sure all fields are filled out before clicking Add Item.");
			nextFlag = 2;
			break;
		}
	}

	if (nextFlag === 1) {
		for (let i = 0; i < diners; i += 1) {
			if (dinersArray[i].name === document.getElementById("formDeep").elements[1].value) {
				dinersArray[i].total += parseFloat(document.getElementById("formDeep").elements[2].value);
				dinersArray[i].items.push(document.getElementById("formDeep").elements[0].value);
			}
		}
		counter += 1;
		html4 += `
			<tr>
				<td>${counter}</td>
				<td>${document.getElementById("formDeep").elements[0].value} <img src="39.svg" alt="remove item button" width="16" height="16"></td>
				<td>${document.getElementById("formDeep").elements[1].value}</td>
				<td>$${document.getElementById("formDeep").elements[2].value}</td>
			</tr>`;
		print(html4, "list");

		document.getElementById("formDeep").elements[0].value = "";
		document.getElementById("formDeep").elements[1].value = "";
		document.getElementById("formDeep").elements[2].value = "";
	}

}

let totalBill = 0;

let html3 = "";
function onDone() {

	for (let i = 0; i < diners; i += 1) {
		totalBill += dinersArray[i].total;
	}
	for (let i = 0; i < diners; i += 1) {
		percent = dinersArray[i].total / totalBill
		tipTax = (tip + tax) * percent;
		dinersArray[i].tipTax = parseFloat(tipTax);
	}

	html3 += `<p>Subtotal: ${totalBill.toFixed(2)}</p>
				<p>Tax and Tip: ${(tip + tax).toFixed(2)}</p>`;
	for (let i = 0; i < diners; i += 1) {
		html3 += `<p>${dinersArray[i].name} owes $${(dinersArray[i].total + dinersArray[i].tipTax).toFixed(2)} for ${dinersArray[i].items.join(', ')}<p>`
	}
	print(html3, "conclusion");
}

function removeItem() {
	
}















