        let lang;
        const labels = {
            en: {
                title: "Advanced Simple Interest Calculator",
                amtLabel: "Amount Given",
                intLabel: "Interest per Month (%)",
                givenLabel: "Given Date",
                returnLabel: "Return Date",
                calcBtn: "Calculate Interest",
                resetBtn: "Reset",
                given: "Given Date",
                return: "Return Date",
                duration: "Duration",
                amount: "Amount",
                interest: "Interest",
                total: "Total Amount",
                years: "years",
                months: "months",
                days: "days",
                preview: "Estimated Interest"
            },
            te: {
                title: "అధునాతన సాధారణ వడ్డీ లెక్కింపు",
                amtLabel: "ఇచ్చిన మొత్తం",
                intLabel: "ప్రతి నెల వడ్డీ (%)",
                givenLabel: "ఇచ్చిన తేది",
                returnLabel: "తిరిగిచ్చే తేది",
                calcBtn: "వడ్డీ లెక్కించు",
                resetBtn: "రీసెట్",
                given: "ఇచ్చిన తేది",
                return: "తిరిగిచ్చే తేది",
                duration: "వ్యవధి",
                amount: "మొత్తం",
                interest: "వడ్డీ",
                total: "మొత్తం మొత్తం",
                years: "సంవత్సరాలు",
                months: "నెలలు",
                days: "రోజులు",
                preview: "అంచనా వడ్డీ"
            },
            hi: {
                title: "उन्नत साधारण ब्याज कैलकुलेटर",
                amtLabel: "दिया गया राशि",
                intLabel: "प्रति माह ब्याज (%)",
                givenLabel: "दिया गया दिनांक",
                returnLabel: "वापसी दिनांक",
                calcBtn: "ब्याज गणना करें",
                resetBtn: "रीसेट करें",
                given: "दिया गया दिनांक",
                return: "वापसी दिनांक",
                duration: "अवधि",
                amount: "राशि",
                interest: "ब्याज",
                total: "कुल राशि",
                years: "वर्ष",
                months: "महीने",
                days: "दिन",
                preview: "अनुमानित ब्याज"
            },
            ta: {
                title: "மேம்பட்ட எளிய வட்டி கணிப்பான்",
                amtLabel: "கொடுக்கப்பட்ட தொகை",
                intLabel: "மாத வட்டி (%)",
                givenLabel: "தொகை வழங்கிய தேதி",
                returnLabel: "திருப்பிச் செலுத்தும் தேதி",
                calcBtn: "வட்டியை கணக்கிடு",
                resetBtn: "மீட்டமை",
                given: "தொகை வழங்கிய தேதி",
                return: "திருப்பும் தேதி",
                duration: "காலம்",
                amount: "தொகை",
                interest: "வட்டி",
                total: "மொத்தம்",
                years: "ஆண்டுகள்",
                months: "மாதங்கள்",
                days: "நாட்கள்",
                preview: "மதிப்பிடப்பட்ட வட்டி"
            },
            ml: {
                title: "വിപുലമായ സാദാരൺ പലിശ കാൽക്കുലേറ്റർ",
                amtLabel: "നൽകിയ തുക",
                intLabel: "മാസ പലിശ (%)",
                givenLabel: "നൽകിയ തീയതി",
                returnLabel: "മടങ്ങിയ തീയതി",
                calcBtn: "പലിശ കണക്കാക്കുക",
                resetBtn: "പുനഃസജ്ജമാക്കുക",
                given: "നൽകിയ തീയതി",
                return: "മടങ്ങിയ തീയതി",
                duration: "ദൈർഘ്യം",
                amount: "തുക",
                interest: "പലിശ",
                total: "മൊത്തം തുക",
                years: "വർഷങ്ങൾ",
                months: "മാസങ്ങൾ",
                days: "ദിവസങ്ങൾ",
                preview: "കണക്കാക്കിയ പലിശ"
            }
        };

        lang = labels.en;
        loadLastCalculation();

        function changeLanguage() {
            const selected = document.getElementById("language").value;
            lang = labels[selected];
            document.getElementById("title").innerHTML = `<i class="fas fa-calculator"></i> ${lang.title}`;
            document.getElementById("amtLabel").innerHTML = `<i class="fas fa-rupee-sign"></i> ${lang.amtLabel}`;
            document.getElementById("intLabel").innerHTML = `<i class="fas fa-percentage"></i> ${lang.intLabel}`;
            document.getElementById("givenLabel").innerHTML = `<i class="fas fa-calendar-alt"></i> ${lang.givenLabel}`;
            document.getElementById("returnLabel").innerHTML = `<i class="fas fa-calendar-check"></i> ${lang.returnLabel}`;
            document.getElementById("calcBtn").innerHTML = `<i class="fas fa-calculate"></i> ${lang.calcBtn}`;
            document.getElementById("resetBtn").innerHTML = `<i class="fas fa-undo"></i> ${lang.resetBtn}`;
            updatePreview();
            if (document.getElementById("resultBox").style.display === "block") {
                calculateInterest();
            }
        }

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

        function clearResults() {
            document.getElementById("resultBox").style.display = "none";
            document.getElementById("downloadButtons").style.display = "none";
        }

        function resetForm() {
            document.getElementById("amount").value = "";
            document.getElementById("interest").value = "";
            document.getElementById("givenDate").value = "";
            document.getElementById("returnDate").value = "";
            document.querySelector('input[value="simple"]').checked = true;
            clearResults();
            document.getElementById("interestPreview").style.display = "none";
            document.getElementById("durationPreview").style.display = "none";
            localStorage.removeItem('lastCalculation');
        }

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
            return { years: y, months: m, days: d, text: `${y} ${lang.years}, ${m} ${lang.months}, ${d} ${lang.days}` };
        }

        function animateValue(element, start, end, duration) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                element.innerText = `₹${Math.floor(progress * (end - start) + start).toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }

        function updatePreview() {
            const amountStr = document.getElementById("amount").value.replace(/,/g, '');
            const amount = parseFloat(amountStr);
            const rate = parseFloat(document.getElementById("interest").value);
            const start = new Date(document.getElementById("givenDate").value);
            const end = new Date(document.getElementById("returnDate").value);
            const interestType = document.querySelector('input[name="interestType"]:checked').value;

            const interestPreview = document.getElementById("interestPreview");
            const durationPreview = document.getElementById("durationPreview");

            if (!isNaN(amount) && !isNaN(rate) && start && end && start < end) {
                const duration = getDuration(start, end);
                let interestAmt;
                if (interestType === "simple") {
                    const fullMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
                    interestAmt = (amount * rate * fullMonths) / 100;
                } else {
                    const totalMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
                    interestAmt = amount * Math.pow(1 + rate / 100, totalMonths) - amount;
                }
                interestPreview.style.display = "block";
                durationPreview.style.display = "block";
                interestPreview.innerText = `${lang.preview}: ₹${interestAmt.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
                durationPreview.innerText = `${lang.duration}: ${duration.text}`;
            } else {
                interestPreview.style.display = "none";
                durationPreview.style.display = "none";
            }
        }

        function calculateInterest() {
            let amountStr = document.getElementById("amount").value.replace(/,/g, '');
            const amount = parseFloat(amountStr);
            const rate = parseFloat(document.getElementById("interest").value);
            const start = new Date(document.getElementById("givenDate").value);
            const end = new Date(document.getElementById("returnDate").value);
            const interestType = document.querySelector('input[name="interestType"]:checked').value;

            if (isNaN(amount) || isNaN(rate) || !start || !end || start >= end) {
                alert("Please fill valid data.");
                return;
            }

            const duration = getDuration(start, end);
            let interestAmt, totalAmt;
            if (interestType === "simple") {
                const fullMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
                interestAmt = (amount * rate * fullMonths) / 100;
            } else {
                const totalMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
                interestAmt = amount * Math.pow(1 + rate / 100, totalMonths) - amount;
            }
            totalAmt = amount + interestAmt;

            const resultBox = document.getElementById("resultBox");
            resultBox.innerHTML = `
                <div class="result-line"><span><i class="fas fa-calendar-alt"></i> ${lang.given}:</span><span>${start.toDateString()}</span></div>
                <div class="result-line"><span><i class="fas fa-calendar-check"></i> ${lang.return}:</span><span>${end.toDateString()}</span></div>
                <div class="result-line"><span><i class="fas fa-clock"></i> ${lang.duration}:</span><span>${duration.text}</span></div>
                <div class="result-line"><span><i class="fas fa-rupee-sign"></i> ${lang.amount}:</span><span class="result-value" id="amountValue">₹${amount.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span></div>
                <div class="result-line"><span><i class="fas fa-percentage"></i> ${lang.interest}:</span><span class="result-value" id="interestValue">₹0.00</span></div>
                <div class="result-line"><span><i class="fas fa-money-bill-wave"></i> ${lang.total}:</span><span class="result-value" id="totalValue">₹0.00</span></div>
            `;
            resultBox.style.display = "block";
            document.getElementById("downloadButtons").style.display = "flex";

            animateValue(document.getElementById("interestValue"), 0, interestAmt, 1000);
            animateValue(document.getElementById("totalValue"), 0, totalAmt, 1000);

            saveCalculation({ amount, rate, start, end, interestType });
        }

        function saveCalculation(data) {
            localStorage.setItem('lastCalculation', JSON.stringify(data));
        }

        function loadLastCalculation() {
            const data = JSON.parse(localStorage.getItem('lastCalculation'));
            if (data) {
                document.getElementById("amount").value = data.amount.toLocaleString('en-IN');
                document.getElementById("interest").value = data.rate;
                document.getElementById("givenDate").value = data.start;
                document.getElementById("returnDate").value = data.end;
                document.querySelector(`input[value="${data.interestType}"]`).checked = true;
                updatePreview();
            }
        }

        function downloadImage() {
            html2canvas(document.getElementById("resultBox")).then(canvas => {
                const link = document.createElement("a");
                link.download = "interest-details.png";
                link.href = canvas.toDataURL();
                link.click();
            });
        }

        function downloadPDF() {
            const element = document.getElementById("resultBox");
            html2pdf().from(element).set({
                margin: 1,
                filename: 'interest-details.pdf',
                html2canvas: { scale: 2 },
                jsPDF: { orientation: 'portrait' }
            }).save();
        }

        let returnPicker;
        flatpickr("#givenDate", {
            dateFormat: "Y-m-d",
            maxDate: "today",
            onChange: function(selectedDates) {
                clearResults();
                updatePreview();
                if (selectedDates.length > 0) {
                    const givenDate = selectedDates[0];
                    const minReturnDate = new Date(givenDate);
                    minReturnDate.setDate(minReturnDate.getDate() + 1);
                    returnPicker.set('minDate', minReturnDate);
                    if (returnPicker.selectedDates.length > 0 && returnPicker.selectedDates[0] < minReturnDate) {
                        returnPicker.clear();
                    }
                }
            }
        });

        returnPicker = flatpickr("#returnDate", {
            dateFormat: "Y-m-d",
            onChange: function() {
                clearResults();
                updatePreview();
            }
        });