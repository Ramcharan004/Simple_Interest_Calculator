
    let lang;
const labels = {
  en: {
    title: "Simple Interest Calculator",
    amtLabel: "Amount Given",
    intLabel: "Interest per Month (%)",
    givenLabel: "Given Date",
    returnLabel: "Return Date",
    calcBtn: "Calculate Interest",
    given: "Given Date",
    return: "Return Date",
    duration: "Duration",
    amount: "Amount",
    interest: "Interest",
    total: "Total Amount",
    years: "years",
    months: "months",
    days: "days"
  },
  te: {
    title: "సాధారణ వడ్డీ లెక్కింపు",
    amtLabel: "ఇచ్చిన మొత్తం",
    intLabel: "ప్రతి నెల వడ్డీ (%)",
    givenLabel: "ఇచ్చిన తేది",
    returnLabel: "తిరిగిచ్చే తేది",
    calcBtn: "వడ్డీ లెక్కించు",
    given: "ఇచ్చిన తేది",
    return: "తిరిగిచ్చే తేది",
    duration: "వ్యవధి",
    amount: "మొత్తం",
    interest: "వడ్డీ",
    total: "మొత్తం మొత్తం",
    years: "సంవత్సరాలు",
    months: "నెలలు",
    days: "రోజులు"
  },
  hi: {
    title: "साधारण ब्याज कैलकुलेटर",
    amtLabel: "दिया गया राशि",
    intLabel: "प्रति माह ब्याज (%)",
    givenLabel: "दिया गया दिनांक",
    returnLabel: "वापसी दिनांक",
    calcBtn: "ब्याज गणना करें",
    given: "दिया गया दिनांक",
    return: "वापसी दिनांक",
    duration: "अवधि",
    amount: "राशि",
    interest: "ब्याज",
    total: "कुल राशि",
    years: "वर्ष",
    months: "महीने",
    days: "दिन"
  },
  ta: {
    title: "எளிய வட்டி கணிப்பான்",
    amtLabel: "கொடுக்கப்பட்ட தொகை",
    intLabel: "மாத வட்டி (%)",
    givenLabel: "தொகை வழங்கிய தேதி",
    returnLabel: "திருப்பிச் செலுத்தும் தேதி",
    calcBtn: "வட்டியை கணக்கிடு",
    given: "தொகை வழங்கிய தேதி",
    return: "திருப்பும் தேதி",
    duration: "காலம்",
    amount: "தொகை",
    interest: "வட்டி",
    total: "மொத்தம்",
    years: "ஆண்டுகள்",
    months: "மாதங்கள்",
    days: "நாட்கள்"
  },
  ml: {
    title: "സാദാരൺ പലിശ കാൽക്കുലേറ്റർ",
    amtLabel: "നൽകിയ തുക",
    intLabel: "മാസ പലിശ (%)",
    givenLabel: "നൽകിയ തീയതി",
    returnLabel: "മടങ്ങിയ തീയതി",
    calcBtn: "പലിശ കണക്കാക്കുക",
    given: "നൽകിയ തീയതി",
    return: "മടങ്ങിയ തീയതി",
    duration: "ദൈർഘ്യം",
    amount: "തുക",
    interest: "പലിശ",
    total: "മൊത്തം തുക",
    years: "വർഷങ്ങൾ",
    months: "മാസങ്ങൾ",
    days: "ദിവസങ്ങൾ"
  }
};


    lang = labels.en;

    function changeLanguage() {
      const selected = document.getElementById("language").value;
      lang = labels[selected];
      document.getElementById("title").innerText = lang.title;
      document.getElementById("amtLabel").innerText = lang.amtLabel;
      document.getElementById("intLabel").innerText = lang.intLabel;
      document.getElementById("givenLabel").innerText = lang.givenLabel;
      document.getElementById("returnLabel").innerText = lang.returnLabel;
      document.getElementById("calcBtn").innerText = lang.calcBtn;
      if(document.getElementById("resultBox").style.display === "block"){
        calculateInterest();
      }
    }

    // Format amount with commas while typing
    function formatAmount(input) {
      let value = input.value.replace(/,/g, '');
      if (!isNaN(value) && value !== "") {
        value = parseInt(value).toLocaleString('en-IN');
        input.value = value;
      } else {
        input.value = "";
      }
      clearResults();
    }

    // Clear result on input change
    function clearResults() {
      document.getElementById("resultBox").style.display = "none";
      document.getElementById("downloadButtons").style.display = "none";
    }

    // Duration calculator
    function getDuration(start, end) {
      let y = end.getFullYear() - start.getFullYear();
      let m = end.getMonth() - start.getMonth();
      let d = end.getDate() - start.getDate();
      if (d < 0) {
        m--;
        d += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
      }
      if (m < 0) {
        y--;
        m += 12;
      }
      return `${y} ${lang.years}, ${m} ${lang.months}, ${d} ${lang.days}`;
    }

    // Calculate interest and display
    function calculateInterest() {
      let amountStr = document.getElementById("amount").value.replace(/,/g, '');
      const amount = parseFloat(amountStr);
      const rate = parseFloat(document.getElementById("interest").value);
      const start = new Date(document.getElementById("givenDate").value);
      const end = new Date(document.getElementById("returnDate").value);

      if (isNaN(amount) || isNaN(rate) || !start || !end || start >= end) {
        alert("Please fill valid data.");
        return;
      }

      const startYear = start.getFullYear();
      const startMonth = start.getMonth();
      const endYear = end.getFullYear();
      const endMonth = end.getMonth();

      let fullMonths = (endYear - startYear) * 12 + (endMonth - startMonth);
      if (end.getDate() < start.getDate()) {
        fullMonths -= 1;
      }

      const interestAmt = (amount * rate * fullMonths) / 100;
      const totalAmt = amount + interestAmt;
      const duration = getDuration(start, end);

      document.getElementById("resultBox").style.display = "block";
      document.getElementById("downloadButtons").style.display = "flex";

      document.getElementById("resultBox").innerText = 
        `${lang.given}: ${start.toDateString()}\n` +
        `${lang.return}: ${end.toDateString()}\n` +
        `${lang.duration}: ${duration}\n` +
        `${lang.amount}: ₹${amount.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}\n` +
        `${lang.interest}: ₹${interestAmt.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}\n` +
        `${lang.total}: ₹${totalAmt.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    }

   
    // Download result as image
    function downloadImage() {
      html2canvas(document.getElementById("resultBox")).then(canvas => {
        const link = document.createElement("a");
        link.download = "interest-details.png";
        link.href = canvas.toDataURL();
        link.click();
      });
    }

    // Initialize flatpickr
    let returnPicker;

    flatpickr("#givenDate", {
      dateFormat: "Y-m-d",
      maxDate: "today",
      onChange: function(selectedDates) {
        clearResults();
        if (selectedDates.length > 0) {
          const givenDate = selectedDates[0];
          const minReturnDate = new Date(givenDate);
          minReturnDate.setDate(minReturnDate.getDate() + 1);

          if (returnPicker) {
            returnPicker.set('minDate', minReturnDate);
            if (returnPicker.selectedDates.length > 0 && returnPicker.selectedDates[0] < minReturnDate) {
              returnPicker.clear();
            }
          }
        }
      }
    });

    returnPicker = flatpickr("#returnDate", {
      dateFormat: "Y-m-d",
      onChange: function() {
        clearResults();
      }
    });