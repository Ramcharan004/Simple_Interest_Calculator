// 🌐 LANGUAGE
let lang = "en";

const labels = {
    en: {
        title: "💰 Interest Calculator",
        amount: "💵 Amount",
        interest: "📈 Interest per Month (%)",
        given: "📅 Given Date",
        return: "📅 Return Date",
        calc: "✅ Calculate",
        reset: "🔄 Reset"
    },
    te: {
        title: "💰 వడ్డీ లెక్కింపు",
        amount: "💵 మొత్తం",
        interest: "📈 నెలవారీ వడ్డీ (%)",
        given: "📅 ఇచ్చిన తేది",
        return: "📅 తిరిగిచ్చే తేది",
        calc: "✅ లెక్కించు",
        reset: "🔄 రీసెట్"
    }
};

function changeLanguage() {
    const selected = document.getElementById("language").value;
    lang = selected;

    document.getElementById("title").innerText = labels[lang].title;
    document.getElementById("amtLabel").innerText = labels[lang].amount;
    document.getElementById("intLabel").innerText = labels[lang].interest;
    document.getElementById("givenLabel").innerText = labels[lang].given;
    document.getElementById("returnLabel").innerText = labels[lang].return;
    document.getElementById("calcBtn").innerText = labels[lang].calc;
    document.getElementById("resetBtn").innerText = labels[lang].reset;
}

// 🔥 FORMAT AMOUNT
function formatAmount(input) {
    let value = input.value.replace(/,/g, '');
    if (!isNaN(value) && value !== "") {
        input.value = parseInt(value).toLocaleString('en-IN');
    }
}

function calculateInterestFixed(amount, rate, start, end) {
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
        months--;
        days += 30; // 🔥 FIXED 30 DAYS
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    const totalMonths = years * 12 + months;

    const monthlyInterest = (amount * rate) / 100;
    const dailyInterest = monthlyInterest / 30;

    const interest =
        (monthlyInterest * totalMonths) +
        (dailyInterest * days);

    return Math.round(interest);
}

// 🔥 PREVIEW
function updatePreview() {
    let amountStr = document.getElementById("amount").value.replace(/,/g, '');
    const amount = parseFloat(amountStr);
    const rate = parseFloat(document.getElementById("interest").value);

    const startVal = document.getElementById("givenDate").value;
    const endVal = document.getElementById("returnDate").value;

    if (!amount || !rate || !startVal || !endVal) {
        document.getElementById("interestPreview").classList.remove("show");
        document.getElementById("durationPreview").classList.remove("show");
        return;
    }

    const start = new Date(startVal + "T00:00:00");
    const end = new Date(endVal + "T00:00:00");

    if (start >= end) {
        document.getElementById("interestPreview").classList.remove("show");
        document.getElementById("durationPreview").classList.remove("show");
        return;
    }

    const days = Math.floor((end - start) / (1000 * 60 * 60 * 24));
    const interest = calculateInterestFixed(amount, rate, start, end);

    document.getElementById("interestPreview").innerText = `💡 Preview Interest: ₹${interest}`;
    document.getElementById("interestPreview").classList.add("show");
    
    document.getElementById("durationPreview").innerText = `⏳ Duration: ${days} days`;
    document.getElementById("durationPreview").classList.add("show");
}

// 🔥 CALCULATE
function calculateInterest() {
    let amountStr = document.getElementById("amount").value.replace(/,/g, '');
    const amount = parseFloat(amountStr);
    const rate = parseFloat(document.getElementById("interest").value);

    const startVal = document.getElementById("givenDate").value;
    const endVal = document.getElementById("returnDate").value;

    if (!startVal || !endVal) {
        alert("Please select both dates");
        return;
    }

    const start = new Date(startVal + "T00:00:00");
    const end = new Date(endVal + "T00:00:00");

    if (isNaN(amount) || amount <= 0 || isNaN(rate) || rate < 0 || start >= end) {
        alert("Please enter valid data");
        return;
    }

    const interest = calculateInterestFixed(amount, rate, start, end);
    const total = amount + interest;
    
    // Calculate duration in years, months, days
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();
    
    if (days < 0) {
        months--;
        days += 30;
    }
    
    if (months < 0) {
        years--;
        months += 12;
    }
    
    // Format duration string
    let durationStr = '';
    if (years > 0) durationStr += `${years} year${years > 1 ? 's' : ''} `;
    if (months > 0) durationStr += `${months} month${months > 1 ? 's' : ''} `;
    if (days > 0) durationStr += `${days} day${days > 1 ? 's' : ''}`;
    durationStr = durationStr.trim();
    
    const totalDays = Math.floor((end - start) / (1000 * 60 * 60 * 24));

    const resultContent = document.getElementById("resultContent");
    resultContent.innerHTML = `
        <p><b>${labels[lang].given}:</b> <span class="result-value">${start.toDateString()}</span></p>
        <p><b>${labels[lang].return}:</b> <span class="result-value">${end.toDateString()}</span></p>
        <p><b>⏳ Duration:</b> <span class="result-value">${durationStr}</span></p>
        <p><b>📊 Total Days:</b> <span class="result-value">${totalDays} days</span></p>
        <p><b>${labels[lang].amount}:</b> <span class="result-value">₹${amount.toLocaleString('en-IN')}</span></p>
        <p><b>📈 Interest:</b> <span class="result-value">₹${interest.toLocaleString('en-IN')}</span></p>
        <p><b>💰 Total Amount:</b> <span class="result-value">₹${total.toLocaleString('en-IN')}</span></p>
    `;
    
    document.getElementById("resultBox").classList.add("show");
}

// 🔥 RESET
function resetForm() {
    document.getElementById("amount").value = "";
    document.getElementById("interest").value = "";
    document.getElementById("givenDate").value = "";
    document.getElementById("returnDate").value = "";
    document.getElementById("resultContent").innerHTML = "";
    document.getElementById("resultBox").classList.remove("show");
    document.getElementById("interestPreview").innerText = "";
    document.getElementById("interestPreview").classList.remove("show");
    document.getElementById("durationPreview").innerText = "";
    document.getElementById("durationPreview").classList.remove("show");
}

// 📥 DOWNLOAD AS IMAGE
function downloadAsImage() {
    const resultBox = document.getElementById("resultBox");
    const resultContent = document.getElementById("resultContent");
    
    // Create temporary container for image
    const tempDiv = document.createElement('div');
    tempDiv.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 15px;
        width: 500px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    `;
    
    // Add title
    const titleDiv = document.createElement('h2');
    titleDiv.innerText = `💰 ${labels[lang].title.replace('💰 ', '')}`;
    titleDiv.style.cssText = `
        margin-bottom: 20px;
        font-size: 24px;
        font-weight: 700;
        color: #1e293b;
        text-align: center;
    `;
    tempDiv.appendChild(titleDiv);
    
    // Copy result content
    const contentClone = resultContent.cloneNode(true);
    contentClone.style.cssText = `
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
    `;
    tempDiv.appendChild(contentClone);
    
    // Add footer
    const footerDiv = document.createElement('p');
    footerDiv.innerText = `✅ Generated on ${new Date().toLocaleString()}`;
    footerDiv.style.cssText = `
        margin-top: 20px;
        text-align: center;
        font-size: 12px;
        color: #64748b;
    `;
    tempDiv.appendChild(footerDiv);
    
    // Add to DOM temporarily
    document.body.appendChild(tempDiv);
    
    // Convert to image
    html2canvas(tempDiv, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false
    }).then(canvas => {
        // Create download link
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `interest-calculation-${new Date().toISOString().split('T')[0]}.png`;
        link.click();
        
        // Remove temporary div
        document.body.removeChild(tempDiv);
    });
}

// 🔥 DATE PICKER
document.addEventListener("DOMContentLoaded", function () {

    changeLanguage();

    let returnPicker;

    flatpickr("#givenDate", {
        dateFormat: "Y-m-d",
        maxDate: "today",
        onChange: function(selectedDates) {
            if (selectedDates.length > 0) {
                const minDate = new Date(selectedDates[0]);
                minDate.setDate(minDate.getDate() + 1);
                returnPicker.set('minDate', minDate);
            }
            updatePreview();
        }
    });

    returnPicker = flatpickr("#returnDate", {
        dateFormat: "Y-m-d",
        onChange: function() {
            updatePreview();
        }
    });

});