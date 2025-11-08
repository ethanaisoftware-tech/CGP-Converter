document.addEventListener('DOMContentLoaded', () => {
    // 1. Element Selection
    const convertBtn = document.getElementById("convertBtn");
    const cgpaInput = document.getElementById("cgpa");
    const uniSelect  = document.getElementById("university");
    const resultDiv  = document.getElementById("result");

    // 2. Event Listener for the Convert Button
    convertBtn.addEventListener("click", function() {
        // Get values and convert CGPA to a floating point number
        const cgpa = parseFloat(cgpaInput.value);
        const uni  = uniSelect.value;

        // Reset the result box and trigger the CSS fade-in animation reset
        resultDiv.classList.remove("show");
        resultDiv.style.display = "flex";
        resultDiv.style.removeProperty('background');
        resultDiv.style.removeProperty('color');
        
        // --- 3. Input Validation ---
        if (isNaN(cgpa) || cgpa < 0 || cgpa > 10.0) {
            // Apply error styles using setProperty for robust override
            resultDiv.style.setProperty('background', 'rgba(255, 0, 0, 0.15)', 'important');
            resultDiv.style.setProperty('color', '#ff8888', 'important');
            resultDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Please enter a valid CGPA (0.00 to 10.00).';
            return;
        }
        
        // --- 4. Conversion Logic (Updated with common official formulas) ---
        let percentage;
        
        switch (uni) {
            case "pu": 
            case "uk4":
                // HEC/Punjab University/Standard 4.0 Scale: (CGPA / 4.0) * 100 or CGPA * 25
                percentage = cgpa * 25; 
                break;
            case "cbse":
                // CBSE/Standard 10-Point Scale: CGPA * 9.5
                percentage = cgpa * 9.5; 
                break;
            case "vtu":
                // VTU (Visvesvaraya Technological University) 2015/2018 Scheme: (CGPA - 0.75) * 10
                percentage = (cgpa - 0.75) * 10;
                break;
            case "lums":
                // Using the most common 4.0 scale rule for Lums/NUST/COMSATS: CGPA * 25
                percentage = cgpa * 25; 
                break;
            default:
                // Fallback to the common 10-point scale formula
                percentage = cgpa * 9.5;
        }

        // Clamp result between 0 and 100
        if (percentage < 0) percentage = 0;
        if (percentage > 100) percentage = 100;

        // --- 5. Animate the final result display ---
        animateResult(resultDiv, percentage);
    });


    // Function to handle the animated counting effect
    function animateResult(element, finalValue) {
        let current = 0;
        const duration = 1200; // Animation duration in milliseconds
        const frameRate = 16;  // Update interval (approx 60fps)
        const totalFrames = duration / frameRate;
        const step = finalValue / totalFrames; // Increment per frame

        // Apply success styles and trigger CSS transition
        element.style.setProperty('background', 'rgba(0, 255, 0, 0.15)', 'important');
        element.style.setProperty('color', '#a3ffc6', 'important');
        
        // Initial content and trigger CSS transition
        element.innerHTML = '<i class="fas fa-check-circle"></i> Your Percentage is <strong>0.00%</strong>';
        void element.offsetWidth; // Force reflow to restart CSS animation (for scale/opacity)
        element.classList.add("show"); // Trigger the CSS fade-in/scale-up animation

        // The counting loop
        const counter = setInterval(() => {
            current += step;
            if (current >= finalValue) {
                current = finalValue;
                clearInterval(counter); // Stop the counting
            }
            // Update the displayed value
            element.innerHTML = `<i class="fas fa-check-circle"></i> Your Percentage is <strong>${current.toFixed(2)}%</strong>`;
        }, frameRate);
    }
});